import type { GameState } from "@/lib/game/state"
import type { UpgradeId } from "@/lib/game/upgrades"
import { upgradesById } from "@/lib/game/data"
import { unref } from "vue"

export const buyUpgrade = (state: GameState, upgrade: UpgradeId) => {
  if (
    !upgradesById[upgrade].baseCost.every(
      (cost) => state.currencies[cost.currency] >= unref(cost.amount)
    )
  ) {
    return
  }

  state.upgradesBought.add(upgradesById[upgrade])

  upgradesById[upgrade].baseCost.forEach((cost) => {
    state.currencies[cost.currency] -= unref(cost.amount)
  })
}
