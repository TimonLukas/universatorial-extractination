import { useMutationObserver, unrefElement } from "@vueuse/core"
import type { MaybeElementRef } from "@vueuse/core"
import { onBeforeUnmount, onMounted, ref, watch } from "vue"

export function useElementSiblingIndex(element: MaybeElementRef) {
  const index = ref(0)
  const mounted = ref(false)

  function updateIndex() {
    if (!mounted.value) {
      return
    }

    const rawElement = unrefElement(element)

    if (typeof rawElement === "undefined") {
      return
    }

    const parent = rawElement.parentNode
    const children = Array.from(parent?.children || [])

    index.value = children.indexOf(rawElement)
  }
  const { stop } = useMutationObserver(element, updateIndex, {
    childList: true,
  })
  const stopWatch = watch(() => element, updateIndex)

  onMounted(() => {
    mounted.value = true

    updateIndex()
  })

  onBeforeUnmount(() => {
    stop()
    stopWatch()
  })

  return index
}
