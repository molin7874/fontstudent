<template>
  <div class="study-container">
    <h2>学生会活动列表</h2>
    <el-table
    stripe
    :data="tableData"
    style="width: 100%">
     <el-table-column
      type="index"
      width="">
    </el-table-column>
    <el-table-column
      label="活动名称"
      width="">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="活动名称"
      width="">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>活动名称: {{ scope.row.typename }}</p>
          <p>活动类型: {{ scope.row.type }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.typename }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="开始时间"
      width="">
      <template slot-scope="scope">
        <i class="el-icon-location-outline"></i>
        <span style="margin-left: 10px">{{ scope.row.begintime }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="结束时间"
      width="">
      <template slot-scope="scope">
        <i class="el-icon-location-outline"></i>
        <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="300">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="todetail(scope.row.id)">详情</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-dialog title="修改活动信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="开始时间" :label-width="formLabelWidth">
      <el-input v-model="form.begintime" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="结束时间" :label-width="formLabelWidth">
      <el-input v-model="form.endTime" autocomplete="off" ></el-input>
    </el-form-item>
    <el-form-item label="活动描述" :label-width="formLabelWidth">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  v-model="form.remark" autocomplete="off" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmdata">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  name: 'studydivision',
  data () {
    return {
      tableData: [],
      form: {},
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleEdit (index, id) {
      console.log(index, id)
      const paramUrl = '?id=' + id + '&isadmin=' + this.$store.state.user.userlevel
      this.$axios.get(this.root + '/users/viewactivitybyid' + paramUrl, {}).then((res) => {
        if (res.data === undefined) {
          this.$message(res.msg)
        } else {
          this.dialogFormVisible = true
          this.form = res.data[0]
        }
      })
    },
    handleDelete (index, id) {
      console.log(index, id)
      let paramUrl = this.$qs.stringify({
        id: id,
        isadmin: this.$store.state.user.userlevel
      })
      this.$axios.post(this.root + '/users/delactivity', paramUrl).then((res) => {
        if (res.code === '0') {
          this.$message(res.data.msg)
        } else {
          this.$message(res.data.msg)
        }
      })
    },
    confirmdata () {
      let paramUrl = this.$qs.stringify({
        isadmin: this.$store.state.user.userlevel,
        id: this.form.id,
        name: this.form.name,
        begintime: this.form.begintime,
        endTime: this.form.endTime,
        remark: this.form.remark
      })
      this.$axios.post(this.root + '/users/editactivity', paramUrl).then((res) => {
        this.dialogFormVisible = false
        this.$message(res.data.msg)
      })
    },
    getinitdata () {
      this.$axios.get(this.root + '/users/getactivityist', {}).then((res) => {
        this.tableData = res.data
      })
    },
    todetail (id) {
      this.$router.push({path: '/activitydetail', query: {id: id}})
    }
  },
  created () {
    this.getinitdata()
  }
}
</script>
<style lang="scss" scoped>
</style>
