// IMPORTS
import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'

// FILES
import { rotateLayer } from "../utils/Scramble"
import { useKeys } from "../utils/Keys"
import { useSound } from "../SoundContext"

// CUBE CONTROLS (KEYBOARD)
function CubeControls({ cubeGroup, rotationCommand }) {
  const { play } = useSound()
  const rotationGroup = useRef()
  const { camera } = useThree()
  
  // HANDLES BUTTON PRESSES
  useEffect(() => {
    if (rotationCommand && cubeGroup.current) {
      rotateLayer(
        cubeGroup.current, 
        rotationGroup.current, 
        camera, 
        rotationCommand.face, 
        rotationCommand.direction
      );
    }
  }, [rotationCommand, camera, cubeGroup]);

  // KEY PRESSES
  useKeys((e) => {
    // PREVENTS CUBE ROTATIONS BEING TRIGGERED IF TYPING INSIDE INPUT
    const target = e.target
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable ) return
    
    // RIGHT: R / R+Shift
    if (e.code === "KeyR") {
      const dir = e.shiftKey ? 1 : -1;
      play("rotate")
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'RIGHT', dir);
    }
    // LEFT: L / L+Shift
    if (e.code === "KeyL") {
      const dir = e.shiftKey ? -1 : 1;
      play("rotate")
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'LEFT', dir);
    }
    // TOP: U / U+Shift
    if (e.code === "KeyU") {
      const dir = e.shiftKey ? 1 : -1;
      play("rotate")
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'TOP', dir);
    }
    // BOTTOM: D / D+Shift
    if (e.code === "KeyD") {
      const dir = e.shiftKey ? -1 : 1;
      play("rotate")
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BOTTOM', dir);
    }
    // FRONT: F / F+Shift
    if (e.code === "KeyF") {
      const dir = e.shiftKey ? 1 : -1;
      play("rotate")
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'FRONT', dir);
    }
    // BACK: B / B+Shift
    if (e.code === "KeyB") {
      const dir = e.shiftKey ? -1 : 1;
      play("rotate")
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BACK', dir);
    }
  });
  
  return (
    <>
      <group ref={rotationGroup} />
    </>
  )
}

export default CubeControls