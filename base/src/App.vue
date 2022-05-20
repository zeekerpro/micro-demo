<template>
  <div id="base-container">

    <h1 style="color: blue;" > I am apps base container </h1>

    <micro-app
      name="app1"
      url="http://localhost:3001/sites/app1/"
      inline disableSndbox
    />

    <micro-app
      name="app2"
      url="http://localhost:3002/sites/app2/"
      inline disableSndbox
    />

  </div>
</template>

<script lang="ts" setup>
import microApp, { getActiveApps } from '@micro-zoe/micro-app'
</script>

<style>
#base-container {
  height: 100vh;
  width: 100vw;
  background: gray;
}

body {
    margin: 0;
  }
</style>
