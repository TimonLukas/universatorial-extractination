import { Currency } from "../currency"
import { GeneratorNames } from "../generators"
import type { Generator } from "../generators"

const DEFAULT_COST_COEFFICIENT = 1.5

export const generators: Record<GeneratorNames, Generator> = {
  [GeneratorNames.DRONE]: {
    name: "Drone",
    baseCost: [{ currency: Currency.ENERGY, amount: 1 }],
    costCoefficient: DEFAULT_COST_COEFFICIENT,
    production: [
      {
        type: "currencies",
        target: Currency.THOUGHTS,
        amount: 0.01,
      },
      {
        type: "currencies",
        target: Currency.ENERGY,
        amount: 0.1,
      },
    ],
  },
}
