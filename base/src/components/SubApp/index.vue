<template>
  <div>
    <micro-app
      :name="props.name"
      :url="props.url"
      inline
			disableSandbox
			@datachange="reciveData"
    />
		{{ props.data }}
  </div>
</template>

<script lang="ts" setup>
	import { ref, unref, onMounted, watch, nextTick } from "vue";
	import { EventCenterForMicroApp } from "@micro-zoe/micro-app";
	import { camelCase, functions, upperFirst  } from "lodash-es";
	import microApp from "@micro-zoe/micro-app";
  import { useCommunication } from "./hooks/useCommunication";
  import { useEventCenter } from "./hooks/useEventCenter";

  export interface SubAppProps {

    name: string,

    // todo validate
    url: string,

    data?: Record<string, unknown>

  }

	const props = defineProps<SubAppProps>()


  const { sendData, reciveData, isReady } = useCommunication()

  const { eventCenter } = useEventCenter()

</script>
