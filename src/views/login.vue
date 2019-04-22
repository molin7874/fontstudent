<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="formLabelAlign"  class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">学生会事务管理系统</h3>
      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input v-model="formLabelAlign.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input
          :type="pwdType"
          v-model="formLabelAlign.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          />
        <span class="show-pwd" @click="showPwd">
          <i :class="pwdType === 'password' ? 'el-icon-star-on' : 'el-icon-star-off'" ></i>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" style="width:100%;" @click.native.prevent="getdata1">
          登 录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: 123456</span>
      </div>
      <div class="tips">
         <el-button  type="primary"  @click.native.prevent="toregiste">
          去注册
        </el-button>
      </div>
       <div class="tips">
         <span>2019-3-1 20157575 王一帆</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import {setToken} from '@/utils/auth'
export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        username: '',
        password: ''
      },
      pwdType: 'password'
    }
  },
  mounted () {
    // this.getdata()
  },
  methods: {
    // getdata () {
    //   // console.log('1')
    //   this.$axios.get('/api/api/selectAll').then(res => {
    //     console.log(res)
    //   })
    // },
    getdata1 () {
      let paramUrl = this.$qs.stringify({
        username: this.formLabelAlign.username,
        password: this.formLabelAlign.password
      })
      this.$axios.post(this.root + '/', paramUrl).then((res) => {
        if (res.data.code === '0') {
          this.$message('成功' + res.data.msg)
          this.initstore(res.data.isadmin)
          setToken(res.data.token)
          localStorage.setItem('userimg', res.data.img)
          this.$router.push({path: '/dashboard', query: {id: res.data.isadmin}})
        } else {
          this.$message('失败' + res.data.msg)
          this.formLabelAlign.username = ''
          this.formLabelAlign.password = ''
        }
      })
    },
    initstore (userlevel) {
      this.$store.state.user.userlevel = userlevel
    },
    toregiste () {
      this.$router.push({path: '/registe'})
    },
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
