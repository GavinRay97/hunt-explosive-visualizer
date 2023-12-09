import { useEffect, useRef, useState } from "react"

interface Explosive {
  displayName: string

  effectRadius: number
  lethalRadius: number
  lethalRadiusBulwark: number

  minDamage: number
  maxDamage: number
  impactDamage?: number
  salveSkinDamage?: number

  throwRange: number
  throwRangePitcher: number

  fuseTime: number
  duration?: number
  statusEffect?: string
  beetleMoveSpeed?: number
}

const EXPLOSIVES: Record<string, Explosive> = {
  dynamite: {
    displayName: "Dynamite",

    effectRadius: 8.5,
    lethalRadius: 5,
    lethalRadiusBulwark: 3.5,

    maxDamage: 750,
    minDamage: 75,

    throwRange: 22,
    throwRangePitcher: 27,

    fuseTime: 5,
  },
  dynamiteBundle: {
    displayName: "Dynamite Bundle",

    effectRadius: 8.5,
    lethalRadius: 6.5,
    lethalRadiusBulwark: 5.5,

    maxDamage: 1500,
    minDamage: 75,

    throwRange: 22,
    throwRangePitcher: 27,

    fuseTime: 5,
  },
  bigDynamiteBundle: {
    displayName: "Big Dynamite Bundle",

    effectRadius: 10.5,
    lethalRadius: 8.5,
    lethalRadiusBulwark: 7,

    maxDamage: 3000,
    minDamage: 90,

    throwRange: 15,
    throwRangePitcher: 17,

    fuseTime: 5,
  },
  fragBomb: {
    displayName: "Frag Bomb",

    effectRadius: 10.5,
    lethalRadius: 6.5,
    lethalRadiusBulwark: 6.5,

    maxDamage: 250,
    minDamage: 23,

    statusEffect: "Heavy Bleed - 4.5HP/S",

    throwRange: 22,
    throwRangePitcher: 27,

    fuseTime: 5,
  },
  stickyBomb: {
    displayName: "Sticky Bomb",

    effectRadius: 8,
    lethalRadius: 3.8,
    lethalRadiusBulwark: 3.8,

    maxDamage: 800,
    minDamage: 8,

    statusEffect: "Heavy Bleed - 4.5HP/s",

    throwRange: 22,
    throwRangePitcher: 27,

    fuseTime: 9,
  },
  redBarrel: {
    displayName: "Red Barrel",

    effectRadius: 7.5,
    lethalRadius: 4.5,
    lethalRadiusBulwark: 2.5,

    maxDamage: 9001,
    minDamage: 75,

    throwRange: 0,
    throwRangePitcher: 0,
    fuseTime: 3,
  },
  explosiveXbow: {
    displayName: "Explosive Crossbow",

    effectRadius: 4.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 124,
    minDamage: 30,
    impactDamage: 88,

    throwRange: 0,
    throwRangePitcher: 0,

    fuseTime: 0,
  },
  fragArrow: {
    displayName: "Frag Arrow",

    effectRadius: 6,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 111,
    minDamage: 13,

    impactDamage: 25,
    statusEffect: "Heavy Bleed - 4.5HP/s",

    throwRange: 0,
    throwRangePitcher: 0,
    fuseTime: 1.5,
  },
  hellfireBomb: {
    displayName: "Hellfire Bomb",

    effectRadius: 6,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 30,
    salveSkinDamage: 20,
    minDamage: 0,
    impactDamage: 0,
    statusEffect: "Heavy Burning - 4.5HP/sec",

    throwRange: 22,
    throwRangePitcher: 27,
    fuseTime: 0,
    duration: 5,
  },
  fireBomb: {
    displayName: "Fire Bomb",

    effectRadius: 2.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 15,
    minDamage: 0,
    salveSkinDamage: 0,
    impactDamage: 0,

    statusEffect: "Medium Burning - 3HP/sec",

    throwRange: 22,
    throwRangePitcher: 27,

    fuseTime: 0,
    duration: 120,
  },
  dragonBolt: {
    displayName: "Dragon Bolt",

    effectRadius: 2.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 17,
    minDamage: 0,
    impactDamage: 0,
    salveSkinDamage: 14,

    statusEffect: "Heavy Burning - 4.5HP/sec",

    throwRange: 0,
    throwRangePitcher: 0,

    fuseTime: 0,
    duration: 5,
  },
  fireBeetle: {
    displayName: "Fire Beetle",

    effectRadius: 1.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 20,
    salveSkinDamage: 15,
    minDamage: 0,
    impactDamage: 0,

    statusEffect: "Medium Burning - 3HP/sec",

    throwRange: 0,
    throwRangePitcher: 0,

    beetleMoveSpeed: 4.5,
    fuseTime: 0,
    duration: 0,
  },

  chokeBomb: {
    displayName: "Choke Bomb",

    effectRadius: 3,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 1,
    minDamage: 0,
    impactDamage: 0,

    statusEffect: "Coughing - 14 seconds",

    throwRange: 22,
    throwRangePitcher: 27,
    fuseTime: 5,

    duration: 120,
  },

  flashBomb: {
    displayName: "Flash Bomb",

    effectRadius: 7.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,
    maxDamage: 1,
    minDamage: 0,
    impactDamage: 0,
    statusEffect: "Blind - 5 seconds",

    throwRange: 22,
    throwRangePitcher: 27,
    fuseTime: 3,
    duration: 0,
  },

  stalkerBeetle: {
    displayName: "Stalker Beetle",

    effectRadius: 4.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,
    maxDamage: 25,
    minDamage: 0,
    impactDamage: 0,
    statusEffect: "Poisoned & Medium Bleed - 3HP/sec",

    throwRange: 0,
    throwRangePitcher: 0,
    beetleMoveSpeed: 6.66,
    fuseTime: 0,
    duration: 0,
  },

  poisonBomb: {
    displayName: "Poison Bomb",

    effectRadius: 2.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 33,
    minDamage: 0,
    impactDamage: 0,
    statusEffect: "Poisoned (Damage value in HP/sec)",

    throwRange: 22,
    throwRangePitcher: 27,

    fuseTime: 0,
    duration: 120,
  },

  bombLanceWaxedFrag: {
    displayName: "Bomb Lance (Waxed Frag)",

    effectRadius: 6.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 126,
    minDamage: 12,
    impactDamage: 25,

    statusEffect: "Heavy Bleed - 4.5HP/sec",

    throwRange: 0,
    throwRangePitcher: 0,

    fuseTime: 1.5,
    duration: 0,
  },

  bombLance: {
    displayName: "Bomb Lance",

    effectRadius: 2.5,
    lethalRadius: 0,
    lethalRadiusBulwark: 0,

    maxDamage: 75,
    minDamage: 0,
    impactDamage: 2,

    statusEffect: "Hunters hit directly are killed without Bulwark",

    throwRange: 0,
    throwRangePitcher: 0,

    fuseTime: 2,
    duration: 0,
  },
}

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 300
const DUMMY_BACKGROUND_IMAGE_URL = "https://i.imgur.com/XwE2vEw.png"

