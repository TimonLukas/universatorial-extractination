<template lang="pug">
.background(:style="{ transform: universeTransformation }"): universe
.star(:style="{ transform: starTransformation }"): star(:total-radius="0.7" :brightness="0")
.content
  router-view(v-slot="{ Component }")
    keep-alive
      component(:is="Component")
</template>

<script setup lang="ts">
import Star from "@/components/Star.vue"
import Universe from "@/components/Universe.vue"

import { GameRoute, useGameRoute } from "@/router"
import { computed } from "vue"

const currentGameRoute = useGameRoute()

const universeTransformation = computed(() => {
  switch (currentGameRoute.value) {
    case GameRoute.MAIN:
      return "scale(1.25)"
    case GameRoute.SETTINGS:
      return "scale(1.01)"
  }

  return ""
})

const starTransformation = computed(() => {
  switch (currentGameRoute.value) {
    case GameRoute.MAIN:
      return "scale(1)"
    case GameRoute.SETTINGS:
      return "scale(0.01)"
  }

  return ""
})
</script>

<style lang="sass">
body
  margin: 0
  width: 100vw
  height: 100vh
  background: black
  position: relative
  overflow: hidden

  #app > *
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%

    &.background
      transition: transform 1.75s

    &.star
      transition: transform 2s ease-out
      z-index: 1

    &.content
      z-index: 10

      > *
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
</style>
