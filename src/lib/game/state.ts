import type { MaybeRef } from "@vueuse/core"

import { Currency } from "./currency"
import { GeneratorNames } from "./generators"
import type { Upgrade } from "./upgrades"

type MaybeNumber = MaybeRef<number>

export type GameState = {
  currencies: Record<Currency, number>
  generators: Record<
    GeneratorNames,
    { bought: MaybeNumber; generated: MaybeNumber }
  >
  upgradesBought: Set<Upgrade>
  upgradesRevealed: Set<Upgrade>
  droneLifetimes: number[]
  droneInitialLifetime: MaybeNumber
}

export const initialize = (): GameState => ({
  currencies: {
    [Currency.ENERGY]: 20,
    [Currency.THOUGHTS]: 0,
  },
  generators: {
    [GeneratorNames.DRONE]: {
      bought: 0,
      generated: 0,
    },
  },
  upgradesBought: new Set(),
  upgradesRevealed: new Set(),
  droneLifetimes: [],
  droneInitialLifetime: 15_000,
})
