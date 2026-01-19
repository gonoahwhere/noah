// IMPORTS
import { createContext, useContext } from "react"

// FILES
import { useSounds } from "./utils/Sounds"

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
    const sounds = useSounds()

    return (
        <SoundContext.Provider value={sounds}>
            {children}
        </SoundContext.Provider>
    )
}

export function useSound() {
    return useContext(SoundContext)
}