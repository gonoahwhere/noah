// IMPORTS
import { create } from "zustand";

// CUBE COLOURS
export const useColoursList = create((set) => ({
    colours: {
        RIGHT: "#FFA061",
        LEFT: "#FF0000",
        TOP: "#FFFFFF",
        BOTTOM: "#FFFF00",
        FRONT: "#00BB00",
        BACK: "#0000BB",
    },

    setColour: (face, value) => set((state) => ({
        colours: { ...state.colours, [face]: value }
    })),
}));