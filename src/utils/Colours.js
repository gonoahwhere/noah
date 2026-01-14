// IMPORTS
import { create } from "zustand";

// CUBE COLOURS
export const useColoursList = create((set) => ({
    colours: {
        RIGHT: "#FF6400",
        LEFT: "#FF0000",
        TOP: "#FFFFFF",
        DOWN: "#FFFF00",
        FRONT: "#00BB00",
        BACK: "#0000BB",
    },

    setColour: (face, value) => set((state) => ({
        colours: { ...state.colours, [face]: value }
    })),
}));