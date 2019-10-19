<!-- 编辑文章 -->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="50px" v-model="article" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="article.tags" multiple placeholder="请选择">
          <el-option v-for="item in tags" :key="item._id" :label="item.tag" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="置顶">
        <el-radio v-model="article.istop" :label=true>Yes</el-radio>
        <el-radio v-model="article.istop" :label=false>No</el-radio>
      </el-form-item>
      <el-form-item v-if="id" label="已上传图片" label-width="90px">
        <el-image :src="article.picture" fit="cover"></el-image>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          :action="$http.defaults.baseURL + '/upload/card_img'"
          list-type="picture-card"
          :headers="getAuthHeaders()"
          :on-success="afterUpload"
          :on-remove="remove_img"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="imgs.length" label="文章图片" label-width="77px">
        <div v-for="img in imgs" :key="img" class="imgs">
          <el-image :src="img" fit="cover"></el-image>
          <el-button class="el-icon-delete" @click="imgDel(img)" type="danger" size="mini"></el-button>
        </div>
      </el-form-item>
      <el-form-item label="内容">
        <!-- mavonEditor -->
        <mavon-editor
          ref="md"
          codeStyle="monokai"
          @imgAdd="$imgAdd"
          :value="this.article.md_content"
        />
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
      article: {
        istop: false
      },
      imgs: [],
      picture_url: "",
      tags: []
    };
  },
  methods: {
    // 上传图片之后，返回url
    afterUpload(res) {
      this.$set(this.article, "picture", res.url);
    },
    // 保存文章，有id为编辑文章，否则为新建文章，实现组件复用
    async save() {
      this.$set(this.article, "html_content", this.$refs.md.d_render); // html
      this.$set(this.article, "md_content", this.$refs.md.d_value); //md
      this.$set(this.article, "imgs", this.imgs); //imgs
      this.$set(this.article, "date", this.article.date || this.dateFormat()); //date
      // this.$set(this.article, "date", this.dateFormat()); //date
      this.$set(this.article, "pageviews", this.article.pageviews || 1); //pageviews
      if (this.id) {
        // 删除已上传图片
        if (this.picture_url != this.article.picture) {
          let img_name = this.img_name(this.picture_url);
          await this.$http.delete(`upload/del/card_img/${img_name}`);
        }
        await this.$http.put(`admin/common/articles/${this.id}`, this.article);
      } else {
        await this.$http.post("admin/common/articles", this.article);
      }
      this.$router.push("/admin/article-list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // remove_img
    async remove_img() {
      let img_name = this.img_name(this.article.picture);
      await this.$http.delete(`upload/del/card_img/${img_name}`);
    },
    // 获取修改文章信息
    async fetch() {
      const res = await this.$http.get(`admin/common/articles/${this.id}`);
      this.article = res.data;
      this.imgs = this.article.imgs;
      this.picture_url = this.article.picture;
    },
    // 获取标签
    async fetchTags() {
      const res = await this.$http.get("admin/common/tags");
      this.tags = res.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchTags();
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