// IMPORTS
import { useControls, button } from 'leva'
import { useRef } from 'react'

// FILES
import { rotateLayer } from "../utils/Scramble"

// SCRAMBLE
// You still need to implement this Noah

// LEVA CONTROL MENU
function CubeControls({ cubeGroup }) {
  const rotationGroup = useRef()
  useControls('Options ⚙️', {
    'SHUFFLE': button(() => {}),
    'SOLVE': button(() => {}),
  });

  useControls('Clockwise ↻', {
    'RIGHT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'x', 0.5, -1) }),
    'LEFT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'x', -0.5, 1) }),
    'TOP': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'y', 0.5, -1) }),
    'BOTTOM': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'y', -0.5, 1) }),
    'FRONT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'z', 0.5, -1) }),
    'BACK': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'z', -0.5, 1) }),
  });

  useControls('Counter Clockwise ↺', {
    'RIGHT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'x', 0.5, 1) }),
    'LEFT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'x', -0.5, -1) }),
    'TOP': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'y', 0.5, 1) }),
    'BOTTOM': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'y', -0.5, -1) }),
    'FRONT': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'z', 0.5, 1) }),
    'BACK': button(() => { rotateLayer(cubeGroup.current, rotationGroup.current, 'z', -0.5, -1) }),
  });  

  return (
    <>
      <group ref={rotationGroup} />
    </>
  )
}

export default CubeControls
