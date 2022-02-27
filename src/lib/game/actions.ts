import type { GameState } from "@/lib/game/state"
import type { UpgradeId } from "@/lib/game/upgrades"
import { generators, upgradesById } from "@/lib/game/data"
import { applyCosts, canAfford } from "@/lib/game/cost"
import { GeneratorNames } from "@/lib/game/generators"
import type { Prices } from "@/lib/game/values/prices"

const DRONE_BASE_LIFETIME_IN_MS = 15 * 1000

export const buyUpgrade = (state: GameState, upgradeId: UpgradeId) => {
  const upgrade = upgradesById[upgradeId]

  if (!canAfford(state.currencies, upgrade.baseCost)) {
    return
  }

  state.upgradesBought.add(upgrade)

  applyCosts(state.currencies, upgrade.baseCost)
}

export const buyDrone = (state: GameState, prices: Prices) => {
  const generator = generators[GeneratorNames.DRONE]

  if (!canAfford(state.currencies, generator.baseCost)) {
    return
  }

  state.droneLifetimes.push(DRONE_BASE_LIFETIME_IN_MS)

  applyCosts(state.currencies, prices.generators[GeneratorNames.DRONE])
}
