<template>
<div class="content">
  <h1>{{this.$store.state.user.userlevel === 1 ? '管理员': '普通用户'}},欢迎进入管理系统</h1>
  <div class="container">
    <div id="echartContainer" style="width:500px; height:500px"></div>
    <div id="pic1"></div>
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
      this.$axios.get('/api/users/countgrade' + paramUrl, {}).then(res => {
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
      var myCharts1 = echarts.init(document.getElementById('pic1'))
      var option1 = {
        title: {
          text: '某站点用户访问来源',
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
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
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
    }
  },
  mounted () {
    // this.datafromrouter()
    this.chartlist()
    this.chartpie()
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
}
#pic1 {
  width: 400px;
  height: 400px;
  margin: 20px auto;
}
</style>
