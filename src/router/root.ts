
// 路由表
const constantRouterMap = [
  // ************* 前台路由 **************
  {
    path: '/',
    redirect: '/admin'
  },
  // ************* 后台路由 **************
  // 后台登录
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: () => import('@/views/admin/login/Login.vue'),
  },
  // 后台路由
  {
    path: '/admin',
    name: 'admin',
    // redirect: '/admin/overview',
    component: () => import('@/views/admin/main/Index.vue'),
    children: [
      // 总览
      {
        path: 'overview',
        name: 'overview',
        component: () => import('@/views/admin/main/components/mainOverview.vue'),
      },
      // 员工
      {
        path: 'employee',
        name: 'employee',
        component: () => import('@/views/admin/main/components/mainEmpoyee.vue')
      },
      // 分类
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/admin/main/components/mainCategory.vue')
      },
      // 商品
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/admin/main/components/mainGoods.vue')
      },
      // 订单
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/admin/main/components/mainOrder.vue')
      },
      // 用户
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/admin/main/components/mainUser.vue')
      },
      // 系统
      {
        path: 'system',
        name: 'system',
        component: () => import('@/views/admin/main/components/mainSystem.vue')
      }
    ]
  },

  // notFound 路由配置
  // ...existing code...
  // notFound 路由配置
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/admin/notFound/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*', // 此处需特别注意至于最底部
    name: 'notFound',
    component: () => import('@/views/admin/notFound/NotFound.vue'),
  },
];

export default constantRouterMap;
