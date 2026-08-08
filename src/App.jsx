import { useEffect, useState, useRef, memo } from 'react'
import './App.css'
import brandLogo from './assets/Logo/black yellow Logo.jpg'

/* ───────── FRAME ASSET GLOBS ───────── */
const scene1Frames = Object.entries(
  import.meta.glob('./scene 1/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)

const hallFrames = Object.entries(
  import.meta.glob('./Hall setup/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)

const kitchenFrames = Object.entries(
  import.meta.glob('./Kitchen setup frames/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)

const bedroomFrames = Object.entries(
  import.meta.glob('./Bedroom Setup/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)

/* ───────── LUXURY PREETHAM INFRA LOGO MARK ───────── */
function Logo({ light = false, onClick }) {
  return (
    <div className={`brand-logo${light ? ' brand-logo-light' : ''}`} onClick={onClick}>
      <img src={brandLogo} alt="Preetham Infra Logo" className="brand-logo-img" />
      <span className="brand-logo-text">
        <span className="brand-name">PREETHAM INFRA</span>
        <span className="brand-sub">CONSTRUCTIONS</span>
      </span>
    </div>
  )
}

/* ───────── REAL PROJECTS DATA ───────── */
const houseProjectImages = Object.entries(
  import.meta.glob('./house - recent work/*.{JPG,jpg,png,jpeg}', { eager: true, query: '?url', import: 'default' })
).map(([, u]) => u)

const srinivasaLodgeImages = Object.entries(
  import.meta.glob('./srinivasa lodge - recent project/*.{JPG,jpg,png,jpeg}', { eager: true, query: '?url', import: 'default' })
).map(([, u]) => u)

const projectsData = [
  {
    id: 'srinivasa-lodge',
    title: 'Srinivasa Lodge & Commercial Complex',
    type: 'Commercial',
    category: 'Commercial & Hospitality',
    location: 'Chittoor / Madanapalle, AP',
    area: '24,000 Sq. Ft.',
    completion: '2023',
    desc: 'Turnkey commercial lodge and hospitality complex engineered from structural foundation to complete interior architecture. Features high-traffic vitrified flooring, false ceiling integration, custom hotel furniture, and multi-tier MEP services.',
    images: srinivasaLodgeImages,
    specs: [
      { label: 'Structure', val: 'Heavy Duty RCC Frame' },
      { label: 'Flooring', val: 'Vitrified High-Traffic Tiles' },
      { label: 'Interiors', val: 'Custom Hotel Fit-Outs' },
      { label: 'Ceilings', val: 'Acoustic POP & Gypsum' },
    ],
  },
  {
    id: 'luxury-residential-villa',
    title: 'Preetham Luxury Residential Villa',
    type: 'Residential',
    category: 'Turnkey Luxury Villa',
    location: 'Bangalore / Madanapalle Region',
    area: '8,500 Sq. Ft.',
    completion: '2024',
    desc: 'High-end bespoke residential sanctuary built with deep pile foundations, double-height living hall, Italian marble flooring, German soft-close modular kitchens, and climate-controlled master suites.',
    images: houseProjectImages,
    specs: [
      { label: 'Foundation', val: 'Deep Seismic Pile' },
      { label: 'Flooring', val: 'Italian Marble & Hardwood' },
      { label: 'Kitchen', val: 'German Soft-Close Modular' },
      { label: 'Soundproofing', val: 'Acoustic Double-Glazing' },
    ],
  },
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

/* ───────── CANVAS DRAWING HELPER ───────── */
function drawImageCover(ctx, img, width, height) {
  if (!img || !img.complete || img.naturalWidth === 0) return
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

  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight)

  // Seamlessly mask Gemini sparkle watermark icon in lower-right corner
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

/* ───────── HIGH PERFORMANCE SCENE CANVAS WITH SCROLL-LOCK ───────── */
const SceneCanvas = memo(function SceneCanvas({ id, frameUrls, overlays }) {
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

      if (firstImg && firstImg.complete && firstImg.naturalWidth > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const rect = canvas.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          canvas.width = rect.width * dpr
          canvas.height = rect.height * dpr
          drawImageCover(ctx, firstImg, canvas.width, canvas.height)
        }
      } else if (firstImg) {
        firstImg.onload = () => {
          if (!cancelled && canvasRef.current) {
            const currentCanvas = canvasRef.current
            const currentCtx = currentCanvas.getContext('2d', { alpha: false })
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const rect = currentCanvas.getBoundingClientRect()
            if (rect.width > 0 && rect.height > 0) {
              currentCanvas.width = rect.width * dpr
              currentCanvas.height = rect.height * dpr
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

  // Canvas render & strict scroll lock binding
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: false })
    let animationFrameId = null
    let lastDrawnImg = null
    const SCROLL_RANGE = 2000

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
        if (nearest) {
          lastDrawnImg = nearest
          drawImageCover(ctx, nearest, canvas.width, canvas.height)
        }
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

      // If scene scrolled far away, reset unlock flags so it locks on re-entry
      if (distFromTop > window.innerHeight * 0.7) {
        unlockedDownRef.current = false
        unlockedUpRef.current = false
        if (activeSceneLock.current === container) {
          activeSceneLock.current = null
          isActiveRef.current = false
        }
        return
      }

      // If another scene has active lock, ignore
      if (activeSceneLock.current && activeSceneLock.current !== container) return

      const isNearTop = distFromTop <= 150

      // DOWNWARD SCROLLING (deltaY > 0)
      if (deltaY > 0) {
        if (unlockedDownRef.current) return // Already finished going down

        if (!isActiveRef.current && isNearTop) {
          isActiveRef.current = true
          activeSceneLock.current = container
          virtualScrollRef.current = 0
          unlockedUpRef.current = false
        }

        if (isActiveRef.current) {
          // Enforce exact top alignment to fill screen perfectly
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
            // Reached 100%, unlock downward
            isActiveRef.current = false
            activeSceneLock.current = null
            unlockedDownRef.current = true
          }
        }
      }
      // UPWARD SCROLLING (deltaY < 0)
      else if (deltaY < 0) {
        if (unlockedUpRef.current) return // Already finished going up

        if (!isActiveRef.current && isNearTop) {
          isActiveRef.current = true
          activeSceneLock.current = container
          virtualScrollRef.current = SCROLL_RANGE
          unlockedDownRef.current = false
        }

        if (isActiveRef.current) {
          // Enforce exact top alignment to fill screen perfectly
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
            // Reached 0%, unlock upward
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
      handleWheelOrTouch(deltaY, () => e.preventDefault())
    }

    handleResize()
    const renderInitTimer = setTimeout(() => {
      handleResize()
      renderFrame(0)
    }, 40)

    window.addEventListener('resize', handleResize)
    window.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      clearTimeout(renderInitTimer)
      if (activeSceneLock.current === container) {
        activeSceneLock.current = null
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [frameUrls, overlays])

  return (
    <section className="scene-section" id={id} ref={containerRef}>
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

        {/* Official Preetham Infra Badge & Progress Counter positioned directly over Gemini Watermark */}
        <div className="canvas-watermark-logo-badge">
          <img src={brandLogo} alt="Preetham Infra Logo" />
          <div className="badge-info">
            <span className="badge-brand">PREETHAM INFRA</span>
            <span ref={counterRef} className="badge-counter">0%</span>
          </div>
        </div>

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
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('All')
  const [projectFilter, setProjectFilter] = useState('All')
  const [activeFaq, setActiveFaq] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [enquirySent, setEnquirySent] = useState(false)

  // Active gallery index state for real project showcase cards
  const [activeGalleryIdx, setActiveGalleryIdx] = useState({ 'srinivasa-lodge': 0, 'luxury-residential-villa': 0 })

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
    }, 50)

    return () => {
      clearTimeout(timer)
      if (obs) obs.disconnect()
    }
  }, [loading, activePage])

  const visibleProjects = projectFilter === 'All' 
    ? projectsData 
    : projectsData.filter((p) => p.type === projectFilter || p.category.includes(projectFilter))

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
            <h1 className="sr-only">Preetham Infra — Constructions & Luxury Architecture</h1>

            {/* SCENE 01: GROUND UP */}
            <SceneCanvas
              id="home-scene"
              frameUrls={scene1Frames}
              overlays={[
                {
                  position: 'left',
                  start: 0.02,
                  end: 0.35,
                  label: 'PREETHAM INFRA / SCENE 01',
                  title: <>From the<br /><em>Ground Up</em></>,
                  desc: 'Experience luxury construction as structural foundations evolve into a finished architectural landmark.',
                },
                {
                  position: 'right',
                  start: 0.45,
                  end: 0.82,
                  label: 'PRECISION ENGINEERING',
                  title: <>Every Detail<br /><em>Perfected</em></>,
                  desc: 'Rigorous engineering standards ensuring structural integrity built to withstand generations.',
                },
              ]}
            />

            {/* CONTENT CARD 01 */}
            <section className="scene-content-card section-wrap reveal">
              <div className="content-card-inner">
                <div className="content-card-header">
                  <span className="card-badge">01 / STRUCTURAL EXCELLENCE</span>
                  <h2>Engineering Landmarks That <em>Endure</em></h2>
                  <p>
                    From heavy-duty foundation excavation to precision RCC frame casting, Preetham Infra combines advanced structural engineering with certified materials to build spaces that stand for generations.
                  </p>
                </div>
                <div className="content-card-grid">
                  <div className="content-card-item">
                    <span className="card-item-num">01</span>
                    <h3>Deep Pile Foundations</h3>
                    <p>Advanced soil testing, deep pile foundation techniques, and high-tensile steel reinforcement.</p>
                  </div>
                  <div className="content-card-item">
                    <span className="card-item-num">02</span>
                    <h3>Turnkey Execution</h3>
                    <p>Complete project management from architectural 3D CAD designs to certified structural audits.</p>
                  </div>
                  <div className="content-card-item">
                    <span className="card-item-num">03</span>
                    <h3>Uncompromising Safety</h3>
                    <p>IS-code compliant seismic design and multi-tier quality control checkpoints on every site.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SCENE INTRO 02 */}
            <section className="scene-intro-card section-wrap reveal">
              <div className="intro-card-inner">
                <span className="card-badge">SCENE 02 / LIVING SPACES</span>
                <h2>The Grand <em>Hall Design</em></h2>
                <p>
                  Experience the step-by-step transformation of raw space into a magnificent living hall — where expansive architectural layout meets curated luxury.
                </p>
              </div>
            </section>

            {/* SCENE 02: HALL */}
            <SceneCanvas
              id="hall-scene"
              frameUrls={hallFrames}
              overlays={[
                {
                  position: 'left',
                  start: 0.02,
                  end: 0.35,
                  label: 'SCENE 02 / THE GRAND HALL',
                  title: <>Grandeur<br /><em>Unveiled</em></>,
                  desc: 'Step into a magnificent living space meticulously tailored for refined luxury and welcoming gatherings.',
                },
                {
                  position: 'right',
                  start: 0.48,
                  end: 0.85,
                  label: 'ARTISAN DETAILS',
                  title: <>Where Style<br /><em>Meets Comfort</em></>,
                  desc: 'Bespoke wall accents, designer lighting, and premium flooring harmoniously blended.',
                },
              ]}
            />

            {/* SCENE INTRO 03 */}
            <section className="scene-intro-card section-wrap reveal">
              <div className="intro-card-inner">
                <span className="card-badge">SCENE 03 / CULINARY SPACES</span>
                <h2>The Modern <em>Kitchen Sanctuary</em></h2>
                <p>
                  Witness the creation of a culinary sanctuary designed with high-end ergonomics, Italian quartz stone surfaces, and seamless appliance integration.
                </p>
              </div>
            </section>

            {/* SCENE 03: KITCHEN */}
            <SceneCanvas
              id="kitchen-scene"
              frameUrls={kitchenFrames}
              overlays={[
                {
                  position: 'left',
                  start: 0.02,
                  end: 0.35,
                  label: 'SCENE 03 / MODERN KITCHEN',
                  title: <>Culinary<br /><em>Excellence</em></>,
                  desc: 'Witness the creation of a culinary sanctuary designed with high-end ergonomics and Italian stone surfaces.',
                },
                {
                  position: 'right',
                  start: 0.48,
                  end: 0.85,
                  label: 'LUXURY FINISHES',
                  title: <>Crafted for<br /><em>Perfection</em></>,
                  desc: 'Custom cabinetry, premium stone countertops, and intelligent storage solutions.',
                },
              ]}
            />

            {/* SCENE INTRO 04 */}
            <section className="scene-intro-card section-wrap reveal">
              <div className="intro-card-inner">
                <span className="card-badge">SCENE 04 / PRIVATE RETREATS</span>
                <h2>The Luxury <em>Bedroom Suite</em></h2>
                <p>
                  Explore how we craft tranquil private suites that pair ambient mood lighting with serene acoustic textures to offer ultimate rest and sanctuary.
                </p>
              </div>
            </section>

            {/* SCENE 04: BEDROOM */}
            <SceneCanvas
              id="bedroom-scene"
              frameUrls={bedroomFrames}
              overlays={[
                {
                  position: 'left',
                  start: 0.05,
                  end: 0.5,
                  label: 'SCENE 04 / PRIVATE RETREAT',
                  title: <>Your Luxury<br /><em>Bedroom Suite</em></>,
                  desc: 'An intimate private suite designed to restore mind and body in pure comfort.',
                },
              ]}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
           PAGE 2: SERVICES HUB (FULL DETAILED CAPABILITIES)
           ══════════════════════════════════════════════════════════════ */}
        {activePage === 'services' && (
          <div className="page-container services-page-container">
            <header className="page-header-banner">
              <div className="section-wrap">
                <span className="card-badge">PREETHAM INFRA CAPABILITIES</span>
                <h1>End-to-End <em>Services & Engineering</em></h1>
                <p className="page-header-desc">
                  From big-picture CAD floor planning to structural execution, false ceilings, bespoke carpentry, modular kitchens, and structural steel fabrication.
                </p>

                <div className="services-nav-tabs">
                  {['All', 'Planning', 'Interior Design', 'Flooring', 'Ceilings & Lighting', 'Painting', 'Furniture & Kitchens', 'Fabrication & Shuttering'].map((cat) => (
                    <button
                      key={cat}
                      className={`service-tab-btn${serviceCategoryFilter === cat ? ' active' : ''}`}
                      onClick={() => setServiceCategoryFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <main className="services-content-wrap">
              {/* 01. PLANNING & TURNKEY */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Planning') && (
                <section className="service-section-block section-wrap reveal">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 01</span>
                    <h2>Architectural Planning & Turnkey Projects</h2>
                    <p className="section-header-desc">Comprehensive pre-construction design, structural engineering, digital markings, and end-to-end turnkey delivery.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <h3>Concept Discussion</h3>
                      <p>In floor planning, "concept" refers to the big-picture idea driving how spaces are organized, connected, and experienced before detailed working drawings.</p>
                      <ul className="service-bullet-list">
                        <li>Zoning & spatial flow optimization</li>
                        <li>Client lifestyle & functional alignment</li>
                        <li>Initial 3D conceptual massing</li>
                      </ul>
                    </div>

                    <div className="service-detail-card">
                      <h3>Structural Plan</h3>
                      <p>A set of engineering drawings showing how a building will stand up: positions and sizes of columns, beams, slabs, foundations, and load-bearing steel reinforcement.</p>
                      <ul className="service-bullet-list">
                        <li>IS-code compliant seismic design</li>
                        <li>High-tensile steel & RCC specifications</li>
                        <li>Certified structural safety audits</li>
                      </ul>
                    </div>

                    <div className="service-detail-card">
                      <h3>Electrical Planning</h3>
                      <p>Designing the complete electrical system—loads, circuits, wiring routes, protection, and device locations—using floor and structural plans as a base.</p>
                      <ul className="service-bullet-list">
                        <li>Concealed conduit ducting layouts</li>
                        <li>Smart automation & switchboard placement</li>
                        <li>Surge protection & load balancing</li>
                      </ul>
                    </div>

                    <div className="service-detail-card">
                      <h3>Plumbing Plan</h3>
                      <p>Technical drawing set showing water supply and drainage systems: pipe routes, sizes, slopes, valves, fixtures, and main line connections.</p>
                      <ul className="service-bullet-list">
                        <li>Dual-plumbing cold & hot water lines</li>
                        <li>Sloped gravity drainage & traps</li>
                        <li>High-pressure pump integration</li>
                      </ul>
                    </div>

                    <div className="service-detail-card">
                      <h3>Digital Markings</h3>
                      <p>Transferring CAD/BIM drawings onto site as precise physical marks for columns, walls, MEP points, and finishes using digital laser layout tools instead of manual tape strings.</p>
                      <ul className="service-bullet-list">
                        <li>Zero-margin error laser alignment</li>
                        <li>Exact column & wall axis transfer</li>
                        <li>MEP penetration point marking</li>
                      </ul>
                    </div>

                    <div className="service-detail-card highlight-card">
                      <h3>Turnkey Projects</h3>
                      <p>A single contractor handling everything from architectural design, approvals, construction, interiors, services, to final handover so clients simply “turn the key”.</p>
                      <ul className="service-bullet-list">
                        <li>Single point of accountability</li>
                        <li>Protected from cost inflation</li>
                        <li>Fixed timeline guarantee</li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* 02. INTERIOR DESIGN */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Interior Design') && (
                <section className="service-section-block section-wrap reveal">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 02</span>
                    <h2>Bespoke Interior Architecture</h2>
                    <p className="section-header-desc">Planning internal spaces for optimal ergonomics, luxury material selection, and complete fit-out coordination.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <h3>Space Planning & Ergonomics</h3>
                      <p>Deciding room functions, circulation paths, and furniture layouts for efficient, comfortable, and intuitive daily spatial flow.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Material, Color & Finish Selection</h3>
                      <p>Curating flooring, wall textures, ceilings, lighting fixtures, hardware, and soft furnishings that match durability needs and luxury styling.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Interior Fit-Out Coordination</h3>
                      <p>Overseeing partitions, false ceilings, custom cabinetry, loose furniture, and décor to ensure timely, flawless site installation.</p>
                    </div>
                  </div>
                </section>
              )}

              {/* 03. FLOORING SYSTEMS */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Flooring') && (
                <section className="service-section-block section-wrap reveal">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 03</span>
                    <h2>High-End Flooring Systems</h2>
                    <p className="section-header-desc">Finished floor surfaces installed over structural slabs to create durable, level, and stunning walking surfaces.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <h3>Vitrified & Ceramic Tiles</h3>
                      <p>Ceramic, porcelain, and vitrified tiles dominating kitchens, bathrooms, and living areas with low water absorption, stain resistance, and diverse textures.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Natural Marble & Granite Stone</h3>
                      <p>Italian marble and premium granite providing hard-wearing, elegant surfaces for luxury residential villas and commercial grand halls.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Hardwood & Engineered Wood</h3>
                      <p>Solid hardwood, engineered wood, laminate, and bamboo delivering warm, comfortable acoustic interiors for bedrooms and private suites.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Polished Concrete & Epoxy</h3>
                      <p>Polished or stamped concrete offering an industrial modern aesthetic—economical, ultra-durable for open-plan lounges and basements.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Vinyl, LVT & Linoleum</h3>
                      <p>Waterproof, resilient alternatives mimicking natural wood or stone, ideal for moisture-prone or high-traffic utility zones.</p>
                    </div>
                  </div>
                </section>
              )}

              {/* 04. FALSE CEILINGS & LIGHTING */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Ceilings & Lighting') && (
                <section className="service-section-block section-wrap reveal">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 04 & 05</span>
                    <h2>False Ceilings & Architectural Lighting</h2>
                    <p className="section-header-desc">Secondary suspended ceilings to conceal services, manage acoustics, and layer functional ambient lighting.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <h3>Gypsum & POP Ceilings</h3>
                      <p>Lightweight, easily shaped boards perfect for residential ceilings with seamless cove lighting and concealed AC ducting.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Metal & Wooden Grid Panels</h3>
                      <p>Durable aluminum grid panels for offices, or premium solid wood louvers for luxury residential statement ceilings.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Ambient Lighting</h3>
                      <p>Overall even illumination for general visibility via glare-free recessed cans, flush ceiling mounts, and chandeliers.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Task Lighting</h3>
                      <p>Focused light beams for reading or cooking using counter pendants, under-cabinet LED strips, and adjustable track spotlights.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Accent & Cove Lighting</h3>
                      <p>Highlighting artwork, wall panel textures, and architectural niches with concealed cove LEDs, wall washers, and floor spots.</p>
                    </div>
                  </div>
                </section>
              )}

              {/* 05. PAINTING & FURNITURE */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Painting' || serviceCategoryFilter === 'Furniture & Kitchens') && (
                <section className="service-section-block section-wrap reveal">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 06, 07 & 08</span>
                    <h2>Protective Painting, Carpentry & Modular Systems</h2>
                    <p className="section-header-desc">High-performance surface coatings, custom workshop furniture, modular kitchens, and walk-in wardrobes.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <h3>Protective & Decorative Painting</h3>
                      <p>Applying oil-based, acrylic emulsion, and weather-proof cement coatings to protect walls against moisture, UV rays, and environmental wear.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Carpentry & Custom Furniture Making</h3>
                      <p>Crafting fixed site joinery (doors, windows, partitions) and custom workshop furniture (tables, beds, sofas) balancing ergonomics and style.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Modular Kitchen Design & Making</h3>
                      <p>Planned in zones—cooking, washing, storage—with moisture-resistant plywood/MDF carcasses, acrylic shutters, and Blum/Hettich soft-close hardware.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Modular Wardrobes & Lofts</h3>
                      <p>Custom wardrobe systems with hanging bays, integrated LED valet rods, glass shutters, and biometric drawers tailored for master suites.</p>
                    </div>
                  </div>
                </section>
              )}

              {/* 06. FABRICATION & SHUTTERING */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Fabrication & Shuttering') && (
                <section className="service-section-block section-wrap reveal">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 09 & 10</span>
                    <h2>Shuttering Formwork & Metal Fabrication</h2>
                    <p className="section-header-desc">Temporary structural moulds for fluid concrete casting and light/heavy structural metal fabrication.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <h3>Shuttering & Formwork</h3>
                      <p>Temporary precision moulds holding fresh concrete in place until it hardens to full structural load-bearing capacity for slabs, beams, columns, and foundations.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Light Metal Fabrication</h3>
                      <p>Workshop and site fabrication of residential gates, window grills, staircase handrails, SS balustrades, and structural frames.</p>
                    </div>

                    <div className="service-detail-card">
                      <h3>Heavy Structural Steel Fabrication</h3>
                      <p>CNC cutting, bending, and heavy welding of structural steel columns, industrial roof sheds, platforms, and commercial frameworks.</p>
                    </div>
                  </div>
                </section>
              )}
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
                        <img
                          src={proj.images[currentPhotoIdx] || proj.images[0]}
                          alt={proj.title}
                          className="project-main-photo"
                        />

                        {/* Thumbnail Row */}
                        {proj.images.length > 1 && (
                          <div className="project-thumbnails-row">
                            {proj.images.slice(0, 7).map((imgUrl, i) => (
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
              <div className="contact-band" style={{ borderRadius: 'var(--radius-xl)' }}>
                <div className="contact-inner">
                  <div>
                    <span className="card-badge">REGISTERED OFFICE</span>
                    <h2 style={{ fontSize: '32px', color: '#fff', marginTop: '12px' }}>Preetham Infra Projects Private Limited</h2>
                    <p style={{ marginTop: '16px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)' }}>
                      Ground Floor, 2/253-D4, Colony Ring Road,<br />
                      Revenue Ward - 2, Madanapalle,<br />
                      Andhra Pradesh - 517325<br />
                      <strong>Phone:</strong> +91 7070 7979 30<br />
                      <strong>GST:</strong> 37EGRPD5909N1ZN
                    </p>
                  </div>

                  <button className="btn-primary btn-dark" onClick={() => setModalOpen(true)}>
                    Start Proposal Inquiry <span className="btn-arrow" aria-hidden="true">↗</span>
                  </button>
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
                Leading turnkey construction, infrastructure development, and bespoke interior architecture across South India. Construction excellence since 2019.
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
                  placeholder="Enter workspace email..."
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
            <span>Ground Floor, 2/253-D4, Colony Ring Road, Madanapalle, AP - 517325</span>
          </div>
        </footer>
      </main>

      {/* ── ENQUIRY MODAL ── */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => { setModalOpen(false); setEnquirySent(false) }}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setModalOpen(false); setEnquirySent(false) }} aria-label="Close modal">&times;</button>
            {enquirySent ? (
              <>
                <p className="eyebrow">THANK YOU</p>
                <h2 id="modal-title">We&rsquo;ll Be In <em>Touch</em></h2>
                <p>Your request has been received. Our senior project team will respond within 24 hours.</p>
                <button className="btn-primary" onClick={() => { setModalOpen(false); setEnquirySent(false) }}>
                  Done
                </button>
              </>
            ) : (
              <>
                <p className="eyebrow">CONSULTATION</p>
                <h2 id="modal-title">Let&rsquo;s Build Something <em>Remarkable</em></h2>
                <p>Tell us about your upcoming project and our engineering experts will tailor a solution for you.</p>
                <form onSubmit={(e) => { e.preventDefault(); setEnquirySent(true) }}>
                  <label htmlFor="name-input" className="sr-only">Your Name</label>
                  <input id="name-input" placeholder="Your Full Name" required />

                  <label htmlFor="email-input" className="sr-only">Email Address</label>
                  <input id="email-input" type="email" placeholder="Email Address" required />

                  <label htmlFor="phone-input" className="sr-only">Phone Number</label>
                  <input id="phone-input" type="tel" placeholder="Phone Number" />

                  <label htmlFor="desc-input" className="sr-only">Project Details</label>
                  <textarea id="desc-input" placeholder="Describe your dream project..." rows={4} required />

                  <button className="btn-primary" type="submit">
                    Send Request <span className="btn-arrow" aria-hidden="true">↗</span>
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
