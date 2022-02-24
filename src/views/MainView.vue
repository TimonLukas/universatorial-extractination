<template lang="pug">
.view
  .ui
    button.settings(@click="$router.push({ name: GameRoute.SETTINGS })") Go to settings
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { GameRoute } from "@/router"

const router = useRouter()
</script>

<style lang="sass" scoped>
.view
  .ui
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%

    .settings
      position: absolute
      bottom: 1rem
      right: 1rem
</style>
