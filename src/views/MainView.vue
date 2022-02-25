<template lang="pug">
.view
  .ui
    ui-box.top
      .resources
        .column
          .row
            ui-icon(name="hi-solid-lightning-bolt" fill="yellow" :scale="1.5")
            span.number 0.01
          .row
            ui-icon(name="hi-solid-chip" fill="cyan" :scale="1.5")
            span.number 0.01
    ui-box.right
    button.settings(@click="$router.push({ name: GameRoute.SETTINGS })") Go to settings
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { GameRoute } from "@/router"
import { UiBox, UiIcon } from "@/components/ui"

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

    .number
      font-family: "Red Hat Mono", monospace
      font-size: 1.5rem
      padding-left: .75rem

    .column
      display: flex
      flex-direction: column
      height: 100%
      justify-content: space-between

    .top
      position: absolute
      top: 1rem
      left: 1rem
      width: calc(75vw - 1.5rem)
      height: 15vh
      display: flex
      flex-direction: row

      .resources
        height: 100%

    .right
      position: absolute
      top: 1rem
      right: 1rem
      width: calc(25vw - 1.5rem)
      height: calc(100vh - 2rem)

    button.settings
      position: absolute
      bottom: 1rem
      left: 1rem
</style>
