<template lang="pug">
.bonus {{ description }}
</template>

<script lang="ts" setup>
import type { Upgrade } from "@/lib/game/upgrades"
import { computed } from "vue"
import { format } from "@/lib/formatter"

const props = defineProps<{ upgrade: Upgrade }>()

const description = computed(() => {
  const { type, target, value } = props.upgrade
  const verb = type === "base" ? "Increase" : "Multiply"
  const targetPrefix = type === "base" ? "base" : "total"

  return `${verb} ${targetPrefix} ${target} income by ${format(value)}`
})
</script>

<style lang="sass" scoped>
.bonus
  font-size: .8rem
</style>
