<template>
  <div>
    <!-- 
      - v-loading: 绑定 loading 状态，在数据加载时显示加载动画。
      - :data: 绑定到 filteredUsers 计算属性，而不是原始的 users 列表，
        这样表格内容就自动过滤掉了 admin 用户。
    -->
    <el-table v-loading="loading" :data="filteredUsers" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="email" label="用户邮箱" width="180" />
      <el-table-column prop="phoneNumber" label="用户手机" />
      <!-- 
        - :formatter: 使用 formatRoleName 函数来格式化单元格的显示内容，
          将英文角色名翻译成中文。
      -->
      <el-table-column prop="roleName" label="用户角色" :formatter="formatRoleName" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 用户编辑 Dialog -->
    <el-dialog v-model="editDialogVisible" title="用户编辑" width="500" :close-on-click-modal="false">
      <el-form :model="userForm" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="userForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="userForm.phoneNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="userForm.roleId" placeholder="请选择用户角色" style="width: 100%;">
            <el-option v-for="item in roles" :key="item.id" :label="item.description" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUpdate()">提交</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 用户删除确认 Dialog -->
    <el-dialog v-model="deleteDialogVisible" title="确认删除" width="500" :close-on-click-modal="false">
      <span>你确定要删除这个用户吗？此操作无法撤销。</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDelete()">删除</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'; // 假设你使用的是 element-plus
import { userApi } from '@/api/user'; // 确保你的 API 路径正确
import { roleApi } from '@/api/role'; // 确保你的 API 路径正确

// --- 响应式状态定义 ---
const users = ref([]); // 存放从后端获取的原始用户列表
const roles = ref([]); // 存放角色列表，用于编辑表单的下拉选择
const loading = ref(true); // 控制表格的加载状态

// 编辑对话框的状态
const editDialogVisible = ref(false);
const userForm = ref({}); // 用于编辑表单的数据模型

// 删除对话框的状态
const deleteDialogVisible = ref(false);
const userIdToDelete = ref(null); // 存放待删除用户的 ID

// --- 计算属性 ---

// 计算属性，用于过滤掉 'admin' 角色的用户
const filteredUsers = computed(() => {
  return users.value.filter(user => user.roleName !== 'admin');
});

// --- 方法定义 ---

// 格式化角色名的函数，供 el-table-column 的 formatter 使用
const formatRoleName = (row, column, cellValue) => {
  const roleMap = {
    'admin': '管理员',
    'student': '学生',
    // 你可以在这里添加更多的角色中英文映射
  };
  return roleMap[cellValue] || cellValue; // 如果找不到映射，则返回原始值
};

// 获取所有用户列表
const fetchAllUsers = async () => {
  loading.value = true;
  try {
    const res = await userApi.getAllUsers();
    users.value = res.data || []; // 确保即使返回 null 也能正常工作
  } catch (error) {
    console.error('获取用户列表错误:', error);
    ElMessage.error('获取用户列表失败');
  } finally {
    loading.value = false; // 无论成功或失败，都结束加载状态
  }
};

// 获取所有角色列表
const fetchAllRoles = async () => {
  try {
    const res = await roleApi.getAllRole();
    roles.value = res.data || [];
  } catch (error) {
    console.error('获取角色列表错误:', error);
    ElMessage.error('获取角色列表失败');
  }
};

// 处理“编辑”按钮点击
const handleEdit = (user) => {
  // 使用展开运算符(...)创建对象的浅拷贝，防止在弹窗中修改时直接影响表格中的数据
  userForm.value = { ...user };
  editDialogVisible.value = true;
};

// 提交用户更新
const submitUpdate = async () => {
  try {
    const res = await userApi.updateUserInfo(userForm.value, userForm.value.id);
    if (res.code === 400) {
      ElMessage.error(`更新失败: ${res.message}`);
    } else {
      ElMessage.success('更新成功');
      // [性能优化] 直接在前端更新数据，避免重新请求整个列表
      const index = users.value.findIndex(u => u.id === userForm.value.id);
      if (index !== -1) {
        // 如果后端返回了最新的完整用户对象，使用它来更新，否则用表单数据
        users.value[index] = res.data || { ...users.value[index], ...userForm.value };
      }
      editDialogVisible.value = false;
    }
  } catch (error) {
    console.error('更新用户信息错误:', error);
    ElMessage.error('更新用户信息时发生错误');
  }
};

// 处理“删除”按钮点击
const handleDelete = (id) => {
  userIdToDelete.value = id;
  deleteDialogVisible.value = true;
};

// 确认执行删除操作
const confirmDelete = async () => {
  if (!userIdToDelete.value) return;

  try {
    const res = await userApi.deleteUser(userIdToDelete.value);
    if (res.code === 400) {
      ElMessage.error(`删除失败: ${res.message}`);
    } else {
      ElMessage.success('删除成功');
      // [性能优化] 直接在前端从数组中移除已删除的用户
      users.value = users.value.filter(user => user.id !== userIdToDelete.value);
      deleteDialogVisible.value = false;
    }
  } catch (error) {
    console.error('删除用户信息错误:', error);
    ElMessage.error('删除用户信息时发生错误');
  } finally {
    userIdToDelete.value = null; // 操作完成后重置
  }
};

// --- 生命周期钩子 ---
onMounted(() => {
  fetchAllUsers();
  fetchAllRoles();
});
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>