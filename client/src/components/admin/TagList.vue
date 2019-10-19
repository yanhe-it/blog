<!-- 标签列表 -->
<template>
  <div>
    <el-table :data="items" style="width: 500px; max-width: 100%">
      <el-table-column label="标签" prop="tag"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" class="el-icon-edit" size="medium" @click="$router.push(`/admin/edit-tag/${scope.row._id}`)"></el-button>
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
      const res = await this.$http.get("admin/common/tags");
      this.items = res.data;
    },
    //删除文章
    del(row) {
      this.$confirm(`确定删除标签 "${row.tag}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`admin/common/tags/${row._id}`);
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