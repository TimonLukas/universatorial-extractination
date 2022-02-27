<template lang="pug">
.cost
  .number {{ format(cost.amount) }}
  .icon
    ui-icon(v-if="cost.currency === Currency.ENERGY" name="hi-solid-lightning-bolt" title="Energy" fill="yellow")
    ui-icon(v-if="cost.currency === Currency.THOUGHTS" name="hi-solid-chip" title="Thoughts" fill="cyan")
</template>

<script lang="ts" setup>
import { format } from "@/lib/formatter"
import type { Cost } from "@/lib/game/cost"
import { UiIcon } from "@/components/ui"
import { Currency } from "@/lib/game/currency"

defineProps<{ cost: Cost }>()
</script>

<style lang="sass" scoped>
.cost
  display: flex
  flex-direction: row
  gap: .5rem
  justify-content: end
</style>
