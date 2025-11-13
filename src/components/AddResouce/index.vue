<template>
  <div class="add-resource-container">
    <el-row :gutter="20">
      <!-- 左侧主表单区域 -->
      <el-col :xs="24" :sm="24" :md="16">
        <el-card class="form-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>添加链接资源</span>
              <el-link @click="$router.push('/addresourcefile')" type="primary" :icon="DocumentAdd">
                或添加文件资源
              </el-link>
            </div>
          </template>

          <el-form ref="resourceForm" :model="form" :rules="rules" label-position="top">
            <el-form-item label="资源名称" prop="name">
              <el-input v-model="form.name" placeholder="例如：Vue.js 官方文档" size="large" clearable />
            </el-form-item>

            <el-form-item label="资源地址" prop="url">
              <el-input v-model="form.url" placeholder="https://example.com" size="large" @change="handleUrlChange">
                <template #append>
                  <el-button :loading="isIconLoading" @click="extractDomainIcon">获取图标</el-button>
                </template>
              </el-input>
            </el-form-item>
            
            <el-form-item label="资源图标" prop="img">
              <el-input v-model="form.img" placeholder="输入URL后可尝试自动获取" size="large" clearable />
            </el-form-item>

            <el-form-item label="资源说明" prop="desc">
              <wangeditor v-model="form.desc"></wangeditor>
            </el-form-item>

            <el-form-item label="标签 (回车确认)" prop="tag">
              <!-- 使用 El-Select 的 allow-create 和 filterable 实现标签输入 -->
              <el-select
                v-model="form.tag"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="输入或选择标签"
                size="large"
                style="width: 100%;"
              >
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="large" @click="submitForm" :loading="isSubmitting">提交审核</el-button>
              <el-button size="large" @click="resetForm">重置表单</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- 右侧提示和预览区域 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div class="sidebar">
          <el-card class="preview-card" shadow="hover">
            <template #header>
              <span>效果预览</span>
            </template>
            <div class="preview-content">
              <img :src="form.img || defaultImage" @error="onImageError" class="preview-icon" alt="icon"/>
              <div class="preview-text">
                <h4 class="preview-title">{{ form.name || '资源名称' }}</h4>
                <p class="preview-url">{{ form.url || '资源地址' }}</p>
              </div>
            </div>
          </el-card>

          <el-alert
            title="提交须知"
            type="info"
            show-icon
            :closable="false"
            class="info-alert"
          >
            <p>提交的资源将进入审核阶段，审核通过后即可在网站首页展示。</p>
            <p>请确保资源链接有效且内容合规。</p>
          </el-alert>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { resourceApi } from '@/api/resource';
import { ElMessage } from 'element-plus';
import { DocumentAdd } from '@element-plus/icons-vue'; // 引入图标
import wangeditor from '@/components/wangeditor.vue';

const defaultFormState = {
  name: '',
  url: '',
  tag: ['文章'],
  author: 'Guest',
  desc: "",
  img: '',
};

const defaultImage = 'https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*PXAJTYXseTsAAAAAAAAAAAAADvuFAQ/original';

export default {
  name: 'AddResource',
  components: { wangeditor, DocumentAdd }, // 注册图标组件
  data() {
    return {
      form: { ...defaultFormState },
      defaultImage,
      isIconLoading: false,
      isSubmitting: false,
      rules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        url: [
          { required: true, message: '请输入资源地址', trigger: 'blur' },
          { type: 'url', message: '请输入有效的URL', trigger: ['blur', 'change'] }
        ],
        img: [{ required: true, message: '请提供或自动获取资源图标', trigger: 'blur' }],
        tag: [{ required: true, message: '至少需要一个标签', trigger: 'change' }]
      }
    };
  },
  methods: {
    // URL 变化时，可以清空旧图标，让用户重新获取
    handleUrlChange() {
      this.form.img = '';
    },
    
    async extractDomainIcon() {
      if (!this.form.url) {
        ElMessage.warning('请先输入资源地址');
        return;
      }
      this.isIconLoading = true;
      try {
        const parsedUrl = new URL(this.form.url);
        // 使用更稳定的 favicon 服务, 比如 Google 的，或者你自己的后端服务
        this.form.img = `https://api.akams.cn/favicon/${parsedUrl.hostname}`;
      } catch (error) {
        ElMessage.error('无效的URL，无法提取域名');
        this.form.img = ''; // 清空图标
      } finally {
        this.isIconLoading = false;
      }
    },
    
    // 提交表单
    submitForm() {
      this.$refs.resourceForm.validate(async (valid) => {
        if (valid) {
          this.isSubmitting = true;
          try {
            const submitData = {
              ...this.form,
              tab: this.form.tag.join(',') // 将标签数组转换为字符串
            };
            await resourceApi.addResource(submitData);
            ElMessage.success('添加成功，等待审核！');
            this.$router.push('/');
          } catch (error) {
            ElMessage.error('添加失败，请稍后重试');
            console.error('添加资源失败:', error);
          } finally {
            this.isSubmitting = false;
          }
        } else {
          ElMessage.error('请检查表单，修正错误项后再提交');
          return false;
        }
      });
    },

    // 重置表单
    resetForm() {
      this.$refs.resourceForm.resetFields();
      // 如果有 wangeditor，也需要手动清空
      this.form.desc = '';
    },
    
    // 预览图加载失败
    onImageError(e) {
      e.target.src = this.defaultImage;
    }
  }
};
</script>

<style scoped>
.add-resource-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 15px;
}

.form-card {
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar {
  position: sticky;
  top: 20px; /* 让侧边栏在滚动时固定 */
}

.preview-card, .info-alert {
  border-radius: 12px;
  margin-bottom: 20px;
}

.preview-content {
  display: flex;
  align-items: center;
}

.preview-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 15px;
  object-fit: contain;
  flex-shrink: 0;
  background-color: #f0f2f5;
}

.preview-text {
  overflow: hidden;
}

.preview-title {
  margin: 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preview-url {
  margin: 5px 0 0;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-alert p {
    margin: 4px 0;
    line-height: 1.6;
}
</style>