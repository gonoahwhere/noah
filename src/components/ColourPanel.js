// ColourPanel.jsx
import { useColoursList } from '../utils/Colours';
import { useState, useEffect } from 'react';

// USE ICONS INSTEAD OF WORDS
const faceIcons = {
    RIGHT: '🟧',
    LEFT: '🟥',
    TOP: '⬜',
    DOWN: '🟨',
    FRONT: '🟩',
    BACK: '🟦'
}

export function ColourPanel() {
  const { colours, setColour } = useColoursList();
  const [inputs, setInputs] = useState({ ...colours});

  useEffect(() => {
    setInputs({ ...colours });
  },  [colours])
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 12,
        borderRadius: 12,
        background: '#1E1E1E',
        display: 'grid',
      }}
    >
      {Object.entries(colours).map(([face, value]) => (
        <div
          key={face}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >

          {/* LABEL */}
          <span style={{ width: 50 }}>{faceIcons[face]}</span>

          {/* HEX COLOUR */}
          <input
            type="text"
            value={inputs[face]}
            onChange={(e) => {
              const hex = e.target.value;
              setInputs(prev => ({ ...prev, [face]: hex }));

              // ONLY SETS IF VALID
              if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                setColour(face, hex)
              }
            }}
            style={{ border: 'none', background: 'none', color: "#ccc", fontFamily: 'Rubik', width: 90 }}
          />

          {/* COLOUR SWATCH */}
          <input
            type="color"
            value={inputs[face]}
            onChange={(e) => {
                const hex = e.target.value;
                setColour(face, e.target.value)
                setInputs(prev => ({ ...prev, [face]: hex }))
            }}
            style={{ border: "none", background: "none" }}
          />
        </div>
      ))}
    </div>
  );
}
