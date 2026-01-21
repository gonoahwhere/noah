/* ===== IMPORTS ===== */
import { useRef, useCallback } from 'react'

/* ===== SOUND FILES =====*/
import rotateSound from '../audio/rotate.mp3'
import errorSound from '../audio/ohno.mp3'
import settingsSound from '../audio/weee.mp3'

/* ===== EXPORT FUNCTION ===== */
export function useSounds() {
    const sounds = useRef({
        rotate: new Audio(rotateSound),
        ohno: new Audio(errorSound),
        weee: new Audio(settingsSound)
    })

    const play = useCallback((name) => {
        const sound = sounds.current[name]
        if(!sound) return
        sound.currentTime = 0
        sound.play()
    }, [])

    return { play }
}