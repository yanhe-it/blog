<!-- 文章列表 -->
<template>
  <div>
    <el-table :data="items" style="width: 800px">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <!-- 传递id跳转到编辑界面 -->
          <el-button type="primary" class="el-icon-edit" size="medium" @click="$router.push(`/admin/edit-page_article/${scope.row._id}`)"></el-button>
          <el-button type="danger" class="el-icon-delete" size="medium" @click="del(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "page_article-list",
  data() {
    return {
      items: []
    };
  },
  methods: {
    // 获取文章
    async fetch() {
      const res = await this.$http.get("admin/common/page_articles");
      this.items = res.data;
    },
    // 删除文章
    del(row) {
      this.$confirm(`确定删除文章 "${row.name}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`admin/common/page_articles/${row._id}`);
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

<style>
</style>