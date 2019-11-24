<template>
  <div id="app">
    <keep-alive include="home, link, about">
      <router-view :key="$route.path"></router-view>
    </keep-alive>
    <!-- backtop -->
    <backtop></backtop>
  </div>
</template>

<script>
import BackTop from '@/components/front/BackTop.vue'
export default {
  name: "app",
  components: {
    "backtop": BackTop
  }
};
</script>

<style>
</style>