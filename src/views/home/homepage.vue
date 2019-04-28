<template>
<div class="content">
  <h1>{{this.$store.state.user.userlevel === 1 ? '管理员': '普通用户'}},欢迎进入管理系统</h1>
  <div class="container">
    <div id="echartContainer" style="width:33.3%; height:300px" ref="echarts1"></div>
    <div id="pic1" ref="echarts2"></div>
  </div>
  </div>
</template>
<script>
var echarts = require('echarts')
export default {
  data () {
    return {
      gradedata: []
    }
  },
  methods: {
    datafromrouter () {
      this.$axios.post('/api/adduser1').then(res => {})
    },
    chartlist () {
      const paramUrl = '?grade=' + 'grade'
      this.$axios.get(this.root + '/users/countgrade' + paramUrl, {}).then(res => {
        this.gradedata = res.data
        console.log(this.gradedata)
        var myChart = echarts.init(document.getElementById('echartContainer'))
        // 绘制图表
        myChart.setOption({
          title: { text: '学生会年级统计' },
          tooltip: {},
          xAxis: {
            data: ['大一', '大二', '大三', '大四']
          },
          yAxis: {},
          series: [
            {
              name: '人数',
              type: 'bar',
              data: this.gradedata
            }
          ]
        })
      })
      // 基于准备好的dom，初始化echarts实例
    },
    chartpie () {
      this.$axios.get(this.root + '/users/countmajor', {}).then(res => {
        var myCharts1 = echarts.init(document.getElementById('pic1'))
        var option1 = {
          title: {
            text: '本站专业组成',
            subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['计算机', '会计', '软件']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: res.data[0], name: '计算机' },
                { value: res.data[1], name: '会计' },
                { value: res.data[2], name: '软件' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        myCharts1.setOption(option1)
      })
    },
    resize () {
      let _this = this
      setTimeout(() => {
        window.addEventListener('resize', function () {
          _this.$refs.echarts1.resize()
          _this.$refs.echarts2.resize()
        })
      }, 10)
    }
  },
  mounted () {
    // this.datafromrouter()
    this.chartlist()
    this.chartpie()
  },
  created () {
    let usertype = parseInt(window.localStorage.getItem('membertype'))
    if (usertype === 1) {
      console.log('会员类型', usertype)
    } else {
      this.$router.push({path: '/401'})
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
}
#pic1 {
  width: 33.3%;
  height: 300px;
  margin: 20px auto;
}
</style>
