/* ===== IMPORTS ===== */
import { useState } from 'react'

/* ===== FILES =====*/
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
export function ControlPanel({ onRotate, showAlert, openSettings }) {
    const { play } = useSound()

    const handleRotate = (face, dir) => {
        if (onRotate) {
            onRotate(face, dir)
        }
    }

    // SCRAMBLE THE CUBE
    const scrambleButtons = async (moves = 25) => {
        const DELAY = 300

        for (let i = 0; i < moves; i++) {
            const move = randomItem(MOVES)
            play("rotate")
            onRotate(move.face, move.dir)
            await new Promise(res => setTimeout(res, DELAY))
        }
    }

    return (
        <div style={{ position: 'absolute', top: 120, left: 20, display: 'flex', gap: 12, flexDirection: 'column', width: 250, paddingBottom: 20, zIndex: 1000 }}>
            {/* OPTIONS CONTAINER */}
            <div style={{ padding: 12, borderRadius: 12, background: '#1e1e1e' }}>
                <div style={{ marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }}>Options ⚙️</div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button className="button-rubik" onClick={() => { play("weee"); openSettings() }}>SETTINGS</button>
                        <button className="button-rubik" onClick={() => { scrambleButtons(25) }}>SHUFFLE</button>
                        <button className="button-rubik" onClick={() => { play("ohno"); showAlert("Noah hasn't implemented this feature yet.") }}>SOLVE</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-around', paddingLeft: 30 }}>
                        <div>O</div>
                        <div>S</div>
                        <div>Shift + S</div>
                    </div>
                </div>
            </div>

            {/* CLOCKWISE CONTAINER */}
            <div style={{ padding: 12, borderRadius: 12, background: '#1e1e1e' }}>
                <div style={{ marginBottom: 10, fontWeight: 'bold', textAlign: 'center'}}>Clockwise ↻</div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('RIGHT', -1) }}>R</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('LEFT', 1) }}>L</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('UP', -1) }}>U</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('DOWN', 1) }}>D</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('FRONT', -1) }}>F</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('BACK', 1) }}>B</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-around', paddingLeft: 115 }}>
                        <div>R</div>
                        <div>L</div>
                        <div>U</div>
                        <div>D</div>
                        <div>F</div>
                        <div>B</div>
                    </div>
                </div>
            </div>

            {/* CLOCKWISE CONTAINER */}
            <div style={{ padding: 12, borderRadius: 12, background: '#1e1e1e' }}>
                <div style={{ marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }}>Counter Clockwise ↺</div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('RIGHT', 1) }}>R'</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('LEFT', -1) }}>L'</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('UP', 1) }}>U'</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('DOWN', -1) }}>D'</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('FRONT', 1) }}>F'</button>
                        <button className="button-rubik" onClick={() => { play("rotate"); handleRotate('BACK', -1) }}>B'</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-around', paddingLeft: 60 }}>
                        <div>Shift + R</div>
                        <div>Shift + L</div>
                        <div>Shift + U</div>
                        <div>Shift + D</div>
                        <div>Shift + F</div>
                        <div>Shift + B</div>
                    </div>
                </div>
            </div>
        </div>
    )
}