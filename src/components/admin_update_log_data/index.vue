<template>
  <div class="admin-update-log-data">
    <div class="add-log">
      <el-button plain @click="dialogVisible = true"> 添加 </el-button>
      <el-dialog v-model="dialogVisible" title="添加日志" width="500"  >
        <el-form  label-position="top" label-width="80px" :model="from_update_log">
            <el-form-item label="更新日志名称:">
              <el-input v-model="from_update_log.logTitle" placeholder="请输入更新主题" />
            </el-form-item>
            <el-form-item label="更新日志详情:">
              <el-input v-model="from_update_log.desc" placeholder="请输入更新详情" />
            </el-form-item>
            <el-select
              v-model="from_update_log.type"
              placeholder="Select"
              size="large"
              style="width: 240px"
            >
              <el-option
                v-for="(item , index) in log_type"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addUpdateLog()"> 提交 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="all-log">
      <el-table :data="log_date">
        <el-table-column prop="logTitle" label="更新日志名称"  />
        <el-table-column prop="desc" label="更新日志详情" />
        <el-table-column prop="type" label="更新日志类型"  />
        <el-table-column prop="hollow" label="是否空心" />
        <el-table-column prop="logId" label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row.logId)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.logId)" > 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Update_Log_Api } from '@/api/update_log';
export default {
    data(){
        return{
          dialogVisible:false,
          log_type:["success","info","warning","danger"],
          from_update_log:{
            logTitle: "测试日志-2",
            desc: "测试日志",
            type: "success",
            hollow: "true"
          },
          log_date:[],
          update_log:[],
        }
    },
    methods:{
      async addUpdateLog(){
        try{
          await Update_Log_Api.addlog(this.from_update_log);
          this.$message.success("添加成功");
          console.log("添加成功");
        }catch(e){
          this.$message.success("添加失败");
          console.log("添加失败：",e);
        }
        this.dialogVisible = false ;
        this.getUpdateLog();
      },
      async getUpdateLog(){
        try{
          const cs =  await Update_Log_Api.getAllLog();
          console.log(cs);
          this.log_date = cs.data;
        }catch(e){
          console.log("请求错误：",e);
        }
      },
      // 编辑数据
      handleEdit(id){
        const log = this.findLogById(id);
        this.update_log = log;
      },
      // 删除数据
      handleDelete(id){},
      // 传入id-根据id寻找log_date中对应id是数据-返回数据
      findLogById(id) {
        const loge = this.log_date.find(log => log.logId === id);
        return loge;
      }


    },
    created(){
        this.getUpdateLog();
        
    },
    mounted(){
        
    }
}
</script>

<style>

</style>