<template lang="pug">
.ui-content-switcher-tab(ref="tab" :class="{ active }"): slot
</template>

<script lang="ts" setup>
import { useElementSiblingIndex } from "@/lib/element"
import { ref, VueElement, watch } from "vue"
import { useCssVar } from "@vueuse/core"

const tab = ref<VueElement>()
const index = useElementSiblingIndex(tab)
const nthCssVar = useCssVar("--nth", tab)

watch(
  index,
  () => {
    nthCssVar.value = `${index.value}`
  },
  { immediate: true }
)

defineProps<{ active: boolean }>()
</script>

<style lang="sass" scoped>
.ui-content-switcher-tab
  display: flex
  flex-direction: row
  background: #222222
  border: 1px solid #444444
  border-bottom: none
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5)
  transition: background .5s
  align-items: center
  justify-content: center

  &:not(:last-child)
    border-right: none

  &:hover
    background: #333333
    cursor: pointer

  &.active
    background: #303030
</style>
