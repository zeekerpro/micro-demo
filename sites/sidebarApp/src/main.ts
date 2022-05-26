import { createApp, App as AppInstance } from 'vue'
import { createRouter, createWebHashHistory, RouterHistory, Router } from 'vue-router'
import App from './App.vue'
import routes from './router'

declare global {
  interface Window {
    eventCenterForSidebarApp: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
  }
}


// 与基座进行数据交互
function handleMicroData (router: Router) {
  // eventCenterForAppNameVite 是基座添加到window的数据通信对象
  if (window.eventCenterForSidebarApp) {
    // 主动获取基座下发的数据
    console.log('sidebarApp getData:', window.eventCenterForSidebarApp.getData())

    // 监听基座下发的数据变化
    window.eventCenterForSidebarApp.addDataListener((data: Record<string, unknown>) => {
      console.log('child-vite addDataListener:', data)
			debugger
      if (data.path && typeof data.path === 'string') {
        data.path = data.path.replace(/^#/, '')
        // 当基座下发path时进行跳转
        if (data.path && data.path !== router.currentRoute.value.path) {
          router.push(data.path as string)
        }
      }
    })

    // 向基座发送数据
    setTimeout(() => {
      window.eventCenterForSidebarApp.dispatch({ myname: 'child-vite' })
    }, 3000)
  }
}


 function fixBugForVueRouter4 (router: Router) {
  // 判断主应用是main-vue3或main-vite，因为这这两个主应用是 vue-router4
    const realBaseRoute = '/sidebarApp#'

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
  app.mount('#sidebarApp')

  console.log('mount micro sidebarApp ')

	handleMicroData(router);

  fixBugForVueRouter4(router)
}

// 将卸载操作放入 unmount 函数
function unmount () {
  app?.unmount()
  history?.destroy()
  // 卸载所有数据监听函数
  window.eventCenterForSidebarApp?.clearDataListener()
  app = null
  router = null
  history = null
  console.log('unmount micro sidebarApp')
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window['micro-app-sidebarApp'] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}
