<template>
<div>
  I am The hulk2

  <router-link :to="{name: 'header'}">Header</router-link>
  <router-link :to="{name: 'footer'}">Footer</router-link>

  <div>
    <router-view></router-view>
  </div>

</div>
</template>
