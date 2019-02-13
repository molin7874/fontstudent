<template>
  <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
</template>
<script>
export default {
  name: 'toplist'
}
</script>
<style scoped>
@import './../assets/css/initStyle.css';
.grid-content {
    height: 50px;
    line-height: 50px;
  }
  .bg-purple-dark {
    background: #eeeeee;
  }
</style>
