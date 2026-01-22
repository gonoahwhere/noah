/* ===== IMPORTS ===== */
import { useMemo } from 'react'

/* ===== STYLES ===== */
import './styles/fallingcube.css'

/* ===== FILES ===== */
import rubiksCube from './images/rubiksCube.png'
import rubiksCube2 from './images/rubiksCube2.png'
import rubiksCube3 from './images/rubiksCube3.png'

const IMAGES = [rubiksCube, rubiksCube2, rubiksCube3]

/* ===== EXPORT FUNCTION ===== */
export default function FallingCube({ count = 50 }) {
    const items = useMemo(
        () => Array.from({ length: count }).map((_, i) => ({
            id: i,
            img: IMAGES[Math.floor(Math.random() * IMAGES.length)],
            left: Math.random() * 100,
            duration: 8 + Math.random() * 5,
            delay: Math.random() * 5,
            rotation: Math.random() * 360,
            size: 20 + Math.random() * 20,
        })), [count]
    )

    return (
        <div className="falling-container">
            {items.map((item) => (
                <img key={item.id} src={item.img} alt="" className="falling-item" style={{ left: `${item.left}%`, animationDuration: `${item.duration}s`, animationDelay: `${item.delay}s`, width: `${item.size}px`, '--start-rotation': `${item.rotation}deg`  }} />
            ))}
        </div>
    )
}