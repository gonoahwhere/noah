/* ===== IMPORTS ===== */
import { useRef, useState, useEffect } from 'react'
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

/* ===== STYLES ===== */
import './styles/buttons.css'
import './styles/alerts.css'
import './styles/settings.css'

/* ===== FILES ===== */
import Cube from './components/Cube.js'
import { ControlPanel } from './components/ControlPanel.js'
import { SoundProvider } from './SoundContext.js'
import { CustomAlert, OptionsMenu } from './CustomFunctions.js';
import { useColoursList } from './utils/Colours.js';

/* ===== MOVEMENT ===== */
extend({ TrackballControls });

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());
  return <trackballControls ref={controls} args={[camera, gl.domElement]} rotateSpeed={3} />;
}

/* ===== DISPLAY ===== */
function App() {
  // LOADS SAVED SETTINGS
  const loadColours = useColoursList(s => s.loadColours)
  const coloursLoaded = useColoursList(s => s.loaded)

  useEffect(() => {
    loadColours()
  }, [loadColours])

  // TRACKS ROTATION
  const [rotationCommand, setRotationCommand] = useState(null)
  const cubeControls = useRef(null)

  const handleRotate = (face, direction) => {
    setRotationCommand({ face, direction, timestamp: Date.now() })
  }

  /* ===== ALERTS ===== */
  const [noahAlertMsg, setNoahAlertMsg] = useState(null)
  const [noahAlertClose, setNoahAlertClose] = useState(false)

  const showAlert = (msg) => {
    setNoahAlertMsg(msg)
    setNoahAlertClose(false)
  }

  const closeAlert = () => {
    setNoahAlertClose(true)
    setTimeout(() => {
      setNoahAlertMsg(null)
      setNoahAlertClose(false)
    }, 200)
  }

  /* ===== SETTINGS ===== */
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [optionsClosing, setOptionsClosing] = useState(false)
  const [cubeSize, setCubeSize] = useState(3)
  const [rotateSpeed, setRotateSpeed] = useState(5)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const closeOptions = () => {
    setOptionsClosing(true)
    setTimeout(() => {
      setOptionsOpen(false)
      setOptionsClosing(false)
    }, 200)
  }

  return (
    <SoundProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <h1 className="page-title">RUBIKS CUBE</h1>
          <h3 className="page-subtitle">MADE BY A SILLY LITTLE CREATOR</h3>
        </div>
        
        <ControlPanel onRotate={handleRotate} showAlert={showAlert} openSettings={() => setOptionsOpen(true)} onScramble={n => cubeControls.current?.scramble(n)} onSolve={() => cubeControls.current?.solve()} />
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [7, 7, 7], fov: 60, near: 0.01, far: 100 }}>
            <ambientLight intensity={0.8} />
            <pointLight intensity={1} position={[10, 10, 10]} />

            {/* ONLY LOADS CUBE ONCE COLOURS HAVE LOADED FROM JSON */}
            {coloursLoaded && (
              <Cube rotationCommand={rotationCommand} showAlert={showAlert} openSettings={() => setOptionsOpen(true)} cubeControls={cubeControls} />              
            )}
            
            <Controls />
          </Canvas>
        </div>

        {/* CUSTOM FUNCTIONS */}
        <CustomAlert msg={noahAlertMsg} closing={noahAlertClose} close={closeAlert} />
        <OptionsMenu open={optionsOpen} closing={optionsClosing} close={closeOptions} cubeSize={cubeSize} setCubeSize={setCubeSize} rotateSpeed={rotateSpeed} setRotateSpeed={setRotateSpeed} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} showAlert={showAlert} />

      </div>
    </SoundProvider>
  );
}

export default App;