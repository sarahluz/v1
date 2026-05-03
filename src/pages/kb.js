import { t, tl } from '../translations.js'
import { kbArticles } from '../mock-data.js'
import { renderKBArticle } from '../components/kb-article.js'
import { showModal, closeModal } from '../components/modal.js'
import { showToast } from '../components/toast.js'
import { hasRole } from '../auth.js'

const categories = ['all', 'webdev', 'devops', 'data', 'tools', 'design', 'career']
let _activeCategory = 'all'
let _searchQuery = ''

function _countByCategory(cat) {
  if (cat === 'all') return kbArticles.length
  return kbArticles.filter(a => a.category === cat).length
}

function _filtered() {
  return kbArticles.filter(a => {
    const matchCat = _activeCategory === 'all' || a.category === _activeCategory
    const q = _searchQuery.toLowerCase()
    const matchSearch = !q ||
      a.title.en.toLowerCase().includes(q) ||
      a.title.es.toLowerCase().includes(q) ||
      a.tags.some(tag => tag.includes(q))
    return matchCat && matchSearch
  })
}

export function render() {
  const filtered = _filtered()

  return `
    <div class="page kb-page">
      <div class="page-header">
        <div class="container">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
            <div>
              <h1 class="page-header__title">${t('kb.title')}</h1>
              <p class="page-header__subtitle">${t('kb.subtitle')}</p>
            </div>
            <button class="btn btn--pink" data-action="propose-article">+ ${t('kb.newArticle')}</button>
          </div>
        </div>
      </div>

      <div class="container" style="padding-top:2.5rem;padding-bottom:3rem;">
        <div class="filter-bar" style="margin-bottom:2rem;">
          <div class="filter-bar__search">
            <span class="filter-bar__search-icon">🔍</span>
            <input class="filter-bar__input" id="kb-search" type="search" placeholder="${t('kb.search')}" value="${_searchQuery}" />
          </div>
        </div>

        <div class="kb-grid">
          <!-- Sidebar categories -->
          <aside class="kb-sidebar">
            <p class="kb-sidebar-title">${t('kb.category.all')}</p>
            ${categories.map(cat => `
              <button class="kb-cat-btn ${_activeCategory === cat ? 'kb-cat-btn--active' : ''}" data-category="${cat}">
                ${_catIcon(cat)} ${t('kb.category.' + cat)}
                <span class="count">${_countByCategory(cat)}</span>
              </button>
            `).join('')}
          </aside>

          <!-- Articles list -->
          <div class="kb-articles-list" id="kb-articles-list">
            ${filtered.length
              ? filtered.map(a => renderKBArticle(a)).join('')
              : `<div class="empty-state"><div class="empty-state__icon">📄</div><p class="empty-state__text">${t('kb.noResults')}</p></div>`}
          </div>
        </div>
      </div>
    </div>
  `
}

export function mount() {
  const page = document.getElementById('page-container')

  // Category sidebar
  page.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      _activeCategory = btn.dataset.category
      page.querySelectorAll('[data-category]').forEach(b =>
        b.classList.toggle('kb-cat-btn--active', b.dataset.category === _activeCategory))
      _rerenderList(page)
    })
  })

  // Search
  page.querySelector('#kb-search')?.addEventListener('input', e => {
    _searchQuery = e.target.value
    _rerenderList(page)
  })

  // Article actions
  page.addEventListener('click', e => {
    const action = e.target.closest('[data-action]')?.dataset.action
    if (!action) return

    if (action === 'read-article') {
      const btn = e.target.closest('[data-action]')
      const id = btn.dataset.id
      const title = btn.dataset.title
      _showReadModal(id, title)
    }

    if (action === 'claim-article') {
      const btn = e.target.closest('[data-action]')
      _handleClaim(btn.dataset.id)
    }

    if (action === 'propose-article') {
      _showProposeModal()
    }
  })
}

function _rerenderList(page) {
  const list = page.querySelector('#kb-articles-list')
  if (!list) return
  const filtered = _filtered()
  list.innerHTML = filtered.length
    ? filtered.map(a => renderKBArticle(a)).join('')
    : `<div class="empty-state"><div class="empty-state__icon">📄</div><p class="empty-state__text">${t('kb.noResults')}</p></div>`
}

function _showReadModal(id, title) {
  const article = kbArticles.find(a => a.id === id)
  if (!article) return
  const content = tl(article.content)
  const summary = tl(article.summary)
  showModal({
    title,
    body: `
      <p style="margin-bottom:0.75rem;">${t('modal.readArticle.comingSoonNote')}</p>
      <p style="font-style:italic;color:var(--color-text-muted);margin-bottom:1rem;">${summary}</p>
      <p style="color:var(--color-text-muted);font-size:0.875rem;border-left:3px solid var(--color-cobalt-xlight);padding-left:0.875rem;">${content}</p>
      ${article.tags.length ? `<div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:0.4rem;">${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
    `,
    actions: `<button class="btn btn--outline" id="mc">${t('modal.close')}</button>`,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
}

function _handleClaim(id) {
  if (!hasRole('contributor')) {
    showToast({ message: t('toast.needsContributor'), type: 'error' })
    return
  }
  showModal({
    title: t('modal.claim.title'),
    body: `<p>${t('modal.claim.body')}</p>`,
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

function _showProposeModal() {
  if (!hasRole('contributor')) {
    showToast({ message: t('toast.needsContributor'), type: 'error' })
    return
  }
  showModal({
    title: t('modal.newArticle.title'),
    body: `
      <p style="margin-bottom:1rem;">${t('modal.newArticle.body')}</p>
      <div class="modal__form">
        <div class="form-group">
          <label class="form-label">${t('modal.newArticle.titleLabel')}</label>
          <input class="form-input" id="art-title" type="text" placeholder="${t('modal.newArticle.titleLabel')}" />
        </div>
        <div class="form-group">
          <label class="form-label">${t('kb.category.all')}</label>
          <select class="form-select" id="art-cat">
            ${['webdev','devops','data','tools','design','career'].map(c =>
              `<option value="${c}">${t('kb.category.' + c)}</option>`
            ).join('')}
          </select>
        </div>
      </div>
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
      <button class="btn btn--primary" id="mc-ok">${t('modal.newArticle.submit')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-ok')?.addEventListener('click', () => {
    const title = document.getElementById('art-title')?.value.trim()
    if (!title) return
    closeModal()
    showToast({ message: t('toast.articleProposed'), type: 'success' })
  })
}

function _catIcon(cat) {
  const icons = { all: '📚', webdev: '🌐', devops: '🚀', data: '📊', tools: '🔧', design: '🎨', career: '💼' }
  return icons[cat] || '📄'
}
