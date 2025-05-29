<template>
    <div class="sysconfig">
        <div class="sys_config_card sysLog">
            <p>日志配置</p>
            <el-form-item label="开启系统日志:">
                <el-switch active-text="是" inactive-text="否" v-model="SysConfigData.isSysLog" />
            </el-form-item>
            <el-form-item label="开启IP访问日志:">
                <el-switch  active-text="是" inactive-text="否"  v-model="SysConfigData.isIpLog" />
            </el-form-item>
            <el-form-item label="开启用户登录日志:">
                <el-switch  active-text="是" inactive-text="否"  v-model="SysConfigData.isUserLoginLog" />
            </el-form-item>
            <el-form-item label="开启页面访问日志:">
                <el-switch  active-text="是" inactive-text="否"  v-model="SysConfigData.isPageLog" />
            </el-form-item>
        </div>
    </div>
    <el-button type="primary" @click="save">提交</el-button>
</template>
<script>
import { SysConfigsApi } from '@/api/sys_config';
export default {
    name: 'Admin_Sys_Config',
    data() {
        return {
            SysConfigData:{
                isSysLog:false,
                isIpLog:false,
                isUserLoginLog:false,
                isPageLog:false,
            },
            from_data:{
                configTitle: "系统配置",
                configP: "SysConfig",
                configView: ""
            },
            updateSysConfig:{
                configView:'',
            }
        }
    },
    methods:{
        async save(){
            this.updateSysConfig.configView = JSON.stringify(this.SysConfigData) 
            try{
                const res = await SysConfigsApi.updateSysConfigById(34,this.updateSysConfig)
                if(res.code === 200){
                    this.$message.success("保存成功");
                }else{
                    this.$message.error("保存失败");
                }
            } catch(e){
                console.log(e);
            }
            
        },
        //获取系统配置
        async getSysConfig(){
            try{
                const res = await SysConfigsApi.findSysConfigById(34);
                if(res.code == 200){
                    this.SysConfigData = JSON.parse(res.data.configView);
                }else{
                    this.$message.error("获取失败");
                }
            } catch(e){
                console.log(e);
            }
        },
        //根据id修改configView
        async updateSysConfigById(id,data){
            try{
                const res = await SysConfigsApi.updateSysConfigById(id,data);
                if(res.code == 200){
                    this.$message.success("保存成功");
                }else{
                    this.$message.error("保存失败");
                }
            } catch(e){
                console.log(e);
            }
        },
    },
    created(){
        this.getSysConfig();
    }
}
</script>
<style scoped>
.sys_config_card{
    background-color: aliceblue;
    padding: 10px;
    border-radius: 20px;
}
.sysLog{
}
</style>