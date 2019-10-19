<!-- 首页 -->
<template>
  <div class="home">
    <yh-nav></yh-nav>
    <display v-bind:articles="articles" v-bind:cnt="cnt" v-bind:page="home" @goto="goto"></display>
    <yh-footer></yh-footer>
  </div>
</template>

<script>
import Header from "@/components/front/Header.vue"
import Footer from "@/components/front/Footer.vue"
import Display from "@/components/front/Display.vue"
export default {
  name: "home",
  data() {
    return {
      articles: {},
      cnt: NaN,
      current_page: NaN,
      home: 'home'
    };
  },
  methods: {
    // 加载首页时获取第一页文章列表以及文章数量，并将文章数量给分页的total
    async fetchAll() {
      const count = await this.$http.get('front/common/articles/count')
      this.cnt = count.data
      const res = await this.$http.get(`front/common/articles/list/${this.current_page}`)
      this.articles = res.data
    },
    // 点击分页之后传回页数到父组件进行查询文章
    async goto(currentPage) {
      const res = await this.$http.get(`front/common/articles/list/${currentPage}`)
      this.articles = res.data
    }
  },
  created() {
    this.current_page = this.getContextData("home") || 1
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