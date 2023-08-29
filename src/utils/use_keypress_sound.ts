import { useCallback, useState } from "react"
import sound from '@/assets/sounds/typing.mp3'

export const useKeypressSound = () => {
  const [audio, setAudio] = useState<HTMLAudioElement| null>(null)

  const onKeyDown = useCallback(() => {
    const audioInstance = new Audio(sound)
    audioInstance.play()
    setAudio(audioInstance)
  }, [])

  const onKeyUp = useCallback(() => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }, [audio])

  return {
    onKeyDown,
    onKeyUp
  }
}