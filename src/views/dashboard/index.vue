<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ member === 1 ? '管理员' : '普通会员' }}</div>
    <div class="card-container">
    <div class="top-card">
      <el-card :body-style="{ padding: '0px' }">
        <div class="font-container icon-student">
        <svg class="icon image" aria-hidden="true">
            <use xlink:href="#icon-icon1"></use>
        </svg>
        </div>
        <div class="right-description">
          <div class="card-panel">专业个数</div>
          <!-- <span class="card-panel-num">4.00</span> -->
          <count-to :start-val="0" :end-val=divison :duration="3200" suffix='.00' class="card-panel-num" />
        </div>
    </el-card>
     <el-card :body-style="{ padding: '0px' }">
        <div class="font-container icon-people">
        <svg class="icon image" aria-hidden="true">
            <use xlink:href="#icon-renshu"></use>
        </svg>
        </div>
        <div class="right-description">
          <div class="card-panel">社团人数</div>
          <!-- <span class="card-panel-num">102.00</span> -->
          <count-to :start-val="0" :end-val=people :duration="3200" suffix='.00' class="card-panel-num" />
        </div>
    </el-card>
    <el-card :body-style="{ padding: '0px' }">
        <div class="font-container icon-grade">
        <svg class="icon image" aria-hidden="true">
            <use xlink:href="#icon-jianguanzhifa-dianzianjuan"></use>
        </svg>
        </div>
        <div class="right-description">
          <div class="card-panel">年级</div>
          <!-- <span class="card-panel-num">1~4</span> -->
          <count-to :start-val="0" :end-val=grade :duration="3200" suffix='.00' class="card-panel-num" />
        </div>
    </el-card>
    <el-card :body-style="{ padding: '0px' }">
        <div class="font-container icon-activity">
        <svg class="icon image" aria-hidden="true">
            <use xlink:href="#icon-huodong1"></use>
        </svg>
        </div>
        <div class="right-description">
          <div class="card-panel">活动</div>
          <!-- <span class="card-panel-num">1~5</span> -->
          <count-to :start-val="0" :end-val=activity :duration="3200" suffix=".00" class="card-panel-num" />
        </div>
    </el-card>
    </div>
    </div>
    <el-carousel :interval="4000" type="card" :height="imgHeight">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <img ref="imgHeight" :src="item.imgView" class="swiper-img" />
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'
export default {
  name: 'Dashboard',
  components: {
    CountTo
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data () {
    return {
      imgHeight: '280px',
      imgList: [
        {imgView: '/static/images/2.jpg'},
        {imgView: '/static/images/3.jpg'},
        {imgView: '/static/images/4.jpg'},
        {imgView: '/static/images/6.jpeg'},
        {imgView: '/static/images/7.jpg'},
        {imgView: '/static/images/8.jpeg'}
      ],
      divison: null,
      people: null,
      activity: null,
      grade: null,
      member: parseInt(window.localStorage.getItem('membertype'))
    }
  },
  mounted () {
    this.imgHeight = '280px'
    // window.onresize = function temp () {
    // // 通过点语法获取img的height属性值
    //   this.imgHeight = `${this.$refs.imgHeight['0'].height}px`
    // }
    console.log(this.member)
    this.getinitdata()
    this.getinitdata1()
    this.getinitdata2()
    this.getinitdata3()
  },
  methods: {
    getinitdata () {
      this.$axios.get(this.root + '/users/countdivison', {}).then((res) => {
        this.divison = res.data[0].divison
      })
    },
    getinitdata1 () {
      this.$axios.get(this.root + '/users/countpeople', {}).then((res) => {
        this.people = res.data[0].people
      })
    },
    getinitdata2 () {
      this.$axios.get(this.root + '/users/countgrade', {}).then((res) => {
        this.grade = res.data[0].grade
      })
    },
    getinitdata3 () {
      this.$axios.get(this.root + '/users/countactivity', {}).then((res) => {
        this.activity = res.data[0].activity
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  // &-container {
  //   margin: 30px;
  // }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container{
  background-color: #f0f2f5;
  padding: 30px;
  .card-container{
    // display: flex;
  .top-card{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 20px 0 0;
    margin-bottom: 32px;
    .el-card{
      width: 25%;
      height: 108px;
      margin-right: 20px;
      .font-container{
        float: left;
        margin: 14px 0 0 14px;
        padding:8px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      .image{
        font-size: 60px;
        float: left;
      }
      }
      .font-container:hover{
          color: #fff;
        }
        .icon-student:hover{
          background: #40c9c6;
        }
        .icon-student{
          color: #40c9c6;
        }
         .icon-people{
          color: #36a3f7;
        }
        .icon-people:hover{
          background: #36a3f7;
        }
        .icon-activity{
          color: #f4516c;
        }
        .icon-activity:hover{
          background: #f4516c;
        }
        .icon-grade{
          color: #34bfa3;
        }
        .icon-grade:hover{
          background: #34bfa3;
        }
        .right-description{
          float: right;
          font-weight: bold;
          margin: 26px;
          margin-left: 0px;
          .card-panel{
            line-height: 18px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 16px;
            margin-bottom: 12px;
          }
          .card-panel-num{
            font-size: 20px;
            font-weight: bold;
          }
        }
    }
  }
  }
   .el-carousel__item:nth-child(2n) {
    background-color: #fff;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #eee;
  }
  .swiper-img{
    width: 100%;
    height: 100%;
  }
}
</style>
