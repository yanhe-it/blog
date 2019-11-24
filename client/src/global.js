import Vue from 'vue'
Vue.mixin({
  methods: {
//  图片上传时添加请求头
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${sessionStorage.token}` || ''
      }
    },
// 每个搜索页面记录当前页面数字
    setContextData(key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
// 从sessionStorage取出当前页面数字
    getContextData(key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
    },
// 获取当前日期并格式化
    dateFormat() {
      let date = new Date();
      let year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // 拼接
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    },
// 获取图片名称
    img_name(url) {
      return String(url).split('img/').pop()
    },
// mavonEditor上传图片
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("image", $file);
      this.$http({
        url: "upload/article_img",
        method: "post",
        data: formdata,
        headers: this.getAuthHeaders()
      }).then(img => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.md.$img2Url(pos, img.data.url)
        this.imgs.push(img.data.url)
      })
    },  
// mavonEditor删除上传图片
    imgDel(img_url) {
      let index = this.imgs.indexOf(img_url)
      this.imgs.splice(index, 1)
      let img_name = this.img_name(img_url)
      this.$http.delete(`upload/del/article_img/${img_name}`)
    }
  }
})