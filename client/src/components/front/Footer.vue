<!-- 底部公用 -->
<template>
  <div class="footer">
    <div class="footer-text">
      <a href="http://www.beian.miit.gov.cn" target="blank">鲁ICP备19052102号</a>
      <div class="divider">|</div>
      <p>2019/10/10 建立</p>
      <div class="divider">|</div>
      <a href="http://www.beian.gov.cn">公安备案号暂无</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  margin: 40px 0;
  background-color: #fff(180, 42, 42);
}
.footer-text {
  font-size: 18px;
  position: relative;
  line-height: 26px;
  padding: 10px;
  text-align: center;
  color: rgb(16, 4, 39);
}
.footer-text a {
  text-decoration: none;
}
.divider {
  margin: 0 20px;
}
@media (min-width: 800px) {
  p {
    display: inline;
  }
  .divider {
    display: inline;
  }
}
@media (max-width: 800px) {
  .divider {
    display: none;
  }
}
@media (max-width: 500px) {
  p {
    font-size: 15px;
  }
  .footer-text a {
    font-size: 15px;
  }
}

</style>