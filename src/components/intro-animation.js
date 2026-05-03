const STORAGE_KEY = 'cloud809_intro_seen'
const EASE        = 'cubic-bezier(0.34,1.56,0.64,1)'

export function initIntroAnimation() {
  if (localStorage.getItem(STORAGE_KEY)) return

  /* ── Styles ─────────────────────────────────────────────────────── */
  const style = document.createElement('style')
  style.textContent = `
    #intro-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }
    #intro-skip {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: rgba(255,255,255,0.4);
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 12px;
      cursor: pointer;
      padding: 4px 8px;
      transition: color 150ms ease;
    }
    #intro-skip:hover { color: rgba(255,255,255,0.8); }
    #intro-logo-row {
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      transition: gap 400ms ${EASE}, transform 300ms ${EASE};
    }
    .intro-shape {
      transition:
        opacity  600ms ${EASE},
        transform 600ms ${EASE};
    }
    #intro-name {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.02em;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 400ms ease, transform 400ms ease;
    }
    #intro-tagline {
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 14px;
      color: rgba(255,255,255,0.6);
      opacity: 0;
      margin-top: -1rem;
      transition: opacity 300ms ease;
    }
  `
  document.head.appendChild(style)

  /* ── Overlay ────────────────────────────────────────────────────── */
  const overlay = document.createElement('div')
  overlay.id = 'intro-overlay'

  const skipBtn = document.createElement('button')
  skipBtn.id    = 'intro-skip'
  skipBtn.textContent = 'Skip →'
  overlay.appendChild(skipBtn)

  /* ── Logo row ───────────────────────────────────────────────────── */
  const logoRow = document.createElement('div')
  logoRow.id = 'intro-logo-row'

  const eight = _shape('intro-eight', _svgEight())
  const zero  = _shape('intro-zero',  _svgZero())
  const nine  = _shape('intro-nine',  _svgNine())

  eight.style.opacity   = '0'
  eight.style.transform = 'translateX(-200px) rotate(-15deg)'
  zero.style.opacity    = '0'
  zero.style.transform  = 'translateY(200px) scale(0.5)'
  nine.style.opacity    = '0'
  nine.style.transform  = 'translateX(200px) rotate(15deg)'

  logoRow.appendChild(eight)
  logoRow.appendChild(zero)
  logoRow.appendChild(nine)

  /* ── Text ───────────────────────────────────────────────────────── */
  const name    = document.createElement('div')
  name.id       = 'intro-name'
  name.textContent = 'Cloud809'

  const tagline = document.createElement('div')
  tagline.id    = 'intro-tagline'
  tagline.textContent = 'Born in DR. Built for Everyone.'

  overlay.appendChild(logoRow)
  overlay.appendChild(name)
  overlay.appendChild(tagline)
  document.body.appendChild(overlay)

  /* ── Finish / skip ──────────────────────────────────────────────── */
  let done = false
  const timers = []
  const after  = (ms, fn) => timers.push(setTimeout(fn, ms))

  const finish = (fast) => {
    if (done) return
    done = true
    timers.forEach(clearTimeout)
    const dur = fast ? 200 : 400
    overlay.style.transition = `opacity ${dur}ms ease`
    overlay.style.opacity    = '0'
    setTimeout(() => {
      overlay.remove()
      style.remove()
      localStorage.setItem(STORAGE_KEY, 'true')
    }, dur)
  }

  skipBtn.addEventListener('click', () => finish(true))

  /* ── Animation sequence ─────────────────────────────────────────── */
  // Double rAF ensures the initial (hidden) state is painted before
  // we start transitioning — prevents the shapes from flashing in place.
  requestAnimationFrame(() => requestAnimationFrame(() => {

    // 200ms — "8" flies in from left with counter-clockwise spin
    after(200, () => {
      eight.style.opacity   = '1'
      eight.style.transform = 'translateX(0) rotate(0deg)'
    })

    // 400ms — "0" rises from below, scales up
    after(400, () => {
      zero.style.opacity   = '1'
      zero.style.transform = 'translateY(0) scale(1)'
    })

    // 600ms — "9" flies in from right with clockwise spin
    after(600, () => {
      nine.style.opacity   = '1'
      nine.style.transform = 'translateX(0) rotate(0deg)'
    })

    // 1350ms — shapes merge + pink ripple + scale pulse
    after(1350, () => {
      logoRow.style.gap = '4px'
      _ripple(logoRow)
      logoRow.style.transform = 'scale(1.06)'
      after(150, () => { logoRow.style.transform = 'scale(1)' })
    })

    // 1800ms — "Cloud809" name fades up
    after(1800, () => {
      name.style.opacity   = '1'
      name.style.transform = 'translateY(0)'
    })

    // 2200ms — tagline fades in
    after(2200, () => { tagline.style.opacity = '1' })

    // 2500ms — overlay fades out, revealing the page beneath
    after(2500, () => finish(false))
  }))
}

/* ── Helpers ───────────────────────────────────────────────────────── */

function _shape(id, svg) {
  const el = document.createElement('div')
  el.id        = id
  el.className = 'intro-shape'
  el.innerHTML = svg
  return el
}

function _ripple(container) {
  const el = document.createElement('div')
  Object.assign(el.style, {
    position:     'absolute',
    top:          '50%',
    left:         '50%',
    width:        '200px',
    height:       '200px',
    marginTop:    '-100px',
    marginLeft:   '-100px',
    borderRadius: '50%',
    background:   '#FF1A6C',
    opacity:      '0.8',
    transform:    'scale(0)',
    pointerEvents:'none',
  })
  container.appendChild(el)
  void el.offsetWidth  // force reflow so transition fires from scale(0)
  el.style.transition = `transform 400ms ease-out, opacity 400ms ease-out`
  el.style.transform  = 'scale(1)'
  el.style.opacity    = '0'
  setTimeout(() => el.remove(), 450)
}

/* ── Shape SVGs ────────────────────────────────────────────────────── */

// "8" — two vertically stacked cobalt circles overlapping by 20px
// top: 60px diameter (r=30, cy=30)  bottom: 80px diameter (r=40, cy=80)
// total canvas: 80×120
function _svgEight() {
  return `<svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="40" cy="30"  r="30" fill="#1B1FBF"/>
    <circle cx="40" cy="80"  r="40" fill="#1B1FBF"/>
  </svg>`
}

// "0" — wide ellipse, 120×100
function _svgZero() {
  return `<svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="60" cy="50" rx="60" ry="50" fill="#1B1FBF"/>
  </svg>`
}

// "9" — 80px circle with a small tail curling down-right
// main circle: r=40, center (45,40)   tail: r=10, center (70,75)
function _svgNine() {
  return `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="45" cy="40"  r="40" fill="#1B1FBF"/>
    <circle cx="70" cy="75"  r="10" fill="#1B1FBF"/>
  </svg>`
}

initIntroAnimation()
