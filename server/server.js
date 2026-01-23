/* ===== IMPORTS ===== */
import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import fluident from 'fluident'

/* ===== EXPRESS ===== */
const app = express()
app.use(cors())
app.use(express.json())

/* ===== FILE PATH ===== */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const SETTINGS_PATH = path.join(__dirname, "settings.json")

/* ===== DEFAULT SETTINGS ===== */
const DEFAULT_SETTINGS = {
    colours: {
        RIGHT: "#FF0000",
        LEFT: "#FFA061",
        UP: "#FFFFFF",
        DOWN: "#FFFF00",
        FRONT: "#00BB00",
        BACK: "#0000BB"
    },
    soundEnabled: true,
    rotateSpeed: 3,
    cubeSize: 3
}

const VALID_FACES = [
    "RIGHT",
    "LEFT",
    "UP",
    "DOWN",
    "FRONT",
    "BACK"
]

/* ===== MAKE FILE BY DEFAULT (FIRST RUN) ===== */
if (!fs.existsSync(SETTINGS_PATH)) {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(DEFAULT_SETTINGS, null, 2))
}

/* ===== GET SETTINGS ===== */
app.get("/settings", (req, res) => {
    let stored = {}
    
    try {
        const file = fs.readFileSync(SETTINGS_PATH, "utf8").trim()
        stored = file ? JSON.parse(file) : {}
    } catch {
        return res.status(500).json({ ok: false, error: "Invalid settings file" })
    }

    const merged = {
        ...DEFAULT_SETTINGS,
        ...stored,
        colours: {
            ...DEFAULT_SETTINGS.colours,
            ...(stored.colours || {})
        }
    }

    res.json(merged)
})

/* ===== PATCH SETTINGS ===== */
app.patch("/settings", (req, res) => {
    let stored = {}

    try {
        const file = fs.readFileSync(SETTINGS_PATH, "utf8").trim()
        stored = file ? JSON.parse(file) : {}
    } catch {
        return res.status(500).json({ ok: false, error: "Invalid settings file" })
    }

    const updatingColours = req.body.colours || {}
    const safeColours = {}

    for (const face of VALID_FACES) {
        if (updatingColours[face]) {
            safeColours[face] = updatingColours[face]
        }
    }

    const updated = {
        ...stored,
        ...req.body,
        colours: {
            ...(stored.colours || {}),
            ...safeColours
        }
    }

    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(updated, null, 2))
    res.json({ ok: true })
})

const serverOnline = fluident.gradient(`Server running on http://localhost:3001`, ['#ED4F44', '#EDA944', '#EDED44', '#A1ED44', '#44E0EE', '#4474ED', '#A944ED', '#ED44D1'])
app.listen(3001, () => 
    console.log(serverOnline)
)