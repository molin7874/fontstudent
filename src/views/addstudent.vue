<template>
  <div class="add-contanier">
    <div class="admin-content" v-if="this.$store.state.user.userlevel === 1">
      <h2>管理员审批</h2>
    </div>
    <div class="user-content" v-if="this.$store.state.user.userlevel === 0">
      <h2>学生会加入申请</h2>
      <div class="user-info">
        <el-input v-model="querydata.username" placeholder="请填写您的姓名"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addstudent',
  data () {
    return {
      querydata: {
        username: ''
      }
    }
  }
}
</script>
