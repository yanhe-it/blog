<!-- 评论 -->
<template>
  <div class="comment">
    <p>
      <span>
        <b>评论</b>
      </span> 邮箱决定了你的头像,如果还没有注册Gravatar(全球头像),请注册
      <a href="https://cn.gravatar.com/" target="blank">Gravatar</a>
    </p>
    <div id="vcomments"></div>
  </div>
</template>
 
<script>
import Valine from "valine";
export default {
  name: "Valine",
  mounted: function() {
    new Valine({
      el: "#vcomments",
      appId: "xaTxWYF4MoGgVBOY3ES5fgvP-gzGzoHsz", // your appId
      appKey: "Re7rsS5BVmUbJJzLKByiDDeu", // your appKey
      notify: false,
      verify: false,
      path: window.location.pathname,
      avatar: "mm",
      placeholder: "留下你的足迹哦(支持markdown), 评论前请先填写信息，网址可以不填"
    });
  }
};
</script>

<style scoped>
p {
  font-weight: 100;
  font-size: 16px;
}
p b {
  color: rgb(13, 180, 69);
}
.comment {
  margin-top: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.94);
}
@media(max-width: 500px) {
  p {
    font-size: 14px;
    font-weight: normal;
  }
}
</style>
<style>
.v .vempty {
  font-size: 15px;
}
</style>