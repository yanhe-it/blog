<!-- 登录 -->
<template>
  <div class="box-card">
    <el-card>
      <div slot="header">
        <span>后台登录</span>
      </div>
      <div class="text item">
        <el-form label-position="left" :model="admin_user" @submit.native.prevent="login">
          <el-form-item label="账号">
            <el-input v-model="admin_user.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="admin_user.password"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin_user: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.admin_user)
      sessionStorage.token = res.data.token
      this.$router.push('/admin/home')
      this.$message({
        type: 'success',
        message: "登录成功"
      })
    }
  }
};
</script>

<style scoped>
.box-card {
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.el-card {
  margin-top: 12rem;
  width: 450px;
  max-width: 100%;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 1rem;
}
</style>