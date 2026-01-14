// IMPORTS
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react";
import JEASINGS from "jeasings";

// NODE MODULES
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";

// FILES
import Buttons from "./Buttons";
import SmallCube from "./SmallCubes";

// JOINS ALL 27 SMALL CUBES INTO A 3X3 CUBE
function BigCube() {
    // REFERENCE FOR LAYER ROTATIONS
    const ref = useRef();

    // ROUNDS THE SMALL CUBES TO GIVE CLEAN EDGES
    const roundedBoxGeometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.1), []);

    // ALLOWS FOR SMOOTH ANIMATIONS ON EACH FRAME
    useFrame(() => {
        JEASINGS.update();
    })

    // GENERATES THE BIG 3X3 CUBE
  return (
    <>
      <group ref={ref}>
        {/* LOOPS OVER LEFT TO RIGHT */}
        {[...Array(3).keys()].map((x) =>
          // LOOPS OVER BOTTOM TO TOP
          [...Array(3).keys()].map((y) =>
            // LOOPS OVER BACK TO FRONT
            [...Array(3).keys()].map((z) => (
              <SmallCube 
                // EACH CUBE GETS A UNIQUE ID
                key={x + y * 3 + z * 9} 
                // POSITIONS CUBE IN THE CENTRE / ORIGIN
                position={[x - 1, y - 1, z - 1]}
                // USE ROUNDED EDGES
                geometry={roundedBoxGeometry} />
            ))
          )
        )}
      </group>
      <Buttons cubeGroup={ref} />
    </>
  )
}

export default BigCube;