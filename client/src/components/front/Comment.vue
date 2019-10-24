<!-- 评论 -->
<template>
  <div class="comment">
    <p>
      <span>
        <b>评论:</b>
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
      appId: "your appID", // your appId
      appKey: "your appKey", // your appKey
      notify: false,
      verify: false,
      path: window.location.pathname,
      avatar: "mm",
      placeholder: "留下你的足迹哦0_0,(支持markdown),"
    });
  }
};
</script>

<style scoped>
p {
  font-weight: 100;
  font-size: 16px;
}
.comment {
  margin-top: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.94);
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
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
