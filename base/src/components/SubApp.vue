<template>
  <div>
    <micro-app
      :name="props.name"
      :url="props.url"
			:data="props.data"
      inline
			disableSandbox
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

	onMounted(() => {
		createEventCenter();
	})

	watch(
		() => props.data,
		async (newValue) => {
			// 发送数据给子应用 ${ props.name }，setData第二个参数只接受对象类型
			await nextTick();
			microApp.setData(props.name, Object.assign({}, newValue));
		},
		{
			deep: true
		}
	)

</script>
