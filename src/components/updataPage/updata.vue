<template>
    <el-timeline style="max-width: 600px">
      <el-timeline-item v-for="(item,index) in reversedUpdataLog" :key="index" :timestamp="item.date" placement="top" :type="item.type" hollow="false">
        <!-- 'primary' | 'success' | 'warning' | 'danger' | 'info' -->
        <el-card>
          <h4>{{ item.content }}</h4>
          <p>{{ item.desc }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
</template>

<script>
export default {
  data() {
    return {
      UpdataLog:[
        {id:1, date:'2024/11/21',content:'创建前端项目',desc:"完成资源库功能设计",type:"success",hollow:"true"},
        {id:2,date:'2024/12/25',content:'创建后端项目',desc:"完成后端开发设计",type:"info",hollow:"false"},
        {id:3,date:'2025/1/2',content:'更新样式',desc:"完善UI功能设计",type:"success",hollow:"true"},
        {id:4,date:'2025/1/12',content:'完成后端模块',desc:"完成后端用户功能模块设计",type:"success",hollow:"true"},

      ]
    }
  },
  mounted() {
    
  },
  computed: {
    //通过计算属性实现倒序
    reversedUpdataLog() {
      return this.UpdataLog.slice().reverse();
    }
  },

}
</script>

<style>

</style>