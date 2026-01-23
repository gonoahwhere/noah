/* ===== IMPORTS ===== */
import { create } from "zustand";

/* ===== DEFAULT CUBE COLOURS ===== */
const DEFAULT_COLOURS = {
    RIGHT: "#FF0000",
    LEFT: "#FFA061",
    UP: "#FFFFFF",
    DOWN: "#FFFF00",
    FRONT: "#00BB00",
    BACK: "#0000BB"
}

/* ===== CUBE COLOURS ===== */
export const useColoursList = create((set, get) => ({
    colours: DEFAULT_COLOURS,
    loaded: false,

    // LOADS COLOURS FROM JSON FILE
    loadColours: async() => {
        const res = await fetch("http://localhost:3001/settings")
        const data = await res.json()

        set({
            colours: {
                ...DEFAULT_COLOURS,
                ...(data.colours ?? {})
            },
            loaded: true
        })
    },

    // ATTEMPTS TO SET COLOUR TO FACE
    setColour: async (face, value) => {
        const { colours } = get()
        const isDuplicate = Object.entries(colours).some(([key, colour]) => key !== face && colour === value)

        // DOESN'T APPLY COLOUR IF DUPLICATE
        if (isDuplicate) return false

        const previous = colours
        const updated = { ...colours, [face]: value }
        set({ colours: updated })

        try {
            await fetch("http://localhost:3001/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ colours: { [face]: value } })
            })
        } catch {
            set({ colours: previous })
            return false
        }

        return true
    }
}));