<template>
 <div class="reg-contanier">
   <el-upload
      :class="{ 'upload-demo': blocktrue, 'upload': nonefalse}"
      action="/api/upload"
      :auto-upload="false"
      :limit="1"
      ref="upload"
      :http-request="upload"
      multiple
      list-type="picture"
      :on-success="handleAvatarSuccess"
      accept="image/png, image/jpeg">
      <!-- :http-request="upload" -->
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg,png图片</div>
    </el-upload>
    <el-button type="primary" @click="upload" class="confirm-btn">确定</el-button>
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
      nonefalse: false,
      blocktrue: true,
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
      this.$axios.post(this.root + '/adduser', paramUrl).then((res) => {
        console.log(res.data.token)
        setToken(res.data.token)
        this.istoken(res.data.token)
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
        this.nonefalse = true
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
  .reg-form{
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
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
</style>
