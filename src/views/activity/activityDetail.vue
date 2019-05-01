<template>
  <div class="detail-container">
    <div class="center-content">
      <el-input v-model="form.name" readonly="readonly"></el-input>
      <el-input v-model="form.begintime" readonly="readonly"></el-input>
      <el-input v-model="form.endTime" readonly="readonly"></el-input>
      <el-input v-model="form.type" readonly="readonly"></el-input>
      <el-input v-model="form.typename" readonly="readonly"></el-input>
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.remark" readonly="readonly"></el-input>
      <el-button type="primary" :disabled="disable" ref="button">报 名</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'organizedDetail',
  data () {
    return {
      form: {
        name: '',
        grade: '',
        begintime: '',
        endTime: '',
        remark: '',
        type: '',
        typename: ''
      },
      routedata: {
        id: ''
      },
      bgtime: '',
      edtime: '',
      disable: false
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
      this.$axios
        .get(this.root + '/users/viewactivitybyid' + param, {})
        .then(res => {
          this.form = res.data[0]
          let bgtime = this.stringToDate(this.form.begintime)
          let edtime = this.stringToDate(this.form.endTime)
          let currenttime = new Date()
          if (bgtime < currenttime && currenttime < edtime) {
            this.disable = false
          } else if (currenttime < bgtime || currenttime > edtime) {
            this.disable = true
            this.$message('活动过期')
          }
        })
    },
    stringToDate (dateStr, separator) {
      if (!separator) {
        separator = '-'
      }
      let dateArr = dateStr.split(separator)
      let year = parseInt(dateArr[0])
      let month
      if (dateArr[1].indexOf('0') === 0) {
        month = parseInt(dateArr[1].substring(1))
      } else {
        month = parseInt(dateArr[1])
      }
      let day = parseInt(dateArr[2])
      let date = new Date(year, month - 1, day)
      return date
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-container {
  height: 100%;
  .center-content {
    display: flex;
    flex-direction: column;
    height: 300px;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 100px;
    .el-input {
      width: 40%;
    }
    .el-textarea {
      width: 40%;
    }
    .el-button {
      width: 40%;
    }
  }
}
</style>
