// CUBE CONTROLS (BUTTONS)
export function ControlPanel({ onRotate }) {
    const handleRotate = (face, dir) => {
        if (onRotate) {
            onRotate(face, dir)
        }
    }
    
    return (
        <div 
            style={{
                position: 'absolute',
                top: 220,
                left: 20,
                display: 'flex',
                gap: 12,
                flexDirection: 'column',
                width: 218,
                zIndex: 1000
            }}
        >
            {/* Options Container */}
            <div style={{
                padding: 12,
                borderRadius: 12,
                background: '#1E1E1E',
            }}>
                <div style={{ marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }}>Options ⚙️</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="button-rubik" onClick={() => {}}>SHUFFLE</button>
                    <button className="button-rubik" onClick={() => {}}>SOLVE</button>
                </div>
            </div>

            {/* Clockwise Container */}
            <div style={{
                padding: 12,
                borderRadius: 12,
                background: '#1E1E1E',
            }}>
                <div style={{ marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }}>Clockwise ↻</div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 10 }}>
                        <button className="button-rubik" onClick={() => handleRotate('RIGHT', -1)}>R</button>
                        <button className="button-rubik" onClick={() => handleRotate('LEFT', 1)}>L</button>
                        <button className="button-rubik" onClick={() => handleRotate('TOP', -1)}>U</button>
                        <button className="button-rubik" onClick={() => handleRotate('BOTTOM', 1)}>D</button>
                        <button className="button-rubik" onClick={() => handleRotate('FRONT', -1)}>F</button>
                        <button className="button-rubik" onClick={() => handleRotate('BACK', 1)}>B</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-around', paddingLeft: 80 }}>
                        <div>R</div>
                        <div>L</div>
                        <div>U</div>
                        <div>D</div>
                        <div>F</div>
                        <div>B</div>
                    </div>
                </div>
            </div>

            {/* Counter Clockwise Container */}
            <div style={{
                padding: 12,
                borderRadius: 12,
                background: '#1E1E1E',
            }}>
                <div style={{ marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }}>Counter Clockwise ↺</div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 10 }}>
                        <button className="button-rubik" onClick={() => handleRotate('RIGHT', 1)}>R'</button>
                        <button className="button-rubik" onClick={() => handleRotate('LEFT', -1)}>L'</button>
                        <button className="button-rubik" onClick={() => handleRotate('TOP', 1)}>U'</button>
                        <button className="button-rubik" onClick={() => handleRotate('BOTTOM', -1)}>D'</button>
                        <button className="button-rubik" onClick={() => handleRotate('FRONT', 1)}>F'</button>
                        <button className="button-rubik" onClick={() => handleRotate('BACK', -1)}>B'</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-around', paddingLeft: 25 }}>
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