<template>
 <div class="reg-contanier">
<el-form :label-position="labelPosition" ref="ruleForm" :rules="rules"  :model="formLabelAlign" class="reg-form">
  <h3>会员注册</h3>
  <el-form-item  prop="username">
    <el-input v-model="formLabelAlign.username" name="username" placeholder="请填写用户名"></el-input>
  </el-form-item>
  <el-form-item  prop="grade">
    <el-select v-model="formLabelAlign.grade" placeholder="请选择年级">
      <el-option label="大一" value="大一"></el-option>
      <el-option label="大二" value="大二"></el-option>
      <el-option label="大三" value="大三"></el-option>
      <el-option label="大四" value="大四"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item prop="password">
    <el-input v-model="formLabelAlign.password" name="password" placeholder="请填写密码"></el-input>
  </el-form-item>
  <el-form-item prop="major">
    <el-select v-model="formLabelAlign.major" placeholder="请选择专业">
      <el-option label="计算机" value="计算机"></el-option>
      <el-option label="软件" value="软件"></el-option>
      <el-option label="会计" value="会计"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="registe('ruleForm')">注册</el-button>
  </el-form-item>
</el-form>
 </div>
</template>
<script>
// import {setToken} from '@/utils/auth'
export default {
  data () {
    return {
      labelPosition: 'left',
      nonefalse: false,
      blocktrue: true,
      formLabelAlign: {
        username: '',
        grade: '',
        password: null,
        major: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        major: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    registe (formName) {
      // const paramUrl = '?id=' + this.formLabelAlign.id + '&userid=' + this.formLabelAlign.userid + '&password=' + this.formLabelAlign.password + '&email=' + this.formLabelAlign.email
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let paramUrl = this.$qs.stringify({
            username: this.formLabelAlign.username,
            grade: this.formLabelAlign.grade,
            password: this.formLabelAlign.password,
            major: this.formLabelAlign.major
          })
          this.$axios.post(this.root + '/adduser', paramUrl).then((res) => {
            // console.log(res.data.token)
            // setToken(res.data.token)
            // // this.istoken(res.data.token)
            if (res.data.code === '-4') {
              this.$message('参数有误')
            } else if (res.data.code === '0') {
              this.$message('注册成功, 请登录')
              this.$router.push({path: '/login'})
            }
          })
        } else {
          this.$message('请填写完整')
        }
      })
    },
    istoken (logintoken) {
      let paramUrl1 = this.$qs.stringify({
        token: logintoken
      })
      this.$axios.post(this.root + '/api/admin/checkuser', paramUrl1).then((res) => {
        console.log(res)
        if (res.data.status === 1) {
          this.$router.push({path: '/dashboard'})
        } else {
          console.log('token失效')
          this.$router.push({path: '/login'})
        }
      })
    },
    handleAvatarSuccess (response) {
      console.log(response)
      this.$message.success('上传头像成功!')
    },
    upload () {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      // formData.append('name', this.name)
      // formData.append('age', this.age)
      this.$axios.post(this.root + '/upload', formData, headerConfig).then(res => {
        console.log(res)
        // this.nonefalse = true
        localStorage.setItem('userimg', res.data.name)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reg-contanier{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f3f3f3;
  .reg-form{
    width: 520px;
    max-width: 100%;
    // padding: 35px 35px 15px 35px;
    // margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  .el-button{
    width: 100%
  }
  .confirm-btn{
    width: auto;
  }
}
.upload-demo{
  width: 520px;
}
.upload{
  display: none;
}
.el-upload-list--picture{
    width: 300px;
  }
  .el-select{
    width: 100%;
  }
</style>
