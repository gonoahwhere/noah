// IMPORTS
import { create } from "zustand";

// CUBE COLOURS
export const useColoursList = create((set, get) => ({
    colours: {
        RIGHT: "#FFA061",
        LEFT: "#FF0000",
        TOP: "#FFFFFF",
        BOTTOM: "#FFFF00",
        FRONT: "#00BB00",
        BACK: "#0000BB",
    },

    // ATTEMPTS TO SET CHOSEN COLOUR TO FACE
    setColour: (face, value) => {
        const { colours } = get()
        const isDuplicate = Object.entries(colours).some(([key, colour]) => key !== face && colour === value)

        // DOESN'T APPLY COLOUR IF DUPLICATE
        if (isDuplicate) {
            return false
        }

        set({ colours: { ...colours, [face]: value }})
        return true
    }
}));