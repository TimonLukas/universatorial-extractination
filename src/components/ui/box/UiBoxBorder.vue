<template lang="pug">
.ui-box-border
  .borders
    svg(:viewBox="`0 0 100 100`" width="100%" height="100%" preserveAspectRatio="none")
      path(
        d="M -100,100 l 100,0 l 0,-100 l 100,0 l 0,-500"
        vector-effect="non-scaling-stroke"
      )
    svg.highlight(:viewBox="`0 0 100 100`" width="100%" height="100%" preserveAspectRatio="none")
      path(
        d="M -100,100 l 100,0 l 0,-100 l 100,0 l 0,-500"
        vector-effect="non-scaling-stroke"
      )
</template>

<script lang="ts" setup>
import { ref } from "vue"

const props = withDefaults(defineProps<{ animated?: boolean }>(), {
  animated: true,
})

const color = ref("#444444")
</script>

<style lang="sass" scoped>
@keyframes box-border-highlight
  0%
    stroke-dashoffset: 0
  100%
    stroke-dashoffset: 800

.ui-box-border
  $padding: 1rem
  padding-left: $padding
  padding-top: $padding

  .borders
    width: 100%
    height: 100%
    position: relative

    svg
      overflow: visible
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%

      path
        fill: none
        stroke: #444444

      &.highlight
        path
          opacity: .8
          stroke: white
          stroke-dasharray: 400 400
          animation: box-border-highlight 15s infinite linear
</style>
