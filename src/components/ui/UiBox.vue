<template lang="pug">
.ui-box
  .border(:style="{ opacity }")
    ui-box-border.top.left
    ui-box-border.top.right
    ui-box-border.bottom.left
    ui-box-border.bottom.right
  .content: slot
</template>

<script lang="ts" setup>
import UiBoxBorder from "./box/UiBoxBorder.vue"

withDefaults(defineProps<{ opacity: number }>(), { opacity: 1 })
</script>

<style lang="sass" scoped>
.ui-box
  padding: 2rem
  position: relative
  min-height: 5rem

  .border
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: hidden
    pointer-events: none
    background: #222222
    border: 1px solid #444444
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.75), 0 0 15px black
    border-radius: 4px
    z-index: -1

    > *
      width: calc(50% - 1rem)
      height: calc(50% - 1rem)
      position: absolute
      transform: scaleX(var(--flip-x, 1)) scaleY(var(--flip-y, 1))

      &.top
        top: 0

      &.left
        left: 0

      &.right
        right: 0
        --flip-x: -1

      &.bottom
        bottom: 0
        --flip-y: -1

  .content
    z-index: 1
    color: #DDDDDD
    height: 100%
    width: 100%
</style>
