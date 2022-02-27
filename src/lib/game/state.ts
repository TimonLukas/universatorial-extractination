import type { MaybeRef } from "@vueuse/core"

import { Currency } from "./currency"
import type { GeneratorNames } from "./generators"
import { UpgradeId } from "./upgrades"

type MaybeNumber = MaybeRef<number>

export type GameState = {
  currencies: Record<Currency, number>
  generators: Record<
    GeneratorNames,
    { bought: MaybeNumber; generated: MaybeNumber }
  >
  upgradesBought: Record<UpgradeId, boolean>
  upgradesRevealed: Record<UpgradeId, boolean>
}

export const initialize = (): GameState => ({
  currencies: {
    [Currency.ENERGY]: 0,
    [Currency.THOUGHTS]: 0,
  },
  generators: {
    drone: {
      bought: 0,
      generated: 0,
    },
  },
  upgradesBought: {
    [UpgradeId._01INITIAL_ENERGY]: false,
  },
  upgradesRevealed: {
    [UpgradeId._01INITIAL_ENERGY]: false,
  },
})
