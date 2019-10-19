<!-- 全文搜索 -->
<template>
  <div>
    <yh-nav></yh-nav>
    <display v-bind:articles="articles" v-bind:cnt="cnt" v-bind:page="search" @goto="goto"></display>
    <yh-footer></yh-footer>
  </div>
</template>

<script>
import Header from "@/components/front/Header.vue"
import Footer from "@/components/front/Footer.vue"
import Display from "@/components/front/Display.vue"
export default {
  props: {
    search: {}
  },
  data() {
    return {
      articles: {},
      cnt: NaN,
      current_page: NaN
    };
  },
  methods: {
    // 加载首页时获取第一页文章列表以及文章数量，并将文章数量给分页的total
    async fetchAll() {
      const count = await this.$http.get(`front/common/articles/search/${this.search}/count`)
      this.cnt = count.data
      const res = await this.$http.get(`front/common/articles/search/${this.search}/list/${this.current_page}`)
      this.articles = res.data
    },
    async goto(currentPage) {
      const res = await this.$http.get(`front/common/articles/search/${this.search}/list/${currentPage}`)
      this.articles = res.data
    }
  },
  created() {
    this.current_page = this.getContextData(this.search || 1)
    this.fetchAll()
  },
  components: {
    "yh-nav": Header,
    "yh-footer": Footer,
    "display": Display
  }
};
</script>

<style scoped>

</style>