const ExplosiveRadiusVisualizationSVG = ({ explosive, isDarkMode }: { explosive: Explosive; isDarkMode: boolean }) => {
  const maxRadius = Math.max(...Object.values(EXPLOSIVES).map((e) => e.effectRadius))

  // Dark mode color adjustments
  const strokeColor = isDarkMode ? "white" : "black"
  const textColor = isDarkMode ? "white" : "gray-700"

  const EFFECT_RADIUS_COLOR = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 0, 0, 0.2)"
  const LETHAL_RADIUS_COLOR = isDarkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 0, 0, 0.4)"
  const LETHAL_RADIUS_BULWARK_COLOR = isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 0, 0, 0.6)"

  const THROW_RANGE_LINE_COLOR = isDarkMode ? "darkgrey" : "black"
  const THROW_RANGE_PITCHER_LINE_COLOR = isDarkMode ? "cyan" : "blue"

  const centerX = CANVAS_WIDTH / 2
  const centerY = CANVAS_HEIGHT - maxRadius * 10 - 20

  const PITCHER_LINE_OFFSET_DEGREES = 5
  const PITCHER_LINE_OFFSET_RADIANS = PITCHER_LINE_OFFSET_DEGREES * (Math.PI / 180)

  const viewBox = `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`

  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <svg className="w-full h-auto" viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        <circle cx={centerX} cy={centerY} r={maxRadius * 10} stroke={strokeColor} strokeWidth="1" fill="none" />
        <text
          x={centerX}
          y={centerY + maxRadius * 10 + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fill={textColor}
          className="font-bold"
        >
          {maxRadius}m
        </text>
        <circle cx={centerX} cy={centerY} r={explosive.effectRadius * 10} stroke="none" fill={EFFECT_RADIUS_COLOR} />
        <circle cx={centerX} cy={centerY} r={explosive.lethalRadius * 10} stroke="none" fill={LETHAL_RADIUS_COLOR} />
        <circle
          cx={centerX}
          cy={centerY}
          r={explosive.lethalRadiusBulwark * 10}
          stroke="none"
          fill={LETHAL_RADIUS_BULWARK_COLOR}
        />
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + explosive.throwRange * 10}
          y2={centerY}
          stroke={THROW_RANGE_LINE_COLOR}
          strokeWidth="1"
        />
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + explosive.throwRangePitcher * 10 * Math.cos(PITCHER_LINE_OFFSET_RADIANS)}
          y2={centerY - explosive.throwRangePitcher * 10 * Math.sin(PITCHER_LINE_OFFSET_RADIANS)}
          stroke={THROW_RANGE_PITCHER_LINE_COLOR}
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

