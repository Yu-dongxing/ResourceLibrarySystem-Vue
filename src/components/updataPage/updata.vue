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
        {id:1, date:'2024/12/25',content:'更新样式',desc:"添加emui 1.1版本",type:"warning",hollow:"true"},
        {id:2,date:'2024/12/25',content:'更新样式',desc:"添加emui 1.1版本",type:"info",hollow:"false"},
        {id:3,date:'2025/1/2',content:'更新样式',desc:"添加emui 1.1版本",type:"success",hollow:"true"},
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