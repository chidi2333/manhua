import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Notify } from 'vant'
import VueLazyload from 'vue-lazyload'

import './assets/styles/base.scss'
Vue.use(VueLazyload, {
  preLoad: 1.3, // 加载高度1.3(当前屏幕高度的1.3倍)
  error: require('./assets/logo.png'), // 当加载图片出错的时候，显示替代的图片
  loading: require('./assets/loading.gif'), // 加载图片的过程中显示的图片内容
  attempt: 1 // 如果加载失败，尝试加载真实图片的次数
  /*
    VueLazyload 中的坑
    error 和 loading 这两个图片的路径，可以使用线上的图片，也可以使用本地图片链式，但是需要注意
      1. src 文件夹中的图片，需要使用 require() 引入
      2. 如果将图片放在 public 文件夹中，可以将 public 看成 / 拼接url

      localhost:8080 访问项目时，实际访问的是dist中的内容，
      为什么我们再没有打包之前，也能访问呢，webpack将打包成dist，放在内存里面，并没有去生成实际的文件

      通过 require 引入 图片路径的话，webpack 识别 require ，将require引入的路径，做一个拷贝，直接将
      链接指向的资源，打成base64的二进制数据，打包到.js文件中。

      import   动态引入
      require  静态拷贝  作业：百度查阅  import 和 require 有什么区别。
  */

})
// 全局注册
Vue.use(Notify)

Vue.config.productionTip = false

// 数字 变成 带 单位的数字
/**
 * 第一个参数  是过滤器的名字
 * 第二个参数  回调函数，必须有返回值
*/
Vue.filter('formatYi', (value) => {
  var Yi = Math.pow(10, 8)
  if (value > Yi) {
    return `${(value / Yi).toFixed(2)}亿`
  } else {
    return `${(value / Math.pow(10, 4)).toFixed(2)}万`
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
