<template>
  <div class="footer">
    <div class="title">
      <p>
        2025 © YuDongXing
        <br>
        资源库系统前端版本_{{ version }}--后端版本_0.1.0
      </p>
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
