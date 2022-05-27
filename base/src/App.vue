<template>
	<div id="base-container">

		<div id="sidebar-app-container">
			<sub-app
				v-if="sidebarApp"
				:name="sidebarApp?.name"
				:url="sidebarApp?.url"
				:data="sidebarAppData"
			/>
			<button @click="changeSidebarAppData">
				改个数据
			</button>
		</div>

		<template v-for="app in businessApps" :key="app.id">
			<sub-app :name="app.name" :url="app.url" :data="{}" />
		</template>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted, computed, reactive } from 'vue'

	interface AppModelType {
		id: number
		name: string
		url: string
		base: string
		type: "sidebar" | "business"
	}

	const apps = ref<Array<AppModelType>>([])

	async function getApps() {
		const ret = await fetch('http://localhost:4000/apps');
		apps.value = (await ret.json()) as Array<AppModelType>;
	}

	const sidebarApp = computed(() => apps.value.find((app) => app.type === "sidebar"))

	const businessApps = computed(() => apps.value.filter((app) => app.type === "business"))

	let sidebarAppData = reactive({
		msg: "基座给sidebar带了个话"
	})

	function changeSidebarAppData(){
		sidebarAppData.msg += "wocaole"
	}

	onMounted(() => {
		getApps()
	})
</script>
