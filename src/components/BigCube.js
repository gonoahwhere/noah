// IMPORTS
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react";
import JEASINGS from "jeasings";

// NODE MODULES
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";

// FILES
import CubeControls from "./Buttons";
import SmallCube from "./SmallCubes";
import { useColoursList } from "../utils/Colours";

// JOINS ALL 27 SMALL CUBES INTO A 3X3 CUBE
function BigCube() {
    // REFERENCE FOR LAYER ROTATIONS
    const ref = useRef();

    // CUBE SIZE + OFFSET CENTRE
    const N = 3
    const offset = (N - 1) / 2;
    const colours = useColoursList((s) => s.colours)

    // ROUNDS THE SMALL CUBES TO GIVE CLEAN EDGES
    const roundedBoxGeometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.1), []);

    // ALLOWS FOR SMOOTH ANIMATIONS ON EACH FRAME
    useFrame(() => {
        JEASINGS.update();
    })

    // GENERATES THE BIG 3X3 CUBE
    return (
      <>
        <group ref={ref} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
          {/* LOOPS OVER LEFT TO RIGHT */}
          {[...Array(N).keys()].map((x) =>
            // LOOPS OVER BOTTOM TO TOP
            [...Array(N).keys()].map((y) =>
              // LOOPS OVER BACK TO FRONT
              [...Array(N).keys()].map((z) => (
                <SmallCube 
                  // EACH CUBE GETS A UNIQUE ID
                  key={x + y * N + z * N * N}
                  // POSITIONS CUBE IN THE CENTRE / ORIGIN
                  position={[x - offset, y - offset, z - offset]}
                  // USE ROUNDED EDGES
                  geometry={roundedBoxGeometry}
                  // USES COLOURS
                  colours={colours} 
                  />
              ))
            )
          )}
        </group>
        <CubeControls cubeGroup={ref} />
      </>
    )
}

export default BigCube;