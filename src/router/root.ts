// 路由表
const constantRouterMap = [
  // ************* 前台路由 **************
  {
    path: '/',
    redirect: '/adminLogin'
  },
  
  // 后台登录
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: () => import('@/views/admin/login/Login.vue'),
  },
  // 后台路由
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   redirect: '/admin/overview',
  //   // component: () => import('/@/views/admin/main.vue'),
  //   children: [
  //   ]
  // },

  // notFound 路由配置
    // ...existing code...
    // notFound 路由配置
    {
      path: '/:pathMatch(.*)*', // 此处需特别注意至于最底部
      name: 'notFound',
      component: () => import('@/views/admin/notFound/NotFound.vue'),
    },
  ];

export default constantRouterMap;
