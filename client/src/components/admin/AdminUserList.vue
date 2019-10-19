<!-- 标签列表 -->
<template>
  <div>
    <el-table :data="items" style="width: 800px">
      <el-table-column label="账号" prop="name"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button type="primary" class="el-icon-edit" size="medium" @click="$router.push(`/admin/edit-admin_user/${scope.row._id}`)"></el-button>
          <el-button type="danger" class="el-icon-delete" size="medium" @click="del(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tag_list",
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("admin/common/admin_users");
      this.items = res.data;
    },
    //删除文章
    del(row) {
      this.$confirm(`确定删除标签 "${row.name}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`admin/common/admin_users/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
</style>