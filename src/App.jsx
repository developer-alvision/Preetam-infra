import { useEffect, useState, useRef, memo } from 'react'
import './App.css'
import brandLogo from './assets/Logo/black yellow Logo.jpg'

// Service media imports
import cadVid from './Images/PI SERVICES PICS/3d cad.mp4'
import structuralPlanVid from './Images/PI SERVICES PICS/structural engineering plan.mp4'
import electricalConduitImg from './Images/PI SERVICES PICS/electrical and conduit.jpeg'
import spacePlanningVid from './Images/PI SERVICES PICS/3eacfa291d66f01034aae9f15ffb8efe_720w.mp4'
import vitrifiedTilesVid from './Images/PI SERVICES PICS/f7ce9bed01c3d6571e7e65f504b3171c.mp4'
import italianMarbleVid from './Images/PI SERVICES PICS/italian marble.mp4'
import woodenPlanksVid from './Images/PI SERVICES PICS/wooden planks.mp4'
import epoxyVid from './Images/PI SERVICES PICS/epoxy.mp4'
import popCeilingImg from './Images/PI SERVICES PICS/pop ceiling.jpeg'
import ambientCoveImg from './Images/PI SERVICES PICS/ambient cove lighting.jpeg'
import trackLightsImg from './Images/PI SERVICES PICS/track lights.jpeg'
import weatherShieldImg from './Images/PI SERVICES PICS/painting.jpeg'
import interiorEmulsionImg from './Images/PI SERVICES PICS/interior emulsion.jpeg'
import texturedCementImg from './Images/PI SERVICES PICS/textured cement.jpeg'
import modularKitchenImg from './Images/PI SERVICES PICS/modular kitchen.jpeg'
import wardrobeImg from './Images/PI SERVICES PICS/wardrobe.jpeg'
import workshopCarpentryImg from './Images/PI SERVICES PICS/workshop carpentary.jpeg'
import shutteringWorkImg from './Images/PI SERVICES PICS/Shuttering Work.jpeg'
import architecturalGateImg from './Images/PI SERVICES PICS/architectural gate.jpeg'

