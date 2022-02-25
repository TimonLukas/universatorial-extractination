<template lang="pug">
.ui-slider
  label {{ label }}:
    span {{ formattedValue }}
  custom-slider(v-model="model" :min="min" :max="max" :interval="step" :tooltip-formatter="formatter" ref="slider")
</template>

<script lang="ts" setup>
import { useVModel, useCssVar } from "@vueuse/core"
import { computed, ref, watch } from "vue"
import CustomSlider from "vue-slider-component"

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: number
    min?: number
    max?: number
    step?: number
    unit?: string
    type?: "percentage"
    formatter?: (value: number) => string
  }>(),
  {
    min: 0,
    max: 1,
    step: 0.01,
  }
)
const emit = defineEmits(["update:modelValue"])
const slider = ref<CustomSlider>()
const sliderEl = computed(() => slider.value?.$el)

const model = useVModel(props, "modelValue", emit)

const formatter = computed(() => {
  if (props.type === "percentage") {
    return (value: number) => `${Math.round(value * 100)}%`
  }

  if (typeof props.formatter !== "undefined") {
    return props.formatter
  }

  return (value: number) => `${value}`
})

const formattedValue = computed(() => formatter.value(model.value))

const tooltipSize = useCssVar("--tooltip-size", sliderEl)
watch(model, () => {
  tooltipSize.value = (() => {
    switch (formattedValue.value.length) {
      case 3:
        return "2.25rem"
      case 4:
        return "2.5rem"
      case 5:
        return "2.75rem"
    }
    return "2rem"
  })()
})
</script>

<style lang="sass">
$themeColor: #659ac1
$bgColor: #c7dae1
$tooltipSize: var(--tooltip-size)
@import '~vue-slider-component/lib/theme/material.scss'

.ui-slider
  flex-grow: 1
  display: flex
  gap: 2rem

  label
    flex: 1
    min-width: 15rem
    text-align: left
    display: flex

    span
      margin-left: auto

  .vue-slider
    flex: 1
    --tooltip-size: 2.5rem

    .vue-slider-dot-tooltip
      pointer-events: none
</style>
