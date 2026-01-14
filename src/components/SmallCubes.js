const colours = [
    [0, 1, '#FF6400'],         // ORANGE,   RIGHT
    [0, -1, '#FF0000'],        // RED,      LEFT
    [1, 1, '#FFFFFF'],         // WHITE,    TOP
    [1, -1, '#FFFF00'],        // YELLOW,   BOTTOM
    [2, 1, '#00BB00'],         // GREEN,    FRONT
    [2, -1, '#0000BB'],        // BLUE,     BACK
]

// SMALL INDIVIDUAL CUBE
function SmallCube({ position, geometry }) {
    return (
        <mesh position={position} geometry={geometry}>
            {/* APPLIES THE CORRECT COLOUR TO EACH FACE, INSIDE IS BLACK */}
            {[...Array(6).keys()].map((i) => (
                <meshStandardMaterial
                    key = {i}
                    attach = {`material-${i}`}
                    color = {position[colours[i][0]] === colours[i][1] ? colours[i][2] : 'black'}
                />
            ))}
        </mesh>
    )
}

export default SmallCube;