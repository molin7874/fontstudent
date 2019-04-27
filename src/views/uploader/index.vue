<template>
  <div class="container">
    <el-upload
      :class="{ 'upload-demo': blocktrue, 'upload': nonefalse}"
      action="/api/upload"
      :auto-upload="false"
      :limit="1"
      ref="upload"
      :http-request="upload"
      multiple
      list-type="picture-card"
      :on-success="handleAvatarSuccess"
      accept="image/png, image/jpeg">
      <!-- :http-request="upload" -->
      <!-- <el-button size="small" type="primary">点击上传</el-button> -->
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg,png图片</div>
    </el-upload>
    <el-button type="primary" @click="upload" class="confirm-btn">确定</el-button>
  </div>
</template>
<script>
export default {
  name: 'uploader',
  data () {
    return {
      nonefalse: false,
      blocktrue: true
    }
  },
  methods: {
    handleAvatarSuccess (response) {
      console.log(response)
      this.$message.success('上传头像成功!')
    },
    upload () {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      // formData.append('name', this.name)
      // formData.append('age', this.age)
      this.$axios.post(this.root + '/upload', formData, headerConfig).then(res => {
        console.log(res)
        // this.nonefalse = true
        localStorage.setItem('userimg', res.data.name)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 30px;
}
.upload-demo{
  width: 520px;
}
.upload{
  display: none;
}
.el-upload-list--picture{
    width: 300px;
  }
</style>
