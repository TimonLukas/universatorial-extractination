import type { GameState } from "../state"
import { usePrices } from "./prices"
import type { Prices } from "./prices"
import { useGeneratorBonuses } from "./bonuses"
import type { GeneratorBonuses } from "./bonuses"
import { useProductions } from "./productions"
import type { GeneratorProductions, TotalProductions } from "./productions"

export const useValues = (
  state: GameState
): {
  prices: Prices
  bonuses: GeneratorBonuses
  generatorProductions: GeneratorProductions
  totalProductions: TotalProductions
} => {
  const prices = usePrices(state)
  const bonuses = useGeneratorBonuses(state)
  const { generatorProductions, totalProductions } = useProductions(
    state,
    bonuses
  )

  return {
    prices,
    bonuses,
    generatorProductions,
    totalProductions,
  }
}
