<template>
	<div id="base-container">
		<template v-for="app in apps" :key="app.id">
			<sub-app :name="app.name" :url="app.url" />
		</template>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

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

	console.log(apps.value)
}

onMounted(() => {
	getApps()
})
</script>
