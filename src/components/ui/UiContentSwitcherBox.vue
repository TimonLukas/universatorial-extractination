<template lang="pug">
.ui-content-switcher-box(ref="switcher")
  .tabs: slot(name="tabs")
  .content: slot(name="content")
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { useCssVar } from "@vueuse/core"

const props = defineProps<{ index: number }>()

const switcher = ref<HTMLDivElement>()
const switcherIndexVar = useCssVar("--switcher-index", switcher)

watch(
  () => props.index,
  () => {
    switcherIndexVar.value = `${props.index}`
  }
)
</script>

<style lang="sass">
.ui-content-switcher-box
  display: flex
  flex-direction: column
  --switcher-index: 0

  .tabs
    height: 5rem
    width: 100%
    display: flex
    flex-direction: row

    > *
      flex: 1

      &:first-child
        border-top-left-radius: 4px

      &:last-child
        border-top-right-radius: 4px

  > .content
    position: relative
    height: 100%
    display: flex
    flex-direction: row
    border: 1px solid #444444
    border-bottom-left-radius: 4px
    border-bottom-right-radius: 4px
    overflow: hidden

    > *
      position: absolute
      height: 100%
      width: 100%
      top: 0
      left: calc(var(--nth, 0) * 100%)

      .border
        border-radius: 0
        border: none

        &:not(:last-child)
          border-right: initial
</style>
