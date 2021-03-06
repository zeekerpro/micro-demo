import { createApp, App as AppInstance } from 'vue'
import { createRouter, createWebHashHistory, RouterHistory, Router } from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from "./store";
import { useAppsStoreRefs } from "@/store/modules/apps";
import { AppModelType } from './models';

// is ready ，report to mainboard app
function sendReports(){
  window.eventCenterForSidebarApp.dispatch(
    { 
      myname: 'sidebarApp',
      status: 'ready'
    }
  )
}

// 与基座进行数据交互
function handleMicroData (router: Router) {
	// 数据监听器
	const dataListener = (data: Record<string, unknown>) => {

		console.log('recive data from mainboard:', data)

		// 将基座发来的子app信息数据数据存到pinia中
    const { apps } = useAppsStoreRefs();

    // @ts-ignore
    apps.value = data as AppModelType[];

		if (data.path && typeof data.path === 'string') {
			data.path = data.path.replace(/^#/, '')
			// 当基座下发path时进行跳转
			if (data.path && data.path !== router.currentRoute.value.path) {
				router.push(data.path as string)
			}
		}
	}

  // eventCenterForSidebarApp 是基座添加到window的数据通信对象
  if (window.eventCenterForSidebarApp) {
    /* 监听基座下发的数据变化
		* 因为子应用是异步渲染的，而基座发送数据是同步的，
		* 如果在子应用渲染结束前基座应用发送数据，则在绑定监听函数前数据已经发送，在初始化后不会触发绑定函数，
		* 但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。
		*/
    window.eventCenterForSidebarApp.addDataListener(dataListener, true)

    // 向基座报到
    sendReports();
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

  app.use(store)

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
