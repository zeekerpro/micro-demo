<template>
  <div>
    <micro-app
      :name="props.name"
      :url="props.url"
      inline disableSndbox
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    requited: true
  },
  url: {
    type: String,
    requited: true
  }
})

</script>
