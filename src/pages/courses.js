import { t } from '../translations.js'
import { courses } from '../mock-data.js'
import { renderCourseCard } from '../components/course-card.js'
import { showModal, closeModal } from '../components/modal.js'
import { showToast } from '../components/toast.js'
import { hasRole } from '../auth.js'

let _activeFilter = 'all'

export function render() {
  const filters = ['all', 'beginner', 'intermediate', 'advanced']
  const filtered = _activeFilter === 'all' ? courses : courses.filter(c => c.level === _activeFilter)

  return `
    <div class="page courses-page">
      <div class="page-header">
        <div class="container">
          <h1 class="page-header__title">${t('courses.title')}</h1>
          <p class="page-header__subtitle">${t('courses.subtitle')}</p>
        </div>
      </div>

      <div class="container" style="padding-top:2.5rem;padding-bottom:3rem;">
        <div class="filter-bar">
          <div class="filter-bar__search">
            <span class="filter-bar__search-icon">🔍</span>
            <input class="filter-bar__input" id="course-search" type="search" placeholder="${t('kb.search').replace('articles', 'courses').replace('artículos', 'cursos')}" />
          </div>
          ${filters.map(f => `
            <button class="filter-btn ${_activeFilter === f ? 'filter-btn--active' : ''}" data-filter="${f}">
              ${t('courses.filter.' + f)}
            </button>
          `).join('')}
          <button class="btn btn--pink btn--sm" data-action="request-module" style="margin-left:auto;">
            + ${t('courses.requestModule')}
          </button>
        </div>

        <div id="courses-grid" class="courses-grid">
          ${filtered.length
            ? filtered.map(c => renderCourseCard(c)).join('')
            : `<div class="empty-state"><div class="empty-state__icon">📭</div><p class="empty-state__text">${t('courses.noResults')}</p></div>`}
        </div>
      </div>
    </div>
  `
}

export function mount() {
  const page = document.getElementById('page-container')

  // Filter buttons
  page.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      _activeFilter = btn.dataset.filter
      page.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('filter-btn--active', b.dataset.filter === _activeFilter))
      _rerenderGrid(page)
    })
  })

  // Search
  page.querySelector('#course-search')?.addEventListener('input', e => {
    _rerenderGrid(page, e.target.value.toLowerCase())
  })

  // Card actions
  page.addEventListener('click', e => {
    const action = e.target.closest('[data-action]')?.dataset.action
    if (!action) return

    if (action === 'watch-course') {
      const btn = e.target.closest('[data-action]')
      const ytId = btn.dataset.yt
      _showWatchModal(ytId)
    }

    if (action === 'contribute-course') {
      _showContributeModal()
    }

    if (action === 'request-module') {
      _showRequestModuleModal()
    }
  })
}

function _rerenderGrid(page, search = '') {
  const filtered = courses.filter(c => {
    const matchLevel = _activeFilter === 'all' || c.level === _activeFilter
    const titleEn = c.title.en.toLowerCase()
    const titleEs = c.title.es.toLowerCase()
    const matchSearch = !search || titleEn.includes(search) || titleEs.includes(search) ||
      c.tags.some(tag => tag.includes(search))
    return matchLevel && matchSearch
  })
  const grid = page.querySelector('#courses-grid')
  if (!grid) return
  grid.innerHTML = filtered.length
    ? filtered.map(c => renderCourseCard(c)).join('')
    : `<div class="empty-state"><div class="empty-state__icon">📭</div><p class="empty-state__text">${t('courses.noResults')}</p></div>`
}

function _showWatchModal(ytId) {
  if (!ytId) {
    showModal({
      title: t('modal.comingSoon.title'),
      body: `<p>${t('modal.comingSoon.body')}</p>`,
      actions: `<button class="btn btn--outline" id="mc">${t('modal.close')}</button>`,
    })
    document.getElementById('mc')?.addEventListener('click', closeModal)
    return
  }
  showModal({
    title: t('modal.watchCourse.title'),
    body: `
      <p>${t('modal.watchCourse.body')}</p>
      <div style="margin-top:1rem;aspect-ratio:16/9;border-radius:var(--radius-md);overflow:hidden;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytId}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.close')}</button>
      <a class="btn btn--primary" href="https://www.youtube.com/watch?v=${ytId}" target="_blank" rel="noopener">
        ${t('modal.watchCourse.openYoutube')} ↗
      </a>
    `,
    wide: true,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
}

function _showContributeModal() {
  if (!hasRole('contributor')) {
    showToast({ message: t('toast.needsContributor'), type: 'error' })
    return
  }
  showModal({
    title: t('modal.comingSoon.title'),
    body: `<p>${t('modal.comingSoon.body')}</p>`,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.close')}</button>
      <button class="btn btn--primary" id="mc-requests">${t('requests.post')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-requests')?.addEventListener('click', () => { closeModal(); window.location.hash = '#/requests' })
}

function _showRequestModuleModal() {
  if (!hasRole('contributor')) {
    showToast({ message: t('toast.needsContributor'), type: 'error' })
    return
  }
  showModal({
    title: t('modal.newRequest.title'),
    body: `
      <div class="modal__form">
        <div class="form-group">
          <label class="form-label">${t('modal.newRequest.typeLabel')}</label>
          <select class="form-select" id="req-type">
            <option value="module">${t('requests.type.module')}</option>
            <option value="article">${t('requests.type.article')}</option>
            <option value="review">${t('requests.type.review')}</option>
            <option value="answer">${t('requests.type.answer')}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">${t('modal.newRequest.titleLabel')}</label>
          <input class="form-input" id="req-title" type="text" placeholder="${t('modal.newRequest.titleLabel')}" />
        </div>
        <div class="form-group">
          <label class="form-label">${t('modal.newRequest.bodyLabel')}</label>
          <textarea class="form-textarea" id="req-body" placeholder="${t('modal.newRequest.bodyLabel')}"></textarea>
        </div>
      </div>
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
      <button class="btn btn--primary" id="mc-submit">${t('modal.newRequest.submit')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-submit')?.addEventListener('click', () => {
    const title = document.getElementById('req-title')?.value.trim()
    if (!title) { showToast({ message: t('errors.loginRequired'), type: 'error' }); return }
    closeModal()
    showToast({ message: t('toast.requestPosted'), type: 'success' })
  })
}
