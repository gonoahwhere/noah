// IMPORTS
import { useControls, button } from 'leva'
import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
// FILES
import { rotateLayer } from "../utils/Scramble"
import { useKeys } from "../utils/Keys"

// LEVA CONTROL MENU
function CubeControls({ cubeGroup }) {
  const rotationGroup = useRef()
  const { camera } = useThree()
  
  // KEY PRESSES
  useKeys((e) => {
    // PREVENTS CUBE ROTATIONS BEING TRIGGERED IF TYPING INSIDE INPUT
    const target = e.target
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable ) return
    
    // RIGHT: R / R+Shift
    if (e.code === "KeyR") {
      const dir = e.shiftKey ? 1 : -1;
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'RIGHT', dir);
    }
    // LEFT: L / L+Shift
    if (e.code === "KeyL") {
      const dir = e.shiftKey ? -1 : 1;
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'LEFT', dir);
    }
    // TOP: U / U+Shift
    if (e.code === "KeyU") {
      const dir = e.shiftKey ? 1 : -1;
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'TOP', dir);
    }
    // BOTTOM: D / D+Shift
    if (e.code === "KeyD") {
      const dir = e.shiftKey ? -1 : 1;
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BOTTOM', dir);
    }
    // FRONT: F / F+Shift
    if (e.code === "KeyF") {
      const dir = e.shiftKey ? 1 : -1;
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'FRONT', dir);
    }
    // BACK: B / B+Shift
    if (e.code === "KeyB") {
      const dir = e.shiftKey ? -1 : 1;
      rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BACK', dir);
    }
  });
  
  // BUTTONS
  useControls('Options ⚙️', {
    'SHUFFLE': button(() => {}),
    'SOLVE': button(() => {}),
  });
  
  useControls('Clockwise ↻', {
    'RIGHT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'RIGHT', -1) }),
    'LEFT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'LEFT', 1) }),
    'TOP': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'TOP', -1) }),
    'BOTTOM': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BOTTOM', 1) }),
    'FRONT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'FRONT', -1) }),
    'BACK': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BACK', 1) }),
  });
  
  useControls('Counter Clockwise ↺', {
    'RIGHT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'RIGHT', 1) }),
    'LEFT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'LEFT', -1) }),
    'TOP': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'TOP', 1) }),
    'BOTTOM': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BOTTOM', -1) }),
    'FRONT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'FRONT', 1) }),
    'BACK': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BACK', -1) }),
  });  
  
  return (
    <>
      <group ref={rotationGroup} />
    </>
  )
}

export function CubePanel() {
  return (
    <div 
      style={{
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 12,
        borderRadius: 12,
        background: '#1E1E1E',
        display: 'grid'
      }}
    >
    </div>
  )
}

export default CubeControls