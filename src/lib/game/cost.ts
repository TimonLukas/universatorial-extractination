import type { Currency } from "./currency"
import type { MaybeRef } from "@vueuse/core"
import type { AllOf } from "@/lib/game/util"

export type Cost = {
  currency: Currency
  amount: MaybeRef<number>
}
export type AllCosts = AllOf<Cost, "currency", "amount">
