// IMPORTS
import React from "react";
import { Leva } from 'leva'
import { TrackballControls } from "three-stdlib";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";

// FILES
import CubeControls from "./components/Buttons";
import BigCube from "./components/BigCube";
import { ColourPanel } from "./components/ColourPanel";

// MOVEMENT CONTROLS
extend({ TrackballControls });

function Controls() {
  const { camera, gl } = useThree();
  const controls = React.useRef();
  useFrame(() => controls.current.update());
  return <trackballControls ref={controls} args={[camera, gl.domElement]} minDistance={3} maxDistance={50} rotateSpeed={3} /> // PREVENTS ZOOMING TOO CLOSE/FAR
}

// DISPLAY
function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <h1>RUBIKS CUBE</h1>
      </div>

      <Leva
        collapsed={false}
        theme={{
          sizes: {
            controlWidth: 180,
            rootWidth: 200,
          },
        }}
        fill={false}
        oneLineLabels
      />
      <ColourPanel />
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Canvas 
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [7, 7, 7], fov: 60, near: 0.01, far: 100 }}
        >
          <ambientLight intensity={0.8} />
          <pointLight intensity={1} position={[10, 10, 10]} />
          <BigCube />
          <Controls />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
