<template>
	<div>
	this is sidebar page

    <template
      v-for="app in apps"
      :key="app.id"
    >
      <div>
        <button>
          app1
        </button>
      </div>
    </template>

	</div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import { useAppsStoreRefs } from "@/store/modules/apps";
import { AppModelType } from "./models";

const { apps } = useAppsStoreRefs();

</script>
