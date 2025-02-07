<template>
  <div class="header-search">
    <el-input
      v-model="search_keyword"
      style="max-width: 600px"
      placeholder="请输入关键字"
      class="input-with-select"
    >
      <template #prepend>
        <el-button @click="search()">
          <el-icon>
                <search/>
            </el-icon>
        </el-button>
      </template>
      <!-- <template #append>
        <el-select v-model="select" placeholder="Select" style="width: 115px">
          <el-option label="Restaurant" value="1" />
          <el-option label="Order No." value="2" />
          <el-option label="Tel" value="3" />
        </el-select>
      </template> -->
    </el-input>
    </div>
</template>

<script>
export default {
    name:"Search_App",
    data() {
    return {
    search_keyword:'',
    }
  },
    methods:{
        search(){
            this.$router.push({ path: '/search', query: { keyword: this.search_keyword } });
        }
    }
}
</script>

<style>

</style>