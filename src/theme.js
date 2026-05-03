const THEME_KEY = 'cloud809_theme'

export function detectTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'dark' || stored === 'light') {
    _apply(stored)
    return
  }
  // Respect OS preference on first visit
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  _apply(prefersDark ? 'dark' : 'light')
}

export function toggleTheme() {
  const next = (window.__theme || 'light') === 'dark' ? 'light' : 'dark'
  _apply(next)
  localStorage.setItem(THEME_KEY, next)
  return next
}

export function getTheme() {
  return window.__theme || 'light'
}

function _apply(theme) {
  document.documentElement.dataset.theme = theme
  window.__theme = theme
}
