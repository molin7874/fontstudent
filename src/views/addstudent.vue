<template>
<el-row class="form-row">
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="form.type" placeholder="请选择活动区域" @change="getselectlabel">
      <el-option
      v-for="item in activityoptions"
      :key="item.id"
      :label="item.activityType"
      :value="item.id">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="开始时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择开始日期" v-model="form.begintime" style="width: 100%;" format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="结束时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择结束日期" v-model="form.endTime" style="width: 100%;" format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.remark"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addActivity">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</el-row>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        type: '',
        typename: '',
        begintime: '',
        endTime: '',
        remark: ''
      },
      activityoptions: []
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    getactivity () {
      this.$axios.get(this.root + '/users/activityType', {}).then((res) => {
        this.activityoptions = res.data.data
      })
    },
    addActivity () {
      this.$axios.post(this.root + '/users/addactivity', this.form).then((res) => {
        if (res.data.code === '0') {
          this.$message('新增成功')
          this.form = {
            name: '',
            type: '',
            typename: '',
            begintime: '',
            endTime: '',
            remark: ''
          }
        }
      })
    },
    getselectlabel (val) {
      console.log(val)
      this.activityoptions.forEach((item) => {
        if (item.id === val) {
          this.form.typename = item.activityType
        }
      })
    }
  },
  created () {
    this.getactivity()
  }
}
</script>
<style lang="scss" scoped>
.form-row{
  padding: 20px;
  width: 50%;
}
</style>
