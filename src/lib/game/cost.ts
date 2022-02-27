import type { Currency } from "./currency"
import type { MaybeRef } from "@vueuse/core"
import type { AllOf } from "@/lib/game/util"
import { unref } from "vue"

export type Cost = {
  currency: Currency
  amount: MaybeRef<number>
}
export type AllCosts = AllOf<Cost, "currency", "amount">

export const canAfford = (
  currencies: Record<Currency, number>,
  costs: Cost[]
) => costs.every((cost) => currencies[cost.currency] >= unref(cost.amount))

export const applyCosts = (
  currencies: Record<Currency, number>,
  costs: Cost[] | Record<Currency, MaybeRef<number>>
) => {
  if (Array.isArray(costs)) {
    return costs.forEach((cost) => {
      currencies[cost.currency] -= unref(cost.amount)
    })
  }

  return Object.entries(costs).forEach(([currency, cost]) => {
    currencies[currency as Currency] -= unref(cost)
  })
}
