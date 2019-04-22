<template>
  <div class="study-container">
    <h2>学生会学习部</h2>
    <el-table
    stripe
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      width="">
    </el-table-column>
    <el-table-column
      label="年级"
      width="">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.grade }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.username }}</p>
          <p>id: {{ scope.row.id }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="专业"
      width="">
      <template slot-scope="scope">
        <i class="el-icon-location-outline"></i>
        <span style="margin-left: 10px">{{ scope.row.major }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
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
          <el-button
          size="mini"
          @click="export2Excel()">打印</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="修改会员信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="部门" :label-width="formLabelWidth">
      <el-input v-model="form.division" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年级" :label-width="formLabelWidth">
      <el-input v-model="form.grade" autocomplete="off" readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="专业" :label-width="formLabelWidth">
      <el-input v-model="form.major" autocomplete="off" readonly="readonly"></el-input>
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
      formLabelWidth: '80px'
    }
  },
  methods: {
    handleEdit (index, id) {
      console.log(index, id)
      const paramUrl = '?id=' + id + '&isadmin=' + this.$store.state.user.userlevel
      this.$axios.get(this.root + '/users/viewbyid' + paramUrl, {}).then((res) => {
        console.log(res)
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
      this.$axios.post(this.root + '/users/delstudy', paramUrl).then((res) => {
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
        division: this.form.division,
        uername: this.form.username
      })
      this.$axios.post(this.root + '/users/editstudy', paramUrl).then((res) => {
        this.dialogFormVisible = false
        this.$message(res.data.msg)
      })
    },
    export2Excel () {
      require.ensure([], () => {
        // eslint-disable-next-line
        const { export_json_to_excel } = require('../../vendor/Export2Excel')
        const tHeader = ['id', '年级', '姓名', '专业']
        const filterVal = ['id', 'grade', 'username', 'major'] // 对应字段
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '学习部数据excel')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getinitdata () {
      this.$axios.get(this.root + '/users/getstudydivision', {}).then((res) => {
        this.tableData = res.data
      })
    },
    todetail (id) {
      this.$router.push({path: '/organizedetail', query: {id: id}})
    }
  },
  created () {
    this.getinitdata()
  }
}
</script>
<style lang="scss" scoped>

</style>
