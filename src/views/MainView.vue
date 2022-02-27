<template lang="pug">
.view.main(:class="transitionClass")
  .ui
    ui-box(:opacity=".75").top
      .resources
        .column
          .row
            ui-icon(name="hi-solid-lightning-bolt" title="Energy" fill="yellow" :scale="1.5")
            span.number {{ game.state.currencies.energy }}
          .row
            ui-icon(name="hi-solid-chip" title="Thoughts" fill="cyan" :scale="1.5")
            span.number {{ game.state.currencies.thought }}
    ui-content-switcher-box.right(:index="contentSwitcherIndex")
      template(v-slot:tabs)
        ui-content-switcher-tab(@click="contentSwitcherIndex = 0" :active="contentSwitcherIndex === 0")
          ui-icon(v-if="isPowerUpgradeAvailable" name="hi-solid-lightning-bolt" fill="yellow" :scale="2")
          ui-icon(v-else name="hi-lightning-bolt" fill="yellow" :scale="2")
        ui-content-switcher-tab(@click="contentSwitcherIndex = 1" :active="contentSwitcherIndex === 1")
          ui-icon(v-if="isMindUpgradeAvailable" name="hi-solid-chip" fill="cyan" :scale="2")
          ui-icon(v-else name="hi-chip" fill="cyan" :scale="2")
      template(v-slot:content)
        ui-content-switcher-tab-box(:opacity=".75")
        ui-content-switcher-tab-box(:opacity=".75")
    ui-icon.settings(
      name="io-settings"
      @click="$router.push({ name: GameRoute.SETTINGS })"
      fill="white"
      animation="spin"
      speed="slow"
      :hover="true"
      :scale="3"
      title="Settings"
    )
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { GameRoute, useIsInRouteChange } from "@/router"
import { UiBox, UiIcon, UiContentSwitcherBox } from "@/components/ui"
import UiContentSwitcherTab from "@/components/ui/box/UiContentSwitcherTab.vue"
import UiContentSwitcherTabBox from "@/components/ui/box/UiContentSwitcherTabBox.vue"
import { computed, inject, ref } from "vue"
import { GAME_PROVIDE_KEY } from "@/constants"
import type { Game } from "@/lib/game"

const isInRouteChangeToSettings = useIsInRouteChange(
  GameRoute.MAIN,
  GameRoute.SETTINGS
)
const isInRouteChangeFromSettings = useIsInRouteChange(
  GameRoute.SETTINGS,
  GameRoute.MAIN
)
const transitionClass = computed(() => ({
  "to-settings": isInRouteChangeToSettings.value,
  "from-settings": isInRouteChangeFromSettings.value,
}))

const isPowerUpgradeAvailable = ref(true)
const isMindUpgradeAvailable = ref(true)

const router = useRouter()
const contentSwitcherIndex = ref(0)

const game = inject<Game>(GAME_PROVIDE_KEY)
</script>

<style lang="sass" scoped>
.view.main
  &.to-settings, &.from-settings
    &.view-change
      &-enter-from, &-leave-to
        transform: scale(0.5)
        opacity: 0

      &-enter-active
        transition-delay: .25s
        transition-duration: .75s

    transition: transform 1s ease-out, opacity 1s ease-out

  > .ui
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
      width: calc(75vw - 1.75rem)
      height: 15vh
      display: flex
      flex-direction: row

      .resources
        height: 100%
        padding-left: 1rem

    .right
      position: absolute
      top: 1rem
      right: 1rem
      width: calc(25vw - 1.75rem)
      height: calc(100vh - 2rem)

      .tabs svg
        opacity: .75

    > .settings
      position: absolute
      bottom: 1rem
      left: 1rem
      cursor: pointer
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 1px black)
</style>
