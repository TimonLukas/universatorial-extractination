import createLibrary from "@generative-music/web-library"
import createProvider from "@generative-music/web-provider"
import getSampleIndex from "@generative-music/samples-alex-bainter"
import { Transport, context, Volume } from "tone"
import { useMemoize } from "@vueuse/core"
import { ref, toRaw } from "vue"

import lullaby from "@/assets/lullaby-modified"

export const useVolumeNodes = useMemoize(() => ({
  music: new Volume(0).toDestination(),
  soundEffects: new Volume(0).toDestination(),
}))

export enum MusicState {
  PLAYING = "playing",
  PAUSED = "paused",
  STOPPED = "stopped",
}

export async function useBackgroundMusic() {
  const { music } = useVolumeNodes()

  const provider = createProvider()
  const sampleIndex = getSampleIndex({
    format: "ogg",
    host: "/universatorial-extractination/samples",
  })

  const sampleLibrary = createLibrary({
    sampleIndex,
    provider,
  })

  const [_, schedule] = await lullaby({
    context,
    sampleLibrary,
    destination: toRaw(music),
  })

  let end: (() => void) | null = null

  const musicState = ref(MusicState.STOPPED)

  function play() {
    musicState.value = MusicState.PLAYING

    if (end === null) {
      end = schedule()
    }

    Transport.start()
  }

  function pause() {
    musicState.value = MusicState.PAUSED

    Transport.stop()
  }

  function stop() {
    musicState.value = MusicState.STOPPED

    Transport.cancel()
    if (typeof end !== "undefined") {
      end?.()
    }
  }

  return {
    play,
    pause,
    stop,
    musicState,
  }
}
