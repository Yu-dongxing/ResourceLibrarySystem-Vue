<template>
  <div class="footer">
    <div class="title">
      <el-text>
        <el-tag type="warning">2025 © YuDongXing</el-tag>
      <br/>
        <el-tag type="danger">
          <el-link :underline="false" href="https://beian.mps.gov.cn/#/query/webSearch?code=34170202000557" rel="noreferrer" target="_blank">
            <img src="../../assets/baanImg/baanIMG.png" style="width: 15px;height: 15px;">
            皖公网安备34170202000557号
          </el-link> 
          <span>&nbsp;·&nbsp;皖ICP备2024037036号-2</span>
        </el-tag>
      </el-text>
    </div>
  </div>
</template>

<script>

// 从package获取项目版本号
export default {
  name: 'FooterIndex',
  data () {
    return {
      version: process.env.VUE_APP_VERSION
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
//a链接，不显示下划线，不显示颜色
// a:link {
//     text-decoration: none;
// }
// a:visited {
//     text-decoration: none;
// }
// a:hover {
//     text-decoration: none;
// }
// a {
//     text-decoration: none;
// }
//底部版权栏目，使用绝对定位
.footer {
    height: auto(50px);
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: var(--bg-010);
    .title {
        text-align: center;
        font-size: 15px;
        line-height: 20px;
        color: var(--text-200);
        p{
          margin: 1px;
        }
    }
}
</style>
