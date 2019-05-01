<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
// import {removeToken} from '@/utils/auth'
export default {
  name: 'App',
  mounted () {
    // onunload onbeforeunload
    // 关闭浏览器 窗口也会清除localstorage
    // window.onunload = function (e) {
    //   removeToken()
    //   window.localStorage.removeItem('membertype')
    //   window.localStorage.removeItem('userimg')
    // }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
