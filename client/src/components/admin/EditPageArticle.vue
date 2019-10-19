<!-- 编辑页面文章 -->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}页面文章</h1>
    <el-form label-width="40px" v-model="page_article" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="page_article.name"></el-input>
      </el-form-item>
      <el-form-item v-if="imgs.length" label="文章图片" label-width="75px">
        <div v-for="img in imgs" :key="img" class="imgs">
          <el-image :src="img" fit="cover"></el-image>
          <el-button class="el-icon-delete" @click="imgDel(img)" type="danger" size="mini"></el-button>
        </div>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor ref=md @imgAdd="$imgAdd"
        codeStyle="monokai"
        :value="this.page_article.md_content"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      page_article: {},
      imgs: []
    };
  },
  methods: {
    // 保存文章，有id为编辑文章，否则为新建文章，实现组件复用
    async save() {
      this.$set(this.page_article, "html_content", this.$refs.md.d_render); // html
      this.$set(this.page_article, "md_content", this.$refs.md.d_value); //md
      this.$set(this.page_article, "imgs", this.imgs); //imgs
      this.$set(this.page_article, "date", this.dateFormat()); //date
      if (this.id) {
        await this.$http.put(`admin/common/page_articles/${this.id}`, this.page_article);
      } else {
        await this.$http.post("admin/common/page_articles", this.page_article);
      }
      this.$router.push("/admin/page_article-list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 获取修改文章信息
    async fetch() {
      const res = await this.$http.get(`admin/common/page_articles/${this.id}`);
      this.page_article = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style scoped>
.el-image {
  height: 150px;
  width: 150px;
  margin: 10px;
}
.imgs {
  float: left;
}
</style>