<template>
  <div id="base-container">

    <h1 style="color: blue;" > I am apps base container </h1>

    <sub-app
      name="app1"
      url="http://localhost:3001/"
    />

    <sub-app
      name="app2"
      url="http://localhost:3002/"
    />

  </div>
</template>

<script lang="ts" setup>
import microApp, { getActiveApps } from '@micro-zoe/micro-app'
</script>
