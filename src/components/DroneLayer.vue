<template lang="pug">
canvas(
  ref="canvas"
  :width="width"
  :height="height"
).drones
</template>

<script lang="ts" setup>
import {
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  watch,
  watchEffect,
} from "vue"
import { useElementSize } from "@vueuse/core"
import { GAME_PROVIDE_KEY } from "@/constants"
import type { Game } from "@/lib/game"

const SUN_RADIUS = 0.25

const canvas = ref<HTMLCanvasElement>()
const { width, height } = useElementSize(canvas)

const game = inject<Game>(GAME_PROVIDE_KEY)

const stationSizeInPx = ref(15)

onMounted(() => {
  const alive = ref(true)

  if (typeof canvas.value === "undefined") {
    throw new Error("Canvas is not available?!")
  }

  const ctx = canvas.value!.getContext("2d")!

  function render() {
    ctx.clearRect(0, 0, unref(width), unref(height))

    // render station itself
    ctx.fillStyle = "black"
    ctx.fillRect(
      (0.5 - SUN_RADIUS) * width.value,
      0.5 * height.value,
      stationSizeInPx.value,
      stationSizeInPx.value
    )

    ctx.fillStyle = "red"
    ctx.fillRect(
      (0.5 - SUN_RADIUS) * width.value + 6,
      0.5 * height.value + 6,
      3,
      3
    )

    // render drones
    ctx.fillStyle = "black"
    game?.state.droneLifetimes.forEach((remainingLifetime) => {
      const angle = -(0.5 * (15_000 - remainingLifetime)) / 1000
      const radiusFraction = Math.min(
        Math.tanh(remainingLifetime / 15_000) + 0.25,
        1
      )

      ctx.fillRect(
        (0.5 - Math.cos(angle) * SUN_RADIUS * radiusFraction) * width.value,
        0.5 * height.value -
          Math.sin(angle) * SUN_RADIUS * radiusFraction * width.value,
        3,
        3
      )
    })

    if (alive.value) {
      requestAnimationFrame(render)
    }
  }

  render()

  onBeforeUnmount(() => {
    alive.value = false
  })
})
</script>
