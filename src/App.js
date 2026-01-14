// IMPORTS
import React from "react";
import { Leva } from 'leva'
import { TrackballControls } from "three-stdlib";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";

// FILES
import CubeControls from "./components/Buttons";
import BigCube from "./components/BigCube";

extend({ TrackballControls });

function Controls() {
  const { camera, gl } = useThree();
  const controls = React.useRef();
  useFrame(() => controls.current.update());
  return <trackballControls ref={controls} args={[camera, gl.domElement]} />;
}

function App() {

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>RUBIKS CUBE</h1>
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
      <CubeControls />

    <Canvas style={{ width: 500, height: 500, background: "#373a42" }}>
      <ambientLight intensity={0.8} />
      <pointLight intensity={1} position={[10, 10, 10]} />
      <BigCube />
      <Controls />
    </Canvas>
    </div>
  );
}

export default App;
