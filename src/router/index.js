import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 引入组件  都是同步引入
// import Home from '../views/Home'
// import Classify from '../views/Classify'
// import Hello from '../views/Hello'
// import Favorite from '../views/Hello/Favorite'
// import History from '../views/Hello/History'
// import Login from '../views/Login'
// import My from '../views/My'
// import Ranking from '../views/Ranking'
// import Register from '../views/Resigter'
// import Search from '../views/Search'
// import SearchResult from '../views/SearchResult'
// import Vip from '../views/Vip'
// import City from '../views/City'

// 改成异步引入
const Home = () => import('../views/Home')
// const Classify = () => import('../views/Classify')
const Hello = () => import('../views/Hello')
const Favorite = () => import('../views/Hello/Favorite')
const History = () => import('../views/Hello/History')
const Login = () => import('../views/Login')
const My = () => import('../views/My')
const Ranking = () => import('../views/Ranking')
const Register = () => import('../views/Resigter')
const Search = () => import('../views/Search')
const SearchResult = () => import('../views/SearchResult')
const Vip = () => import('../views/Vip')
const City = () => import('../views/City')
nprogress.configure({ showSpinner: false })

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则
  routes: [
    { path: '/home', component: Home },
    { path: '/classify', component: () => import(/* webpackChunkName: "classify" */'../views/Classify') },
    {
      path: '/hello',
      component: Hello,
      children: [
        { path: 'history', component: History },
        { path: 'favorite', component: Favorite },
        { path: '', redirect: '/hello/favorite' }
      ]
    },
    { path: '/login', component: Login },
    { path: '/my', component: My },
    { path: '/ranking', component: Ranking },
    { path: '/register', component: Register },
    { path: '/search', component: Search },
    { path: '/search-result', component: SearchResult },
    { path: '/vip', component: Vip },
    { path: '/city', component: City },
    { path: '/', redirect: '/home' }
  ]
})

// 添加全局路由守卫  在这里我们去给每个页面 添加加载进图条
router.beforeEach((to, from, next) => {
  nprogress.start()
  // 判断当前的是否选择了城市，根据 sessionStorage 或者 vuex store 去判断
  if (!store.state.city.curCity && to.path !== '/city') {
    // 先去城市列表页
    next({
      path: '/city',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})

// 对外暴露
export default router
