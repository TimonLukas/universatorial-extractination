import type { MaybeRef } from "@vueuse/core"
import { unref } from "vue"

const floatFloor = (value: number, precision: number): number =>
  Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision)

export const format = (maybeValue: MaybeRef<number>): string => {
  const value = unref(maybeValue)

  if (value === 0) {
    return "0.00"
  }

  if (value < 1e3) {
    return floatFloor(value, 2).toFixed(2)
  }

  const exponent = Math.floor(Math.log10(value))
  const floatPart = value / Math.pow(10, exponent)
  return `${floatFloor(floatPart, 3).toFixed(3)}e${exponent}`
}
