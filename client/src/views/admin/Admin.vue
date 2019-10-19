<!-- 后台管理 -->
<template>
  <el-container style="height: 100%">
    <el-header>
      <div class="nav-left">
        <router-link to="/">
          <img src="../../assets/img/yanhe.png" alt="yanhe" />
        </router-link>
      </div>
      <div class="nav-right">
        <div id="tag">
          <el-popover placement="bottom" trigger="hover" width="300">
            <div class="popover">
              <el-button
                size="small"
                class="tag"
                v-for="tag in tags"
                :key="tag._id"
                @click="searchTag(tag.tag)"
              >{{ tag.tag }}</el-button>
            </div>
            <i class="iconfont icon-tag" slot="reference">标签</i>
          </el-popover>
        </div>
        <div class="search">
          <el-input placeholder="search" size="mini" v-model="search" @keyup.enter.native="search_articles">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="search_articles"></i>
          </el-input>
        </div>
        <div class="motto">
          <i>Talk is cheap, Show me the code</i>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width: 250px">
        <el-menu router :default-active="$route.path" style="padding-left:0">
          <el-menu-item index="/admin/home" style="padding-left:0">首页</el-menu-item>
          <el-menu-item index="/admin/article-list" style="padding-left:0">文章列表</el-menu-item>
          <el-menu-item index="/admin/new-article" style="padding-left:0">编辑文章</el-menu-item>
          <el-menu-item index="/admin/tag-list" style="padding-left:0">标签列表</el-menu-item>
          <el-menu-item index="/admin/new-tag" style="padding-left:0">编辑标签</el-menu-item>
          <el-menu-item index="/admin/page_article-list" style="padding-left:0">页面文章列表</el-menu-item>
          <el-menu-item index="/admin/new-page_article" style="padding-left:0">编辑页面文章</el-menu-item>
          <el-menu-item index="/admin/admin_user-list" style="padding-left:0">管理员</el-menu-item>
          <el-menu-item index="/admin/new-admin_user" style="padding-left:0">编辑管理员</el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      tags: [],
      search: ""
    };
  },
  methods: {
    async fetchTags() {
      const res = await this.$http.get("admin/common/tags");
      this.tags = res.data;
    },
    searchTag(tag) {
      this.$router.push(`/admin/search_tag/${tag}`);
    },
    search_articles() {
      this.$router.push(`/admin/search/${this.search}`);
    }
  },
  created() {
    this.fetchTags();
  }
};
</script>

<style scoped>
.el-header {
  background-color: #51077c;
  line-height: 60px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
.el-menu-item {
  text-align: center;
}
.nav-left img {
  margin-left: 80px;
  float: left;
  width: 60px;
  height: 60px;
}
.nav-right {
  margin-right: 20px;
}
.tag {
  border-radius: 4px;
  margin: 10px;
  background-color: rgb(149, 29, 165);
  color: rgb(224, 228, 6);
}
.popover {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
#tag {
  color: rgb(20, 150, 189);
  display: inline;
}
.search {
  display: inline;
  margin: 0 20px;
}
.search .el-input {
  width: 250px;
}
.motto {
  display: inline;
}
.motto i {
  font-size: 18px;
  color: rgb(177, 189, 12);
}
.el-aside .el-menu-item {
  padding: 0;
}
@media (max-width: 900px) {
  .motto {
    display: none;
  }
  .el-aside {
    width: 100px !important;
  }
  .nav-left img {
    margin-left: 0;
    float: left;
    width: 60px;
    height: 60px;
  }
  .nav-right {
    margin-right: 0;
  }
  .search {
    margin-right: 0;
  }
  .search .el-input {
    width: 150px;
  }
}
</style>