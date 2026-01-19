// IMPORTS
import { useColoursList } from '../utils/Colours';
import { useState, useEffect } from 'react';

// FILES
import { useSound } from "../SoundContext"

// USE ICONS INSTEAD OF WORDS
const faceIcons = {
    RIGHT: '🟧',
    LEFT: '🟥',
    TOP: '⬜',
    BOTTOM: '🟨',
    FRONT: '🟩',
    BACK: '🟦'
}

export function ColourPanel() {
  const { colours, setColour } = useColoursList();
  const { play } = useSound()
  const [inputs, setInputs] = useState({ ...colours});
  const [noahAlertMsg, setNoahAlertMsg] = useState(null)
  const [noahAlertClose, setNoahAlertClose] = useState(false)

  useEffect(() => {
    setInputs({ ...colours });
  },  [colours])

  // REJECTION POPUP
  const handleRejection = () => {
    play("ohno")
    setNoahAlertMsg("That colour is already used on another face!")
    setInputs({ ...colours })
  }

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
        zIndex: 1000
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
              let value = e.target.value.toUpperCase();

              // PREVENTS INVALID HEX COLOURS BEING ENTERED
              value = value.replace(/[^0-9A-F#]/g, "");

              // AUTOMATICALLY ADDS # IF ITS MISSING
              if (!value.startsWith("#")) {
                value = "#" + value;
              }

              // LIMITS LENGTH TO 7 CHARACTERS
              value = value.slice(0, 7);
              setInputs(prev => ({ ...prev, [face]: value }));

              // ONLY SETS IF VALID
              if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                const successColour = setColour(face, value)
                if (!successColour) {
                  handleRejection()
                }
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
                const successColour = setColour(face, hex)

                if (!successColour) {
                  handleRejection()
                  return
                }

                setInputs(prev => ({ ...prev, [face]: hex }))
            }}
            style={{ border: "none", background: "none" }}
          />
        </div>
      ))}

      {/* Custom Alert Messages */}
      {noahAlertMsg && (
      <div className={`noah-alert ${noahAlertClose ? "fade-out" : "fade-in"}`}>
          <div className="noah-alert-msg">{noahAlertMsg}</div>
          <button 
              className="button-rubik" 
              onClick={() => { 
                  setNoahAlertClose(true); 
                  setTimeout(() => { 
                      setNoahAlertMsg(null); 
                      setNoahAlertClose(false);
                  }, 200); }}
          >OK</button>
      </div>
      )}
    </div>
  );
}
