<template>
  <div id="app">
    <HeaderIndex/>
    <div class="MAIN">
      <!-- <updata/> -->
        <MainIndex/>
    </div>
    <FooterIndex/>
  </div>
</template>

<script>
import HeaderIndex from './components/header/HeaderIndex.vue'
import FooterIndex from './components/footer/FooterIndex.vue'
import MainIndex from './components/main/MainIndex.vue'
import updata from './components/updataPage/updata.vue'
export default {
  name: 'app',
  components: {
    HeaderIndex,
    FooterIndex,
    MainIndex,
    updata
  }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    --border-radius-de: 10px;
    --border-radius-min: 15px;
    --border-radius-max: 20px;
    --box-shadow-de: 0 2px 4px rgba(0, 0, 0, .1);
    transition: all 3s ease;
}
.MAIN{
    transition: all 3s ease;
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    height: calc(100vh - 70px - 40px - 10px);
    width: 100%;
    background-color: var(--bg-100);
    overflow: auto;
}
</style>
