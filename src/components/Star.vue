<template lang="pug">
canvas(ref="canvas" width="1000" height="800")
img(src="@/assets/texture-sun.jpg" v-show="false" ref="sunTexture")
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  defineProps,
  computed,
  watchEffect,
} from "vue"
import { useMouse } from "@vueuse/core"

import { createShaderProgram } from "@/lib/shader"
import fragmentShader from "@/assets/star-shader-fragment.glsl?raw"
import vertexShader from "@/assets/star-shader-vertex.glsl?raw"

const canvas = ref<HTMLCanvasElement>()
const sunTexture = ref<HTMLImageElement>()

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

onMounted(async () => {
  let alive = true

  watchEffect(() => console.log(props))

  onBeforeUnmount(() => {
    alive = false
  })

  await new Promise<void>((resolve) => {
    if (sunTexture.value!.complete) {
      return resolve()
    }

    sunTexture.value!.onload = () => resolve()
  })

  const mouse = useMouse()

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
  const mouseAttribute = gl.getUniformLocation(program.value, "iMouse")
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

  const textureAttribute = gl.getUniformLocation(program.value, "iChannel0")

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

  const shaderSunTexture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, shaderSunTexture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    sunTexture.value!
  )
  gl.activeTexture(gl.TEXTURE0)

  const previousTime = ref(0)
  const totalTime = ref(0)
  function render(currentTime: number) {
    if (!alive) {
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
    gl.uniform2f(mouseAttribute, mouse.x.value, mouse.y.value)
    gl.uniform1f(timeAttribute, totalTime.value / 1000)
    gl.uniform1i(textureAttribute, 0)
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
