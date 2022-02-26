<template lang="pug">
.view
  ui-box(:opacity=".9").settings-box
    transition(name="fade-slide")
      .credits-box-content(v-if="showCredits")
        h1 Credits
        .credits
          .row
            h3 Star shader
            .text Based on
              a(href="https://www.shadertoy.com/view/4dXGR4" target="_blank") #[b Main Sequence Star] by #[b flight404] on #[i Shadertoy]
          .row
            h3 Universe shader
            .text Based on
              a(href="https://www.shadertoy.com/view/MslGWN" target="_blank") #[b Simplicity Galaxy] by #[b CBS] on #[i Shadertoy]
          .row
            h3 Music
            .text Generative music using
              a(href="https://generative.fm/" target="_blank") #[b generative.fm]
          .row.gap: ui-button(icon="HiChevronLeft" @click="showCredits = false" type="secondary") Back
      .settings-box-content(v-else)
        h1 Settings
        .settings
          .row
            ui-button(icon="HiUpload") Export save
            ui-button(icon="HiDownload" ) Import save
          .row.gap: ui-slider(type="percentage" v-model="settings.state.volumes.music" label="Music volume" unit="%")
          .row:     ui-slider(type="percentage" v-model="settings.state.volumes.soundEffects" label="Sound effect volume" unit="%")
          .row:     ui-slider(type="percentage" v-model="settings.state.volumes.master" label="Master volume" unit="%")
          .row:     ui-slider(type="percentage" v-model="settings.state.shaderSuperSamplingFactor" label="Shader supersampling" unit="%" :min=".5" :max="1.5")
          .row.gap: ui-button(icon="HiDocumentText" @click="showCredits = true") Credits
          .row:     ui-button(icon="HiLogout" @click="router.push({ name: GameRoute.MAIN })" type="secondary") Close
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { UiBox, UiButton, UiSlider } from "@/components/ui"
import { GameRoute } from "@/router"
import { useSettingsStore } from "@/stores"
import { ref } from "vue"

const showCredits = ref(false)

const settings = useSettingsStore()
const router = useRouter()
</script>

<style lang="sass">
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
    overflow: hidden

    .content
      position: relative

      > *
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%

    .credits-box-content
      height: 100%
      transition: transform .25s, opacity .2s

      &.fade-slide
        &-enter-from, &-leave-to
          transform: translateY(5%)
          opacity: 0

        &-enter-active
          transition-timing-function: ease-out
          transition-delay: .2s, .25s

        &-leave-active
          transition-timing-function: ease-in

    .settings-box-content
      height: 100%
      transition: transform .25s, opacity .2s

      &.fade-slide
        &-enter-from, &-leave-to
          transform: translateY(-5%)
          opacity: 0

        &-enter-active
          transition-timing-function: ease-out
          transition-delay: .2s, .25s

        &-leave-active
          transition-timing-function: ease-in

    h1
      margin-bottom: 3rem

    .settings, .credits
      height: calc(100% - 8.5rem)
      display: flex
      flex-direction: column

      .row
        display: flex
        gap: 2rem

        &:not(:last-child)
          margin-bottom: 2rem

        &.gap
          margin-top: auto

    .credits .row
      flex-direction: column
      text-align: left
      gap: .5rem

      h3
        margin: 0

      a
        color: white
        margin-left: .5rem
</style>
