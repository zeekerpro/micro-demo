<template>
	<div>
	this is sidebar page
	{{ data }}
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// @ts-ignore
const data = window.eventCenterForSidebarApp.getData();

</script>
