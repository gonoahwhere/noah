// IMPORTS
import JEASINGS, { JEasing } from "jeasings"

// RESET ROTATION GROUP FOR THE INDIVIDUAL CUBES
export function resetRotationGroup(cubeGroup, rotationGroup) {
    // TAKES THE INDIVIDUAL CUBES ATTACHED TO THE PIVOT AND MOVES BACK TO MAIN CUBE
    rotationGroup.children
        .slice() // COPIES CUBES ARRAY, HELPFUL SO WE DONT MESS UP ORIGINAL
        .reverse() // PREVENTS ORDER ISSUES WHEN REATTACHING INDIVIDUAL CUBES
        .forEach(cube => cubeGroup.attach(cube))

    // RESETS PIVOT ROTATION SO THE NEXT LAYER CAN BE ROTATED
    rotationGroup.quaternion.set(0, 0, 0, 1)
}

// ATTACHES THE INDIVIDUAL CUBES WITHIN A SPECIFIC LAYER FOR ROTATION
export function attachLayerToRotation(cubeGroup, rotationGroup, axis, limit) {
    // GOES THROUGH ALL INDIVIDUAL CUBES WITHIN THE MAIN CUBE
    cubeGroup.children
        // COPIES CUBES ARRAY, HELPFUL SO WE DONT MESS UP ORIGINAL
        .slice() 
        // PREVENTS ORDER ISSUES
        .reverse()
        // ONLY PICKS INDIVIDUAL CUBES WITHIN CURRENTLY SELECTED LAYER
        .filter(function (c) { return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit })
        // ATTACHES THE INDIVIDUAL CUBES WITHIN THE SELECTED LAYER FOR ROTATING
        .forEach(function (c) { rotationGroup.attach(c) })
}

// HANDLES THE ROTATION ANIMATION
export function animateCubeRotation(rotationGroup, axis, multiplier) {
    // ROTATES LAYER ALONG THE GIVEN AXIS SMOOTHLY
    // -1 IS COUNTER CLOCKWISE, 1 IS CLOCKWISE, 90 DEGREE ROTATION IN 250 MILLISECONDS
    new JEasing(rotationGroup.rotation)
        .to({ [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier }, 250)
        // ALLOWS FOR A SMOOTH ROTATION
        .easing(JEASINGS.Cubic.InOut)
        .start()
}

// HANDLES THE LAYER ROTATION
export function rotateLayer(cubeGroup, rotationGroup, axis, limit, multiplier) {
    if (!JEASINGS.getLength()) {
        // RESETS ANY OF THE INDIVIDUAL CUBES ATTACHED TO PIVOT
        resetRotationGroup(cubeGroup, rotationGroup)
        // ATTACHES INDIVIDUAL CUBES TO PIVOT FOR THE SELECTED LAYER
        attachLayerToRotation(cubeGroup, rotationGroup, axis, limit)
        // VISUALLY MOVES THE LAYER
        animateCubeRotation(rotationGroup, axis, multiplier)
    }
}