// IMPORTS
import { useRef, useState } from "react";
import { OrbitControls } from '@react-three/drei'
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";

// FILES
import BigCube from "./components/BigCube";
import { ColourPanel } from "./components/ColourPanel";
import { ControlPanel } from "./components/ControlPanel";

// MOVEMENT CONTROLS
extend({ OrbitControls });

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());
  // PREVENTS ZOOMING TOO CLOSE/FAR
  return <OrbitControls ref={controls} args={[camera, gl.domElement]} minDistance={3} maxDistance={50} rotateSpeed={2} enablePan={false} />
}

// DISPLAY
function App() {
  // TRACKS ROTATION
  const [rotationCommand, setRotationCommand] = useState(null)

  const handleRotate = (face, direction) => {
      setRotationCommand({ face, direction, timestamp: Date.now() })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <h1>RUBIKS CUBE</h1>
      </div>

      <ColourPanel />
      <ControlPanel onRotate={handleRotate} />
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Canvas 
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [7, 7, 7], fov: 60, near: 0.01, far: 100 }}
        >
          <ambientLight intensity={0.8} />
          <pointLight intensity={1} position={[10, 10, 10]} />
          <BigCube rotationCommand={rotationCommand} />
          <Controls />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
