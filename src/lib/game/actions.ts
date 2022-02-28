import type { GameState } from "@/lib/game/state"
import type { UpgradeId } from "@/lib/game/upgrades"
import { generators, upgradesById } from "@/lib/game/data"
import { applyCosts, canAfford } from "@/lib/game/cost"
import { GeneratorNames } from "@/lib/game/generators"
import type { Prices } from "@/lib/game/values/prices"
import { unref } from "vue"
import type { MaybeRef } from "@vueuse/core"

export const buyUpgrade = (state: GameState) => (upgradeId: UpgradeId) => {
  const upgrade = upgradesById[upgradeId]

  if (!canAfford(state.currencies, upgrade.baseCost)) {
    return
  }

  state.upgradesBought.add(upgrade)

  applyCosts(state.currencies, upgrade.baseCost)
}

export const buyDrone =
  (state: GameState, droneLifetime: MaybeRef<number>, prices: Prices) => () => {
    const generator = generators[GeneratorNames.DRONE]

    if (!canAfford(state.currencies, generator.baseCost)) {
      return
    }

    state.droneLifetimes.push(unref(droneLifetime))

    applyCosts(state.currencies, prices.generators[GeneratorNames.DRONE])
  }
