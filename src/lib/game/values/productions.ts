import { computed, unref } from "vue"
import type { ComputedRef } from "vue"
import type { MaybeRef } from "@vueuse/core"
import { fromEntries } from "@/lib/object"
import type { GameValue } from "../types"
import type { GameState } from "../state"
import { generatorNames, generators } from "../generators"
import type { AllProductions } from "../generators"
import { currencies } from "@/lib/game/currency"
import { toAllOf } from "@/lib/game/util"
import type { GeneratorBonuses } from "@/lib/game/values/bonuses"

export type GeneratorProductions = GameValue<
  MaybeRef<AllProductions>,
  "generators"
>
export type TotalProductions = GameValue<
  MaybeRef<number>,
  "currencies" | "generators"
>

const sumProductions = <
  Key extends keyof AllProductions = keyof AllProductions
>(
  productions: GeneratorProductions,
  type: Key
): ComputedRef<number> =>
  computed(() =>
    Object.values(productions.generators).reduce(
      (acc, val) => acc + unref(val)[type],
      0
    )
  )

export const useProductions = (
  state: GameState,
  bonuses: GeneratorBonuses
): {
  generatorProductions: GeneratorProductions
  totalProductions: TotalProductions
} => {
  const generatorProductions = {
    generators: fromEntries(
      generatorNames.map((name) => [
        name,
        computed(() => {
          const generator = generators[name]
          const generatorState = state.generators[name]
          const totalGeneratorAmount =
            unref(generatorState.generated) + unref(generatorState.bought)

          const productions = fromEntries(
            generator.production.map((production) => [
              production.target,
              production.amount *
                totalGeneratorAmount *
                unref(bonuses.generators[name]),
            ])
          )

          return toAllOf<AllProductions>(
            productions,
            [...generatorNames, ...currencies],
            0
          )
        }),
      ])
    ),
  }

  const totalGeneratorProductions = fromEntries(
    generatorNames.map((name) => [
      name,
      sumProductions(generatorProductions, name),
    ])
  )
  const totalCurrencyProductions = fromEntries(
    currencies.map((currency) => [
      currency,
      sumProductions(generatorProductions, currency),
    ])
  )

  return {
    generatorProductions,
    totalProductions: {
      generators: totalGeneratorProductions,
      currencies: totalCurrencyProductions,
    },
  }
}
