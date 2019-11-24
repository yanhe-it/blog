<template>
  <div class="header">
    <h2>{{article.title}}</h2>
    <div class="details">
      <i class="el-icon-date"> {{article.date}}</i>
      <i class="el-icon-view"> {{article.pageviews}}</i>
    </div>
    <el-tag 
    size="medium"
    v-for="tag in article.tags"
    :key="tag._id">{{tag.tag}}</el-tag>
    <p>转载请注明地址</p>
  </div>
</template>

<script>
export default {
  props: {
    article: {}
  }
}
</script>

<style scoped>
.header {
  margin: 70px 0 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.94);
}
.el-tag {
  border-radius: 14px;
  margin-right: 20px;
  background-color: rgb(149, 29, 165);
  color: rgb(224, 228, 6);
}
.details {
  margin-bottom: 20px;
}
i {
  margin-right: 30px;
}
p {
  color: rgb(173, 21, 128);
  font-size: 15px;
  display: inline-block;
}
</style>