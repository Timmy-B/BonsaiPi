import Vue from 'vue';
import Router from 'vue-router';

const routerOptions = [
  {
    path: '/',
    name: 'Home',
    meta: {
      breadcrumb: [
        { name: 'Home' }
      ]
    }
  },{
    path: '/settings',
    name: 'Settings',
    meta: {
      breadcrumb: [
        { name: 'Home', href: 'Home' },
        { name: 'Settings' }
      ]
    }
  }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/pages/${route.name}.vue`)
  }
})

Vue.use(Router)
export default new Router({
  routes
})
