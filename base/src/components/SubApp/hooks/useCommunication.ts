import { ref, unref, toRaw, onMounted, watch, watchEffect, nextTick, getCurrentInstance, PropType } from "vue";
import { EventCenterForMicroApp } from "@micro-zoe/micro-app";
import { camelCase, functions, upperFirst  } from "lodash-es";
import microApp from "@micro-zoe/micro-app";
import { SubAppProps } from "../types";

export function useCommunication(){

  // @ts-ignore
  const props = getCurrentInstance().props as SubAppProps

  const isReady = ref(false)

  // 发送数据给子应用 ${ props.name }，setData第二个参数只接受对象类型
  function sendData(){
    /**
        1、data只接受对象类型
        2、数据变化时会进行严格对比(===)，相同的data对象不会触发更新。
        TODO: 3、在子应用卸载时，子应用中所有的数据绑定函数会自动解绑，基座应用中的数据解绑需要开发者手动处理。
    */
    const data = Object.assign({}, unref(props.data?.value))
    console.log(`mainboard is going to send data to ${ props.name }, data: `, data)
    microApp.setData(props.name, data )
  }

  // 接收来自子app发送的数据
	function reciveData(e){
		const { data } = e.detail;
		console.log(`mainboard recived data from ${props.name}, data:  `, data);
    if(data.status == 'ready'){
      isReady.value = true;
    }
	}

	watch(
		() => props.data,
		async (newValue) => {
			// await nextTick()
      sendData()
		},
		{
			deep: true
		}
	)

  // 子app准备就绪，发送数据
  watch(() => isReady.value, () => {
    if(isReady.value){
      sendData()
    }
  })

  return {
    sendData,
    reciveData,
    isReady
  }

}
