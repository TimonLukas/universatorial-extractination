<template lang="pug">
.view
  ui-box.settings-box
    h1 Settings
    .settings
      .row
        ui-button(icon="HiUpload") Export save
        ui-button(icon="HiDownload" ) Import save
      .row.gap: ui-slider(type="percentage" v-model="settings.state.volumes.music" label="Music volume" unit="%")
      .row:     ui-slider(type="percentage" v-model="settings.state.volumes.soundEffects" label="Sound effect volume" unit="%")
      .row:     ui-slider(type="percentage" v-model="settings.state.volumes.master" label="Master volume" unit="%")
      .row.gap: ui-button(icon="HiDocumentText") Credits
      .row:     ui-button(icon="HiLogout" @click="router.push({ name: GameRoute.MAIN })" type="secondary") Close
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { UiBox, UiButton, UiSlider } from "@/components/ui"
import { GameRoute } from "@/router"
import { useSettingsStore } from "@/stores"

const settings = useSettingsStore()
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
    width: 40vw
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
        gap: 2rem

        &:not(:last-child)
          margin-bottom: 2rem

        &.gap
          margin-top: auto
</style>
