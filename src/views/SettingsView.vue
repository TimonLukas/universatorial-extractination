<template lang="pug">
.view
  ui-box.settings-box
    h1 Settings
    .settings
      .row.close: ui-button(@click="router.push({ name: GameRoute.MAIN })") Close
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { UiBox, UiButton } from "@/components/ui"
import { GameRoute } from "@/router"

const router = useRouter()
</script>

<style lang="sass" scoped>
.view
  display: flex
  align-items: center
  justify-content: center
  opacity: 1

  &.view-change
    &-enter-active
      transition: opacity .75s, transform 1s ease-out

    &-leave-active
      transition: opacity .75s, transform 1s ease-in

    &-enter-from, &-leave-to
      opacity: 0
      transform: scale(2)

  .settings-box
    width: 30vw
    height: 70vh
    text-align: center
    padding: 2rem 4rem

    h1
      margin-bottom: 3rem

    .settings
      height: calc(100% - 6rem)
      display: flex
      flex-direction: column

      .row
        display: flex

        &.close
          margin-top: auto
</style>
