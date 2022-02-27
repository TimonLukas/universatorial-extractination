<template lang="pug">
ui-box(:opacity="opacity" ref="box").ui-content-switcher-tab-box: slot
</template>

<script lang="ts" setup>
import UiBox from "./../UiBox.vue"
import { useElementSiblingIndex } from "@/lib/element"
import { ref, VueElement, watch } from "vue"
import { useCssVar } from "@vueuse/core"

const box = ref<VueElement>()
const index = useElementSiblingIndex(box)
const nthCssVar = useCssVar("--nth", box)

watch(
  index,
  () => {
    nthCssVar.value = `${index.value}`
  },
  { immediate: true }
)

withDefaults(defineProps<{ opacity: number }>(), { opacity: 1 })
</script>

<style lang="sass" scoped>
.ui-content-switcher-tab-box
  display: flex
  flex-direction: row
  transform: translateX(calc(var(--switcher-index, 0) * -100%))
  transition: transform .5s
</style>
