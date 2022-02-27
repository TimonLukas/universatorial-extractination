<template lang="pug">
ui-button.upgrade-tile(:disabled="game ? !unref(game.upgrades.buyableUpgrades).includes(upgrade) : false")
  .content
    .name {{ upgrade.name }}
    .description {{ upgrade.description }}
  .cost
    upgrade-tile-cost(v-for="cost in upgrade.baseCost" :key="upgrade.id" :cost="cost")
    upgrade-tile-bonus(:upgrade="upgrade")
</template>

<script lang="ts" setup>
import UpgradeTileBonus from "./UpgradeTileBonus.vue"
import UpgradeTileCost from "./UpgradeTileCost.vue"
import type { Upgrade } from "@/lib/game/upgrades"
import { UiButton } from "@/components/ui"
import { inject } from "vue"
import { GAME_PROVIDE_KEY } from "@/constants"
import type { Game } from "@/lib/game"
import { unref } from "vue"

const game = inject<Game>(GAME_PROVIDE_KEY)

defineProps<{ upgrade: Upgrade }>()
</script>

<style lang="sass" scoped>
.upgrade-tile
  width: 100%
  text-align: left
  padding-bottom: .5rem
  flex-direction: row
  display: flex
  justify-content: space-between
  margin-bottom: 1rem

  .content
    display: flex
    flex-direction: column

  .description
    font-size: .9rem
    opacity: .75

  .cost
    text-align: right
</style>
