<!-- 文章页面 -->
<template>
  <div>
    <yh-nav></yh-nav>
    <div class="container">
      <article-header v-bind:article="article"></article-header>
      <!-- mavon-editor -->
      <mavon-editor codeStyle="monokai" v-html="article.html_content"></mavon-editor>
      <comment></comment>
    </div>
    <!-- 目录 -->
    <div class="toc"></div>
    <yh-footer></yh-footer>
  </div>
</template>


<script>
import Header from "@/components/front/Header.vue";
import Footer from "@/components/front/Footer.vue";
import Comment from "@/components/front/Comment.vue"
import ArticleHeader from "@/components/front/ArticleHeader.vue";
export default {
  name: "article_page",
  props: {
    id: {}
  },
  data() {
    return {
      article: {}
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/front/common/articles/${this.id}`);
      this.article = res.data;
      this.addPV();
    },
    async addPV() {
      this.article.pageviews++;
      await this.$http.put(
        `/front/common/articles/pageviews/${this.id}`,
        this.article
      );
    }
  },
  created() {
    this.fetch();
  },
  components: {
    "yh-nav": Header,
    "yh-footer": Footer,
    "comment": Comment,
    "article-header": ArticleHeader
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 850px;
  max-width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
}
</style>