<template>
    <div class="admin-update-log-data">
      <div class="add-log">
        <!-- <el-button plain @click="dialogVisible = true"> 添加 </el-button> -->
        <!-- <el-dialog v-model="dialogVisible" title="添加系统信息" width="500"  >
          <el-form  label-position="top" label-width="80px" :model="from_sys_info_data">
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
        </el-dialog> -->
      </div>
      <div class="all-log">
       <el-table :data="sys_info_data">
          <el-table-column prop="infoTitle" label="系统信息主题"  />
          <el-table-column prop="infoP" label="信息字段" />
          <el-table-column prop="infoView" label="信息字段值"  />
          <el-table-column prop="infoDesc" label="信息文本说明" />
          <el-table-column prop="infoType" label="信息状态" />
          <el-table-column prop="infoCreateTime" label="信息创建时间" />
          <el-table-column prop="infoUpdateTime" label="信息更新时间" />
          <el-table-column prop="infoId" label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row.logId)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row.logId)" > 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 更新系统信息 -->
        <el-dialog v-model="dialogFormVisible" title="更新系统信息" width="500">
            <el-form  label-position="top" label-width="80px" :model="sys_info">
                <el-form-item label="系统信息主题:">
                  <el-input v-model="sys_info.infoTitle" placeholder="请输入系统信息主题" />
                </el-form-item>
                <el-form-item label="信息字段:">
                  <el-input v-model="sys_info.infoP" placeholder="请输入信息字段" />
                </el-form-item>
                <el-form-item label="信息字段值:">
                  <el-input v-model="sys_info.infoView" placeholder="请输入信息字段值" />
                </el-form-item>
                <el-form-item label="信息文本说明:">
                  <el-input v-model="sys_info.infoDesc" placeholder="请输入信息文本说明" />
                </el-form-item>
                <el-form-item label="信息状态:">
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="postFrom()">提交</el-button>
                </div>
            </template>
            </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  import {sysinfoApi} from '@/api/sys_info'
  export default {
    name:"admin_sysinfo_date",
      data(){
          return{
            dialogVisible:false,
            dialogFormVisible:false,
            from_sys_info_data:{
                infoTitle:"",
                infoP:"",
                infoView:"",
                infoDesc:"",
                infoType:""
            },
            sys_info_data:[],
            sys_info:{},
            }
      },
      methods:{
        async addUpdatesysinfodata(){
        },
        async getsysinfodata(){
            try {
                const res = await sysinfoApi.getAllSysInfo();
                this.sys_info_data=res.data;
                console.log(res.data);
                
            } catch (error) {
                console.log(error);
            }
        },
        // 编辑数据
        handleEdit(id){
          const log = this.findLogById(id);
          console.log(log);
          this.sys_info = log;
          this.dialogFormVisible= true;
        },
        // 删除数据
        // handleDelete(id){},
        // 传入id-根据id寻找log_date中对应id是数据-返回数据
        findLogById(id) {
          const inoo = this.sys_info_data.find(info => info.infoId === id);
          return inoo;
        }
  
  
      },
      created(){
          this.getsysinfodata();
          
      },
      mounted(){
          
      }
  }
  </script>
  
  <style>
  
  </style>