/* ───────── FRAME ASSET GLOBS ───────── */
const scene1Frames = Object.entries(
  import.meta.glob('./Images/Landing Page/Scene 1 Building Construction start to end/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)

const hallFrames = Object.entries(
  import.meta.glob('./Images/Landing Page/Hall setup/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)

const kitchenFrames = Object.entries(
  import.meta.glob('./Images/Landing Page/Kitchen setup frames/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)

const bedroomFrames = Object.entries(
  import.meta.glob('./Images/Landing Page/Bedroom Setup/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)

/* ───────── LUXURY PREETHAM INFRA LOGO MARK ───────── */
function Logo({ light = false, onClick }) {
  return (
    <div className={`brand-logo${light ? ' brand-logo-light' : ''}`} onClick={onClick}>
      <img src={brandLogo} alt="Preetham Infra Logo" className="brand-logo-img" />
      <span className="brand-logo-text">
        <span className="brand-name">PREETHAM INFRA</span>
      </span>
    </div>
  )
}

/* ───────── DYNAMIC REAL PROJECTS DATA (ALL 8 PROJECTS) ───────── */
const allProjectImageGlob = import.meta.glob('./Images/Projects/**/*.{JPG,jpg,png,jpeg,JPEG,webp,WEBP}', { eager: true, query: '?url', import: 'default' })

const getProjectImages = (folderKeyword, fallbackImages = []) => {
  const matched = Object.entries(allProjectImageGlob)
    .filter(([path]) => path.toLowerCase().includes(folderKeyword.toLowerCase()))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([, url]) => url)

  return matched.length > 0 ? matched : fallbackImages
}

const revanyaImages = getProjectImages('Revanya')
const srinivasaImages = getProjectImages('Srinivasa')
const dominosImages = getProjectImages('Dominos', revanyaImages.slice(0, 4))
const naraKiranImages = getProjectImages('Nara Kiran', revanyaImages.slice(2, 6))
const chandrasekharImages = getProjectImages('Chandrasekhar', srinivasaImages.slice(0, 4))
const mathewImages = getProjectImages('Mathew', revanyaImages.slice(4, 8))
const sanitoriumImages = getProjectImages('Sanitorium', revanyaImages.slice(6, 10))
const bangaruImages = getProjectImages('Bangaru', srinivasaImages.slice(2, 6))

const projectsData = [
  {
    id: 'revanya-residential-building',
    title: 'Revanya Luxury Residential Villa',
    type: 'Residential',
    category: 'Turnkey Luxury Villa',
    location: 'Bangalore / Madanapalle Region',
    area: '8,500 Sq. Ft.',
    completion: '2024',
    desc: 'Bespoke Revanya residential sanctuary engineered from deep seismic pile foundations to a double-height living hall, Italian marble flooring, German soft-close modular kitchens, and climate-controlled master suites.',
    images: revanyaImages,
    specs: [
      { label: 'Foundation', val: 'Deep Seismic Pile' },
      { label: 'Flooring', val: 'Italian Marble & Hardwood' },
      { label: 'Kitchen', val: 'German Soft-Close Modular' },
      { label: 'Soundproofing', val: 'Acoustic Double-Glazing' },
    ],
  },
  {
    id: 'srinivasa-lodge',
    title: 'Srinivasa Lodge & Commercial Complex',
    type: 'Commercial',
    category: 'Commercial & Hospitality',
    location: 'Chittoor / Madanapalle, AP',
    area: '24,000 Sq. Ft.',
    completion: '2023',
    desc: 'Turnkey commercial lodge and hospitality complex engineered from structural foundation to complete interior architecture. Features high-traffic vitrified flooring, false ceiling integration, custom hotel furniture, and multi-tier MEP services.',
    images: srinivasaImages,
    specs: [
      { label: 'Structure', val: 'Heavy Duty RCC Frame' },
      { label: 'Flooring', val: 'Vitrified High-Traffic Tiles' },
      { label: 'Interiors', val: 'Custom Hotel Fit-Outs' },
      { label: 'Ceilings', val: 'Acoustic POP & Gypsum' },
    ],
  },
  {
    id: 'dominos-building-construction',
    title: 'Dominos Commercial Building Construction',
    type: 'Commercial',
    category: 'Commercial Retail',
    location: 'Madanapalle, AP',
    area: '6,500 Sq. Ft.',
    completion: '2024',
    desc: 'Turnkey commercial retail building constructed for Dominos featuring heavy-duty RCC frame structure, brand-compliant exterior elevation, commercial electrical wiring, and high-traffic flooring.',
    images: dominosImages,
    specs: [
      { label: 'Structure', val: 'Commercial RCC Frame' },
      { label: 'Elevation', val: 'Brand Glass & ACP Facade' },
      { label: 'MEP', val: '3-Phase Heavy Electrical' },
      { label: 'Handover', val: 'Turnkey Shell Execution' },
    ],
  },
  {
    id: 'nara-kiran-residential-building',
    title: 'Nara Kiran Luxury Residence',
    type: 'Residential',
    category: 'Turnkey Residential',
    location: 'AP / KA Region',
    area: '5,200 Sq. Ft.',
    completion: '2024',
    desc: 'Modern multi-story residential building engineered with high-strength concrete, custom interior joinery, decorative false ceilings, and premium exterior weather-shield elevation.',
    images: naraKiranImages,
    specs: [
      { label: 'Structure', val: 'IS-Code RCC Frame' },
      { label: 'Joinery', val: 'Teak Wood Doors & Frames' },
      { label: 'Ceilings', val: 'Gypsum POP Cove Lighting' },
      { label: 'Paint', val: 'Weather-Shield Exterior' },
    ],
  },
  {
    id: 'chandrasekhar-naidu-building',
    title: 'Chandrasekhar Naidu Commercial Complex',
    type: 'Commercial',
    category: 'Commercial & Mixed Use',
    location: 'Madanapalle Region, AP',
    area: '12,000 Sq. Ft.',
    completion: '2023',
    desc: 'Multi-story commercial complex constructed with seismic RCC design, glass facade elements, wide staircase & elevator shaft layout, and vitrified floor finishes.',
    images: chandrasekharImages,
    specs: [
      { label: 'Structure', val: 'Seismic Grade RCC' },
      { label: 'Flooring', val: 'Vitrified Commercial Tiles' },
      { label: 'Elevation', val: 'Structural Glazing' },
      { label: 'Circulation', val: 'Wide Staircase & Shaft' },
    ],
  },
  {
    id: 'mathew-residential-building',
    title: 'Mathew Executive Residence',
    type: 'Residential',
    category: 'Turnkey Residential',
    location: 'KA / AP Region',
    area: '4,800 Sq. Ft.',
    completion: '2023',
    desc: 'Contemporary executive home featuring open-plan living, custom modular kitchen fit-out, LED cove lighting, and landscaped exterior patio space.',
    images: mathewImages,
    specs: [
      { label: 'Structure', val: 'Reinforced RCC Slab' },
      { label: 'Kitchen', val: 'Modular Acrylic Cabinets' },
      { label: 'Flooring', val: 'Polished Porcelain Tiles' },
      { label: 'Lighting', val: 'Layered Architectural Cove' },
    ],
  },
  {
    id: 'sanitorium-residential-building',
    title: 'Sanitorium Hillside Residential Project',
    type: 'Residential',
    category: 'Turnkey Residential',
    location: 'Sanitorium Road, Madanapalle',
    area: '6,000 Sq. Ft.',
    completion: '2024',
    desc: 'Hillside residential building engineered with reinforced retaining structures, thermal insulation, luxury bathroom fit-outs, and durable teak wood joinery.',
    images: sanitoriumImages,
    specs: [
      { label: 'Retaining Wall', val: 'Reinforced Concrete Mass' },
      { label: 'Bathrooms', val: 'Kohler Premium Fittings' },
      { label: 'Joinery', val: 'Bespoke Workshop Teak' },
      { label: 'Roofing', val: 'Waterproof Thermal Insulation' },
    ],
  },
  {
    id: 'bangaru-palyam-project',
    title: 'Bangaru Palyam Infrastructure & Residential Project',
    type: 'Civil & Residential',
    category: 'Infrastructure & Turnkey',
    location: 'Bangaru Palyam, Chittoor Dist, AP',
    area: '15,000 Sq. Ft.',
    completion: '2024',
    desc: 'Comprehensive civil construction project including structural RCC foundation, boundary walling, site grading, and turnkey building execution.',
    images: bangaruImages,
    specs: [
      { label: 'Civil Scope', val: 'Grading & Mass Foundation' },
      { label: 'Boundary', val: 'Pre-Cast RCC & Brickwork' },
      { label: 'Structure', val: 'Column Beam Construction' },
      { label: 'Handover', val: 'Turnkey Site Execution' },
    ],
  },
]

/* ───────── SERVICES HUB DATA (19 DIVISIONS) ───────── */
const allServicesData = [
  {
    id: 'cad-3d',
    tag: 'CAD / BIM PLANNING',
    category: 'Planning & Structural',
    title: 'Concept Discussion & 3D CAD',
    type: 'video',
    src: cadVid,
    highlights: ['3D Elevation Renderings', 'BIM Compliance', 'Architectural Blueprints'],
    action: 'Request Plan Consultation'
  },
  {
    id: 'structural-plan',
    tag: 'IS-CODE COMPLIANT',
    category: 'Planning & Structural',
    title: 'Structural Engineering Plan',
    type: 'video',
    src: structuralPlanVid,
    highlights: ['Seismic Soil Analysis', 'IS-456 Standard RCC', 'Column & Beam Design'],
    action: 'Inquire Structural Audits'
  },
  {
    id: 'electrical-conduit',
    tag: 'SMART AUTOMATION',
    category: 'Planning & Structural',
    title: 'Electrical & Conduit Planning',
    type: 'image',
    src: electricalConduitImg,
    highlights: ['Dual Conduit Circuiting', 'Smart Automation Ready', 'Earthing Shield'],
    action: 'Get Electrical Specs'
  },
  {
    id: 'space-planning',
    tag: 'SPATIAL FLOW',
    category: 'Interiors & Ergonomics',
    title: 'Space Planning & Ergonomics',
    type: 'video',
    src: spacePlanningVid,
    highlights: ['Optimal Ergonomic Flow', 'Vastu Layouts', 'Maximized Daylight & Air'],
    action: 'Request Interior Layout'
  },
  {
    id: 'vitrified-tiles',
    tag: 'VITRIFIED TILES',
    category: 'Flooring Systems',
    title: 'Vitrified & Porcelain Tile Systems',
    type: 'video',
    src: vitrifiedTilesVid,
    highlights: ['4x2 & 6x4 Slab Tiles', 'Zero-Grout Precision', 'High-Traffic Scratch Proof'],
    action: 'Inquire Tile Solutions'
  },
  {
    id: 'italian-marble',
    tag: 'ITALIAN MARBLE',
    category: 'Flooring Systems',
    title: 'Italian Marble & Granite Stone',
    type: 'video',
    src: italianMarbleVid,
    highlights: ['Imported Italian Slabs', 'Mirror Diamond Polish', 'Stain-Sealed Processing'],
    action: 'Request Marble Estimate'
  },
  {
    id: 'wooden-planks',
    tag: 'ACOUSTIC HARDWOOD',
    category: 'Flooring Systems',
    title: 'Engineered Hardwood & Wooden Planks',
    type: 'video',
    src: woodenPlanksVid,
    highlights: ['Teak Wood Veneer', 'Sound Dampening Underlay', 'Water Resistant Coating'],
    action: 'Explore Wooden Specs'
  },
  {
    id: 'epoxy-coating',
    tag: 'INDUSTRIAL EPOXY',
    category: 'Flooring Systems',
    title: 'Polished Concrete & Epoxy Coatings',
    type: 'video',
    src: epoxyVid,
    highlights: ['Seamless Metallic Epoxy', 'Heavy Commercial Grade', 'Chemical & Oil Resistant'],
    action: 'Inquire Epoxy Specs'
  },
  {
    id: 'pop-ceiling',
    tag: 'GYPSUM & POP',
    category: 'Ceilings & Lighting',
    title: 'Gypsum & POP Suspended Ceilings',
    type: 'image',
    src: popCeilingImg,
    highlights: ['Saint-Gobain Boards', 'Thermal & Acoustic Insulation', 'Seamless Cove Mouldings'],
    action: 'Request Ceiling Quote'
  },
  {
    id: 'cove-lighting',
    tag: 'LAYERED LIGHTING',
    category: 'Ceilings & Lighting',
    title: 'Ambient & Architectural Cove Lighting',
    type: 'image',
    src: ambientCoveImg,
    highlights: ['Indirect LED Diffusers', 'Warm/Cool Color Temperature', 'Smart Dimmable Drivers'],
    action: 'Get Lighting Scheme'
  },
  {
    id: 'track-lights',
    tag: 'ACCENT SPOTLIGHTS',
    category: 'Ceilings & Lighting',
    title: 'Accent Spotlights & Magnetic Track Lights',
    type: 'image',
    src: trackLightsImg,
    highlights: ['Magnetic Low-Voltage Tracks', 'Adjustable Focus Optics', 'Luxury Gallery Accentuation'],
    action: 'Inquire Track Systems'
  },
  {
    id: 'weather-shield',
    tag: 'WEATHER-SHIELD',
    category: 'Painting & Finishes',
    title: 'Weather-Shield Exterior Protective Paints',
    type: 'image',
    src: weatherShieldImg,
    highlights: ['7-Year Anti-Fungal Shield', 'UV Heat Reflective', 'Crack-Bridging Elastomeric'],
    action: 'Request Paint Audit'
  },
  {
    id: 'interior-emulsion',
    tag: 'SILK WASHABLE',
    category: 'Painting & Finishes',
    title: 'Luxury Silk Washable Interior Emulsions',
    type: 'image',
    src: interiorEmulsionImg,
    highlights: ['Stain Clean Washable', 'Ultra Low-VOC Eco Formula', 'Velvet Smooth Sheen'],
    action: 'Get Interior Palette'
  },
  {
    id: 'textured-cement',
    tag: 'TEXTURED FINISH',
    category: 'Painting & Finishes',
    title: 'Textured Micro-Cement & Accent Walls',
    type: 'image',
    src: texturedCementImg,
    highlights: ['Seamless Micro-Cement', 'Rustic Stucco Wall Finishes', 'Handcrafted Artisan Textures'],
    action: 'Explore Texture Options'
  },
  {
    id: 'modular-kitchen',
    tag: 'GERMAN HARDWARE',
    category: 'Carpentry & Modular',
    title: 'Modular Kitchen Design & Production',
    type: 'image',
    src: modularKitchenImg,
    highlights: ['Factory-Milled BWP Ply', 'Blum Soft-Close Drawers', 'Quartz Stone Countertops'],
    action: 'Request Kitchen Design'
  },
  {
    id: 'wardrobe-storage',
    tag: 'WALK-IN WARDROBES',
    category: 'Carpentry & Modular',
    title: 'Modular Wardrobes & Storage Lofts',
    type: 'image',
    src: wardrobeImg,
    highlights: ['Floor-to-Ceiling Sliders', 'Tinted Glass & Sensor LED', 'Custom Jewelry Drawers'],
    action: 'Get Wardrobe Estimate'
  },
  {
    id: 'workshop-carpentry',
    tag: 'CUSTOM JOINERY',
    category: 'Carpentry & Modular',
    title: 'Bespoke Workshop Carpentry & Joinery',
    type: 'image',
    src: workshopCarpentryImg,
    highlights: ['Solid Teak Wood Joinery', 'Hand-Carved Wall Panels', 'Custom Fixed Furniture'],
    action: 'Inquire Custom Joinery'
  },
  {
    id: 'shuttering-work',
    tag: 'CONCRETE FORMWORK',
    category: 'Structural Fabrication',
    title: 'Structural Shuttering & Formwork',
    type: 'image',
    src: shutteringWorkImg,
    highlights: ['Heavy Steel Prop Formwork', 'Waterproof MDO Shuttering', 'Level Slab Vibrated Casting'],
    action: 'Inquire Shuttering Rates'
  },
  {
    id: 'architectural-gate',
    tag: 'STAINLESS & STEEL',
    category: 'Structural Fabrication',
    title: 'Architectural Gates & Balustrade Fabrication',
    type: 'image',
    src: architecturalGateImg,
    highlights: ['Laser-Cut CNC Metal Panels', 'Toughened Glass Balustrades', 'Powder-Coated Anti-Rust Steel'],
    action: 'Request Fabrication Quote'
  }
]

const faqs = [
  { q: 'What types of projects does Preetam Infra handle?', a: 'We specialize in premium residential villas, luxury apartments, commercial complexes, and bespoke interior designs. Every project receives our signature attention to detail and quality craftsmanship.' },
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope. A premium villa typically takes 12-18 months, while interior fit-outs can be completed in 3-6 months. We provide detailed timelines during consultation.' },
  { q: 'What makes Preetam Infra different from other builders?', a: 'Our commitment to luxury quality, use of premium materials, in-house design team, and transparent project management set us apart. We build not just structures, but legacies.' },
  { q: 'Do you provide interior design services?', a: 'Absolutely. Our in-house design team handles everything from conceptualization to execution — including halls, kitchens, bedrooms, and custom furniture solutions.' },
]


/* ───────── GLOBAL IMAGE ASSET CACHE ───────── */
const globalFrameCache = {}

function getCachedImage(src) {
  if (globalFrameCache[src]) return globalFrameCache[src]
  const img = new Image()
  img.src = src
  globalFrameCache[src] = img
  return img
}

/* ───────── MOBILE DETECTION ───────── */
function isMobileView() {
  return window.innerWidth <= 768
}

/* ───────── CANVAS DRAWING HELPER ───────── */
function drawImageCover(ctx, img, width, height) {
  if (!width || !height) return
  ctx.clearRect(0, 0, width, height)

  if (!img || !img.complete || img.naturalWidth === 0) {
    // Elegant fallback background while loading or if image is unrendered
    const bgGrad = ctx.createLinearGradient(0, 0, width, height)
    bgGrad.addColorStop(0, '#060c18')
    bgGrad.addColorStop(0.5, '#0e1a2e')
    bgGrad.addColorStop(1, '#080e1a')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, width, height)
    return
  }

  const imgRatio = img.naturalWidth / img.naturalHeight
  const canvasRatio = width / height
  let renderWidth, renderHeight, offsetX, offsetY

  if (canvasRatio > imgRatio) {
    renderWidth = width
    renderHeight = width / imgRatio
    offsetX = 0
    offsetY = (height - renderHeight) / 2
  } else {
    renderWidth = height * imgRatio
    renderHeight = height
    offsetX = (width - renderWidth) / 2
    offsetY = 0
  }

  ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight)

  // Seamlessly mask watermark icon in lower-right corner
  const patchRadius = Math.max(width, height) * 0.28
  const patchGrad = ctx.createRadialGradient(width, height, 0, width, height, patchRadius)
  patchGrad.addColorStop(0, 'rgba(10, 22, 40, 0.98)')
  patchGrad.addColorStop(0.55, 'rgba(10, 22, 40, 0.82)')
  patchGrad.addColorStop(1, 'rgba(10, 22, 40, 0)')
  ctx.fillStyle = patchGrad
  ctx.fillRect(width - patchRadius, height - patchRadius, patchRadius, patchRadius)
}

function calcOverlayOpacity(progress, startPct, endPct) {
  if (progress < startPct || progress > endPct) return 0
  const range = endPct - startPct
  const local = (progress - startPct) / range
  if (local < 0.15) return local / 0.15
  if (local > 0.85) return (1 - local) / 0.15
  return 1
}

/* ───────── GLOBAL SCENE LOCK — only one scene active at a time ───────── */
const activeSceneLock = { current: null }

/* ───────── HIGH PERFORMANCE SCENE CANVAS WITH MOBILE-FRIENDLY SCROLL ───────── */
const SceneCanvas = memo(function SceneCanvas({ id, frameUrls, overlays, transition }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const progressFillRef = useRef(null)
  const counterRef = useRef(null)
  const overlaysRef = useRef([])

  const frameIdxRef = useRef(0)
  const virtualScrollRef = useRef(0)
  const isActiveRef = useRef(false)
  const unlockedDownRef = useRef(false)
  const unlockedUpRef = useRef(false)

  // Preload images into global memory cache smoothly for this specific scene
  useEffect(() => {
    let cancelled = false
    const loadedImages = frameUrls.map((url) => getCachedImage(url))
    imagesRef.current = loadedImages

    // Force instant initial render on mount or load
    const checkAndRenderFirstFrame = () => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: false })
      const firstImg = loadedImages[0]

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        drawImageCover(ctx, firstImg, canvas.width, canvas.height)
      }

      if (firstImg && !firstImg.complete) {
        firstImg.onload = () => {
          if (!cancelled && canvasRef.current) {
            const currentCanvas = canvasRef.current
            const currentCtx = currentCanvas.getContext('2d', { alpha: false })
            const currentRect = currentCanvas.getBoundingClientRect()
            if (currentRect.width > 0 && currentRect.height > 0) {
              currentCanvas.width = currentRect.width * dpr
              currentCanvas.height = currentRect.height * dpr
              drawImageCover(currentCtx, firstImg, currentCanvas.width, currentCanvas.height)
            }
          }
        }
      }
    }

    checkAndRenderFirstFrame()
    const timer = setTimeout(checkAndRenderFirstFrame, 60)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [frameUrls])

  // Canvas render & scroll handler
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: false })
    let animationFrameId = null
    let lastDrawnImg = null
    const isMobile = isMobileView()
    const SCROLL_RANGE = isMobile ? 1200 : 2000

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        renderFrame(frameIdxRef.current)
      }
    }

    const renderFrame = (idx) => {
      const totalFrames = frameUrls.length
      if (totalFrames === 0) {
        drawImageCover(ctx, null, canvas.width, canvas.height)
        return
      }
      const validIdx = Math.max(0, Math.min(totalFrames - 1, idx))
      frameIdxRef.current = validIdx

      // Draw canvas frame
      const img = imagesRef.current[validIdx] || getCachedImage(frameUrls[validIdx])
      if (img && img.complete && img.naturalWidth > 0) {
        lastDrawnImg = img
        drawImageCover(ctx, img, canvas.width, canvas.height)
      } else if (lastDrawnImg) {
        drawImageCover(ctx, lastDrawnImg, canvas.width, canvas.height)
      } else {
        let nearest = null
        for (let offset = 1; offset < frameUrls.length; offset++) {
          const prevImg = imagesRef.current[validIdx - offset] || getCachedImage(frameUrls[validIdx - offset])
          if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) { nearest = prevImg; break }

          const nextImg = imagesRef.current[validIdx + offset] || getCachedImage(frameUrls[validIdx + offset])
          if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) { nearest = nextImg; break }
        }
        drawImageCover(ctx, nearest, canvas.width, canvas.height)
      }

      // Calculate progress percentage
      const rawProgress = totalFrames > 1 ? validIdx / (totalFrames - 1) : 0

      // Direct DOM updates
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${(rawProgress * 100).toFixed(1)}%`
      }
      if (counterRef.current) {
        counterRef.current.innerText = `${Math.round(rawProgress * 100)}%`
      }

      // Update overlays
      overlays.forEach((ov, i) => {
        const el = overlaysRef.current[i]
        if (el) {
          const opacity = calcOverlayOpacity(rawProgress, ov.start, ov.end)
          el.style.opacity = opacity.toFixed(2)
          el.style.transform = `translateY(${-50 + (1 - opacity) * 15}%)`
        }
      })
    }

    const handleWheelOrTouch = (deltaY, preventDefault) => {
      const rect = container.getBoundingClientRect()
      const distFromTop = Math.abs(rect.top)

      // On mobile, update frames based on viewport scroll ratio without preventing touch scroll
      if (isMobile) {
        const totalFrames = frameUrls.length
        if (totalFrames <= 1) return
        const sceneHeight = rect.height || window.innerHeight
        const scrollRatio = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (sceneHeight + window.innerHeight * 0.5)))
        const frameIdx = Math.floor(scrollRatio * (totalFrames - 1))
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(() => {
            renderFrame(frameIdx)
            animationFrameId = null
          })
        }
        return
      }

      // Desktop Virtual Scroll Locking
      if (distFromTop > window.innerHeight * 0.7) {
        if (activeSceneLock.current === container) {
          activeSceneLock.current = null
          isActiveRef.current = false
        }
        return
      }

      if (activeSceneLock.current && activeSceneLock.current !== container) return
      const isNearTop = distFromTop <= 150

      if (deltaY > 0) {
        if (unlockedDownRef.current) return
        if (virtualScrollRef.current >= SCROLL_RANGE) {
          unlockedDownRef.current = true
          renderFrame(frameUrls.length - 1)
          return
        }

        if (!isActiveRef.current && isNearTop) {
          isActiveRef.current = true
          activeSceneLock.current = container
          if (virtualScrollRef.current <= 0) virtualScrollRef.current = 0
          unlockedUpRef.current = false
        }

        if (isActiveRef.current) {
          window.scrollTo({ top: container.offsetTop, behavior: 'instant' })
          if (virtualScrollRef.current < SCROLL_RANGE) {
            preventDefault()
            virtualScrollRef.current = Math.min(SCROLL_RANGE, virtualScrollRef.current + Math.abs(deltaY))
            const progress = virtualScrollRef.current / SCROLL_RANGE
            const frameIdx = Math.floor(progress * (frameUrls.length - 1))
            if (!animationFrameId) {
              animationFrameId = requestAnimationFrame(() => {
                renderFrame(frameIdx)
                animationFrameId = null
              })
            }
          } else {
            renderFrame(frameUrls.length - 1)
            isActiveRef.current = false
            activeSceneLock.current = null
            unlockedDownRef.current = true
          }
        }
      } else if (deltaY < 0) {
        if (unlockedUpRef.current) return
        if (virtualScrollRef.current <= 0 && !isActiveRef.current) {
          unlockedUpRef.current = true
          renderFrame(0)
          return
        }

        if (!isActiveRef.current && isNearTop) {
          isActiveRef.current = true
          activeSceneLock.current = container
          if (virtualScrollRef.current >= SCROLL_RANGE) virtualScrollRef.current = SCROLL_RANGE
          unlockedDownRef.current = false
        }

        if (isActiveRef.current) {
          window.scrollTo({ top: container.offsetTop, behavior: 'instant' })
          if (virtualScrollRef.current > 0) {
            preventDefault()
            virtualScrollRef.current = Math.max(0, virtualScrollRef.current - Math.abs(deltaY))
            const progress = virtualScrollRef.current / SCROLL_RANGE
            const frameIdx = Math.floor(progress * (frameUrls.length - 1))
            if (!animationFrameId) {
              animationFrameId = requestAnimationFrame(() => {
                renderFrame(frameIdx)
                animationFrameId = null
              })
            }
          } else {
            renderFrame(0)
            isActiveRef.current = false
            activeSceneLock.current = null
            unlockedUpRef.current = true
          }
        }
      }
    }

    const onWheel = (e) => handleWheelOrTouch(e.deltaY, () => e.preventDefault())

    let touchStartY = 0
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const onTouchMove = (e) => {
      const touchY = e.touches[0].clientY
      const deltaY = (touchStartY - touchY) * 2.5
      touchStartY = touchY
      handleWheelOrTouch(deltaY, () => {})
    }

    const onWindowScroll = () => {
      if (isMobileView()) {
        handleWheelOrTouch(0, () => {})
      }
    }

    handleResize()
    const renderInitTimer = setTimeout(() => {
      handleResize()
      renderFrame(0)
    }, 40)

    window.addEventListener('resize', handleResize)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      clearTimeout(renderInitTimer)
      if (activeSceneLock.current === container) {
        activeSceneLock.current = null
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onWindowScroll)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [frameUrls, overlays])

  return (
    <section className="scene-section" id={id} ref={containerRef} data-transition={transition}>
      <div className="scene-sticky">
        <canvas ref={canvasRef} className="scene-canvas" role="img" aria-label="Animated construction scene showing building progress" />

        {overlays.map((ov, i) => (
          <div
            key={i}
            ref={(el) => (overlaysRef.current[i] = el)}
            className={`scene-overlay scene-overlay-${ov.position}`}
            style={{ opacity: 0 }}
          >
            <p className="scene-label">{ov.label}</p>
            <h2>{ov.title}</h2>
            <p className="scene-desc">{ov.desc}</p>
          </div>
        ))}

        <div className="scene-progress-track">
          <div ref={progressFillRef} className="scene-progress-fill" style={{ width: '0%' }} />
        </div>
      </div>
    </section>
  )
})

/* ───────── MAIN APP ───────── */
function App() {
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [activePage, setActivePage] = useState('home')
  const [serviceSearch, setServiceSearch] = useState('')
  const [serviceCategory, setServiceCategory] = useState('All')
  const [projectFilter, setProjectFilter] = useState('All')
  const [activeFaq, setActiveFaq] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [enquirySent, setEnquirySent] = useState(false)

  // Direct Contact Page Form State
  const [pageContactForm, setPageContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Turnkey Residential Villa',
    location: '',
    area: '',
    message: ''
  })
  const [pageContactSent, setPageContactSent] = useState(false)

  const sendToWhatsApp = (clientName, details) => {
    const cleanName = clientName ? clientName.trim() : 'Client'
    const msg = `Hi Preetham infra This is ${cleanName} and their form filling details: ${details}`
    const url = `https://wa.me/917070797930?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  const handlePageContactSubmit = (e) => {
    e.preventDefault()
    setPageContactSent(true)
    const details = `Phone: ${pageContactForm.phone}, Email: ${pageContactForm.email || 'N/A'}, Scope: ${pageContactForm.projectType}, Location: ${pageContactForm.location || 'N/A'}, Area: ${pageContactForm.area || 'N/A'}, Message: ${pageContactForm.message || 'N/A'}`
    sendToWhatsApp(pageContactForm.name, details)
  }

  // Active gallery index state for real project showcase cards
  const [activeGalleryIdx, setActiveGalleryIdx] = useState({})

  // 1. Turnkey Construction Cost Estimator Calculator State
  const [calcArea, setCalcArea] = useState(1800)
  const [calcGrade, setCalcGrade] = useState('luxury')
  const [calcFloors, setCalcFloors] = useState(2)

  const getGradeRate = (grade) => {
    switch (grade) {
      case 'premium': return 2600
      case 'luxury': return 2950
      case 'royal': return 3500
      default: return 2950
    }
  }

  const constructionRate = getGradeRate(calcGrade)
  const totalBuiltUpArea = calcArea * calcFloors
  const estimatedConstructionCost = totalBuiltUpArea * constructionRate

  const applyConstructionEstimateToInquiry = () => {
    const text = `Estimated Construction Budget: ₹${(estimatedConstructionCost / 100000).toFixed(2)} Lakhs for ${totalBuiltUpArea.toLocaleString()} sq.ft built-up area (${calcFloors} floors, ${calcGrade.toUpperCase()} grade @ ₹${constructionRate}/sq.ft).`
    setPageContactForm(prev => ({
      ...prev,
      area: `${totalBuiltUpArea} sq ft (${calcFloors} floors)`,
      message: text
    }))
    setModalOpen(true)
  }

  // 2. Interiors & Wood Work Cost Estimator State
  const [calcInteriorArea, setCalcInteriorArea] = useState(1500)
  const [calcWoodWorkGrade, setCalcWoodWorkGrade] = useState('mid')
  const [calcFalseCeilingGrade, setCalcFalseCeilingGrade] = useState('basic')

  const getWoodWorkRate = (grade) => {
    switch (grade) {
      case 'basic': return 1250
      case 'mid': return 1600
      case 'premium': return 2400
      default: return 1600
    }
  }

  const getFalseCeilingRate = (grade) => {
    switch (grade) {
      case 'basic': return 85
      case 'mid': return 140
      case 'premium': return 180
      default: return 85
    }
  }

  const woodWorkRate = getWoodWorkRate(calcWoodWorkGrade)
  const falseCeilingRate = getFalseCeilingRate(calcFalseCeilingGrade)
  const interiorTotalRatePerSqFt = woodWorkRate + falseCeilingRate
  const estimatedInteriorCost = calcInteriorArea * interiorTotalRatePerSqFt

  const applyInteriorEstimateToInquiry = () => {
    const text = `Estimated Interior & Wood Work Budget: ₹${(estimatedInteriorCost / 100000).toFixed(2)} Lakhs for ${calcInteriorArea.toLocaleString()} sq.ft carpet area (Wood Work: ${calcWoodWorkGrade.toUpperCase()} @ ₹${woodWorkRate}/sq.ft, False Ceiling: ${calcFalseCeilingGrade.toUpperCase()} @ ₹${falseCeilingRate}/sq.ft).`
    setPageContactForm(prev => ({
      ...prev,
      area: `${calcInteriorArea} sq ft (Interiors)`,
      message: text
    }))
    setModalOpen(true)
  }

  /* Sync active page with window.location.hash */
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase()
      if (['home', 'about', 'services', 'projects', 'contact'].includes(hash)) {
        setActivePage(hash)
      } else {
        setActivePage('home')
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigateTo = (page) => {
    setActivePage(page)
    window.location.hash = '#' + page
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMenuOpen(false)
  }

  /* Preload Scene 1 frames with fallback safety */
  useEffect(() => {
    let cancelled = false
    let loaded = 0
    const criticalFrames = scene1Frames.slice(0, 30)
    const total = criticalFrames.length

    const fallbackTimer = setTimeout(() => {
      if (!cancelled) setLoading(false)
    }, 1800)

    if (total === 0) { setLoading(false); return }

    criticalFrames.forEach((src) => {
      const img = new Image()
      img.onload = img.onerror = () => {
        loaded++
        if (!cancelled) {
          setLoadProgress(Math.round((loaded / total) * 100))
          if (loaded === total) {
            clearTimeout(fallbackTimer)
            setLoading(false)
          }
        }
      }
      img.src = src
    })
    return () => {
      cancelled = true
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading])

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  /* Intersection Observer & instant reveal for multi-page routing */
  useEffect(() => {
    if (loading) return
    let obs = null
    let sceneObs = null
    const timer = setTimeout(() => {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('visible')
          })
        },
        { threshold: 0.05 }
      )
      document.querySelectorAll('.reveal').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 1.3) {
          el.classList.add('visible')
        }
        obs.observe(el)
      })

      // Scene-specific transition observer
      sceneObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('scene-visible')
          })
        },
        { threshold: 0.15 }
      )
      document.querySelectorAll('.scene-section').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 1.2) {
          el.classList.add('scene-visible')
        }
        sceneObs.observe(el)
      })

      // Divider transition observer
      const dividerObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('divider-visible')
          })
        },
        { threshold: 0.3 }
      )
      document.querySelectorAll('.scene-divider').forEach((el) => {
        dividerObs.observe(el)
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      if (obs) obs.disconnect()
      if (sceneObs) sceneObs.disconnect()
    }
  }, [loading, activePage, serviceCategory, serviceSearch])

  const visibleProjects = projectFilter === 'All' 
    ? projectsData 
    : projectsData.filter((p) => p.type === projectFilter || p.category.includes(projectFilter))

  const filteredServices = allServicesData.filter((svc) => {
    const matchesCategory = serviceCategory === 'All' || svc.category === serviceCategory
    const q = serviceSearch.toLowerCase().trim()
    const matchesSearch = !q ||
      svc.title.toLowerCase().includes(q) ||
      svc.tag.toLowerCase().includes(q) ||
      svc.category.toLowerCase().includes(q) ||
      svc.highlights.some(h => h.toLowerCase().includes(q))
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* ── LOADER ── */}
      <div className={`loader${loading ? '' : ' loader-hidden'}`} aria-hidden={!loading}>
        <div className="loader-content">
          <Logo />
          <div className="loader-bar" role="progressbar" aria-valuenow={loadProgress} aria-valuemin="0" aria-valuemax="100">
            <div className="loader-fill" style={{ width: `${loadProgress}%` }} />
          </div>
          <p className="loader-text">Loading Preetham Infra Experience… {loadProgress}%</p>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`navbar${navScrolled ? ' scrolled' : ''}`} aria-label="Main Navigation">
        <div className="navbar-inner">
          <Logo onClick={() => navigateTo('home')} />
          
          <div className={`nav-links${menuOpen ? ' open' : ''}`}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={activePage === link.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); navigateTo(link.id) }}
              >
                {link.label}
              </a>
            ))}
            <button className="nav-cta mobile-nav-cta" onClick={() => { setMenuOpen(false); setModalOpen(true) }}>
              Get a Quote <span className="cta-arrow" aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="nav-actions">
            <button className="nav-cta" onClick={() => setModalOpen(true)}>
              Get a Quote <span className="cta-arrow" aria-hidden="true">↗</span>
            </button>
            <button
              className="burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* ══════════════════════════════════════════════════════════════
           PAGE 1: HOME (INTERACTIVE 4-SCENE CANVAS EXPERIENCE)
           ══════════════════════════════════════════════════════════════ */}
        {activePage === 'home' && (
          <div className="page-view home-page-view">
            <h1 className="sr-only">Preetham Infra — Constructions & Luxury Construction</h1>

            {/* SCENE 01: BUILDING CONSTRUCTION */}
            <SceneCanvas
              id="home-scene"
              frameUrls={scene1Frames}
              transition="fade-scale"
              overlays={[]}
            />

            {/* SUMMARY: BUILDING CONSTRUCTION */}
            <div className="scene-summary reveal">
              <div className="scene-summary-inner">
                <span className="scene-summary-badge">SCENE 01 / BUILDING CONSTRUCTION</span>
                <h3>Building Construction <em>From Start to End</em></h3>
                <p>
                  Watch the complete journey of building construction — from deep pile foundation excavation and steel reinforcement, through precision RCC frame casting and brickwork, to the fully finished structural shell ready for interior fit-out.
                </p>
                <div className="scene-summary-highlights">
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Deep Pile Foundations</span>
                  <span className="scene-summary-highlight"><span className="highlight-dot" />RCC Frame Casting</span>
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Turnkey Execution</span>
                </div>
              </div>
            </div>

            {/* DIVIDER: HALL */}
            <div className="scene-divider">
              <span className="scene-divider-label">SCENE 02 / LIVING SPACES</span>
              <h2 className="scene-divider-title">The Grand <em>Hall Design</em></h2>
            </div>

            {/* SCENE 02: HALL */}
            <SceneCanvas
              id="hall-scene"
              frameUrls={hallFrames}
              transition="slide-left"
              overlays={[]}
            />

            {/* SUMMARY: HALL */}
            <div className="scene-summary reveal">
              <div className="scene-summary-inner">
                <span className="scene-summary-badge">SCENE 02 / HALL DESIGN</span>
                <h3>The Grand <em>Hall Experience</em></h3>
                <p>
                  Step into a magnificent living hall meticulously crafted for refined luxury — featuring expansive spatial layout, bespoke wall accents, designer lighting fixtures, and premium flooring that blend elegance with comfort.
                </p>
                <div className="scene-summary-highlights">
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Bespoke Wall Accents</span>
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Designer Lighting</span>
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Premium Flooring</span>
                </div>
              </div>
            </div>

            {/* DIVIDER: KITCHEN */}
            <div className="scene-divider">
              <span className="scene-divider-label">SCENE 03 / CULINARY SPACES</span>
              <h2 className="scene-divider-title">The Modern <em>Kitchen Sanctuary</em></h2>
            </div>

            {/* SCENE 03: KITCHEN */}
            <SceneCanvas
              id="kitchen-scene"
              frameUrls={kitchenFrames}
              transition="zoom-blur"
              overlays={[]}
            />

            {/* SUMMARY: KITCHEN */}
            <div className="scene-summary reveal">
              <div className="scene-summary-inner">
                <span className="scene-summary-badge">SCENE 03 / KITCHEN DESIGN</span>
                <h3>The Modern <em>Kitchen Sanctuary</em></h3>
                <p>
                  Witness the creation of a culinary sanctuary designed with high-end ergonomics, Italian quartz stone surfaces, German soft-close modular cabinetry, and seamless appliance integration for everyday luxury cooking.
                </p>
                <div className="scene-summary-highlights">
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Italian Stone Counters</span>
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Modular Cabinetry</span>
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Smart Storage</span>
                </div>
              </div>
            </div>

            {/* DIVIDER: BEDROOM */}
            <div className="scene-divider">
              <span className="scene-divider-label">SCENE 04 / PRIVATE RETREATS</span>
              <h2 className="scene-divider-title">The Luxury <em>Bedroom Suite</em></h2>
            </div>

            {/* SCENE 04: BEDROOM */}
            <SceneCanvas
              id="bedroom-scene"
              frameUrls={bedroomFrames}
              transition="slide-up"
              overlays={[]}
            />

            {/* SUMMARY: BEDROOM */}
            <div className="scene-summary reveal">
              <div className="scene-summary-inner">
                <span className="scene-summary-badge">SCENE 04 / BEDROOM DESIGN</span>
                <h3>The Luxury <em>Bedroom Suite</em></h3>
                <p>
                  Explore how we craft tranquil private suites that pair ambient mood lighting with serene acoustic textures, premium fabric headboards, walk-in wardrobes, and climate-controlled comfort for ultimate rest and sanctuary.
                </p>
                <div className="scene-summary-highlights">
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Ambient Mood Lighting</span>
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Walk-in Wardrobes</span>
                  <span className="scene-summary-highlight"><span className="highlight-dot" />Acoustic Comfort</span>
                </div>
              </div>
            </div>

            {/* Interactive Cost Estimator Section: 2 Separate Cards */}
            <section className="calculator-section section-wrap reveal">
              {/* CARD 1: Turnkey Construction Cost Estimator Card */}
              <div className="calculator-card" style={{ marginBottom: '48px' }}>
                <div className="calculator-header">
                  <div>
                    <span className="card-badge gold-badge">CIVIL & STRUCTURAL ESTIMATOR</span>
                    <h2>Turnkey Construction <em>Cost Estimator</em></h2>
                    <p className="calculator-subtitle">
                      Calculate instant estimated costs for civil structural construction, foundation work, and structural materials across Madanapalle, Tirupathi, and Bangalore.
                    </p>
                  </div>
                  <div className="calculator-badge-pill">
                    <span className="live-dot">●</span> 2026 Civil Rate Index
                  </div>
                </div>

                <div className="calculator-body-grid">
                  {/* Controls Column */}
                  <div className="calculator-controls">
                    {/* Built up area slider */}
                    <div className="calc-group">
                      <div className="calc-label-row">
                        <label htmlFor="area-range-home">Plot / Floor Area per Floor</label>
                        <span className="calc-value-highlight">{calcArea.toLocaleString()} sq. ft.</span>
                      </div>
                      <input 
                        id="area-range-home"
                        type="range" 
                        min="600" 
                        max="6000" 
                        step="100" 
                        value={calcArea} 
                        onChange={(e) => setCalcArea(Number(e.target.value))}
                        className="calc-slider"
                      />
                      <div className="calc-range-marks">
                        <span>600 sq ft</span>
                        <span>2,500 sq ft</span>
                        <span>6,000+ sq ft</span>
                      </div>
                    </div>

                    {/* Quality Grade Cards */}
                    <div className="calc-group">
                      <label>Construction Specification Grade</label>
                      <div className="calc-grade-grid">
                        <button 
                          type="button"
                          className={`grade-select-btn${calcGrade === 'premium' ? ' active' : ''}`}
                          onClick={() => setCalcGrade('premium')}
                        >
                          <strong>Premium Grade</strong>
                          <span>₹2,600 / sq ft</span>
                          <small>Vizag TMT Steel, UltraTech Cement, Vitrified 4x2 Tiles</small>
                        </button>

                        <button 
                          type="button"
                          className={`grade-select-btn${calcGrade === 'luxury' ? ' active' : ''}`}
                          onClick={() => setCalcGrade('luxury')}
                        >
                          <strong>Luxury Grade ★</strong>
                          <span>₹2,950 / sq ft</span>
                          <small>Tata Tiscon TMT, Teakwood Doors, Kohler Fittings</small>
                        </button>

                        <button 
                          type="button"
                          className={`grade-select-btn${calcGrade === 'royal' ? ' active' : ''}`}
                          onClick={() => setCalcGrade('royal')}
                        >
                          <strong>Royal Bespoke</strong>
                          <span>₹3,500 / sq ft</span>
                          <small>Italian Marble, Glass Facade, VRF AC Ducting</small>
                        </button>
                      </div>
                    </div>

                    {/* Floors */}
                    <div className="calc-group">
                      <label htmlFor="floors-select-home">Number of Floors</label>
                      <select 
                        id="floors-select-home"
                        value={calcFloors} 
                        onChange={(e) => setCalcFloors(Number(e.target.value))}
                        className="calc-select"
                      >
                        <option value={1}>Ground Floor Only (G)</option>
                        <option value={2}>Ground + 1 Floor (G+1)</option>
                        <option value={3}>Ground + 2 Floors (G+2)</option>
                        <option value={4}>Ground + 3 Floors (G+3)</option>
                      </select>
                    </div>
                  </div>

                  {/* Output Summary Column */}
                  <div className="calculator-result-card">
                    <span className="result-eyebrow">ESTIMATED CONSTRUCTION INVESTMENT</span>
                    <div className="total-price-display">
                      <span className="currency-symbol">₹</span>
                      <span className="price-lakhs">{(estimatedConstructionCost / 100000).toFixed(2)}</span>
                      <span className="price-unit">Lakhs*</span>
                    </div>
                    <p className="total-area-subtitle">Total Built-Up Area: <strong>{totalBuiltUpArea.toLocaleString()} sq. ft.</strong> @ ₹{constructionRate}/sq.ft</p>

                    {/* Itemized Progress Bars */}
                    <div className="breakdown-list">
                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>RCC Structural Frame & Steel (30%)</span>
                          <strong>₹{(estimatedConstructionCost * 0.30 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '30%' }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Brickwork, Plastering & Masonry (25%)</span>
                          <strong>₹{(estimatedConstructionCost * 0.25 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '25%' }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Flooring, Tiling & Sanitaryware (15%)</span>
                          <strong>₹{(estimatedConstructionCost * 0.15 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '15%' }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Electrical & Plumbing Infrastructure (15%)</span>
                          <strong>₹{(estimatedConstructionCost * 0.15 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '15%' }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Doors, Windows & Outer Paint (15%)</span>
                          <strong>₹{(estimatedConstructionCost * 0.15 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '15%' }}></div></div>
                      </div>
                    </div>

                    <button className="btn-primary btn-gold-calc" onClick={applyConstructionEstimateToInquiry}>
                      Request Construction Quotation ↗
                    </button>

                    <span className="calc-disclaimer">
                      *Estimates based on standard market rates in AP & KA. Final quote provided after site soil test & architectural elevation review.
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 2: Interiors & Wood Work Cost Estimator Card */}
              <div className="calculator-card">
                <div className="calculator-header">
                  <div>
                    <span className="card-badge gold-badge">BESPOKE INTERIOR ESTIMATOR</span>
                    <h2>Interiors & Wood Work <em>Cost Estimator</em></h2>
                    <p className="calculator-subtitle">
                      Calculate instant estimated costs for factory modular kitchens, master wardrobes, false ceiling design, and custom architectural woodwork.
                    </p>
                  </div>
                  <div className="calculator-badge-pill">
                    <span className="live-dot">●</span> 2026 Interior Rate Index
                  </div>
                </div>

                <div className="calculator-body-grid">
                  {/* Controls Column */}
                  <div className="calculator-controls">
                    {/* Interior Carpet Area slider */}
                    <div className="calc-group">
                      <div className="calc-label-row">
                        <label htmlFor="interior-area-range">Interior Carpet Area</label>
                        <span className="calc-value-highlight">{calcInteriorArea.toLocaleString()} sq. ft.</span>
                      </div>
                      <input 
                        id="interior-area-range"
                        type="range" 
                        min="300" 
                        max="5000" 
                        step="50" 
                        value={calcInteriorArea} 
                        onChange={(e) => setCalcInteriorArea(Number(e.target.value))}
                        className="calc-slider"
                      />
                      <div className="calc-range-marks">
                        <span>300 sq ft</span>
                        <span>2,000 sq ft</span>
                        <span>5,000+ sq ft</span>
                      </div>
                    </div>

                    {/* Wood Work Grade Selection */}
                    <div className="calc-group">
                      <label>Wood Work Specification Tier</label>
                      <div className="calc-grade-grid">
                        <button 
                          type="button"
                          className={`grade-select-btn${calcWoodWorkGrade === 'basic' ? ' active' : ''}`}
                          onClick={() => setCalcWoodWorkGrade('basic')}
                        >
                          <strong>Basic Grade</strong>
                          <span>₹1,250 / sq ft</span>
                          <small>Commercial Plywood, Laminate Finish, Standard Hardware</small>
                        </button>

                        <button 
                          type="button"
                          className={`grade-select-btn${calcWoodWorkGrade === 'mid' ? ' active' : ''}`}
                          onClick={() => setCalcWoodWorkGrade('mid')}
                        >
                          <strong>Mid Grade ★</strong>
                          <span>₹1,600 / sq ft</span>
                          <small>BWP Marine Ply, Acrylic / PU Finish, Soft-Close Fittings</small>
                        </button>

                        <button 
                          type="button"
                          className={`grade-select-btn${calcWoodWorkGrade === 'premium' ? ' active' : ''}`}
                          onClick={() => setCalcWoodWorkGrade('premium')}
                        >
                          <strong>Premium Grade</strong>
                          <span>₹2,400 / sq ft</span>
                          <small>Teak Veneer, Blum German Hardware, Sensor Lighting</small>
                        </button>
                      </div>
                    </div>

                    {/* False Ceiling Grade Selection */}
                    <div className="calc-group">
                      <label>False Ceiling Specification Tier</label>
                      <div className="calc-grade-grid">
                        <button 
                          type="button"
                          className={`grade-select-btn${calcFalseCeilingGrade === 'basic' ? ' active' : ''}`}
                          onClick={() => setCalcFalseCeilingGrade('basic')}
                        >
                          <strong>Basic Grade</strong>
                          <span>₹85 / sq ft</span>
                          <small>Gypsum Board, Perimeter Cove Channel</small>
                        </button>

                        <button 
                          type="button"
                          className={`grade-select-btn${calcFalseCeilingGrade === 'mid' ? ' active' : ''}`}
                          onClick={() => setCalcFalseCeilingGrade('mid')}
                        >
                          <strong>Mid Grade ★</strong>
                          <span>₹140 / sq ft</span>
                          <small>Saint-Gobain Gypsum, POP Mouldings, Dual LED Coves</small>
                        </button>

                        <button 
                          type="button"
                          className={`grade-select-btn${calcFalseCeilingGrade === 'premium' ? ' active' : ''}`}
                          onClick={() => setCalcFalseCeilingGrade('premium')}
                        >
                          <strong>Premium Grade</strong>
                          <span>₹180 / sq ft</span>
                          <small>Wooden Louvers, Baffle Grid & Magnetic Track Lights</small>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Output Summary Column */}
                  <div className="calculator-result-card">
                    <span className="result-eyebrow">ESTIMATED INTERIOR INVESTMENT</span>
                    <div className="total-price-display">
                      <span className="currency-symbol">₹</span>
                      <span className="price-lakhs">{(estimatedInteriorCost / 100000).toFixed(2)}</span>
                      <span className="price-unit">Lakhs*</span>
                    </div>
                    <p className="total-area-subtitle">Carpet Area: <strong>{calcInteriorArea.toLocaleString()} sq. ft.</strong> @ ₹{interiorTotalRatePerSqFt}/sq.ft total</p>

                    {/* Itemized Progress Bars */}
                    <div className="breakdown-list">
                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Wood Work & Cabinetry (₹{woodWorkRate}/sq.ft)</span>
                          <strong>₹{((calcInteriorArea * woodWorkRate) / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: `${Math.round((woodWorkRate / interiorTotalRatePerSqFt) * 100)}%` }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>False Ceiling & Coves (₹{falseCeilingRate}/sq.ft)</span>
                          <strong>₹{((calcInteriorArea * falseCeilingRate) / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: `${Math.round((falseCeilingRate / interiorTotalRatePerSqFt) * 100)}%` }}></div></div>
                      </div>
                    </div>

                    <button className="btn-primary btn-gold-calc" onClick={applyInteriorEstimateToInquiry}>
                      Request Interior Quotation ↗
                    </button>

                    <span className="calc-disclaimer">
                      *Estimates based on standard interior rates in AP & KA. Final quote provided after 3D CAD visualization & material selection.
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
           PAGE 2: SERVICES HUB (FULL DETAILED CAPABILITIES)
           ══════════════════════════════════════════════════════════════ */}
        {activePage === 'services' && (
          <div className="page-container services-page-container">
            <header className="page-header-banner">
              <div className="section-wrap">
                <span className="card-badge gold-badge">PREETHAM INFRA CAPABILITIES</span>
                <h1>End-to-End <em>Services & Engineering</em></h1>
                <p className="page-header-desc">
                  From 3D CAD floor planning and structural engineering to Italian marble flooring, false ceilings, German modular kitchens, and steel shuttering formwork.
                </p>

                {/* Services Stats Counter Bar */}
                <div className="services-stats-bar">
                  <div className="services-stat-item">
                    <strong>19+</strong>
                    <span>Engineering Divisions</span>
                  </div>
                  <div className="services-stat-item">
                    <strong>100%</strong>
                    <span>IS-Code Compliant</span>
                  </div>
                  <div className="services-stat-item">
                    <strong>24 Hrs</strong>
                    <span>Quotation Turnaround</span>
                  </div>
                  <div className="services-stat-item">
                    <strong>Turnkey</strong>
                    <span>Design to Handover</span>
                  </div>
                </div>

                {/* Interactive Search & Category Filter Pills */}
                <div className="services-filter-box">
                  <div className="services-search-row">
                    <span className="search-icon">🔍</span>
                    <input 
                      type="text" 
                      className="services-search-input"
                      placeholder="Search engineering capabilities (e.g. Marble, Kitchen, Laser, Shuttering, Paint...)"
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                    />
                    {serviceSearch && (
                      <button className="clear-search-btn" onClick={() => setServiceSearch('')}>×</button>
                    )}
                  </div>

                  <div className="services-category-pills">
                    {[
                      'All',
                      'Planning & Structural',
                      'Flooring Systems',
                      'Ceilings & Lighting',
                      'Painting & Finishes',
                      'Carpentry & Modular',
                      'Structural Fabrication'
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`category-pill-btn${serviceCategory === cat ? ' active' : ''}`}
                        onClick={() => setServiceCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            <main className="services-content-wrap">
              <section className="service-section-block section-wrap reveal visible">
                {filteredServices.length === 0 ? (
                  <div className="no-services-found">
                    <h3>No matching services found for &quot;{serviceSearch}&quot;</h3>
                    <p>Try searching for Marble, Kitchen, Steel, Ceiling, or CAD.</p>
                    <button className="btn-primary" onClick={() => { setServiceSearch(''); setServiceCategory('All') }}>
                      View All 19 Services
                    </button>
                  </div>
                ) : (
                  <div className="service-detail-grid">
                    {filteredServices.map((svc) => (
                      <div className="service-detail-card" key={svc.id}>
                        <div className="service-card-img-wrap">
                          <span className="service-card-tag">{svc.tag}</span>
                          {svc.type === 'video' ? (
                            <video src={svc.src} loop muted autoPlay playsInline />
                          ) : (
                            <img src={svc.src} alt={svc.title} />
                          )}
                        </div>
                        <div className="service-card-body">
                          <span className="service-card-cat-label">{svc.category}</span>
                          <h3>{svc.title}</h3>

                          <ul className="service-card-highlights">
                            {svc.highlights.map((item, idx) => (
                              <li key={idx}><span className="bullet-dot">✓</span> {item}</li>
                            ))}
                          </ul>

                          <div className="service-card-action">
                            <button 
                              className="service-card-btn" 
                              onClick={() => {
                                setPageContactForm(prev => ({
                                  ...prev,
                                  projectType: svc.title,
                                  message: `Inquiry regarding ${svc.title}. Please provide engineering specifications and quotation.`
                                }))
                                setModalOpen(true)
                              }}
                            >
                              {svc.action} <span className="cta-arrow">↗</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </main>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
           PAGE 3: PROJECTS PAGE (SHOWCASING REAL PROJECTS & GALLERIES)
           ══════════════════════════════════════════════════════════════ */}
        {activePage === 'projects' && (
          <div className="page-container projects-page-container">
            <header className="page-header-banner">
              <div className="section-wrap">
                <span className="card-badge">PREETHAM INFRA PORTFOLIO</span>
                <h1>Featured Real <em>Projects Showcase</em></h1>
                <p className="page-header-desc">
                  Explore landmark commercial developments and turnkey residential villas executed across Bangalore, Madanapalle, Tirupathi, Chittoor, and Punganur.
                </p>

                <div className="services-nav-tabs">
                  {['All', 'Commercial', 'Residential'].map((type) => (
                    <button
                      key={type}
                      className={`service-tab-btn${projectFilter === type ? ' active' : ''}`}
                      onClick={() => setProjectFilter(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <main className="projects-showcase-wrap section-wrap reveal">
              <div className="projects-showcase-grid">
                {visibleProjects.map((proj) => {
                  const currentPhotoIdx = activeGalleryIdx[proj.id] || 0
                  return (
                    <article className="project-featured-card" key={proj.id}>
                      {/* Photo Gallery Side */}
                      <div className="project-gallery-side">
                        <div className="project-photo-wrapper">
                          <img
                            src={proj.images[currentPhotoIdx] || proj.images[0]}
                            alt={proj.title}
                            className="project-main-photo"
                          />

                          {/* Photo Counter Badge */}
                          <span className="photo-counter-badge">
                            {currentPhotoIdx + 1} / {proj.images.length} Photos
                          </span>

                          {/* Next / Prev Gallery Navigation Buttons */}
                          {proj.images.length > 1 && (
                            <>
                              <button
                                type="button"
                                className="gallery-nav-btn prev-btn"
                                onClick={() => setActiveGalleryIdx((prev) => ({
                                  ...prev,
                                  [proj.id]: (currentPhotoIdx - 1 + proj.images.length) % proj.images.length
                                }))}
                                aria-label="Previous Photo"
                              >
                                ‹
                              </button>
                              <button
                                type="button"
                                className="gallery-nav-btn next-btn"
                                onClick={() => setActiveGalleryIdx((prev) => ({
                                  ...prev,
                                  [proj.id]: (currentPhotoIdx + 1) % proj.images.length
                                }))}
                                aria-label="Next Photo"
                              >
                                ›
                              </button>
                            </>
                          )}
                        </div>

                        {/* Scrollable Thumbnail Bar for All Project Photos */}
                        {proj.images.length > 1 && (
                          <div className="project-thumbnails-row">
                            {proj.images.map((imgUrl, i) => (
                              <img
                                key={i}
                                src={imgUrl}
                                alt={`Thumbnail ${i + 1}`}
                                className={`project-thumb${currentPhotoIdx === i ? ' active' : ''}`}
                                onClick={() => setActiveGalleryIdx((prev) => ({ ...prev, [proj.id]: i }))}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Info Side */}
                      <div className="project-info-side">
                        <div>
                          <div className="project-meta-tags">
                            <span className="meta-tag">{proj.category}</span>
                            <span className="meta-tag">{proj.location}</span>
                            <span className="meta-tag">{proj.area}</span>
                          </div>

                          <h2>{proj.title}</h2>
                          <p>{proj.desc}</p>

                          <div className="project-specs-list">
                            {proj.specs.map((sp) => (
                              <div className="spec-item" key={sp.label}>
                                <strong>{sp.val}</strong>
                                <span>{sp.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button className="btn-primary" onClick={() => setModalOpen(true)}>
                          Request Project Estimates <span className="btn-arrow" aria-hidden="true">↗</span>
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </main>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
           PAGE 4: ABOUT US & LEADERSHIP
           ══════════════════════════════════════════════════════════════ */}
        {activePage === 'about' && (
          <div className="page-container about-page-container">
            <header className="page-header-banner">
              <div className="section-wrap">
                <span className="card-badge">COMPANY STORY & VISION</span>
                <h1>Building Trust Through <em>Excellence</em></h1>
                <p className="page-header-desc">
                  Preetham Infra, established in 2019 and officially registered in 2025 as <strong>Preetham Infra Projects Private Limited</strong>, has grown into a trusted name in construction, infrastructure, and luxury interior architecture.
                </p>
              </div>
            </header>

            <main className="about-content-wrap">
              {/* COMPANY STORY & MISSION */}
              <section className="company-story-section section-wrap reveal">
                <div className="story-content-grid">
                  <div className="story-card mission-card">
                    <span className="card-badge">OUR MISSION</span>
                    <h3>Turnkey Structural Excellence</h3>
                    <p>
                      To engineer and deliver structurally safe, highly aesthetic, end-to-end turnkey structures that insulate clients from market hassle and cost inflation.
                    </p>
                  </div>
                  <div className="story-card vision-card">
                    <span className="card-badge">OUR VISION</span>
                    <h3>Indicator of Engineering Trust</h3>
                    <p>
                      To represent the ultimate indicator of professional engineering trust across India, setting dynamic benchmarks in healthcare compliance and luxury residential standards.
                    </p>
                  </div>
                </div>

                <div className="core-values-banner">
                  <p className="eyebrow">OUR CORE VALUES</p>
                  <div className="core-values-items">
                    <div className="value-item">
                      <span className="value-icon">01</span>
                      <b>INTEGRITY FIRST</b>
                    </div>
                    <div className="value-item">
                      <span className="value-icon">02</span>
                      <b>LAB-TESTED SPECS</b>
                    </div>
                    <div className="value-item">
                      <span className="value-icon">03</span>
                      <b>100% TRANSPARENCY</b>
                    </div>
                  </div>
                </div>
              </section>

              {/* FOUNDER SPOTLIGHT */}
              <section className="director-section section-wrap reveal">
                <div className="director-card">
                  <div className="director-content">
                    <span className="card-badge">FOUNDING DIRECTOR</span>
                    <h2>K. Preetham Raju</h2>
                    <p className="director-subtitle">Founder & Managing Director | Civil Structural Engineer</p>
                    <blockquote className="director-quote">
                      &ldquo;Every structure we build is a testament to trust and excellence. From residential sanctuaries to healthcare facilities, each project carries the responsibility of families' dreams and medical care. Our commitment is unwavering: superior quality, transparent partnerships, and structural integrity that stands the test of time.&rdquo;
                    </blockquote>
                  </div>
                </div>
              </section>

              {/* CHRONOLOGY TIMELINE */}
              <section className="chronology-section section-wrap reveal">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">OUR CHRONICLES</p>
                    <h2>Our Journey <em>Chronology</em></h2>
                  </div>
                  <p className="section-header-desc">Track our continuous record of engineering developments across South India.</p>
                </div>

                <div className="timeline-grid">
                  {[
                    { year: '2019', title: 'Company Established', desc: 'Preetham Infra established with focus on construction, infrastructure, and comprehensive end-to-end solutions.' },
                    { year: '2020', title: 'Expansion Across South India', desc: 'Successfully delivered projects across Bangalore, Madanapalle, Tirupathi, Chittoor, and Punganur.' },
                    { year: '2022', title: 'Healthcare & Hospitality Leadership', desc: 'Expanded expertise into healthcare and hospitality developments alongside premium residential projects.' },
                    { year: '2024', title: 'Material Supply Integration', desc: 'Integrated high-quality construction materials sourcing to ensure durability from foundation to finish.' },
                    { year: '2025', title: 'Official Registration & Growth', desc: 'Officially registered as Preetham Infra Projects Private Limited with expanding portfolio across India.' },
                  ].map((item, i) => (
                    <div className="timeline-card" key={item.year} style={{ transitionDelay: `${i * 0.1}s` }}>
                      <span className="timeline-year">{item.year}</span>
                      <h3 className="timeline-title">{item.title}</h3>
                      <p className="timeline-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
           PAGE 5: CONTACT & CONSULTATION
           ══════════════════════════════════════════════════════════════ */}
        {activePage === 'contact' && (
          <div className="page-container contact-page-container">
            <header className="page-header-banner">
              <div className="section-wrap">
                <span className="card-badge">GET IN TOUCH</span>
                <h1>Connect With Our <em>Engineering Team</em></h1>
                <p className="page-header-desc">
                  Discuss site plans, request Vastu clears, or consult on raw steel and turnkey pricing with our senior planning engineers in Madanapalle.
                </p>
              </div>
            </header>

            <main className="contact-content-wrap section-wrap reveal" style={{ padding: '60px 0' }}>
              {/* Turnkey Contact Hub Grid */}
              <div className="contact-main-grid">
                {/* Left Side: Registered Office Details & Map */}
                <div className="contact-office-card">
                  <div className="contact-card-header">
                    <span className="card-badge gold-badge">HEAD OFFICE & REGISTERED LOCATION</span>
                    <h2>Preetham Infra Projects Private Limited</h2>
                    <p className="company-sub-tag">Registered Corporate Office & Consultation Studio</p>
                  </div>

                  <div className="contact-details-list">
                    <div className="contact-detail-item">
                      <div className="contact-icon-box">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      </div>
                      <div>
                        <strong>Registered Office Address</strong>
                        <p>Ground Floor, 2/253-D4, Colony Ring Road,<br />Revenue Ward - 2, Madanapalle, Andhra Pradesh - 517325</p>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-icon-box">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      </div>
                      <div>
                        <strong>Direct Contact & Helpline</strong>
                        <p><a href="tel:+917070797930" className="phone-link">+91 7070 7979 30</a></p>
                        <span className="detail-sub">Mon - Sat: 9:00 AM – 7:30 PM (IST)</span>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-icon-box">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </div>
                      <div>
                        <strong>GSTIN Registration</strong>
                        <p><code className="gst-code">37EGRPD5909N1ZN</code></p>
                        <span className="detail-sub">Officially Registered Private Limited Company</span>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-icon-box">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                      </div>
                      <div>
                        <strong>Service Reach</strong>
                        <p>Madanapalle • Tirupathi • Bangalore • Chittoor • Punganur</p>
                      </div>
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="contact-actions-row">
                    <a href="tel:+917070797930" className="btn-action btn-call">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      <span>Call Engineering (+91 7070 7979 30)</span>
                    </a>
                    <a 
                      href="https://wa.me/917070797930?text=Hello%20Preetham%20Infra,%20I'd%20like%20to%20discuss%20a%20construction%20project." 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-action btn-whatsapp"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '8px', flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  {/* Embedded Google Map Preview */}
                  <div className="contact-map-wrapper">
                    <iframe
                      title="Preetham Infra Office Location"
                      src="https://maps.google.com/maps?q=Colony%20Ring%20Road,%20Madanapalle,%20Andhra%20Pradesh%20517325&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="210"
                      style={{ border: 0, borderRadius: 'var(--radius)' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="map-caption">
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-block' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      <span>Colony Ring Road, Revenue Ward - 2, Madanapalle</span>
                      <a 
                        href="https://maps.google.com/?q=Colony+Ring+Road+Madanapalle+Andhra+Pradesh+517325" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="map-direct-link"
                      >
                        Open in Google Maps ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Direct Proposal Inquiry Form */}
                <div className="contact-form-card">
                  <span className="card-badge">PROPOSAL INQUIRY</span>
                  <h2>Start Your Project <em>Inquiry</em></h2>
                  <p className="form-card-desc">
                    Send your project details, site specifications, or schedule a free engineering consultation with director K. Preetham Raju.
                  </p>

                  {pageContactSent ? (
                    <div className="form-success-box">
                      <div className="success-icon">✓</div>
                      <h3>Proposal Request Received!</h3>
                      <p>Thank you <strong>{pageContactForm.name || 'Valued Client'}</strong>. Our chief structural planning engineer will review your site requirements and contact you within 24 hours.</p>
                      <button 
                        className="btn-primary" 
                        style={{ marginTop: '20px' }}
                        onClick={() => {
                          setPageContactSent(false)
                          setPageContactForm({ name: '', phone: '', email: '', projectType: 'Turnkey Residential Villa', location: '', area: '', message: '' })
                        }}
                      >
                        Submit Another Inquiry ↺
                      </button>
                    </div>
                  ) : (
                    <form className="contact-inquiry-form" onSubmit={handlePageContactSubmit}>
                      <div className="form-row-2col">
                        <div className="form-field">
                          <label htmlFor="inquiry-name">Full Name *</label>
                          <input 
                            id="inquiry-name"
                            type="text" 
                            required 
                            value={pageContactForm.name}
                            onChange={(e) => setPageContactForm({ ...pageContactForm, name: e.target.value })}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="inquiry-phone">Phone Number *</label>
                          <input 
                            id="inquiry-phone"
                            type="tel" 
                            required 
                            value={pageContactForm.phone}
                            onChange={(e) => setPageContactForm({ ...pageContactForm, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row-2col">
                        <div className="form-field">
                          <label htmlFor="inquiry-email">Email Address</label>
                          <input 
                            id="inquiry-email"
                            type="email" 
                            value={pageContactForm.email}
                            onChange={(e) => setPageContactForm({ ...pageContactForm, email: e.target.value })}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="inquiry-type">Project Scope *</label>
                          <select 
                            id="inquiry-type"
                            value={pageContactForm.projectType}
                            onChange={(e) => setPageContactForm({ ...pageContactForm, projectType: e.target.value })}
                          >
                            <option value="Turnkey Residential Villa">Turnkey Residential Villa Construction</option>
                            <option value="Commercial Complex & Hub">Commercial Complex & Hospital Infrastructure</option>
                            <option value="Modular Kitchens & Interiors">Modular Kitchen & Interior Architecture</option>
                            <option value="Structural Steel & PEB">Structural Steel Sheds & PEB Fabrication</option>
                            <option value="Formwork & Concrete Shuttering">Shuttering Formwork & Foundation Casting</option>
                            <option value="Protective Painting & Stucco">Exterior Weather-Shield & Micro-cement Painting</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row-2col">
                        <div className="form-field">
                          <label htmlFor="inquiry-location">Site Location</label>
                          <input 
                            id="inquiry-location"
                            type="text" 
                            value={pageContactForm.location}
                            onChange={(e) => setPageContactForm({ ...pageContactForm, location: e.target.value })}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="inquiry-area">Approx. Built-Up Area (sq. ft.)</label>
                          <input 
                            id="inquiry-area"
                            type="text" 
                            value={pageContactForm.area}
                            onChange={(e) => setPageContactForm({ ...pageContactForm, area: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label htmlFor="inquiry-msg">Project Description & Specifications</label>
                        <textarea 
                          id="inquiry-msg"
                          rows="4" 
                          value={pageContactForm.message}
                          onChange={(e) => setPageContactForm({ ...pageContactForm, message: e.target.value })}
                        ></textarea>
                      </div>

                      <button type="submit" className="btn-primary btn-submit-inquiry">
                        Submit Proposal Inquiry <span className="btn-arrow" aria-hidden="true">↗</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* FAQ */}
              <section className="faq-section" style={{ marginTop: '60px' }}>
                <div className="faq-left">
                  <p className="eyebrow">NEED CLARITY?</p>
                  <h2>Frequently Asked <em>Questions</em></h2>
                  <p>Have questions about your upcoming building project or design consultation?</p>
                </div>
                <div className="faq-right">
                  {faqs.map((faq, i) => (
                    <div className={`faq-item${activeFaq === i ? ' open' : ''}`} key={i}>
                      <button
                        className="faq-trigger"
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      >
                        <span>{faq.q}</span>
                        <span className="faq-icon" aria-hidden="true">{activeFaq === i ? '−' : '+'}</span>
                      </button>
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-main section-wrap">
            <div className="footer-col">
              <Logo onClick={() => navigateTo('home')} />
              <p style={{ marginTop: '12px' }}>
                Leading turnkey construction, infrastructure development, and bespoke interior architecture across South India. Constructions since 2019.
              </p>
              <div style={{ marginTop: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                <strong>Registered Office:</strong><br />
                Ground Floor, 2/253-D4, Colony Ring Road,<br />
                Revenue Ward - 2, Madanapalle, AP - 517325<br />
                Phone: +91 7070 7979 30 | GST: 37EGRPD5909N1ZN
              </div>
            </div>
            <div className="footer-col">
              <b>Navigation</b>
              <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home') }}>Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about') }}>About Us</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services') }}>Services Hub</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); navigateTo('projects') }}>Real Projects</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact') }}>Contact</a>
            </div>
            <div className="footer-col">
              <b>Connect Direct</b>
              <a href="tel:+917070797930">+91 7070 7979 30</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact') }}>Madanapalle Office</a>
            </div>
            <div className="footer-col footer-subscribe">
              <b>Newsletter</b>
              <p>Subscribe for architectural cost trends, Vastu updates, and material cost indicators.</p>
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={subscribed}
                  aria-label="Email address for newsletter"
                />
                <button type="submit" disabled={subscribed}>{subscribed ? 'Subscribed ✓' : 'Join ↗'}</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom section-wrap">
            <span>&copy; {new Date().getFullYear()} Preetham Infra Projects Private Limited. All Rights Reserved.</span>
            <span>Powered by Alvision Media</span>
            <span>Ground Floor, 2/253-D4, Colony Ring Road, Madanapalle, AP - 517325</span>
          </div>
        </footer>

        {/* ── Sticky Back to Top Button ── */}
        <div className="floating-speed-dial">
          <button 
            className="speed-dial-btn top-dial" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            ↑
          </button>
        </div>
      </main>

      {/* ── ENQUIRY MODAL ── */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => { setModalOpen(false); setEnquirySent(false) }}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setModalOpen(false); setEnquirySent(false) }} aria-label="Close modal">&times;</button>
            {enquirySent ? (
              <div className="modal-thankyou">
                <span className="card-badge gold-badge">REQUEST RECEIVED</span>
                <h2 id="modal-title">We&rsquo;ll Be In <em>Touch</em></h2>
                <p>Your request details have been forwarded directly to our engineering team and sent via WhatsApp. We will contact you within 24 hours.</p>
                <button className="btn-primary" onClick={() => { setModalOpen(false); setEnquirySent(false) }}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <span className="card-badge gold-badge">EXECUTIVE CONSULTATION</span>
                <h2 id="modal-title">Let&rsquo;s Build Something <em>Remarkable</em></h2>
                <p className="modal-desc">Tell us about your upcoming project and our engineering experts will tailor a turnkey solution for you.</p>

                {/* Auto-Loaded Estimate Alert Banner if applicable */}
                {pageContactForm.message && pageContactForm.message.includes('Estimated') && (
                  <div className="auto-estimate-banner">
                    <span className="banner-icon">⚡</span>
                    <div>
                      <strong>Auto-Loaded Estimate Summary:</strong>
                      <p>{pageContactForm.message}</p>
                    </div>
                  </div>
                )}

                <form className="modal-form" onSubmit={(e) => {
                  e.preventDefault();
                  setEnquirySent(true);
                  const form = e.target;
                  const name = form.elements['name-input']?.value || pageContactForm.name || 'Client';
                  const email = form.elements['email-input']?.value || pageContactForm.email || 'N/A';
                  const phone = form.elements['phone-input']?.value || pageContactForm.phone || 'N/A';
                  const desc = form.elements['desc-input']?.value || pageContactForm.message || 'N/A';
                  sendToWhatsApp(name, `Phone: ${phone}, Email: ${email}, Request: ${desc}`);
                }}>
                  <div className="modal-field">
                    <label htmlFor="name-input">Full Name *</label>
                    <input 
                      id="name-input" 
                      required 
                      placeholder="e.g. Preetham Reddy"
                      defaultValue={pageContactForm.name} 
                    />
                  </div>

                  <div className="modal-field-row">
                    <div className="modal-field">
                      <label htmlFor="phone-input">Phone / WhatsApp Number *</label>
                      <input 
                        id="phone-input" 
                        type="tel" 
                        required 
                        placeholder="e.g. +91 98765 43210"
                        defaultValue={pageContactForm.phone} 
                      />
                    </div>

                    <div className="modal-field">
                      <label htmlFor="email-input">Email Address</label>
                      <input 
                        id="email-input" 
                        type="email" 
                        placeholder="e.g. preetham@example.com"
                        defaultValue={pageContactForm.email} 
                      />
                    </div>
                  </div>

                  <div className="modal-field">
                    <label htmlFor="desc-input">Project Details & Requirements *</label>
                    <textarea 
                      id="desc-input" 
                      rows={3} 
                      required 
                      placeholder="Describe your plot location, built-up area, interior preferences, or structural requirements..."
                      defaultValue={pageContactForm.message} 
                    />
                  </div>

                  <button className="btn-primary btn-modal-submit" type="submit">
                    Send Request via WhatsApp ↗
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
