import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/registe', component: () => import('@/views/home'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '',
    component: Layout,
    // redirect: '/example/homepage',
    name: 'homepage',
    meta: { title: '首页', icon: '#icon-zhuye' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/homepage'),
        meta: { title: '主页', icon: '#icon-jianguanzhifa-dianzianjuan' }
      },
      {
        path: 'addstudent',
        name: 'addstudent',
        component: () => import('@/views/addstudent'),
        meta: { title: '添加活动', icon: '#icon-ziyouhuodong' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    // redirect: '/example/homepage',
    name: 'studydivision',
    meta: { title: '学习部', icon: '#icon-xuexishuben' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/studydivision/index'),
        meta: { title: '学习部主页', icon: '#icon-xuexishuben' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    // redirect: '/example/homepage',
    name: 'organizedivision',
    meta: { title: '组织部', icon: '#icon-zuzhi' },
    children: [
      {
        path: 'organize',
        name: 'organize',
        component: () => import('@/views/organizedivision/index'),
        meta: { title: '组织部主页', icon: '#icon-zuzhi' }
      },
      {
        path: 'organizedetail',
        name: 'organizedetail',
        hidden: true,
        component: () => import('@/views/organizedivision/organizeDetail'),
        meta: { title: '组织部成员详情', icon: '#icon-zuzhi' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    // redirect: '/example/homepage',
    name: 'sportsdivision',
    meta: { title: '体育部', icon: '#icon-tiyu-lanqiu' },
    children: [
      {
        path: 'sports',
        name: 'sports',
        component: () => import('@/views/sportsdivision/index'),
        meta: { title: '体育部主页', icon: '#icon-tiyu-lanqiu' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    // redirect: '/example/homepage',
    name: 'activitylist',
    meta: { title: '活动列表', icon: '#icon-huodongliebiao' },
    children: [
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/activity/activitylist'),
        meta: { title: '活动列表', icon: '#icon-huodongliebiao' }
      },
      {
        path: 'activitydetail',
        name: 'activitydetail',
        hidden: true,
        component: () => import('@/views/activity/activityDetail'),
        meta: { title: '活动详情', icon: '#icon-huodongliebiao' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    // redirect: '/example/homepage',
    name: 'uploader',
    meta: { title: '上传头像', icon: '#icon-tiyu-lanqiu' },
    children: [
      {
        path: 'uploader',
        name: 'uploader',
        component: () => import('@/views/uploader/index'),
        meta: { title: '上传头像', icon: '#icon-tiyu-lanqiu' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
