// IMPORTS
import JEASINGS, { JEasing } from "jeasings"
import * as THREE from 'three'

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
export function attachLayerToRotation(cubeGroup, rotationGroup, camera, face) {
    // DETERMINES CAMERA DIRECTION
    const cameraDirection = new THREE.Vector3()
    camera.getWorldPosition(cameraDirection)
    cameraDirection.sub(cubeGroup.position).normalize()
    
    // GET UP/RIGHT VECTORS BASED ON CAMERA ORIENTATION
    const cameraUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion)
    const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
    
    // DETERMINE WHICH FACE NEEDS TO ROTATE, BASED ON CAMERA ORIENTATION
    let worldAxis, limit, rotationAxisVector
    
    switch(face) {
        case 'TOP':
            worldAxis = findDominantAxis(cameraUp)
            limit = cameraUp[worldAxis] = 0.5
            rotationAxisVector = cameraUp
            break
        case 'BOTTOM':
            worldAxis = findDominantAxis(cameraUp)
            limit = cameraUp[worldAxis] = -0.5
            rotationAxisVector = cameraUp
            break
        case 'RIGHT':
            worldAxis = findDominantAxis(cameraRight)
            limit = cameraRight[worldAxis] = 0.5
            rotationAxisVector = cameraRight
            break
        case 'LEFT':
            worldAxis = findDominantAxis(cameraRight)
            limit = cameraRight[worldAxis] = -0.5
            rotationAxisVector = cameraRight
            break
        case 'FRONT':
            worldAxis = findDominantAxis(cameraDirection)
            limit = cameraDirection[worldAxis] = 0.5
            rotationAxisVector = cameraDirection
            break
        case 'BACK':
            worldAxis = findDominantAxis(cameraDirection)
            limit = cameraDirection[worldAxis] = -0.5
            rotationAxisVector = cameraDirection
            break
        default:
            worldAxis = findDominantAxis(cameraDirection)
            limit = cameraDirection[worldAxis] = 0.5
            rotationAxisVector = cameraDirection
            console.warn(`Invalid face "${face}" provided. Defaulting to FRONT.`)
            break
    }
    
    // GOES THROUGH ALL INDIVIDUAL CUBES WITHIN THE MAIN CUBE
    cubeGroup.children
        .slice() 
        .reverse()
        .filter(function (c) { return limit < 0 ? c.position[worldAxis] < limit : c.position[worldAxis] > limit })
        .forEach(function (c) { rotationGroup.attach(c) })
    
    // RETURNS THE AXIS
    return worldAxis
}

// CALCULATES THE AXIS WITH THE LARGEST COMPONENT
function findDominantAxis(vector) {
    const absX = Math.abs(vector.x)
    const absY = Math.abs(vector.y)
    const absZ = Math.abs(vector.z)
    
    if (absY > absX && absY > absZ) return 'y'
    if (absX > absZ) return 'x'
    return 'z'
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
export function rotateLayer(cubeGroup, rotationGroup, camera, face, multiplier) {
    if (!JEASINGS.getLength()) {
        // RESETS ANY OF THE INDIVIDUAL CUBES ATTACHED TO PIVOT
        resetRotationGroup(cubeGroup, rotationGroup)
        // ATTACHES INDIVIDUAL CUBES TO PIVOT FOR THE SELECTED LAYER
        const axis = attachLayerToRotation(cubeGroup, rotationGroup, camera, face)
        // VISUALLY MOVES THE LAYER
        animateCubeRotation(rotationGroup, axis, multiplier)
    }
}