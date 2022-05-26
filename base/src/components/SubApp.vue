<template>
  <div>
    <micro-app
      :name="props.name"
      :url="props.url"
			:data="props.data"
      inline
			disableSandbox
    />
  </div>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from "vue";
	import type { PropType  } from "vue";
	import { EventCenterForMicroApp } from "@micro-zoe/micro-app";
	import { camelCase, upperFirst  } from "lodash-es";

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
			required: false
		}
	})

	const emit = defineEmits(["update:data"])

	function createEventCenter(){
		if(!props.name){ return }
		const eventName = `eventCenterFor${upperFirst(camelCase(props.name))}`
		console.log(eventName)
		Reflect.set(
			window,
			eventName,
			new EventCenterForMicroApp(props.name)
		)
	}

	function changeData(){
		emit("update:data", {msg: "改了一下，哈哈哈"});
	}

	onMounted(() => {
		createEventCenter();
	})

</script>
