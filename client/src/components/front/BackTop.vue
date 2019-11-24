<!-- backtop-->
<template>
  <div class="container">
    <button @click="backTop" v-show="toTop" class="backtop">UP</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toTop: false,
      scrollTop: NaN
    };
  },
  methods: {
    backTop() {
      let timer = setInterval(() => { // 加入定时器使页面滚动更加顺滑
        let speed = Math.floor(-this.scrollTop / 30)
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop += speed
        if(this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 1)
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scroll() {
      this.scrollTop = document.documentElement.scrollTop + document.body.scrollTop
      if (this.scrollTop > 60) {
        this.toTop = true;
      } else {
        this.toTop = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroll);
  }
};
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 80px;
  right: 15%;
  z-index: 4000;
  text-align: center;
}
.backtop {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-size: 18px;
  line-height: 46px;
  background-color: rgba(19, 221, 70, 0.822);
  color: rgba(187, 19, 221, 0.856);
  border: 1px solid rgb(10, 158, 168);
  outline: none;
}
@media(max-width: 800px) {
  .container {
    right: 6%;
  }
}
</style>