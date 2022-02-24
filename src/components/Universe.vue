<template lang="pug">
canvas(ref="canvas" :width="width" :height="height")
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useElementSize } from "@vueuse/core"

import { createShaderProgram } from "@/lib/shader"
import fragmentShader from "@/assets/universe-shader-fragment.glsl?raw"
import vertexShader from "@/assets/universe-shader-vertex.glsl?raw"

const canvas = ref<HTMLCanvasElement>()
const { width, height } = useElementSize(canvas)

onMounted(async () => {
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
      return
    }

    totalTime.value += currentTime - previousTime.value
    previousTime.value = currentTime

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.useProgram(program.value)
    gl.enableVertexAttribArray(positionAttribute)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0)
    gl.uniform2f(resolutionAttribute, gl.canvas.width, gl.canvas.height)
    gl.uniform1f(timeAttribute, currentTime / 1e5)

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
