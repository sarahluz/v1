import { t, setLanguage } from '../translations.js'
import { getCurrentUser, getMockUsers, setCurrentUser } from '../auth.js'
import { toggleTheme, getTheme } from '../theme.js'

export function renderNav() {
  const user = getCurrentUser()
  const lang = window.__lang || 'en'

  return `
    <nav class="nav">
      <div class="nav__inner">
        <a class="nav__logo" data-route="/" href="#/">
          <img src="${import.meta.env.BASE_URL}logo.png" alt="Cloud809" class="logo-img" />
          <span class="nav__brand">Cloud809</span>
        </a>

        <button class="nav__hamburger" id="nav-hamburger" aria-label="${t('nav.menu')}" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>

        <div class="nav__links" id="nav-links">
          <a class="nav__link" data-route="/" href="#/">${t('nav.home')}</a>
          <a class="nav__link" data-route="/courses" href="#/courses">${t('nav.courses')}</a>
          <a class="nav__link" data-route="/kb" href="#/kb">${t('nav.kb')}</a>
          <a class="nav__link" data-route="/experts" href="#/experts">${t('nav.experts')}</a>
          <a class="nav__link" data-route="/requests" href="#/requests">${t('nav.requests')}</a>
          <a class="nav__link" data-route="/community" href="#/community">${t('nav.community')}</a>
          ${user.role === 'admin' ? `<a class="nav__link nav__link--admin" data-route="/admin" href="#/admin">${t('nav.admin')}</a>` : ''}
        </div>

        <div class="nav__actions">
          <button class="nav__lang-toggle" id="lang-toggle" title="Switch language">${t('nav.languageToggle')}</button>
          <button class="nav__theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
            ${getTheme() === 'dark' ? _sunIcon() : _moonIcon()}
          </button>
          <div class="nav__user">
            <button class="nav__avatar-btn" id="user-menu-btn" aria-label="${user.name}" aria-expanded="false" aria-haspopup="true">
              ${user.avatar}
            </button>
            <div class="nav__user-dropdown" id="user-dropdown" hidden>
              <div class="nav__user-info">
                <strong>${user.name}</strong>
                <span class="badge badge--role badge--${user.role}">${t('roles.' + user.role)}</span>
              </div>
              <hr />
              <p class="nav__dropdown-label">${t('roles.switchTo')}</p>
              ${getMockUsers().map(u => `
                <button class="nav__role-btn ${u.id === user.id ? 'nav__role-btn--active' : ''}" data-switch-user="${u.id}">
                  <span class="nav__role-btn-avatar">${u.avatar}</span>
                  <span>${u.name}</span>
                  <span class="badge badge--role badge--${u.role}">${t('roles.' + u.role)}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
}

export function mountNav() {
  // Language toggle
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    const newLang = (window.__lang || 'en') === 'en' ? 'es' : 'en'
    setLanguage(newLang)
    _refresh()
    window.dispatchEvent(new CustomEvent('cloud809:langchange'))
  })

  // Theme toggle — swap icon in-place, no full nav re-render needed
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = toggleTheme()
    const btn = document.getElementById('theme-toggle')
    if (btn) {
      btn.innerHTML = next === 'dark' ? _sunIcon() : _moonIcon()
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
    }
  })

  // Hamburger
  const hamburger = document.getElementById('nav-hamburger')
  const links = document.getElementById('nav-links')
  hamburger?.addEventListener('click', () => {
    const open = links.classList.toggle('nav__links--open')
    hamburger.setAttribute('aria-expanded', String(open))
  })

  // Close mobile menu on link click
  links?.querySelectorAll('.nav__link').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('nav__links--open')
      hamburger?.setAttribute('aria-expanded', 'false')
    })
  })

  // User dropdown toggle
  const userBtn = document.getElementById('user-menu-btn')
  const dropdown = document.getElementById('user-dropdown')
  userBtn?.addEventListener('click', e => {
    e.stopPropagation()
    const hidden = dropdown.hidden
    dropdown.hidden = !hidden
    userBtn.setAttribute('aria-expanded', String(hidden))
  })

  document.addEventListener('click', _closeDropdown)

  // Role switcher
  document.querySelectorAll('[data-switch-user]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      const userId = btn.dataset.switchUser
      setCurrentUser(userId)
      _refresh()
      window.dispatchEvent(new CustomEvent('cloud809:userchange'))
      import('../components/toast.js').then(({ showToast }) => {
        showToast({ message: t('toast.roleChanged'), type: 'success' })
      })
    })
  })

  _highlightActive()
}

function _closeDropdown() {
  const d = document.getElementById('user-dropdown')
  if (d) d.hidden = true
  document.getElementById('user-menu-btn')?.setAttribute('aria-expanded', 'false')
}

function _refresh() {
  document.getElementById('nav-container').innerHTML = renderNav()
  mountNav()
}

export function _highlightActive() {
  const hash = window.location.hash.slice(1) || '/'
  document.querySelectorAll('.nav__link').forEach(a => {
    const route = a.dataset.route
    const active = hash === route || (route !== '/' && hash.startsWith(route))
    a.classList.toggle('nav__link--active', active)
  })
}

function _moonIcon() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M6 1.5A6.5 6.5 0 1 0 14.5 10 5 5 0 0 1 6 1.5z"/>
  </svg>`
}

function _sunIcon() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
    <circle cx="8" cy="8" r="2.8"/>
    <line x1="8" y1="1"   x2="8" y2="3"/>
    <line x1="8" y1="13"  x2="8" y2="15"/>
    <line x1="1" y1="8"   x2="3" y2="8"/>
    <line x1="13" y1="8"  x2="15" y2="8"/>
    <line x1="3.05" y1="3.05" x2="4.46" y2="4.46"/>
    <line x1="11.54" y1="11.54" x2="12.95" y2="12.95"/>
    <line x1="3.05" y1="12.95" x2="4.46" y2="11.54"/>
    <line x1="11.54" y1="4.46" x2="12.95" y2="3.05"/>
  </svg>`
}

