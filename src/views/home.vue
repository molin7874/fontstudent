<template>
 <div class="reg-contanier">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="reg-form">
  <el-form-item>
    <el-input v-model="formLabelAlign.username" name="username" placeholder="username"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input v-model="formLabelAlign.grade" name="grade" placeholder="grade"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="formLabelAlign.password" name="password" placeholder="password"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="formLabelAlign.major" name="major" placeholder="major"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="registe()">注册</el-button>
  </el-form-item>
</el-form>
 </div>
</template>
<script>
import {setToken} from '@/utils/auth'
export default {
  data () {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        username: '',
        grade: '',
        password: null,
        major: ''
      }
    }
  },
  methods: {
    registe () {
      // const paramUrl = '?id=' + this.formLabelAlign.id + '&userid=' + this.formLabelAlign.userid + '&password=' + this.formLabelAlign.password + '&email=' + this.formLabelAlign.email
      let paramUrl = this.$qs.stringify({
        username: this.formLabelAlign.username,
        grade: this.formLabelAlign.grade,
        password: this.formLabelAlign.password,
        major: this.formLabelAlign.major
      })
      this.$axios.post('/api/adduser', paramUrl).then((res) => {
        console.log(res.data.token)
        setToken(res.data.token)
        this.istoken(res.data.token)
      })
    },
    istoken (logintoken) {
      let paramUrl1 = this.$qs.stringify({
        token: logintoken
      })
      this.$axios.post('/api/api/admin/checkuser', paramUrl1).then((res) => {
        console.log(res)
        if (res.data.status === 1) {
          this.$router.push({path: '/dashboard'})
        } else {
          console.log('token失效')
          this.$router.push({path: '/login'})
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reg-contanier{
  height: 100%;
  width: 100%;
  .reg-form{
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-button{
    width: 100%
  }
}
</style>
