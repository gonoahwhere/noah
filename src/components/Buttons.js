// IMPORTS
import { useControls, button } from 'leva'

// LEVA CONTROL MENU
function CubeControls() {
  useControls('Clockwise ↻', {
    'LEFT': button(() => {}),
    'RIGHT': button(() => {}),
    'BACK': button(() => {}),
    'FRONT': button(() => {}),
    'TOP': button(() => {}),
    'DOWN': button(() => {}),
  });

  useControls('Counter Clockwise ↺', {
    'LEFT': button(() => {}),
    'RIGHT': button(() => {}),
    'BACK': button(() => {}),
    'FRONT': button(() => {}),
    'TOP': button(() => {}),
    'DOWN': button(() => {}),
  });

  return null
}

export default CubeControls