interface Bar {
  color: string
  length: number
}

const ImageWithBars = ({ imageUrl, bars }: { imageUrl: string; bars: Bar[] }) => {
  const baseOffsetX = 50 // 50px from the left of the image (full scale)
  const baseOffsetY = 300 // 300px from the top of the image (full scale)
  const baseBarHeight = 5 // 5px height
  const oneMeterInPixelsAtScale1 = 80 // 1m = 80px

  const imgRef = useRef<HTMLImageElement>(null)

  const [scaleFactors, setScaleFactors] = useState({ width: 1, height: 1 })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showHelpText, setShowHelpText] = useState(false)

  const updateBarPositions = () => {
    if (imgRef.current) {
      const { offsetWidth, naturalWidth, offsetHeight, naturalHeight } = imgRef.current
      setScaleFactors({
        width: offsetWidth / naturalWidth,
        height: offsetHeight / naturalHeight,
      })
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateBarPositions)
    updateBarPositions() // Initial position update
    return () => {
      window.removeEventListener("resize", updateBarPositions)
    }
  }, [])

  return (
    <div style={{ position: "relative" }}>
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Overlay"
        onLoad={updateBarPositions}
        style={{ width: "100%", height: "auto" }}
        className="rounded-xl"
      />
      {bars.map((bar, index) => {
        const adjustedOffsetY = baseOffsetY + index * 10 // 10px between each bar
        const scaledOffsetX = baseOffsetX * scaleFactors.width // The base offsetX value scaled
        const scaledOffsetY = adjustedOffsetY * scaleFactors.height // The base offsetY value scaled
        const scaledBarHeight = baseBarHeight * scaleFactors.height // 5px height scaled

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${scaledOffsetY}px`,
              left: `${scaledOffsetX}px`,
              width: `${bar.length * oneMeterInPixelsAtScale1 * scaleFactors.width}px`,
              height: `${scaledBarHeight}px`,
              backgroundColor: bar.color,
            }}
          />
        )
      })}

      <button
        onMouseEnter={() => setShowHelpText(true)}
        onMouseLeave={() => setShowHelpText(false)}
        onClick={() => setIsModalOpen(true)}
        className="absolute top-0 right-0 m-2 p-2 bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
        aria-label="Help"
        style={{ minWidth: "40px" }}
      >
        {showHelpText ? "WHAT DO THE COLORS MEAN?" : "?"}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center p-4">
          <div className="lg:w-1/2 sm:w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            {/* Modal content */}
            <ColorKeyCard />

            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ExplosiveStatsDisplay({ explosive }: { explosive: Explosive }) {
  return (
    <div className="h-72 g-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 my-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
        {/* Icon or graphic can be added here */}
        Explosive Stats
      </h2>
      <div className="space-y-3">
        {explosive.effectRadius != undefined && explosive.effectRadius != 0 && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Effect radius:</span>
            <span className="text-gray-800 dark:text-gray-100">{explosive.effectRadius}m</span>
          </p>
        )}

        {explosive.lethalRadius != undefined && explosive.lethalRadius != 0 && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Lethal radius:</span>
            <span className="text-gray-800 dark:text-gray-100">
              {explosive.lethalRadius}m / {explosive.lethalRadiusBulwark}m (Bulwark)
            </span>
          </p>
        )}

        {explosive.throwRange != undefined && explosive.throwRange != 0 && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Throw range:</span>
            <span className="text-gray-800 dark:text-gray-100">
              {explosive.throwRange}m / {explosive.throwRangePitcher}m (Pitcher)
            </span>
          </p>
        )}

        <p className="flex justify-between items-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">Damage:</span>
          <span className="text-gray-800 dark:text-gray-100">
            {explosive.minDamage > 0 ? `${explosive.minDamage} - ${explosive.maxDamage}` : explosive.maxDamage}
          </span>
        </p>

        {explosive.impactDamage != undefined && explosive.impactDamage != 0 && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Impact damage:</span>
            <span className="text-gray-800 dark:text-gray-100">{explosive.impactDamage}</span>
          </p>
        )}

        {explosive.salveSkinDamage != undefined && explosive.salveSkinDamage != 0 && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Salve skin damage:</span>
            <span className="text-gray-800 dark:text-gray-100">{explosive.salveSkinDamage}</span>
          </p>
        )}

        {explosive.fuseTime != undefined && explosive.fuseTime != 0 && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Fuse time:</span>
            <span className="text-gray-800 dark:text-gray-100">{explosive.fuseTime}s</span>
          </p>
        )}

        {explosive.statusEffect != undefined && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Status effect:</span>
            <span className="text-gray-800 dark:text-gray-100">{explosive.statusEffect}</span>
          </p>
        )}

        {explosive.duration != undefined && explosive.duration != 0 && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Duration:</span>
            <span className="text-gray-800 dark:text-gray-100">{explosive.duration}s</span>
          </p>
        )}

        {explosive.beetleMoveSpeed != undefined && explosive.beetleMoveSpeed != 0 && (
          <p className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Beetle move speed:</span>
            <span className="text-gray-800 dark:text-gray-100">{explosive.beetleMoveSpeed}m/s</span>
          </p>
        )}
      </div>
    </div>
  )
}

function ColorKeyCard() {
  return (
    <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 my-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
        {/* Icon or graphic can be added here */}
        Color Key
      </h2>
      <div className="space-y-3">
        <p className="flex justify-between items-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">Effect radius:</span>
          <span className="text-gray-800 dark:text-gray-100">Yellow</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">Lethal radius:</span>
          <span className="text-gray-800 dark:text-gray-100">Red</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">Lethal radius (Bulwark):</span>
          <span className="text-gray-800 dark:text-gray-100">Blue</span>
        </p>
      </div>
    </div>
  )
}

function makeBarSettingsForExplosive(explosive: Explosive): [Bar, Bar, Bar] {
  return [
    {
      color: "yellow",
      length: explosive.effectRadius,
    },
    {
      color: "red",
      length: explosive.lethalRadius,
    },
    {
      color: "royalblue",
      length: explosive.lethalRadiusBulwark,
    },
  ]
}

function App() {
  const [selectedView, setSelectedView] = useState<"svg" | "dummy">("dummy")
  const [selectedExplosive, setSelectedExplosive] = useState("dynamite")
  const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches)

  const explosive = EXPLOSIVES[selectedExplosive]

  useEffect(() => {
    const classList = document.documentElement.classList
    if (darkMode) {
      classList.add("dark")
    } else {
      classList.remove("dark")
    }
  }, [darkMode])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches)
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  return (
    <div className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen flex justify-center items-center p-4 relative">
      {/* Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-0 right-0 m-4 p-2 bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Card container */}
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl mx-auto p-6">
        <header className="text-xl font-semibold mb-4">
          {/* Use flex-col for small screens and flex-row for medium screens and up */}
          <section className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <label htmlFor="view" className="mr-2 block">
                View
              </label>
              <select
                id="view"
                name="view"
                value={selectedView}
                onChange={(event) => setSelectedView(event.target.value as "svg" | "dummy")}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 w-full"
              >
                <option value="svg">Radius Visualization</option>
                <option value="dummy">Dummy Background</option>
              </select>
            </div>
            <div>
              <label htmlFor="explosive" className="mr-2 block">
                Explosive
              </label>
              <select
                id="explosive"
                name="explosive"
                value={selectedExplosive}
                onChange={(event) => setSelectedExplosive(event.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 w-full"
              >
                {Object.keys(EXPLOSIVES)
                  .sort((a, b) => a.localeCompare(b))
                  .map((explosive) => (
                    <option key={explosive} value={explosive}>
                      {EXPLOSIVES[explosive].displayName}
                    </option>
                  ))}
              </select>
            </div>
          </section>
        </header>

        <main className="flex-grow">
          {(() => {
            switch (selectedView) {
              case "svg":
                return <ExplosiveRadiusVisualizationSVG explosive={explosive} isDarkMode={darkMode} />
              case "dummy":
                return (
                  <ImageWithBars imageUrl={DUMMY_BACKGROUND_IMAGE_URL} bars={makeBarSettingsForExplosive(explosive)} />
                )
            }
          })()}
        </main>

        <aside className="mt-4">
          <ExplosiveStatsDisplay explosive={explosive} />
        </aside>

        <footer className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="mb-2">
            <a
              href="https://github.com/GavinRay97/hunt-damage-calculator"
              className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 dark:text-blue-300 transition duration-300"
            >
              Source code
            </a>
          </p>
          <p className="mb-2">
            Data by{" "}
            <a
              href="https://www.youtube.com/@Cornf"
              className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 dark:text-blue-300 transition duration-300"
            >
              Cornf
            </a>
          </p>
          <p className="mb-2">
            Made by{" "}
            <a
              href="https://twitter.com/GavinRayDev"
              className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 dark:text-blue-300 transition duration-300"
            >
              Gavin Ray
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
