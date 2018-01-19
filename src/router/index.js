import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// export const routerHome = {
//   path: '/',
//   name: 'home',
//   meta: {
//     title: '后台管理'
//   },
//   components: {
//     HomeRouter: () => import('../components/Home.vue')
//   }
// }

export const routerLogin = {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录'
  },
  components: {
    HomeRouter: () => import('../components/Login.vue')
  }
}

export const routerRegister = {
  path: '/register',
  name: 'Register',
  meta: {
    title: '注册'
  },
  components: {
    HomeRouter: () => import('../components/Register.vue')
  }
}

// export const routerLocking = {
//   path: '/locking',
//   name: 'locking',
//   components: {
//     HomeRouter: () => import('../components/lockscreen/components/locking-page.vue')
//   }
// }

export const contentRouter = {
  path: '/',
  name: 'Home',
  meta: {
    title: '后台管理系统'
  },
  components: {
    HomeRouter: () => import('../components/Home.vue')
  },
  children: [
    {
      path: '/data/statistics',
      meta: {
        title: '后台管理'
      },
      components: {
        ContentRouter: () => import(`../components/data/statistics.vue`)
      }
    }
  ]
}

export const page404 = {
  path: '/*',
  name: 'NotFound',
  meta: {
    title: '页面丢了'
  },
  components: {
    HomeRouter: () => import('../components/404.vue')
  }
}

export default new Router({
  mode: 'history',
  routes: [
    // routerHome,
    routerLogin,
    routerRegister,
    // routerLocking,
    contentRouter,
    page404
  ]
})
