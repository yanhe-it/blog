<!-- 展示页面 -->
<template>
  <div class="display">
    <div class="container">
      <blog-card v-for="article in articles" :key="article._id" v-bind:article="article"></blog-card>
    </div>
    <div class="pagination-large">
      <el-pagination 
        background
        layout="total, prev, pager, next, jumper"
        :total="cnt"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        :current-page.sync="current_page"
        :page-size="12"
      ></el-pagination>
    </div>
    <div class="pagination-small">
      <el-pagination 
        background
        layout="prev, pager, next, jumper"
        :total="cnt"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        :current-page.sync="current_page"
        :page-size="12"
        small
      ></el-pagination>
    </div>
    <div class="no_artcile" v-if="!cnt"><h1>暂时还没有东西哦</h1></div>
  </div>
</template>

<script>
import BlogCard from "@/components/front/BlogCard.vue";
export default {
  name: "display",
  props: {
    articles: {},
    page: {},
    cnt: NaN
  },
  data() {
    return {
      current_page: NaN
    };
  },
  methods: {
    // display组件向父组件home传值,获取指定页面数据
    handleCurrentChange(val) {
      this.current_page = val;
      let page = this.page
      this.setContextData(page, this.current_page);
      this.$emit("goto", val);
    }
  },
  components: {
    "blog-card": BlogCard
  },
  created() {
    this.current_page = this.getContextData(this.page) || 1;
  }
};
</script>

<style scoped>
.display {
  margin-top: 90px;
  max-width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container {
  width: 1200px;
  max-width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: left;
  flex-wrap: wrap;
}
.el-pagination {
  margin: 40px 0 10px;
  text-align: center;
}
.pagination-small {
  display: none;
}
@media(max-width: 420px) {
  .pagination-large {
    display: none;
  }
  .pagination-small {
    display: inline;
  }
}
@media (max-width: 1218px) {
  .container {
    width: 800px;
  }
}
@media (max-width: 818px) {
  .container {
    width: 400px;
  }
  .display {
    margin-top: 70px;
  }
}
</style>