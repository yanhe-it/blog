<!-- 文章页面 -->
<template>
  <div>
    <div class="container">
       <!-- mavon-editor -->
      <mavon-editor 
      codeStyle="monokai" 
      style="box-shadow: none;"
      v-html="page_article.html_content">
      </mavon-editor>
      <comment></comment>
    </div>
    <div class="toc">

    </div>
  </div>
</template>

<script>
import Comment from "@/components/front/Comment.vue"
export default {
  name: 'page_article',
  props: {
    name: {}
  },
  data() {
    return {
      page_article: {}
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`front/common/page_articles/page/${this.name}`)
      this.page_article = res.data
    }
  },
  components: {
    "comment": Comment
  },
  created() {
    this.fetch()
  }
}
</script>

<style scoped>
.container {
  margin: 90px auto 0;
  width: 850px;
  max-width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
}
</style>