<template>
  <div>
    <!-- {{ user }} -->
    <el-table :data="ip_log" style="width: 100%">
      <el-table-column prop="ipAddress" label="IP地址">
      </el-table-column>
      <el-table-column prop="ipAccessTime" label="访问时间">
      </el-table-column>
      <el-table-column prop="ipUserDevice" label="访问设备">
      </el-table-column>
      <el-table-column label="访问地区">
        <template v-slot="scope">
             {{ scope.row.ipProvince }}-{{ scope.row.ipCity }}
        </template>
      </el-table-column>
      <el-table-column  label="访问次数">
        <template v-slot="scope">
             {{ scope.row.ipRepeat }}次
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      size="small"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { iplogApi } from '@/api/ip_log' 
import store from '@/store'
export default {
    name: 'admin_ip_log',
    data(){
        return {
            ip_log:[],
            isLoading: true,
            user: store.state.user.userInfo,
            total: 0, // 总记录数
            pageSize: 5, // 每页显示条数
            currentPage: 1, // 当前页码
        }
    },
    methods:{
        async getIpLog(){
            try{
                const res = await iplogApi.getallIplog()
                this.setIsLoading()
                console.log(res);
                this.ip_log = res.data
            } catch(error){
                console.log(error);
            }
            
        },
        async GetPage(){
          try{
            const res = await iplogApi.getIpLogPage(this.currentPage, this.pageSize);
            this.setIsLoading()
            this.total = res.data.total
            this.ip_log = res.data.records
          } catch(e){

          }
        },
    // 分页切换事件处理
    handleCurrentChange(page) {
      this.currentPage = page
      this.GetPage()
    },
        setIsLoading(){
            this.isLoading = !this.isLoading
        }
    },
    mounted(){
        // this.getIpLog();
        this.GetPage();
    },

}
</script>

<style>

</style>