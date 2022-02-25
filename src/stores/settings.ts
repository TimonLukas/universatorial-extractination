import { defineStore } from "pinia"
import { reactive, watch } from "vue"
import { useDebounceFn, useLocalStorage } from "@vueuse/core"
import { MusicState, useBackgroundMusic, useVolumeNodes } from "@/lib/audio"
import { Destination, start } from "tone"

const initialState = {
  volumes: {
    music: 1,
    soundEffects: 1,
    master: 1,
  },
}

async function useMusicSettings(state: typeof initialState) {
  const nodes = useVolumeNodes()
  const { play, pause, musicState } = await useBackgroundMusic()

  watch(
    state.volumes,
    async () => {
      nodes.music.volume.value = -20 + 20 * state.volumes.music
      Destination.volume.value = -50 + 35 * state.volumes.master

      if (
        state.volumes.music > 0 &&
        state.volumes.master > 0 &&
        musicState.value !== MusicState.PLAYING
      ) {
        play()
      }

      if (state.volumes.music === 0 || state.volumes.master === 0) {
        pause()
      }
    },
    { immediate: true }
  )
}

export const useSettingsStore = defineStore("settings", () => {
  const settingsLocalStorage = useLocalStorage("settings", initialState)
  const state = reactive(settingsLocalStorage.value)

  watch(
    state,
    useDebounceFn(() => {
      settingsLocalStorage.value = state
    }, 1000)
  )

  let isInitialized = false
  function initializeMusic() {
    if (!isInitialized) {
      start().then(() => useMusicSettings(state))
      isInitialized = true
    }
  }

  return { state, initializeMusic }
})
