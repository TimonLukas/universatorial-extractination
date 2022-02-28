import type { GameState } from "../state"
import { usePrices } from "./prices"
import type { Prices } from "./prices"
import { useGeneratorBonuses } from "./bonuses"
import type { GeneratorBonuses } from "./bonuses"
import { useProductions } from "./productions"
import type { GeneratorProductions, TotalProductions } from "./productions"
import { useUpgrades } from "./upgrades"
import type { Upgrade } from "../upgrades"
import type { MaybeRef } from "@vueuse/core"

export const useValues = (
  state: GameState
): {
  prices: Prices
  bonuses: GeneratorBonuses
  generatorProductions: GeneratorProductions
  totalProductions: TotalProductions
  upgrades: {
    buyableUpgrades: MaybeRef<Upgrade[]>
    revealedUpgrades: MaybeRef<Upgrade[]>
  }
  droneLifetime: MaybeRef<number>
} => {
  const prices = usePrices(state)
  const bonuses = useGeneratorBonuses(state)
  const { generatorProductions, totalProductions, droneLifetime } =
    useProductions(state, bonuses)
  const upgrades = useUpgrades(state)

  return {
    prices,
    bonuses,
    generatorProductions,
    totalProductions,
    droneLifetime,
    upgrades,
  }
}
