<script setup lang="ts">
</script>

<template>
<div>
  I am The hulk

  <router-link :to="{name: 'home'}">Home</router-link>
  <router-link :to="{name: 'about'}">About</router-link>

  <div>
    <router-view></router-view>
  </div>

</div>
</template>
