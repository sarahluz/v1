import { _highlightActive } from './components/nav.js'

const routes = {
  '/':          () => import('./pages/home.js'),
  '/courses':   () => import('./pages/courses.js'),
  '/kb':        () => import('./pages/kb.js'),
  '/experts':   () => import('./pages/experts.js'),
  '/requests':  () => import('./pages/requests.js'),
  '/community': () => import('./pages/community.js'),
  '/admin':     () => import('./pages/admin.js'),
}

let _currentPath = null

async function _navigate(path) {
  const container = document.getElementById('page-container')
  if (!container) return

  // Animate out
  container.style.opacity = '0'
  container.style.transform = 'translateY(8px)'

  await _sleep(140)

  const loader = routes[path] || routes['/']
  let page
  try {
    page = await loader()
  } catch (err) {
    console.error('Failed to load page:', path, err)
    container.innerHTML = `<div class="container" style="padding:4rem 0;text-align:center;"><h2>Something went wrong loading this page.</h2></div>`
    container.style.opacity = '1'
    container.style.transform = ''
    return
  }

  container.innerHTML = page.render()

  // Animate in
  container.style.opacity = '1'
  container.style.transform = 'translateY(0)'

  if (page.mount) page.mount()

  _currentPath = path
  _highlightActive()

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function _getPath() {
  const hash = window.location.hash.slice(1) || '/'
  return hash.split('?')[0] // strip query params
}

function _sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

export function initRouter() {
  // CSS for page transition
  const container = document.getElementById('page-container')
  if (container) {
    container.style.transition = 'opacity 140ms ease, transform 140ms ease'
  }

  window.addEventListener('hashchange', () => {
    _navigate(_getPath())
  })

  // Re-render on language or user change
  window.addEventListener('cloud809:langchange', () => {
    _navigate(_getPath())
  })
  window.addEventListener('cloud809:userchange', () => {
    _navigate(_getPath())
  })

  // Initial render
  _navigate(_getPath())
}
