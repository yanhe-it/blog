<!-- 全文搜索 -->
<template>
  <div>
    <article-list v-bind:articles="articles" v-bind:cnt="cnt" @goto="goto" v-bind:page="this.search"></article-list>
  </div>
</template>

<script>
import ArticleList from "@/components/admin/ArticleList.vue"
export default {
  props: {
    search: {}
  },
  data() {
    return {
      articles: [],
      cnt: NaN,
      current_page: NaN
    };
  },
  methods: {
    // 加载首页时获取第一页文章列表以及文章数量，并将文章数量给分页的total
    async fetchAll() {
      const count = await this.$http.get(`admin/common/articles/search/${this.search}/count`)
      this.cnt = count.data
      const res = await this.$http.get(`admin/common/articles/search/${this.search}/list/${this.current_page}`)
      this.articles = res.data
    },
    async goto(currentPage) {
      const res = await this.$http.get(`admin/common/articles/search/${this.search}/list/${currentPage}`)
      this.articles = res.data
    }
  },
  created() {
    this.current_page = this.getContextData("admin_" + this.search) || 1
    this.fetchAll()
  },
  components: {
    "article-list": ArticleList
  }
};
</script>

<style scoped>

</style>