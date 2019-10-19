import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/api'
  // baseURL: 'http://localhost:3000/api'
})

// 请求拦截器
http.interceptors.request.use(config => {
  // Do something before request is sent
  if(sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.token
  }
  return config;
}, err => {
  // Do something with request error
  return Promise.reject(err);
});
// 响应拦截器
http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  if (err.response.status === 401) {
    this.router.push('/login')
  }
  return Promise.reject(err)
})

export default http