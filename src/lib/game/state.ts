import type { MaybeRef } from "@vueuse/core"

import { Currency } from "./currency"
import type { GeneratorNames } from "./generators"
import type { Upgrade } from "./upgrades"
import { upgradesById } from "@/lib/game/data"

type MaybeNumber = MaybeRef<number>

export type GameState = {
  currencies: Record<Currency, number>
  generators: Record<
    GeneratorNames,
    { bought: MaybeNumber; generated: MaybeNumber }
  >
  upgradesBought: Set<Upgrade>
  upgradesRevealed: Set<Upgrade>
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
  upgradesBought: new Set(),
  upgradesRevealed: new Set(),
})
