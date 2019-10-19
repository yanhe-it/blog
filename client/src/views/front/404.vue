<!-- 404页面 -->
<template>
  <div class="page404">
    <h1>404,没有这个页面呦</h1>
    <el-button @click="goHome">回到首页</el-button>
    <el-button @click="back">回到上一页</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.page404 {
  margin: 200px auto 0;
  text-align: center;
}
</style>