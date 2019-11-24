<!-- 博客展示，，，卡片 -->
<template>
  <div class="card" @click="$router.push(`/article/${article._id}`)">
    <div class="top">
      <el-tag size="midium" v-if="article.istop">置顶</el-tag>
    </div>
    <div class="article_tag">
      <el-tag size="small" v-for="tag in article.tags" :key="tag._id">{{tag.tag}}</el-tag>
    </div>
    <div class="img-container">
      <el-image :src="article.picture" fit="cover"></el-image>
    </div>
    <div class="property">
      <div class="title">{{article.title}}</div>
      <div class="details">
        <i class="el-icon-date"> {{article.date}}</i>
        <i class="el-icon-view"> {{article.pageviews}}</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-card",
  props: {
    article: {}
  }
};
</script>

<style scoped>
.card {
  margin: 25px;
  width: 350px;
  max-width: 100%;
  height: 420px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  -webkit-transition: 0.3s;
  position: relative;
  z-index: 1000;
}
.img-container {
  width: 350px;
  max-width: 100%;
  height: 310px;
}
.top {
  position: absolute;
  left: 0;
  z-index: 1500;
}
.article_tag {
  position: absolute;
  right: 0;
  z-index: 1500;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  width: 72px;
  float: right;
  text-align: center;
}
.el-image {
  border-radius: 5px 5px 0 0;
  height: 100%;
  width: 100%;
}
.top .el-tag {
  color: rgb(223, 15, 15);
  background-color: rgba(19, 231, 30, 0.616);
  border: none;
}
.article_tag .el-tag {
  color: rgb(197, 216, 29);
  background-color: rgba(169, 17, 207, 0.5);
  border: none;
  margin-bottom: 5px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(117, 20, 197, 0.5);
}
.property {
  padding: 8px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  height: 110px;
}
.title {
  flex-grow: 3;
  font-size: 18px;
  color: rgb(196, 15, 233);
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}
.details {
  flex-grow: 1;
  font-size: 16px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
i {
  margin-right: 2px;
  color: rgb(110, 14, 43);
}
@media (max-width: 420px) {
  .card {
    width: 300px;
    height: 360px;
    margin: 15px auto;
  }
  .img-container {
    width: 300px;
    height: 250px;
  }
  .property {
    height: 100px;
  }
}
@media (max-width: 350px) {
  .card {
    width: 270px;
    height: 330px;
    margin: 12px auto;
  }
  .img-container {
    width: 270px;
    height: 250px;
  }
  .property {
    height: 70px;
  }
  .title {
    font-size: 18px;
  }
  .details {
    font-size: 15px;
  }
}
</style>