<template>
  <div class="detail-container">
    <div class="center-content">
      <el-input v-model="name" readonly="readonly"></el-input>
      <el-input v-model="grade" readonly="readonly"></el-input>
      <el-input v-model="begintime" readonly="readonly"></el-input>
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="remark" readonly="readonly"></el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: 'organizedDetail',
  data () {
    return {
      name: '',
      grade: '',
      begintime: '',
      remark: '',
      routedata: {
        id: ''
      }
    }
  },
  created () {
    this.datafromroute()
  },
  mounted () {
    this.getstuDetail()
  },
  methods: {
    datafromroute () {
      this.routedata.id = this.$route.query.id
    },
    getstuDetail () {
      const param = '?id=' + this.routedata.id
      this.$axios.get('/api/users/getstudentsDetail' + param, {}).then((res) => {
        this.name = res.data[0].name
        this.grade = res.data[0].grade
        this.begintime = res.data[0].begintime
        this.remark = res.data[0].remark
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-container{
  height: 100%;
  .center-content{
    display: flex;
    flex-direction: column;
    height: 300px;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 100px;
    .el-input{
      width: 40%;
    }
    .el-textarea{
      width: 40%;
    }
  }
}
</style>
