<!-- 文章列表 -->
<template>
  <div>
    <el-table :data="articles" style="width: 100%">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <div>
            <el-tag effect="plain" v-for="(_tag, id) in scope.row.tags" :key="id">{{_tag.tag}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="阅读量" prop="pageviews"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <!-- 传递id跳转到编辑界面 -->
          <el-button
            type="primary"
            class="el-icon-edit"
            size="medium"
            @click="$router.push(`/admin/edit-article/${scope.row._id}`)"
          ></el-button>
          <el-button type="danger" class="el-icon-delete" size="medium" @click="del(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="this.cnt"
      :page-size="10"
      hide-on-single-page
      @current-change="handleCurrentChange"
      :current-page="current_page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "article-list",
  props: {
    cnt: NaN,
    articles: {},
    page: {}
  },
  data() {
    return {
      current_page: NaN
    };
  },
  methods: {
    async handleCurrentChange(val) {
      this.current_page = val;
      let page = this.page;
      this.setContextData("admin_" + page, this.current_page);
      this.$emit("goto", val);
    },
    // 删除文章
    del(row) {
      this.$confirm(`确定删除文章 "${row.title}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`admin/common/articles/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    }
  },  
  created() {
    this.current_page = this.getContextData("admin_" + this.page)
  },
};
</script>

<style scoped>
.el-pagination {
  margin: 50px 0 0;
  text-align: center;
}
</style>