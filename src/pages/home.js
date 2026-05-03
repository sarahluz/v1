import { t, tl } from '../translations.js'
import { activityFeed, openRequests, courses, communityStats } from '../mock-data.js'
import { renderCourseCard } from '../components/course-card.js'
import { renderRequestCard } from '../components/request-card.js'
import { showModal, closeModal } from '../components/modal.js'
import { showToast } from '../components/toast.js'
import { hasRole } from '../auth.js'

export function render() {
  return `
    <div class="page home-page">

      <!-- Hero -->
      <section class="hero">
        <div class="container">
          <div class="hero__content">
            <h1 class="hero__title">${t('home.hero.tagline').replace('\n', '\n')}</h1>
            <p class="hero__subtitle">${t('home.hero.subtitle')}</p>
            <div class="hero__cta">
              <button class="btn btn--pink btn--lg" data-action="hero-explore">
                ${t('home.hero.cta')}
              </button>
              <button class="btn btn--outline-white btn--lg" data-action="hero-contribute">
                ${t('home.hero.contribute')}
              </button>
            </div>
          </div>
          <div class="hero__visual">
            <div class="hero__visual-inner">
              <div class="hero__globe-ring"></div>
              <div class="hero__globe-ring-2"></div>
              <div class="hero__center-logo">
                <img src="${import.meta.env.BASE_URL}logo.png" alt="" class="logo-img hero__logo-img" aria-hidden="true" />
              </div>
              <div class="hero__flag-dots">
                <span class="hero__dot"></span>
                <span class="hero__dot"></span>
                <span class="hero__dot"></span>
                <span class="hero__dot"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Community Pulse -->
      <section class="pulse">
        <div class="container">
          <div class="pulse__stats">
            ${communityStats.map(s => `
              <div class="pulse__stat">
                <span class="pulse__number">${s.value}</span>
                <span class="pulse__label">${t(s.key)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Activity + Requests -->
      <section class="home-grid">
        <div class="container">
          <div class="home-grid__layout">
            <div class="home-grid__feed">
              <h2 class="section-title">${t('home.activity.title')}</h2>
              <div class="activity-feed">
                ${activityFeed.map(item => `
                  <div class="activity-item">
                    <div class="activity-item__avatar">${item.avatar}</div>
                    <div class="activity-item__content">
                      <p class="activity-item__text">
                        <strong>${item.name}</strong> ${tl(item.event)}
                      </p>
                      <time class="activity-item__time">${tl(item.time)}</time>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="home-grid__requests">
              <div class="section-header">
                <h2 class="section-title">${t('home.requests.title')}</h2>
              </div>
              ${openRequests.slice(0, 3).map(r => renderRequestCard(r)).join('')}
              <a class="btn btn--outline btn--full" style="margin-top:1rem;" data-route="/requests" href="#/requests">
                ${t('home.requests.viewAll')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Courses -->
      <section class="featured-courses">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${t('home.courses.title')}</h2>
            <a class="btn btn--ghost" data-route="/courses" href="#/courses">${t('home.courses.viewAll')}</a>
          </div>
          <div class="courses-grid">
            ${courses.slice(0, 3).map(c => renderCourseCard(c)).join('')}
          </div>
        </div>
      </section>

      <!-- Footer tagline -->
      <footer style="background:var(--color-cobalt);color:rgba(255,255,255,0.5);text-align:center;padding:2rem 1rem;font-size:0.875rem;">
        <p style="color:rgba(255,255,255,0.9);font-family:var(--font-display);font-size:1.125rem;margin-bottom:0.5rem;">
          ${t('general.tagline')}
        </p>
        <p>Cloud809 · Non-profit · Open Source · ${t('admin.managedBy')} the community</p>
      </footer>
    </div>
  `
}

export function mount() {
  const page = document.getElementById('page-container')

  page.addEventListener('click', e => {
    const action = e.target.closest('[data-action]')?.dataset.action
    if (!action) return

    if (action === 'hero-explore') {
      window.location.hash = '#/courses'
    }

    if (action === 'hero-contribute') {
      if (!hasRole('contributor')) {
        showModal({
          title: t('modal.contribute.title'),
          body: `<p>${t('modal.contribute.learnerBody')}</p>`,
          actions: `<button class="btn btn--primary" onclick="import('/src/components/modal.js').then(m=>m.closeModal())">${t('modal.close')}</button>`,
        })
      } else {
        window.location.hash = '#/requests'
      }
    }

    if (action === 'claim-request') {
      const id = e.target.closest('[data-action]').dataset.id
      _handleClaimRequest(id)
    }

    if (action === 'watch-request') {
      showToast({ message: t('toast.watching'), type: 'success' })
    }

    if (action === 'watch-course') {
      const btn = e.target.closest('[data-action]')
      const ytId = btn.dataset.yt
      _handleWatchCourse(ytId)
    }

    if (action === 'contribute-course') {
      if (!hasRole('contributor')) {
        showToast({ message: t('toast.needsContributor'), type: 'error' })
      } else {
        showModal({
          title: t('modal.comingSoon.title'),
          body: `<p>${t('modal.comingSoon.body')}</p>`,
          actions: `<button class="btn btn--outline" data-modal-close>${t('modal.close')}</button>
                    <button class="btn btn--primary" data-modal-goto-requests>${t('requests.post')}</button>`,
        })
        document.querySelector('[data-modal-close]')?.addEventListener('click', closeModal)
        document.querySelector('[data-modal-goto-requests]')?.addEventListener('click', () => {
          closeModal(); window.location.hash = '#/requests'
        })
      }
    }
  })
}

function _handleClaimRequest(id) {
  if (!hasRole('contributor')) {
    showToast({ message: t('toast.needsContributor'), type: 'error' })
    return
  }
  showModal({
    title: t('modal.claim.title'),
    body: `<p>${t('modal.claim.body')}</p>`,
    actions: `
      <button class="btn btn--outline" id="modal-cancel">${t('modal.cancel')}</button>
      <button class="btn btn--primary" id="modal-confirm">${t('modal.confirm')}</button>
    `,
  })
  document.getElementById('modal-cancel')?.addEventListener('click', closeModal)
  document.getElementById('modal-confirm')?.addEventListener('click', () => {
    closeModal()
    showToast({ message: t('toast.claimed'), type: 'success' })
  })
}

function _handleWatchCourse(ytId) {
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
