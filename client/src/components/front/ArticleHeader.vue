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
  margin: 80px 0 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.94);
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}
.el-tag {
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
</style>