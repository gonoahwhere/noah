/* ===== IMPORTS ===== */
import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'

/* ===== FILES =====*/
import { rotateLayer } from '../utils/Movement'
import { useKeys } from '../utils/KeyStrokes'
import { useSound } from '../SoundContext'

/* ===== MOVES FOR SCRAMBLING ===== */
const MOVES = [
    { face: 'RIGHT', dir: -1 },
    { face: 'RIGHT', dir: 1  },
    { face: 'LEFT', dir: 1  },
    { face: 'LEFT', dir: -1 },
    { face: 'UP', dir: -1 },
    { face: 'UP', dir: 1  },
    { face: 'DOWN', dir: 1  },
    { face: 'DOWN', dir: -1 },
    { face: 'FRONT', dir: -1 },
    { face: 'FRONT', dir: 1  },
    { face: 'BACK', dir: 1  },
    { face: 'BACK', dir: -1 },
]

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)]

/* ===== BUTTON CONTROLS ===== */
function KeyControls({ cubeGroup, rotationCommand, showAlert, openSettings }) {
    const { play } = useSound()
    const rotationGroup = useRef()
    const { camera } = useThree()

    // SCRAMBLE THE CUBE
    const scrambleKeys = async (moves = 25) => {
        const DELAY = 300

        for (let i = 0; i < moves; i++) {
            const move = randomItem(MOVES)
            play("rotate")
            rotateLayer(cubeGroup.current, rotationGroup.current, camera, move.face, move.dir)
            await new Promise(res => setTimeout(res, DELAY))
        }
    }

    // HANDLES KEY PRESSES
    useEffect(() => {
        if (rotationCommand && cubeGroup.current) {
            rotateLayer(cubeGroup.current, rotationGroup.current, camera, rotationCommand.face, rotationCommand.direction)
        }
    }, [rotationCommand, camera, cubeGroup])

    useKeys((e) => {
        // PREVENTS CUBE ROTATIONS BEING TRIGGERED IF TYPING INSIDE INPUT BOXES
        const target = e.target
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) return

        // R / SHIFT + R
        if (e.code === "KeyR") {
            const dir = e.shiftKey ? 1 : -1;
            play("rotate")
            rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'RIGHT', dir);
        }

        // L / SHIFT + L
        if (e.code === "KeyL") {
            const dir = e.shiftKey ? -1 : 1;
            play("rotate")
            rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'LEFT', dir);
        }

        // U / SHIFT + U
        if (e.code === "KeyU") {
            const dir = e.shiftKey ? 1 : -1;
            play("rotate")
            rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'UP', dir);
        }

        // D / SHIFT + D
        if (e.code === "KeyD") {
            const dir = e.shiftKey ? -1 : 1;
            play("rotate")
            rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'DOWN', dir);
        }

        // F / SHIFT + F
        if (e.code === "KeyF") {
            const dir = e.shiftKey ? 1 : -1;
            play("rotate")
            rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'FRONT', dir);
        }

        // B / SHIFT + B
        if (e.code === "KeyB") {
            const dir = e.shiftKey ? -1 : 1;
            play("rotate")
            rotateLayer(cubeGroup.current, rotationGroup.current, camera, 'BACK', dir);
        }

        // S / SHIFT + S
        if (e.code === "KeyS") {
            if (e.shiftKey) {
                play("ohno")
                showAlert("Noah hasn't implemented this feature yet.")
            } else {
                scrambleKeys(25)
            }
        }

        if (e.code === "KeyO") {
            if (e.shiftKey) {
                play("ohno")
                showAlert("Noah hasn't implemented this feature yet.")
            } else {
                play("weee")
                openSettings()
            }
        }
    })

    return (
        <>
            <group ref={rotationGroup} />
        </>
    )
}

export default KeyControls