<template lang="pug">
button.ui-button(:class="type")
  span.icon(v-if="icon"): ui-icon(:name="icon")
  slot
</template>

<script lang="ts" setup>
import UiIcon from "./UiIcon"
import type { icons } from "./UiIcon"

type PossibleIcons = keyof typeof icons
withDefaults(
  defineProps<{
    icon?: PossibleIcons
    type?: "primary" | "secondary"
  }>(),
  { type: "primary" }
)
</script>

<style lang="sass" scoped>
// Based on https://codepen.io/cobra_winfrey/pen/mdJeqZb

$gradient1: linear-gradient(to right, var(--border-color) 0%,  var(--border-color) 100%)
$gradient2: linear-gradient(to top,   var(--border-color) 50%, transparent 50%)
$gradient3: linear-gradient(to top,   var(--border-color) 50%, transparent 50%)
$gradient4: linear-gradient(to right, var(--border-color) 0%,  var(--border-color) 100%)
$gradient5: linear-gradient(to left,  var(--border-color) 0%,  var(--border-color) 100%)

.ui-button
  position: relative
  color: #EEEEEE
  padding: 1rem
  background: #333333
  border: 1px solid #555555
  text-align: center
  flex-grow: 1
  cursor: pointer
  transition: background var(--transition-duration)
  box-shadow: 0 .15rem 10px rgba(0, 0, 0, 0.75)
  font-family: "Nunito", sans-serif
  font-size: 1rem

  --border-width: 2px
  --border-color: #888888
  --hover-background-color: #444444
  --transition-duration: 0.25s
  --transition-direction: 0

  &.secondary
    background: #555555
    border-color: #777777
    --border-color: #AAAAAA
    --hover-background-color: #666666
    --transition-direction: 1

  &:before
    filter: blur(2px)
    content: ""
    position: absolute
    width: calc(100% + var(--border-width) * 2)
    height: calc(100% + var(--border-width) * 2)
    top: calc(-1 * var(--border-width))
    left: calc(-1 * var(--border-width))
    background-image: $gradient1, $gradient2, $gradient3, $gradient4, $gradient5
    background-size: 100% var(--border-width), var(--border-width) 200%, var(--border-width) 200%, 0 var(--border-width), 0 var(--border-width)
    background-position: 50% 100%, 0 0, 100% 0, 100% 0, 0 0
    background-repeat: no-repeat
    transform: scaleX(0) rotate(calc(var(--transition-direction) * 180deg))
    transition: transform var(--transition-duration) ease-in-out calc(var(--transition-duration) * 2), background-position var(--transition-duration) ease-in-out var(--transition-duration), background-size var(--transition-duration) ease-in-out 0s

  &:hover
    background: var(--hover-background-color)

    &:before
      background-size: 200% var(--border-width), var(--border-width) 400%, var(--border-width) 400%, 55% var(--border-width), 55% var(--border-width)
      background-position: 50% 100%, 0 100%, 100% 100%, 100% 0, 0 0
      transform: scaleX(1) rotate(calc(var(--transition-direction) * 180deg))
      transition-delay: 0s, var(--transition-duration), calc(var(--transition-duration) * 2)

  .icon
    opacity: .75
    display: inline-block
    transform-origin: right center
    transform: translateX(-.5rem) scale(1.25)
</style>
