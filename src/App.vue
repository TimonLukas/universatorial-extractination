<template lang="pug">
.background(:style="{ transform: universeTransformation }"): universe
.star(:style="{ transform: starTransformation }"): star(:total-radius="0.5" :brightness="0" :speed-factor="-2")
.content(@click="startMusic")
  router-view(v-slot="{ Component, route }")
    transition(name="view-change")
      keep-alive
        component(:is="Component" :key="route.name")
</template>

<script setup lang="ts">
import { Star, Universe } from "@/components"

import { GameRoute, useGameRoute } from "@/router"
import { useSettingsStore } from "@/stores"
import { computed } from "vue"

const store = useSettingsStore()
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

function startMusic() {
  store.initializeMusic()
}
</script>

<!--suppress CssUnknownTarget -->
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&family=Red+Hat+Mono:wght@300&display=swap')

body
  margin: 0
  width: 100vw
  height: 100vh
  background: black
  position: relative
  overflow: hidden
  font-family: "Nunito", sans-serif

  *
    box-sizing: border-box

  #app > *
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%

    &.background
      transition: transform 1.5s

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
