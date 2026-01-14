// IMPORTS
import { useControls, button } from 'leva'

// LEVA CONTROL MENU
function CubeControls() {
  useControls('Clockwise ↻', {
    'RIGHT': button(() => {}),
    'LEFT': button(() => {}),
    'TOP': button(() => {}),
    'DOWN': button(() => {}),
    'FRONT': button(() => {}),
    'BACK': button(() => {}),
  });

  useControls('Counter Clockwise ↺', {
    'RIGHT': button(() => {}),
    'LEFT': button(() => {}),
    'TOP': button(() => {}),
    'DOWN': button(() => {}),
    'FRONT': button(() => {}),
    'BACK': button(() => {}),
  });

  return null
}

export default CubeControls
