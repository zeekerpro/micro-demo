import { onMounted, watch, nextTick, getCurrentInstance } from "vue";
import { EventCenterForMicroApp } from "@micro-zoe/micro-app";
import { camelCase, upperFirst  } from "lodash-es";

export function useEventCenter(){

  // @ts-ignore
  const props = getCurrentInstance().props as SubAppProps

	const eventName = `eventCenterFor${upperFirst(camelCase(props.name))}`

  // 创建 eventCenter instance 用于和子app通信 
	function createEventCenter(){
		if(!props.name){ return }
    const eventCenter = new EventCenterForMicroApp(props.name)
		Reflect.set(
			window,
			eventName,
      eventCenter
		)
		console.log(`registor event center success: ${eventName} `)
	}

	onMounted(() => {
		createEventCenter();
	})

  return {
    eventCenter: Reflect.get(window, eventName)
  }

}
