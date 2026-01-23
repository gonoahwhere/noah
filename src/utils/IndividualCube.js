/* ===== FILES =====*/
import { FACES, INSIDE_COLOUR } from './Faces.js'

/* ===== EXPORT FUNCTION =====*/
function IndividualCube({ position, geometry, colours }) {
    const offset = Math.max(...position.map(Math.abs))
    return (
        <mesh position={position} geometry={geometry}>
            {FACES.map(([axis, dir, face], i) => {
                const isOutside = position[axis] === dir * offset
                const colour = isOutside ? colours[face] : INSIDE_COLOUR

                return (
                    <meshStandardMaterial key={i} attach={`material-${i}`} color={colour} />
                )
            })}
        </mesh>
    )
}

export default IndividualCube