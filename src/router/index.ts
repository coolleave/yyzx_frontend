import { createRouter, createWebHistory } from 'vue-router'
import root from './root'
import { ADMIN_USER_TOKEN } from '@/stores/constants'

// 路由权限白名单
const allowList = ['adminLogin', 'login', 'register', 'portal', 'search', 'detail', '403', '404']
// 前台登录地址
const loginRoutePath = '/index/login'
// 后台登录地址
const adminLoginRoutePath = '/adminLogin'

const router = createRouter({
  history: createWebHistory(),
  routes: root
});

// 路由守卫
router.beforeEach((to, _from) => {

  // 判断是否登录
  if (to.path === "/admin" && !localStorage.getItem(ADMIN_USER_TOKEN)) {
    return "/adminLogin"
  }
})
// router.beforeEach(async (to, from, next) => {

//   /** 后台路由 **/
//   if (to.path.startsWith('/admin')) {
//     if (localStorage.getItem(ADMIN_USER_TOKEN)) {
//       if (to.path === adminLoginRoutePath) {
//         next({ path: '/' })
//       } else {
//         next()
//       }
//     } else {
//       if (allowList.includes(to.name as string)) {
//         // 在免登录名单，直接进入
//         next()
//       } else {
//         next({ path: adminLoginRoutePath, query: { redirect: to.fullPath } })
//       }
//     }
//     // next()
//   }

//   /** 前台路由 **/
//   if (to.path.startsWith('/index')) {
//     if (localStorage.getItem(USER_TOKEN)) {
//       if (to.path === loginRoutePath) {
//         next({ path: '/' })
//       } else {
//         next()
//       }
//     } else {
//       if (allowList.includes(to.name as string)) {
//         // 在免登录名单，直接进入
//         next()
//       } else {
//         next({ path: loginRoutePath, query: { redirect: to.fullPath } })
//       }
//     }
//     // next()
//   }

// });

router.afterEach((_to) => {
  // 回到顶部
  document.getElementById("html")?.scrollTo(0, 0)
});

export default router;
