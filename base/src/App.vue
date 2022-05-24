<template>
	<div id="base-container">
		<h1 style="color: blue">I am apps base container</h1>

		<template v-for="app in apps" :key="app.id">
			<sub-app :name="app.name" :url="app.url" />
		</template>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

interface AppModelType {
	id: number
	name: string
	url: string
	base: string
}

const apps = ref<Array<AppModelType>>([])

async function getApps() {
	const ret = await fetch('http://localhost:4000/apps');
	apps.value = (await ret.json()) as Array<AppModelType>;
}

onMounted(() => {
	getApps()
})
</script>
