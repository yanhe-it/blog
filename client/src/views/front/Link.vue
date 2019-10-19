<!-- 友链 -->
<template>
  <div class="link">
    <yh-nav></yh-nav>
    <page-article v-bind:name="this.name"></page-article>
    <yh-footer></yh-footer>
  </div>
</template>

<script>
import Header from "@/components/front/Header.vue"
import Footer from "@/components/front/Footer.vue"
import PageArticle from "@/components/front/PageArticle.vue"
export default {
  name: "my_link",
  data() {
    return {
      name: "link"
    };
  },
  components: {
    "yh-nav": Header,
    "yh-footer": Footer,
    "page-article": PageArticle
  }
};
</script>

<style scoped>

</style>>
