import { t } from '../translations.js'
import { openRequests } from '../mock-data.js'
import { renderRequestCard } from '../components/request-card.js'
import { showModal, closeModal } from '../components/modal.js'
import { showToast } from '../components/toast.js'
import { hasRole } from '../auth.js'

const filters = ['all', 'module', 'article', 'review', 'answer']
let _activeFilter = 'all'

function _filtered() {
  if (_activeFilter === 'all') return openRequests
  return openRequests.filter(r => r.type === _activeFilter)
}

const typeCounts = type => type === 'all' ? openRequests.length : openRequests.filter(r => r.type === type).length

export function render() {
  const filtered = _filtered()

  return `
    <div class="page requests-page">
      <div class="page-header">
        <div class="container">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
            <div>
              <h1 class="page-header__title">${t('requests.title')}</h1>
              <p class="page-header__subtitle">${t('requests.subtitle')}</p>
            </div>
            <button class="btn btn--pink" data-action="post-request">+ ${t('requests.post')}</button>
          </div>
        </div>
      </div>

      <div class="container" style="padding-top:2.5rem;padding-bottom:3rem;">
        <div class="filter-bar">
          ${filters.map(f => `
            <button class="filter-btn ${_activeFilter === f ? 'filter-btn--active' : ''}" data-filter="${f}">
              ${t('requests.filter.' + f)}
              <span style="margin-left:0.25rem;font-family:var(--font-mono);font-size:0.7rem;opacity:0.7;">${typeCounts(f)}</span>
            </button>
          `).join('')}
        </div>

        <div id="requests-list" class="requests-layout">
          ${filtered.length
            ? filtered.map(r => renderRequestCard(r)).join('')
            : `<div class="empty-state"><div class="empty-state__icon">📋</div><p class="empty-state__text">${t('requests.noResults')}</p></div>`}
        </div>
      </div>
    </div>
  `
}

export function mount() {
  const page = document.getElementById('page-container')

  page.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      _activeFilter = btn.dataset.filter
      page.querySelectorAll('[data-filter]').forEach(b =>
        b.classList.toggle('filter-btn--active', b.dataset.filter === _activeFilter))
      _rerenderList(page)
    })
  })

  page.addEventListener('click', e => {
    const action = e.target.closest('[data-action]')?.dataset.action
    if (!action) return

    if (action === 'claim-request') {
      const id = e.target.closest('[data-action]').dataset.id
      _handleClaim(id)
    }

    if (action === 'watch-request') {
      showToast({ message: t('toast.watching'), type: 'success' })
    }

    if (action === 'post-request') {
      _showPostModal()
    }
  })
}

function _rerenderList(page) {
  const list = page.querySelector('#requests-list')
  if (!list) return
  const filtered = _filtered()
  list.innerHTML = filtered.length
    ? filtered.map(r => renderRequestCard(r)).join('')
    : `<div class="empty-state"><div class="empty-state__icon">📋</div><p class="empty-state__text">${t('requests.noResults')}</p></div>`
}

function _handleClaim(id) {
  if (!hasRole('contributor')) {
    showToast({ message: t('toast.needsContributor'), type: 'error' })
    return
  }
  const req = openRequests.find(r => r.id === id)
  if (!req) return

  showModal({
    title: t('modal.claim.title'),
    body: `
      <p>${t('modal.claim.body')}</p>
      <div style="margin-top:0.875rem;padding:0.875rem;background:var(--color-cobalt-xlight);border-radius:var(--radius-md);font-size:0.875rem;">
        <strong>${req.title[window.__lang] || req.title.en}</strong>
      </div>
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
      <button class="btn btn--primary" id="mc-ok">${t('modal.confirm')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-ok')?.addEventListener('click', () => {
    closeModal()
    showToast({ message: t('toast.claimed'), type: 'success' })
  })
}

function _showPostModal() {
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
          <input class="form-input" id="req-title" type="text" />
        </div>
        <div class="form-group">
          <label class="form-label">${t('modal.newRequest.bodyLabel')}</label>
          <textarea class="form-textarea" id="req-body"></textarea>
        </div>
      </div>
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
      <button class="btn btn--primary" id="mc-ok">${t('modal.newRequest.submit')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-ok')?.addEventListener('click', () => {
    const title = document.getElementById('req-title')?.value.trim()
    if (!title) { showToast({ message: t('errors.loginRequired'), type: 'error' }); return }
    closeModal()
    showToast({ message: t('toast.requestPosted'), type: 'success' })
  })
}
