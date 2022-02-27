import type { GameState } from "../state"
import { upgrades } from "../data"
import { computed, unref, watch } from "vue"

export const useUpgrades = (state: GameState) => {
  const unbought = computed(() =>
    upgrades.filter((upgrade) => !state.upgradesBought.has(upgrade))
  )

  const revealedUpgrades = computed(() =>
    unbought.value.filter((upgrade) =>
      upgrade.revealAfter.every(
        (revealCost) =>
          state.currencies[revealCost.currency] >= unref(revealCost.amount)
      )
    )
  )

  const buyableUpgrades = computed(() =>
    revealedUpgrades.value.filter((upgrade) =>
      upgrade.baseCost.every(
        (cost) => state.currencies[cost.currency] >= unref(cost.amount)
      )
    )
  )

  watch(
    revealedUpgrades,
    () => {
      revealedUpgrades.value.forEach((upgrade) =>
        state.upgradesRevealed.add(upgrade)
      )
    },
    { immediate: true }
  )

  return {
    buyableUpgrades,
    revealedUpgrades,
  }
}
