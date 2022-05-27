<template>
  <div>
    <micro-app
      :name="props.name"
      :url="props.url"
			:data="props.data"
      inline
			disableSandbox
			@datachange="handleDataChange"
    />
		{{ props.data }}
  </div>
</template>

<script lang="ts" setup>
	import { ref, unref, toRaw, onMounted, watch, watchEffect, nextTick } from "vue";
	import { EventCenterForMicroApp } from "@micro-zoe/micro-app";
	import { camelCase, upperFirst  } from "lodash-es";
	import microApp from "@micro-zoe/micro-app";

	const props = defineProps({
		name: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		},
		data: {
			type: Object,
			required: false,
		}
	})

	function createEventCenter(){
		if(!props.name){ return }
		const eventName = `eventCenterFor${upperFirst(camelCase(props.name))}`
		console.log(`注册${eventName}成功`)
		Reflect.set(
			window,
			eventName,
			new EventCenterForMicroApp(props.name)
		)
	}

	function handleDataChange(e){
		const { data } = e.detail;
		console.log(`收到来自app: ${props.name} 的信息: `, data);
	}

	onMounted(() => {
		createEventCenter();
	})

	watch(
		() => props.data,
		async (newValue) => {
			await nextTick();
			/**
			* 发送数据给子应用 ${ props.name }，setData第二个参数只接受对象类型
					1、data只接受对象类型
					2、数据变化时会进行严格对比(===)，相同的data对象不会触发更新。
					TODO: 3、在子应用卸载时，子应用中所有的数据绑定函数会自动解绑，基座应用中的数据解绑需要开发者手动处理。
			*/
			microApp.setData(props.name, Object.assign({}, newValue));
		},
		{
			deep: true
		}
	)

</script>
