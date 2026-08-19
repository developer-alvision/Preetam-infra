import { useEffect, useState, useRef, memo } from 'react'
import './App.css'
import brandLogo from './assets/Logo/black yellow Logo.jpg'

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
        <span className="brand-sub">CONSTRUCTIONS</span>
      </span>
    </div>
  )
}

/* ───────── REAL PROJECTS DATA ───────── */
const houseProjectImages = Object.entries(
  import.meta.glob('./Images/Projects/Revanya Residential Building/*.{JPG,jpg,png,jpeg,JPEG,webp,WEBP}', { eager: true, query: '?url', import: 'default' })
).map(([, u]) => u)

const srinivasaLodgeImages = Object.entries(
  import.meta.glob('./Images/Projects/srinivasa lodge - Building/*.{JPG,jpg,png,jpeg,JPEG,webp,WEBP}', { eager: true, query: '?url', import: 'default' })
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
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('All')
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

  const handlePageContactSubmit = (e) => {
    e.preventDefault()
    setPageContactSent(true)
  }

  // Active gallery index state for real project showcase cards
  const [activeGalleryIdx, setActiveGalleryIdx] = useState({ 'srinivasa-lodge': 0, 'luxury-residential-villa': 0 })

  // Turnkey Construction Cost Estimator Calculator State
  const [calcArea, setCalcArea] = useState(1800)
  const [calcGrade, setCalcGrade] = useState('luxury')
  const [calcFloors, setCalcFloors] = useState(2)
  const [calcIncludeInteriors, setCalcIncludeInteriors] = useState(true)

  const getGradeRate = (grade) => {
    switch (grade) {
      case 'premium': return 1850
      case 'luxury': return 2350
      case 'royal': return 3100
      default: return 2350
    }
  }

  const baseRate = getGradeRate(calcGrade) + (calcIncludeInteriors ? 350 : 0)
  const totalBuiltUpArea = calcArea * calcFloors
  const estimatedTotalCost = totalBuiltUpArea * baseRate

  const applyEstimateToInquiry = () => {
    const text = `Estimated Construction Budget: ₹${(estimatedTotalCost / 100000).toFixed(2)} Lakhs for ${totalBuiltUpArea.toLocaleString()} sq.ft built-up area (${calcFloors} floors, ${calcGrade.toUpperCase()} grade).`
    setPageContactForm(prev => ({
      ...prev,
      area: `${totalBuiltUpArea} sq ft (${calcFloors} floors)`,
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
  }, [loading, activePage, serviceCategoryFilter])

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

            {/* Turnkey Construction Cost Estimator Section */}
            <section className="calculator-section section-wrap reveal">
              <div className="calculator-card">
                <div className="calculator-header">
                  <div>
                    <span className="card-badge gold-badge">INTERACTIVE BUDGET PLANNER</span>
                    <h2>Turnkey Construction <em>Cost Estimator</em></h2>
                    <p className="calculator-subtitle">
                      Calculate instant estimated costs for civil structural construction, raw materials, and interior joinery across Madanapalle, Tirupathi, and Bangalore.
                    </p>
                  </div>
                  <div className="calculator-badge-pill">
                    <span className="live-dot">●</span> 2026 Material Price Index
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
                          <span>₹1,850 / sq ft</span>
                          <small>Vizag TMT Steel, UltraTech Cement, Vitrified 4x2 Tiles</small>
                        </button>

                        <button 
                          type="button"
                          className={`grade-select-btn${calcGrade === 'luxury' ? ' active' : ''}`}
                          onClick={() => setCalcGrade('luxury')}
                        >
                          <strong>Luxury Grade ★</strong>
                          <span>₹2,350 / sq ft</span>
                          <small>Tata Tiscon TMT, Teakwood Doors, Kohler Fittings, POP Ceiling</small>
                        </button>

                        <button 
                          type="button"
                          className={`grade-select-btn${calcGrade === 'royal' ? ' active' : ''}`}
                          onClick={() => setCalcGrade('royal')}
                        >
                          <strong>Royal Bespoke</strong>
                          <span>₹3,100 / sq ft</span>
                          <small>Italian Marble, Glass Facade, Smart Lighting, VRF AC Ducting</small>
                        </button>
                      </div>
                    </div>

                    {/* Floors & Addons */}
                    <div className="calc-row-2col">
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

                      <div className="calc-group">
                        <label htmlFor="interiors-toggle-home">Modular Interiors Addon</label>
                        <button 
                          id="interiors-toggle-home"
                          type="button" 
                          className={`calc-toggle-btn${calcIncludeInteriors ? ' active' : ''}`}
                          onClick={() => setCalcIncludeInteriors(!calcIncludeInteriors)}
                        >
                          {calcIncludeInteriors ? '✓ Factory Kitchen & Wardrobes Included (+₹350/sq ft)' : '+ Add Modular Kitchen & Wardrobe Joinery'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Output Summary Column */}
                  <div className="calculator-result-card">
                    <span className="result-eyebrow">ESTIMATED INVESTMENT</span>
                    <div className="total-price-display">
                      <span className="currency-symbol">₹</span>
                      <span className="price-lakhs">{(estimatedTotalCost / 100000).toFixed(2)}</span>
                      <span className="price-unit">Lakhs*</span>
                    </div>
                    <p className="total-area-subtitle">Total Built-Up Area: <strong>{totalBuiltUpArea.toLocaleString()} sq. ft.</strong> @ ₹{baseRate}/sq.ft</p>

                    {/* Itemized Progress Bars */}
                    <div className="breakdown-list">
                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>RCC Structural Frame & Steel (30%)</span>
                          <strong>₹{(estimatedTotalCost * 0.30 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '30%' }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Brickwork, Plastering & Masonry (25%)</span>
                          <strong>₹{(estimatedTotalCost * 0.25 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '25%' }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Flooring, Tiling & Sanitaryware (15%)</span>
                          <strong>₹{(estimatedTotalCost * 0.15 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '15%' }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Electrical, Lighting & Plumbing (15%)</span>
                          <strong>₹{(estimatedTotalCost * 0.15 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '15%' }}></div></div>
                      </div>

                      <div className="breakdown-item">
                        <div className="breakdown-label">
                          <span>Joinery, Paint & Finishing (15%)</span>
                          <strong>₹{(estimatedTotalCost * 0.15 / 100000).toFixed(2)} L</strong>
                        </div>
                        <div className="breakdown-bar"><div className="bar-fill" style={{ width: '15%' }}></div></div>
                      </div>
                    </div>

                    <button className="btn-primary btn-gold-calc" onClick={applyEstimateToInquiry}>
                      Request Engineering Quotation For This Estimate ↗
                    </button>

                    <span className="calc-disclaimer">
                      *Estimates based on standard market rates in AP & KA. Final quote provided after site soil test & architectural elevation review.
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
                <section className="service-section-block section-wrap reveal visible">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 01</span>
                    <h2>Architectural Planning & Turnkey Projects</h2>
                    <p className="section-header-desc">Comprehensive pre-construction design, structural engineering, digital laser markings, and end-to-end turnkey delivery.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">CAD / BIM PLANNING</span>
                        <img 
                          src={houseProjectImages[0] || srinivasaLodgeImages[0]} 
                          alt="3D CAD Blueprint & Architectural Plan" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Concept Discussion & 3D CAD</h3>
                        <p>Zoning, structural orientation, and spatial flow optimization converted into working 3D CAD floor plans prior to execution.</p>
                        <ul className="service-bullet-list">
                          <li>Spatial flow & lifestyle alignment</li>
                          <li>Sunlight & ventilation analysis</li>
                          <li>Initial 3D conceptual massing</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Request Plan Consultation <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">IS-CODE COMPLIANT</span>
                        <img 
                          src={scene1Frames[12] || houseProjectImages[1]} 
                          alt="RCC Structural Steel Rebar Plan" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Structural Engineering Plan</h3>
                        <p>Certified engineering drawings specifying column positioning, foundation depth, beam sizing, and high-tensile RCC rebar framing.</p>
                        <ul className="service-bullet-list">
                          <li>IS-code compliant seismic design</li>
                          <li>Heavy structural RCC load audits</li>
                          <li>Deep pile foundation design</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire Structural Audits <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">SMART AUTOMATION</span>
                        <img 
                          src={houseProjectImages[1] || srinivasaLodgeImages[5]} 
                          alt="Concealed Electrical Conduit Wiring" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Electrical & Conduit Planning</h3>
                        <p>Designing electrical loads, circuit balancing, heavy appliance lines, smart automation hubs, and fire-retardant concealed conduits.</p>
                        <ul className="service-bullet-list">
                          <li>Concealed FRLS wire ducting</li>
                          <li>Phase load balancing & earthing</li>
                          <li>Automation & modular switch placement</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Get Electrical Specs <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">DUAL-PLUMBING</span>
                        <img 
                          src={srinivasaLodgeImages[5] || houseProjectImages[2]} 
                          alt="Plumbing & Drainage Pipes" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Plumbing & Drainage Engineering</h3>
                        <p>Technical drawing sets for pressure-tested water supply lines, dual-drainage gravity traps, and central water heating integration.</p>
                        <ul className="service-bullet-list">
                          <li>Noise-insulated gravity drain pipes</li>
                          <li>Solar & pressure-pump loops</li>
                          <li>CPVC / UPVC certified pipe runs</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire Plumbing Specs <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">LASER ACCURACY</span>
                        <img 
                          src={scene1Frames[5] || houseProjectImages[3]} 
                          alt="Laser Optical Surveying Instrument" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Digital Laser Site Marking</h3>
                        <p>Direct CAD grid transfer onto the physical construction site using digital optical lasers for zero-margin column and wall placement.</p>
                        <ul className="service-bullet-list">
                          <li>Sub-millimeter axis alignment</li>
                          <li>Column grid transfer on site</li>
                          <li>MEP penetration point marking</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Book Site Layout Audit <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">ALL-INCLUSIVE</span>
                        <img 
                          src={srinivasaLodgeImages[0] || houseProjectImages[0]} 
                          alt="Turnkey Villa & Commercial Delivery" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Turnkey Villa & Commercial Delivery</h3>
                        <p>Single-contract execution covering excavation, RCC shell, interiors, plumbing, electrical, and legal approvals to key handover.</p>
                        <ul className="service-bullet-list">
                          <li>Protected from material price inflation</li>
                          <li>Single-point project manager</li>
                          <li>Strict timeline & milestone delivery</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Start Turnkey Quote <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 02. INTERIOR DESIGN */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Interior Design') && (
                <section className="service-section-block section-wrap reveal visible">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 02</span>
                    <h2>Bespoke Interior Architecture</h2>
                    <p className="section-header-desc">Planning internal spaces for optimal ergonomics, luxury material selection, lighting layers, and complete fit-out coordination.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">SPATIAL FLOW</span>
                        <img 
                          src={hallFrames[hallFrames.length - 1] || houseProjectImages[3]} 
                          alt="Space Planning Ergonomics" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Space Planning & Ergonomics</h3>
                        <p>Intelligent layout structuring for living rooms, master suites, and commercial foyers for comfortable circulation and maximum utility.</p>
                        <ul className="service-bullet-list">
                          <li>Intuitive room zoning</li>
                          <li>Custom furniture placement</li>
                          <li>Acoustic & privacy separation</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Request Interior Layout <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">PALETTE CURATION</span>
                        <img 
                          src={houseProjectImages[4] || srinivasaLodgeImages[10]} 
                          alt="Material & Texture Palette Curation" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Material, Color & Finish Selection</h3>
                        <p>Handpicked palettes of Italian marble, textured veneer, fluted wooden panels, brushed brass hardware, and premium wall finishes.</p>
                        <ul className="service-bullet-list">
                          <li>Custom moodboards & physical swatches</li>
                          <li>Stain-resistant luxury surfaces</li>
                          <li>Harmonious color temperature matching</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Schedule Material Session <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">FIT-OUT MANAGEMENT</span>
                        <img 
                          src={bedroomFrames[bedroomFrames.length - 1] || houseProjectImages[5]} 
                          alt="Interior Fit-Out Execution" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Interior Fit-Out Execution</h3>
                        <p>On-site supervision of carpenters, gypsum contractors, polishers, and lighting technicians for seamless design implementation.</p>
                        <ul className="service-bullet-list">
                          <li>Strict tolerance alignment audits</li>
                          <li>Quality control on site joinery</li>
                          <li>Dust-free final site deep cleaning</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Consult Interior Team <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 03. FLOORING SYSTEMS */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Flooring') && (
                <section className="service-section-block section-wrap reveal visible">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 03</span>
                    <h2>High-End Flooring Systems</h2>
                    <p className="section-header-desc">Precision-installed floor surfaces over structural slabs to create durable, level, and stunning visual walking surfaces.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">VITRIFIED TILES</span>
                        <img 
                          src={srinivasaLodgeImages[8] || houseProjectImages[6]} 
                          alt="Vitrified Tile Installation" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Vitrified & Porcelain Tile Systems</h3>
                        <p>Large-format vitrified slabs (800x1600mm+) laid with high-polymer adhesive for zero-joint seamless indoor and outdoor floors.</p>
                        <ul className="service-bullet-list">
                          <li>High abrasion & scratch resistance</li>
                          <li>Epoxy tile grouting for water resistance</li>
                          <li>Anti-skid matte finishes for wet areas</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire Tile Solutions <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">ITALIAN MARBLE</span>
                        <img 
                          src={houseProjectImages[7] || srinivasaLodgeImages[12]} 
                          alt="Italian Marble Floor Slab" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Italian Marble & Granite Stone</h3>
                        <p>Book-matched Italian Bottochino, Statuario marble, and flamed granite installed with diamond mirror polishing.</p>
                        <ul className="service-bullet-list">
                          <li>Seamless book-match vein alignment</li>
                          <li>Hydrophobic sealant stone protection</li>
                          <li>Heavy-duty granite for entry steps</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Request Marble Estimate <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">ACOUSTIC HARDWOOD</span>
                        <img 
                          src={houseProjectImages[8] || srinivasaLodgeImages[14]} 
                          alt="Hardwood Wooden Flooring" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Engineered Hardwood & Wooden Planks</h3>
                        <p>Natural oak, teak, and engineered acoustic wooden flooring ideal for master bedroom suites, home theaters, and private lounges.</p>
                        <ul className="service-bullet-list">
                          <li>Acoustic underlayment sound dampening</li>
                          <li>UV-cured scratch proof topcoat</li>
                          <li>Termite-treated backing layer</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Explore Wooden Specs <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">INDUSTRIAL EPOXY</span>
                        <img 
                          src={srinivasaLodgeImages[15] || houseProjectImages[9]} 
                          alt="Polished Concrete Epoxy Floor" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Polished Concrete & Epoxy Coatings</h3>
                        <p>Dense lithium-silicate polished concrete and seamless self-leveling epoxy for high-impact commercial basements and modern lofts.</p>
                        <ul className="service-bullet-list">
                          <li>Chemical & oil stain resistant</li>
                          <li>Ultra-durable high-load capacity</li>
                          <li>Custom color pigment infusion</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire Epoxy Specs <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 04. FALSE CEILINGS & LIGHTING */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Ceilings & Lighting') && (
                <section className="service-section-block section-wrap reveal visible">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 04 & 05</span>
                    <h2>False Ceilings & Architectural Lighting</h2>
                    <p className="section-header-desc">Suspended ceiling architectures that hide service conduits, manage acoustics, and layer functional ambient and accent lighting.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">GYPSUM & POP</span>
                        <img 
                          src={hallFrames[15] || houseProjectImages[10]} 
                          alt="POP Gypsum False Ceiling" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Gypsum & POP Suspended Ceilings</h3>
                        <p>Saint-Gobain gypsum boards framed with galvanized GI channels for smooth, crack-resistant ceiling planes and concealed light coves.</p>
                        <ul className="service-bullet-list">
                          <li>Fire-retardant & moisture-resistant boards</li>
                          <li>Seamless joint compound taping</li>
                          <li>Integrated AC linear slot diffusers</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Request Ceiling Quote <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">SOLID WOOD LOUVERS</span>
                        <img 
                          src={houseProjectImages[11] || srinivasaLodgeImages[18]} 
                          alt="Wooden Louvered Baffle Ceiling" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Metallic Grid & Wooden Louvered Panels</h3>
                        <p>Architectural aluminum open-cell ceiling grids and custom wooden baffle louvers for high-end acoustic lobbies and dining halls.</p>
                        <ul className="service-bullet-list">
                          <li>Acoustic NRC-rated backing fleece</li>
                          <li>Quick plenum access for maintenance</li>
                          <li>Rich natural wood veneer finishes</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire Baffle Ceilings <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">LAYERED LIGHTING</span>
                        <img 
                          src={bedroomFrames[15] || houseProjectImages[12]} 
                          alt="Ambient Cove Ceiling Lighting" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Ambient & Architectural Cove Lighting</h3>
                        <p>Warm 3000K-4000K indirect LED cove illumination paired with high CRI (90+) glare-free COB recessed downlights.</p>
                        <ul className="service-bullet-list">
                          <li>Dimmable smart DALI / Zigbee drivers</li>
                          <li>Diffused shadow-free light channels</li>
                          <li>Energy-efficient 120 lm/W LED strips</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Get Lighting Scheme <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">ACCENT SPOTLIGHTS</span>
                        <img 
                          src={srinivasaLodgeImages[20] || houseProjectImages[13]} 
                          alt="Accent Track Spotlights" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Accent Spotlights & Magnetic Track Lights</h3>
                        <p>Adjustable narrow-beam spotlights to highlight wall art, stone cladding textures, and dining counter islands.</p>
                        <ul className="service-bullet-list">
                          <li>Low-voltage 24V magnetic track system</li>
                          <li>Focusable 15°-36° beam optics</li>
                          <li>Concealed wall washers</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire Track Systems <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 05. PAINTING */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Painting') && (
                <section className="service-section-block section-wrap reveal visible">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 06</span>
                    <h2>Protective & Decorative Painting</h2>
                    <p className="section-header-desc">Multi-coat high-durability surface paints, anti-fungal exterior shields, and luxury interior micro-cement finishes.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">WEATHER-SHIELD</span>
                        <img 
                          src={srinivasaLodgeImages[2] || scene1Frames[20]} 
                          alt="Exterior Wall Painting" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Weather-Shield Exterior Protective Paints</h3>
                        <p>Elastomeric 100% acrylic exterior paints with crack-bridging technology to withstand extreme South Indian monsoons and UV degradation.</p>
                        <ul className="service-bullet-list">
                          <li>Anti-algae & anti-fungal protection</li>
                          <li>10-year weather warranty options</li>
                          <li>Heat-reflective cool-roof & wall coats</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Request Paint Audit <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">SILK WASHABLE</span>
                        <img 
                          src={houseProjectImages[14] || hallFrames[10]} 
                          alt="Interior Emulsion Paint Roller" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Luxury Silk Washable Interior Emulsions</h3>
                        <p>Ultra-smooth Teflon-protected interior wall emulsions that resist everyday household stains and can be wiped clean with damp cloth.</p>
                        <ul className="service-bullet-list">
                          <li>Zero-VOC eco-friendly low odor formula</li>
                          <li>Rich sheen & velvet matte choices</li>
                          <li>3-coat acrylic putty base sanding</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Get Interior Palette <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">TEXTURED FINISH</span>
                        <img 
                          src={houseProjectImages[15] || bedroomFrames[10]} 
                          alt="Textured Micro Cement Plaster Wall" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Textured Micro-Cement & Accent Walls</h3>
                        <p>Hand-troweled Italian stuccos, micro-cement, metallic rust, and concrete texture finishes for statement living room feature walls.</p>
                        <ul className="service-bullet-list">
                          <li>Seamless 2mm stone-like texture layer</li>
                          <li>Waterproof sealant topcoat</li>
                          <li>Bespoke custom color washes</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Explore Texture Options <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 06. FURNITURE & KITCHENS */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Furniture & Kitchens') && (
                <section className="service-section-block section-wrap reveal visible">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 07 & 08</span>
                    <h2>Modular Kitchens & Bespoke Carpentry</h2>
                    <p className="section-header-desc">Custom factory-milled modular kitchens, soft-close hardware, master wardrobes, and fixed architectural joinery.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">GERMAN HARDWARE</span>
                        <img 
                          src={kitchenFrames[kitchenFrames.length - 1] || houseProjectImages[2]} 
                          alt="Modular Kitchen Setup" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Modular Kitchen Design & Production</h3>
                        <p>Ergonomic island & L-shape kitchens built with boiling-water-proof (BWP) HDMR plywood, quartz countertops, and Blum/Hettich soft-close tandem drawers.</p>
                        <ul className="service-bullet-list">
                          <li>Acrylic & PU lacquer shutter finishes</li>
                          <li>Concealed corner carousels & pantry tall units</li>
                          <li>Built-in chimney & hob cutout integration</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Request Kitchen Design <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">WALK-IN WARDROBES</span>
                        <img 
                          src={bedroomFrames[bedroomFrames.length - 1] || houseProjectImages[5]} 
                          alt="Glass Modular Wardrobe" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Modular Wardrobes & Storage Lofts</h3>
                        <p>Floor-to-ceiling sliding & floor hinged wardrobes featuring glass doors, integrated LED valet rods, lockable jewelry drawers, and loft storage.</p>
                        <ul className="service-bullet-list">
                          <li>Tinted aluminum glass shutters</li>
                          <li>Biometric lockable drawer inserts</li>
                          <li>Integrated automatic door-open LEDs</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Get Wardrobe Estimate <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">CUSTOM JOINERY</span>
                        <img 
                          src={houseProjectImages[3] || srinivasaLodgeImages[25]} 
                          alt="Custom Joinery Carpentry" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Bespoke Workshop Carpentry & Joinery</h3>
                        <p>Teakwood door frames, decorative main doors, TV unit media consoles, wall paneling, and custom loose furniture crafted by senior master carpenters.</p>
                        <ul className="service-bullet-list">
                          <li>Solid teakwood main entrance doors</li>
                          <li>Veneered media consoles & bar counters</li>
                          <li>Precision edge-banding & PU polish</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire Custom Joinery <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 07. FABRICATION & SHUTTERING */}
              {(serviceCategoryFilter === 'All' || serviceCategoryFilter === 'Fabrication & Shuttering') && (
                <section className="service-section-block section-wrap reveal visible">
                  <div className="service-block-header">
                    <span className="card-badge">DIVISION 09 & 10</span>
                    <h2>Shuttering Formwork & Metal Fabrication</h2>
                    <p className="section-header-desc">Heavy structural steel formwork for concrete casting alongside stainless steel balustrades and industrial structural steelwork.</p>
                  </div>

                  <div className="service-detail-grid">
                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">CONCRETE FORMWORK</span>
                        <img 
                          src={scene1Frames[12] || srinivasaLodgeImages[3]} 
                          alt="Concrete Shuttering Formwork" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Structural Shuttering & Formwork</h3>
                        <p>Waterproof film-faced plywood and steel plate shuttering systems to cast dense, smooth concrete columns, retaining walls, and slabs.</p>
                        <ul className="service-bullet-list">
                          <li>Heavy-duty cuplock staging props</li>
                          <li>Smooth honeycomb-free concrete finish</li>
                          <li>Zero-deflection slab formwork</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire Shuttering Rates <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">STAINLESS & MILD STEEL</span>
                        <img 
                          src={srinivasaLodgeImages[28] || houseProjectImages[1]} 
                          alt="Architectural Metal Fabrication" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Architectural Gates & Balustrade Fabrication</h3>
                        <p>Laser-cut MS compound gates, toughened glass SS 304 staircase railings, window safety grills, and outdoor pergola steel frameworks.</p>
                        <ul className="service-bullet-list">
                          <li>SS 304 grade corrosion proof railings</li>
                          <li>CNC laser-cut geometric gate patterns</li>
                          <li>Toughened glass balustrade clamps</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Request Fabrication Quote <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="service-detail-card">
                      <div className="service-card-img-wrap">
                        <span className="service-card-tag">STRUCTURAL STEEL</span>
                        <img 
                          src={scene1Frames[18] || srinivasaLodgeImages[30]} 
                          alt="Heavy Structural Steel I Beam" 
                          onError={(e) => { e.target.onerror = null; e.target.src = brandLogo }}
                        />
                      </div>
                      <div className="service-card-body">
                        <h3>Heavy Structural Steel I-Beam Frameworks</h3>
                        <p>Engineering industrial sheds, PEB structural steel columns, mezzanine floors, and roof trusses engineered for large clear-span commercial spaces.</p>
                        <ul className="service-bullet-list">
                          <li>ISMB / ISMC certified steel sections</li>
                          <li>Precision MIG / Arc structural welding</li>
                          <li>Red-oxide anti-rust primer coating</li>
                        </ul>
                        <div className="service-card-action">
                          <button className="service-card-btn" onClick={() => setModalOpen(true)}>
                            Inquire PEB Steel Sheds <span className="cta-arrow">↗</span>
                          </button>
                        </div>
                      </div>
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
                      <div className="contact-icon-box">📍</div>
                      <div>
                        <strong>Registered Office Address</strong>
                        <p>Ground Floor, 2/253-D4, Colony Ring Road,<br />Revenue Ward - 2, Madanapalle, Andhra Pradesh - 517325</p>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-icon-box">📞</div>
                      <div>
                        <strong>Direct Contact & Helpline</strong>
                        <p><a href="tel:+917070797930" className="phone-link">+91 7070 7979 30</a></p>
                        <span className="detail-sub">Mon - Sat: 9:00 AM – 7:30 PM (IST)</span>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-icon-box">📜</div>
                      <div>
                        <strong>GSTIN Registration</strong>
                        <p><code className="gst-code">37EGRPD5909N1ZN</code></p>
                        <span className="detail-sub">Officially Registered Private Limited Company</span>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-icon-box">🌐</div>
                      <div>
                        <strong>Service Reach</strong>
                        <p>Madanapalle • Tirupathi • Bangalore • Chittoor • Punganur</p>
                      </div>
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="contact-actions-row">
                    <a href="tel:+917070797930" className="btn-action btn-call">
                      <span>📞 Call Engineering (+91 7070 7979 30)</span>
                    </a>
                    <a 
                      href="https://wa.me/917070797930?text=Hello%20Preetham%20Infra,%20I'd%20like%20to%20discuss%20a%20construction%20project." 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-action btn-whatsapp"
                    >
                      <span>💬 Chat on WhatsApp</span>
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
                      <span>📍 Colony Ring Road, Revenue Ward - 2, Madanapalle</span>
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
                            placeholder="e.g. Ramesh Kumar" 
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
                            placeholder="+91 98765 43210" 
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
                            placeholder="name@company.com" 
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
                            placeholder="e.g. Madanapalle / Tirupati / Bangalore" 
                            value={pageContactForm.location}
                            onChange={(e) => setPageContactForm({ ...pageContactForm, location: e.target.value })}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="inquiry-area">Approx. Built-Up Area (sq. ft.)</label>
                          <input 
                            id="inquiry-area"
                            type="text" 
                            placeholder="e.g. 2,400 sq ft (G+2)" 
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
                          placeholder="Tell us about your plot size, floors planned, timeline, or special requirements (e.g. Vastu planning, Italian marble, PEB height)..."
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
