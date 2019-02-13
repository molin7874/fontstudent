<template>
  <div class="container">
    <h1>{{this.$store.state.user.userlevel === 1 ? '管理员': '普通用户'}},欢迎进入管理系统</h1>
    <div id="echartContainer" style="width:500px; height:500px"></div>
    <div id="pic1"></div>
  </div>
</template>
<script>
var echarts = require('echarts')
export default {
  data () {
    return {}
  },
  methods: {
    datafromrouter () {
      this.$axios.post('/api/adduser1').then(res => {
        console.log(res)
      })
    },
    chartlist () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echartContainer'))
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
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
#pic1 {
  width: 400px;
  height: 400px;
  margin: 20px auto;
}
</style>
