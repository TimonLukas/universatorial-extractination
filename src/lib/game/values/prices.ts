import type { GameValue } from "../types"
import type { GameState } from "../state"
import { generatorNames } from "../generators"
import { generators } from "../data"
import { computed, unref } from "vue"
import { fromEntries } from "@/lib/object"
import type { AllCosts } from "@/lib/game/cost"
import { toAllOf } from "@/lib/game/util"
import { currencies } from "@/lib/game/currency"

export type Prices = GameValue<AllCosts, "generators">

export const usePrices = (state: GameState): Prices => ({
  generators: fromEntries(
    generatorNames.map((name) => [
      name,
      toAllOf<AllCosts>(
        fromEntries(
          generators[name].baseCost.map((cost) => [
            cost.currency,
            computed(
              () =>
                unref(cost.amount) *
                Math.pow(
                  generators[name].costCoefficient,
                  unref(state.generators[name].bought)
                )
            ),
          ])
        ),
        currencies,
        0
      ),
    ])
  ),
})
