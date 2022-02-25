type GenerativeSampleIndex = Record<string, unknown>

declare module "@generative-music/web-library" {
  import type { GenerativeProvider } from "@generative-music/web-provider"
  import type { BaseContext, ToneAudioBuffer } from "tone"

  export type GenerativeLibrary = {
    has: (instruments: (string | string[])[]) => Promise<boolean>
    request: (
      audioContext: BaseContext,
      instruments: (string | string[])[]
    ) => Promise<Record<string, ToneAudioBuffer[]>>
    save: (entries: unknown[]) => Promise<void>
  }

  export default function createLibrary(config: {
    sampleIndex: GenerativeSampleIndex
    provider: GenerativeProvider
  }): GenerativeLibrary
}

declare module "@generative-music/pieces-alex-bainter" {
  import type { OutputNode, BaseContext } from "tone"
  import type { GenerativeLibrary } from "@generative-music/web-library"

  type OptionDestination = { destination: OutputNode }

  export type GenerativePiece = (
    options: {
      context?: BaseContext
      sampleLibrary: GenerativeLibrary
      onProgress?: (number) => void
    } & Partial<OptionDestination>
  ) => Promise<
    [
      deactivate: () => void,
      schedule: (options?: OptionDestination) => () => void
    ]
  >

  export type PiecesByAlexBainter =
    | "420hz-gamma-waves-for-big-brain"
    | "a-viable-system"
    | "above-the-rain"
    | "agua-ravine"
    | "aisatsana"
    | "animalia-chordata"
    | "apoapsis"
    | "at-sunrise"
    | "awash"
    | "beneath-waves"
    | "bhairav"
    | "buttafingers"
    | "day-dream"
    | "didgeridoobeats"
    | "documentary-films"
    | "drones"
    | "drones-2"
    | "eno-machine"
    | "enough"
    | "expand-collapse"
    | "eyes-closed"
    | "homage"
    | "impact"
    | "last-transit"
    | "lemniscate"
    | "little-bells"
    | "lullaby"
    | "meditation"
    | "moment"
    | "nakaii"
    | "neuroplasticity"
    | "no-refrain"
    | "observable-streams"
    | "otherness"
    | "oxalis-1"
    | "peace"
    | "pinwheels"
    | "pulse-code-modulation"
    | "remembering"
    | "return-to-form"
    | "ritual"
    | "sevenths"
    | "skyline"
    | "soundtrack"
    | "splash"
    | "spring-again"
    | "stratospheric"
    | "stream-of-consciousness"
    | "substrate"
    | "timbral-oscillations"
    | "townsend"
    | "transmission"
    | "trees"
    | "uun"
    | "western-medicine"
    | "yesterday"
    | "zed"

  export const byId: Record<PiecesByAlexBainter, GenerativePiece>
}

declare module "@generative-music/web-provider" {
  import type { BaseContext, ToneAudioBuffer } from "tone"

  export type GenerativeProvider = {
    has(urls: string | string[]): Promise<boolean>
    request(
      audioContext: BaseContext,
      urls: (string | string[])[]
    ): Promise<ToneAudioBuffer[]>
    save(): Promise<void>
  }

  export default function createWebProvider(): GenerativeProvider
}

declare module "@generative-music/samples-alex-bainter" {
  type SampleFormat = "ogg" | "mp3" | "wav"
  export default function getSampleIndex(options: {
    host: string
    format: SampleFormat
  }): GenerativeSampleIndex
}

declare module "@generative-music/utilities" {
  import type { GenerativePiece } from "@generative-music/pieces-alex-bainter"
  import { ToneAudioBuffers } from "tone"

  type GenerativeSampler = {
    triggerAttack(...unknown): unknown
    connect(...unknown): unknown
    dispose(...unknown): unknown
    releaseAll(...unknown): unknown
  }

  export function wrapActivate(
    piece: GenerativePiece,
    options?: { gain: number }
  ): GenerativePiece

  export function createPitchShiftedSampler(
    options?: unknown
  ): Promise<GenerativeSampler>

  export function createPrerenderableBuffers(
    options?: unknown
  ): Promise<ToneAudioBuffers>
}
