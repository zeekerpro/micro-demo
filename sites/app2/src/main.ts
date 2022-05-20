import { createApp, App as AppInstance } from 'vue'
import { createRouter, createWebHashHistory, RouterHistory, Router } from 'vue-router'
import App from './App.vue'
import routes from './router'

declare global {
  interface Window {
    eventCenterForAppNameVite: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
  }
}

 function fixBugForVueRouter4 (router: Router) {
  // 判断主应用是main-vue3或main-vite，因为这这两个主应用是 vue-router4
    const realBaseRoute = '/app2#'

     router.beforeEach(() => {
       if (typeof window.history.state?.current === 'string') {
         window.history.state.current = window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '')
       }
     })

     router.afterEach(() => {
       if (typeof window.history.state === 'object') {
         window.history.state.current = realBaseRoute +  (window.history.state.current || '')
       }
     })
 }


let app: AppInstance | null = null
let router: Router | null = null
let history: RouterHistory | null = null
// 将渲染操作放入 mount 函数
function mount () {
  history = createWebHashHistory()
  router = createRouter({
    history,
    routes,
  })

  app = createApp(App)
  app.use(router)
  app.mount('#app2')

  console.log('mount micro app2')

  // fixBugForVueRouter4(router)
}

// 将卸载操作放入 unmount 函数
function unmount () {
  app?.unmount()
  history?.destroy()
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener()
  app = null
  router = null
  history = null
  console.log('unmount micro app2')
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window['micro-app-app2'] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}
