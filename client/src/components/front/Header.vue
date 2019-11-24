<!-- 头部公用 -->
<template>
  <div>
    <!-- 电脑端 -->
    <div class="header">
      <div class="header-container">
        <div class="nav-left">
          <router-link to="/login">
            <img src="../../assets/img/yanhe.png" alt="yanhe" />
          </router-link>
        </div>
        <div class="nav-right">
          <ul>
            <li>
              <router-link to="/">
                <i class="iconfont icon-home">首页</i>
              </router-link>
            </li>
            <li>
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
            </li>
            <li>
              <router-link to="/link">
                <i class="iconfont icon-link">友链</i>
              </router-link>
            </li>
            <li>
              <router-link to="/about">
                <i class="iconfont icon-yidiandiantubiao09">关于</i>
              </router-link>
            </li>
            <!-- pc搜索框 -->
            <li class="search_pc">
              <el-input placeholder="输入搜索内容" v-model="search_pc" @keyup.enter.native="search">
                <i slot="suffix" class="el-input__icon iconfont icon-search" @click="search"></i>
              </el-input>
            </li>
          </ul>
        </div>
        <div class="iconfont icon-menu" id="switch" @click="switch_menu"></div>
      </div>
    </div>
    <!-- 移动端 -->
    <div class="menu" v-show="menu">
      <ul>
        <!-- mb搜索框 -->
        <li class="search_mb">
          <el-input placeholder="输入搜索内容" v-model="search_mb" @keyup.enter.native="search">
            <i slot="suffix" class="el-input__icon iconfont icon-search" @click="search"></i>
          </el-input>
        </li>
        <li>
          <router-link to="/">
            <i class="iconfont icon-home">首页</i>
          </router-link>
        </li>
        <li>
          <el-popover placement="bottom" trigger="click" width="300">
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
        </li>
        <li>
          <router-link to="/link">
            <i class="iconfont icon-link">友链</i>
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <i class="iconfont icon-yidiandiantubiao09">关于</i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      articles: {},
      menu: false,
      search_pc: "",
      search_mb: ""
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    async fetchTags() {
      const res = await this.$http.get("front/common/tags");
      this.tags = res.data;
    },
    searchTag(search_tag) {
      this.$router.push(`/search_tag/${search_tag}`);
    },
    switch_menu() {
      this.menu = !this.menu;
    },
    search() {
      if (this.search_pc) {
        this.$router.push(`/search/${this.search_pc}`);
      }
      if (this.search_mb) {
        this.$router.push(`/search/${this.search_mb}`);
      }
    },
    // onwheel(e) {
    //   let wheel = e.wheelDelta;
    //   if (wheel < 0) {
    //     document.getElementsByClassName("header").style.top = "-70px"
    //   } else {
    //     document.getElementsByClassName("header").style.top = "0px"
    //   }
    // }
  },
  // mounted() {
  //   window.addEventListener("wheel", this.onwheel);
  // },
  // destroyed() {
  //   window.removeEventListener("wheel", this.onwheel);
  // },
  created() {
    this.fetchTags();
  }
};
</script>

<style>
/* search_pc */
.search_pc > .el-input {
  width: 20px;
  max-width: 100%;
  border-color: rgb(179, 11, 179);
  position: absolute;
  right: 0;
  transition: width 0.3s;
}
.search_pc .el-input__inner {
  height: 30px;
  border-radius: 15px;
  visibility: hidden;
}
.search_pc > .el-input:hover {
  width: 380px;
}
.search_pc > .el-input:hover .el-input__inner {
  visibility: visible;
}
/* search_mb */
.search_mb > .el-input {
  width: 100px;
  border-color: rgb(179, 11, 179);
  position: absolute;
  right: 0;
  transition: width 0.2s;
}
.search_mb .el-input__inner {
  height: 42px;
}
.search_mb > .el-input:hover {
  width: 250px;
}
</style>
<style scoped>
.header {
  background: rgba(255, 255, 255, 0.904);
  width: 100%;
  height: 70px;
  position: fixed;
  /*transition: top 0.5s;*/
  top: 0;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  z-index: 1800;
}
.header-container {
  margin: 0 auto;
  width: 1200px;
  max-width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
.nav-left img {
  float: left;
  width: 70px;
  height: 70px;
}
.nav-right {
  float: right;
  position: relative;
  margin-right: 10px;
}
#switch {
  color: rgb(136, 9, 130);
  margin-right: 7px;
  display: none;
  float: right;
  font-size: 46px;
  line-height: 58px;
}
.menu {
  position: fixed;
  right: 0;
  width: 100px;
  top: 58px;
  z-index: 1800;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}
.menu li {
  display: block;
  margin: 0;
  height: 48px;
  width: 100px;
  max-width: 100%;
  line-height: 48px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.94);
}
@media (min-width: 700px) {
  .menu {
    display: none;
  }
}
@media (max-width: 700px) {
  .header {
    height: 58px;
  }
  .header-container {
    justify-content: space-between;
  }
  .nav-left img {
    float: left;
    width: 58px;
    height: 58px;
  }
  .nav-right {
    display: none;
  }
  #switch {
    display: block;
  }
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  margin: 0 20px;
  display: inline;
  line-height: 70px;
}
a {
  text-decoration: none;
}
i {
  color: rgb(61, 11, 61);
}
.tag {
  border-radius: 4px;
  margin: 10px;
  background-color: rgb(149, 29, 165);
  color: rgb(224, 228, 6);
}
.nav-right i:hover {
  color: rgb(140, 190, 22);
}
.popover {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>

