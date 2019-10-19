<!-- 编辑标签 -->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}管理员</h1>
    <el-form label-width="40px" v-model="admin_user" @submit.native.prevent="save">
      <el-form-item label="账号">
        <el-input v-model="admin_user.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="admin_user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "edit-admin_user",
  props: {
    id: {}
  },
  data() {
    return {
      admin_user: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`admin/common/admin_users/${this.id}`, this.admin_user);
      } else {
        await this.$http.post("admin/common/admin_users", this.admin_user);
      }
      this.$router.push("/admin/admin_user-list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`admin/common/admin_users/${this.id}`);
      this.admin_user = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style scoped>
.el-input {
  width: 400px;
}
</style>