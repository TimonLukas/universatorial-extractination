<template lang="pug">
.content: star(:total-radius="0.7" :brightness="0")
.background: universe
</template>

<script setup lang="ts">
import Star from "@/components/Star.vue"
import Universe from "@/components/Universe.vue"
</script>

<style lang="sass">
body
  margin: 0
  width: 100vw
  height: 100vh
  background: black
  position: relative

  #app > *
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%

    &.content
      z-index: 1
</style>
