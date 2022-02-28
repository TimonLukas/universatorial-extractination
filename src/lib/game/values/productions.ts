import { computed, unref } from "vue"
import type { ComputedRef } from "vue"
import type { MaybeRef } from "@vueuse/core"
import { fromEntries } from "@/lib/object"
import type { GameValue } from "../types"
import type { GameState } from "../state"
import { GeneratorNames, generatorNames } from "../generators"
import { generators } from "../data"
import type { AllProductions } from "../generators"
import { currencies, Currency } from "@/lib/game/currency"
import { toAllOf } from "@/lib/game/util"
import type { GeneratorBonuses } from "@/lib/game/values/bonuses"
import type { Upgrade } from "@/lib/game/upgrades"

export type GeneratorProductions = GameValue<
  MaybeRef<AllProductions>,
  "generators"
>
export type TotalProductions = GameValue<
  MaybeRef<number>,
  "currencies" | "generators"
>

const DRONE_INITIAL_LIFETIME_IN_MS = 15_000

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

type UpgradeType = Upgrade["type"]
type UpgradeTargetType = Upgrade["targetType"]
const reduceUpgradeIterator = (
  iterator: IterableIterator<Upgrade>,
  type: UpgradeType,
  targetType: UpgradeTargetType,
  target: Upgrade["target"]
): number => {
  let value = {
    base: 0,
    multiplier: 1,
  }[type]

  for (const upgrade of iterator) {
    if (
      upgrade.type === type &&
      upgrade.targetType === targetType &&
      upgrade.target === target
    ) {
      if (type === "base") {
        value += upgrade.value
      } else if (type === "multiplier") {
        value *= upgrade.value
      }
    }
  }

  return value
}

const useUpgradeProductions = (
  state: GameState
): Record<
  UpgradeType,
  {
    generators: Record<GeneratorNames, ComputedRef<number>>
    currencies: Record<Currency, ComputedRef<number>>
  }
> => ({
  base: {
    generators: fromEntries(
      generatorNames.map((name) => [
        name,
        computed(() =>
          reduceUpgradeIterator(
            state.upgradesBought.values(),
            "base",
            "generator",
            name
          )
        ),
      ])
    ),
    currencies: fromEntries(
      currencies.map((currency) => [
        currency,
        computed(() =>
          reduceUpgradeIterator(
            state.upgradesBought.values(),
            "base",
            "total",
            currency
          )
        ),
      ])
    ),
  },
  multiplier: {
    generators: fromEntries(
      generatorNames.map((name) => [
        name,
        computed(() =>
          reduceUpgradeIterator(
            state.upgradesBought.values(),
            "multiplier",
            "generator",
            name
          )
        ),
      ])
    ),
    currencies: fromEntries(
      currencies.map((currency) => [
        currency,
        computed(() =>
          reduceUpgradeIterator(
            state.upgradesBought.values(),
            "multiplier",
            "total",
            currency
          )
        ),
      ])
    ),
  },
})

const productionTargets = [...generatorNames, ...currencies]
export const useProductions = (
  state: GameState,
  bonuses: GeneratorBonuses
): {
  generatorProductions: GeneratorProductions
  totalProductions: TotalProductions
  droneLifetime: MaybeRef<number>
} => {
  const upgradeProductions = useUpgradeProductions(state)

  const generatorProductions: GeneratorProductions = {
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
              (production.amount +
                unref(upgradeProductions.base.generators[name])) *
                totalGeneratorAmount *
                unref(upgradeProductions.multiplier.generators[name]) *
                unref(bonuses.generators[name]),
            ])
          )

          return toAllOf<AllProductions>(productions, productionTargets, 0)
        }),
      ])
    ),
  }

  const totalGeneratorProductions = fromEntries(
    generatorNames.map((name) => [
      name,
      computed(
        () =>
          (sumProductions(generatorProductions, name).value +
            upgradeProductions.base.generators[name].value) *
          upgradeProductions.multiplier.generators[name].value
      ),
    ])
  )
  const totalCurrencyProductions = fromEntries(
    currencies.map((currency) => [
      currency,
      computed(
        () =>
          (sumProductions(generatorProductions, currency).value +
            upgradeProductions.base.currencies[currency].value) *
          upgradeProductions.multiplier.currencies[currency].value
      ),
    ])
  )

  const droneLifetime = computed(() => {
    let lifetime = 1
    let multiplier = 1

    for (const upgrade of state.upgradesBought) {
      if (
        upgrade.targetType === "special" &&
        upgrade.target === "droneLifetime"
      ) {
        if (upgrade.type === "base") {
          lifetime += upgrade.value
        } else if (upgrade.type === "multiplier") {
          multiplier *= upgrade.value
        }
      }
    }

    return DRONE_INITIAL_LIFETIME_IN_MS * lifetime * multiplier
  })

  return {
    droneLifetime,
    generatorProductions,
    totalProductions: {
      generators: totalGeneratorProductions,
      currencies: totalCurrencyProductions,
    },
  }
}
