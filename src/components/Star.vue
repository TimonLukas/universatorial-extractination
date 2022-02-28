<template lang="pug">
canvas(
  ref="canvas"
  :width="width * uiStore.state.shaderSuperSamplingFactor"
  :height="height * uiStore.state.shaderSuperSamplingFactor"
)
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed, unref } from "vue"
import { useElementSize } from "@vueuse/core"

import { createShaderProgram } from "@/lib/shader"
import fragmentShader from "@/assets/star-shader-fragment.glsl?raw"
import vertexShader from "@/assets/star-shader-vertex.glsl?raw"
import { useSettingsStore } from "@/stores"

const canvas = ref<HTMLCanvasElement>()
const { width, height } = useElementSize(canvas)

const sunTexture = ref<HTMLImageElement>()

const uiStore = useSettingsStore()

const props = withDefaults(
  defineProps<{
    speedFactor?: number
    brightness?: number
    coronaFactor?: number
    sphereRadius?: number
    totalRadius?: number
    glowFactor?: number
  }>(),
  {
    speedFactor: 1,
    brightness: 0,
    coronaFactor: 1,
    sphereRadius: 1,
    totalRadius: 1,
    glowFactor: 1,
  }
)

const speedFactor = computed(() =>
  Math.max(Math.pow(props.speedFactor + 10, 2) / 100, 0.01)
)

onMounted(() => {
  let alive = true

  onBeforeUnmount(() => {
    alive = false
  })

  const glCtx = canvas.value!.getContext("webgl")

  if (glCtx === null) {
    return
  }

  const gl = glCtx as WebGLRenderingContext

  const program = createShaderProgram(gl, vertexShader, fragmentShader)

  if (program.isErr) {
    return console.error(program.error)
  }

  const positionAttribute = gl.getAttribLocation(program.value, "a_position")
  const resolutionAttribute = gl.getUniformLocation(
    program.value,
    "iResolution"
  )
  const timeAttribute = gl.getUniformLocation(program.value, "iTime")
  const brightnessAttribute = gl.getUniformLocation(
    program.value,
    "iBrightness"
  )
  const coronaFactorAttribute = gl.getUniformLocation(
    program.value,
    "iCoronaFactor"
  )
  const sphereRadiusAttribute = gl.getUniformLocation(
    program.value,
    "iSphereRadius"
  )
  const totalRadiusAttribute = gl.getUniformLocation(
    program.value,
    "iTotalRadius"
  )
  const glowFactorAttribute = gl.getUniformLocation(
    program.value,
    "iGlowFactor"
  )

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1,
      -1, // first triangle
      1,
      -1,
      -1,
      1,
      -1,
      1, // second triangle
      1,
      -1,
      1,
      1,
    ]),
    gl.STATIC_DRAW
  )

  const previousTime = ref(0)
  const totalTime = ref(0)
  function render(currentTime: number) {
    if (!alive) {
      console.log("stopping rendering star :(")
      return
    }

    totalTime.value += (currentTime - previousTime.value) * speedFactor.value
    previousTime.value = currentTime

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.useProgram(program.value)
    gl.enableVertexAttribArray(positionAttribute)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0)
    gl.uniform2f(resolutionAttribute, gl.canvas.width, gl.canvas.height)
    gl.uniform1f(timeAttribute, unref(totalTime) / 1e3)
    gl.uniform1f(brightnessAttribute, props.brightness)
    gl.uniform1f(coronaFactorAttribute, props.coronaFactor)
    gl.uniform1f(sphereRadiusAttribute, props.sphereRadius)
    gl.uniform1f(totalRadiusAttribute, props.totalRadius)
    gl.uniform1f(glowFactorAttribute, props.glowFactor)

    gl.drawArrays(gl.TRIANGLES, 0, 6)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
})
</script>

<style lang="sass" scoped>
canvas
  width: 100%
  height: 100%
</style>
