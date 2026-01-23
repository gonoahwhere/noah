/* ===== IMPORTS ===== */
import { useState, useEffect } from 'react'

/* ===== FILES ===== */
import { useColoursList } from './utils/Colours.js';
import { useSound } from './SoundContext.js'

/* ===== FACE ICONS ===== */
const faceIcons = {
    RIGHT: '🟥',
    LEFT: '🟧',
    UP: '⬜',
    DOWN: '🟨',
    FRONT: '🟩',
    BACK: '🟦'
}

/* ===== CUSTOM ALERT ===== */
export function CustomAlert({ msg, closing, close }) {
    if (!msg) {
        return null
    }

    return (
        <div className={`noah-alert ${closing ? 'fade-out' : 'fade-in'}`}>
            <div className="noah-alert-msg">{msg}</div>
            <button className="button-rubik" onClick={close}>OK</button>
        </div>
    )
}

/* ===== SETTINGS MENU ===== */
export function OptionsMenu({ open, closing, close, cubeSize, setCubeSize, rotateSpeed, setRotateSpeed, soundEnabled, setSoundEnabled, showAlert }) {
    const { colours, setColour } = useColoursList()
    const [inputs, setInputs] = useState({ ...colours })
    const { play } = useSound()

    useEffect(() => {
        const VALID_FACES = [
            "RIGHT",
            "LEFT",
            "UP",
            "DOWN",
            "FRONT",
            "BACK"
        ]

        const safeInputs = {}
        
        for (const face of VALID_FACES) {
            safeInputs[face] = colours[face] || "#FFFFFF"
        }

        setInputs(safeInputs)
    }, [colours])

    if (!open) {
        return null
    }

    return (
        <div className={`noah-settings ${closing ? 'fade-out' : 'fade-in'}`}>
            <div className="noah-settings-content">
                <h2>SETTINGS</h2>

                <div className="noah-settings-group">
                    <label>CUBE SIZE</label>
                    <div className="noah-settings-subgroup">
                        {[2, 3, 4, 5].map(size => (
                            <button key={size} className={`button-rubik ${cubeSize === size ? 'active' : ''}`} onClick={() => setCubeSize(size)}>{size}x{size}</button>
                        ))}
                    </div>
                </div>

                <div className="noah-settings-group">
                    <label>ROTATION SPEED</label>
                    <label className="rotate-label">Only affects speed of whole cube rotations</label>
                    <input type="number" min={1} max={10} value={rotateSpeed} onChange={(e) => setRotateSpeed(Math.min(10, Math.max(1, Number(e.target.value))))} style={{ textAlign: 'center' }} />

                </div>

                <div className="noah-settings-group">
                    <label>SOUNDS</label>
                    <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} />
                </div>

                <div className="noah-settings-group">
                    <label>CUBE COLOURS</label>
                    {Object.entries(colours).map(([face, value]) => (
                        <div key={face} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                            <span style={{ width: 50 }}>{faceIcons[face]}</span>

                            <input 
                                type="text"
                                value={inputs[face]} 
                                onChange={async (e) => {
                                    let value = e.target.value.toUpperCase().replace(/[^0-9A-F#]/g, "")

                                    if (!value.startsWith("#")) value = "#" + value
                                    value = value.slice(0, 7)

                                    setInputs(prev => ({ ...prev, [face]: value }))

                                    if (/^#[0-9A-F]{6}$/.test(value)) {
                                        const success = await setColour(face, value)
                                        if (!success) {
                                            play("ohno")
                                            showAlert("That colour is already used on another face!")
                                            setInputs(prev => ({ ...prev, [face]: colours[face] }))
                                        }
                                    }
                                }}

                                style={{ border: 'none', background: 'none', color: '#ccc', width: 90 }} 
                            />

                            <input
                                type="color" 
                                value={inputs[face]}
                                onChange={async (e) => {
                                    const hex = e.target.value
                                    const success = await setColour(face, hex)

                                    if (success) {
                                        setInputs(prev => ({ ...prev, [face]: hex }))
                                    } else {
                                        play("ohno")
                                        showAlert("That colour is already used on another face!")
                                        setInputs(prev => ({ ...prev, [face]: colours[face] }))
                                    }
                                }}

                                style={{ border: 'none', background: 'none' }}
                            />
                        </div>
                    ))}
                </div>
                
                <button className="button-rubik" onClick={close}>CLOSE</button>
            </div>
        </div>
    )
}