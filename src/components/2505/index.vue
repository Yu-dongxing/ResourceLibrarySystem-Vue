<template>
  <div class="index_2505">
    <div class="card">
      <div class="box">
        <slot>2505</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {},
}
</script>
<style scoped lang="less">
.index_2505 {
color: aliceblue;
  width: 100%;
  background-color: #000000;
  height: 100dvh;
  position: fixed;
}

.index_2505::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/bg/bg1.svg);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  z-index: -1;
}

.card {
  margin: 10px;
  width: 90%;
  margin-left: 5%;
  height: calc(100dvh - 20px);
  border-radius: 20px;
  background-color: #ffffff11;
  padding: 5px;
  box-sizing: border-box;
}
.box {
  width: 100%;
    border-radius: 15px;
    /* background-color: #ffffff22; */
    border: 1px solid #65899966;
    padding: 10px;
    box-sizing: border-box;
}
</style>