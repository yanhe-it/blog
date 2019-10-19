<!-- 友链 -->
<template>
  <div class="about">
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
  name: "about",
  data() {
    return {
      name: "about"
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
