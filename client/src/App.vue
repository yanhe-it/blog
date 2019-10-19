<template>
  <div id="app">
    <!-- backtop -->
    <el-backtop>
      <div class="backtop">UP</div>
    </el-backtop>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
body {
  margin: 0;
  font-size: 17px;
  font-family: "lucida grande", "lucida sans unicode", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
}
.markdown-body {
  padding: 10px;
}
.markdown-body .highlight pre,.markdown-body pre {
  padding: 0 !important;
  font-size: 16px !important;
}
@media (max-width: 500px) {
  body {
    font-size: 15px;
  }
  .markdown-body {
    font-size: 14px !important;
  }
}
.el-backtop {
  right: 10% !important;
  z-index: 3000 !important;
  background-color: rgba(222, 13, 230, 0.74) !important;
}
.backtop {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: rgb(203, 238, 6);
  box-shadow: 1px solid rgba(209, 20, 193, 0.74);
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px !important;
  background-color: #fff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(191, 18, 214, 0.9);
}
</style>