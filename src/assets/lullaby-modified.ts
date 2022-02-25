import {
  getContext,
  Transport,
  Reverb,
  Gain,
  Filter,
  ToneBufferSource,
  AutoFilter,
  ToneAudioNode,
} from "tone"
import {
  wrapActivate,
  createPitchShiftedSampler,
  createPrerenderableBuffers,
} from "@generative-music/utilities"
import type { GenerativeSampler } from "@generative-music/utilities"
import type { GenerativePiece } from "@generative-music/pieces-alex-bainter"

const GAIN_ADJUSTMENT = 5
const SAMPLE_NAMES = ["vsco2-piano-mf", "explosion"]

const playProgression = (piano: GenerativeSampler) => {
  piano.triggerAttack("C4", `+${1 + Math.random() * 0.1 - 0.05}`)
  piano.triggerAttack("G4", `+${1 + Math.random() * 0.1 - 0.05}`)
  const t2 = 6 + Math.random() * 6
  piano.triggerAttack("C4", `+${t2 + Math.random() * 0.1 - 0.05}`)
  piano.triggerAttack("A4", `+${t2 + Math.random() * 0.1 - 0.05}`)
  const t3 = t2 + 1 + Math.random() * 4

  if (Math.random() < 0.9) {
    piano.triggerAttack("C4", `+${t3 + Math.random() * 0.1 - 0.05}`)
    piano.triggerAttack("F4", `+${t3 + Math.random() * 0.1 - 0.05}`)
  }

  const now = new Date()
  const minutes = now.getMinutes()

  if (Math.random() < minutes / 60) {
    piano.triggerAttack("C6", `+${1 + Math.random()}`)
  }

  if (Math.random() < 0.2) {
    piano.triggerAttack("E6", `+${1 + Math.random() * t2}`)
  }

  if (Math.random() < (minutes % 3) / 3) {
    piano.triggerAttack("A6", `+${t2 + Math.random()}`)
  }

  if (Math.random() < (60 - minutes) / 60) {
    piano.triggerAttack("C7", `+${t3 + Math.random()}`)
  }

  Transport.scheduleOnce(() => {
    playProgression(piano)
  }, `+${t3 + Math.random() * 10 + 5}`)
}

const activate = async ({
  sampleLibrary,
  onProgress,
}: Parameters<GenerativePiece>[0]) => {
  const samples = await sampleLibrary.request(getContext(), SAMPLE_NAMES)
  const pianos = await Promise.all([
    createPitchShiftedSampler({
      samplesByNote: samples["vsco2-piano-mf"],
      pitchShift: -12,
    }),
    createPitchShiftedSampler({
      samplesByNote: samples["vsco2-piano-mf"],
      pitchShift: -24,
    }),
  ])

  const activeSources: ToneBufferSource[] = []

  if (samples["explosion"]) {
    samples["explosion"][0].reverse = true
  }

  const explosionBuffers = await createPrerenderableBuffers({
    samples,
    sampleLibrary,
    sourceInstrumentName: "explosion",
    renderedInstrumentName: "lullaby__explosion",
    getDestination: () => new Reverb(15).toDestination().generate(),
    onProgress: (val: number) => onProgress?.(val / 2 + 0.5),
  })

  const explosionGain = new Gain(0.05)
  const lowpass = new Filter(200).connect(explosionGain)
  const explosionBuffer = explosionBuffers.get(0)

  const playReverseExplosion = () => {
    const explosionSource = new ToneBufferSource(explosionBuffer)
      .set({
        playbackRate: Math.random() * 0.1 + 0.05,
        fadeOut: 3,
        onended: () => {
          const index = activeSources.indexOf(explosionSource)
          if (index > -1) {
            activeSources.splice(index, 1)
          }
        },
      })
      .connect(lowpass)
    activeSources.push(explosionSource)
    explosionSource.start()

    Transport.scheduleOnce(() => {
      playReverseExplosion()
    }, `+${Math.random() * 100 + 60}`)
  }

  const schedule = ({ destination }: { destination: ToneAudioNode }) => {
    explosionGain.connect(destination)
    const pianoAutoFilters = pianos.map((piano) => {
      const autoFilter = new AutoFilter(0.01 * Math.random() + 0.005).connect(
        destination
      )
      autoFilter.start()
      piano.connect(autoFilter)
      playProgression(piano)
      return autoFilter
    })
    playReverseExplosion()

    return () => {
      pianos.forEach((piano) => {
        piano.releaseAll(0)
      })
      activeSources.forEach((source) => {
        source.stop(0)
      })
      pianoAutoFilters.forEach((autoFilter) => {
        autoFilter.dispose()
      })
    }
  }

  const deactivate = () => {
    pianos.forEach((piano) => piano.dispose())
    activeSources.forEach((source) => source.dispose())
    explosionBuffers.dispose()
  }

  return [deactivate, schedule]
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default wrapActivate(activate, { gain: GAIN_ADJUSTMENT })
