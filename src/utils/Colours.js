// IMPORTS
import { useControls } from "leva";

// CUBE COLOURS
export function useColours() {
  return useControls('Colours 🎨', {
    RIGHT: { value: '#FF6400' },      // ORANGE
    LEFT: { value: '#FF0000' },       // RED
    TOP: { value: '#FFFFFF' },        // WHITE
    DOWN: { value: '#FFFF00' },       // YELLOW
    FRONT: { value: '#00BB00' },      // GREEN
    BACK: { value: '#0000BB' },       // BLUE
  })
};
