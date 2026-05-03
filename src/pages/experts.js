import { t } from '../translations.js'
import { expertSlots } from '../mock-data.js'
import { renderExpertCard } from '../components/expert-card.js'
import { showModal, closeModal } from '../components/modal.js'
import { showToast } from '../components/toast.js'
import { hasRole } from '../auth.js'

const openCount = expertSlots.filter(s => !s.filled).length
const filledCount = expertSlots.filter(s => s.filled).length

export function render() {
  return `
    <div class="page experts-page">
      <div class="page-header">
        <div class="container">
          <h1 class="page-header__title">${t('experts.title')}</h1>
          <p class="page-header__subtitle">${t('experts.subtitle')}</p>
          <div style="display:flex;gap:1.5rem;margin-top:1.25rem;flex-wrap:wrap;">
            <div style="color:rgba(255,255,255,0.9);font-size:0.9rem;">
              <strong style="font-family:var(--font-display);font-size:1.75rem;">${filledCount}</strong>
              <span style="display:block;font-size:0.8rem;opacity:0.7;text-transform:uppercase;letter-spacing:0.06em;">${t('home.pulse.experts')}</span>
            </div>
            <div style="color:rgba(255,255,255,0.9);font-size:0.9rem;">
              <strong style="font-family:var(--font-display);font-size:1.75rem;color:var(--color-pink);">${openCount}</strong>
              <span style="display:block;font-size:0.8rem;opacity:0.7;text-transform:uppercase;letter-spacing:0.06em;">Open Slots</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container" style="padding-top:2.5rem;padding-bottom:3rem;">
        <div style="margin-bottom:1.5rem;">
          <p style="color:var(--color-text-muted);font-size:0.9375rem;max-width:65ch;">
            ${window.__lang === 'es'
              ? `Experts son voluntarios que lideran un área tecnológica: mantienen artículos, verifican el conocimiento y co-escriben cursos. Los puestos abiertos pueden ser reclamados por contribuidores con experiencia.`
              : `Experts are volunteers who lead a tech area: they maintain articles, verify knowledge, and co-author courses. Open slots can be claimed by contributors with relevant experience.`}
          </p>
        </div>

        <div class="experts-grid">
          ${expertSlots.map(slot => renderExpertCard(slot)).join('')}
        </div>
      </div>
    </div>
  `
}

export function mount() {
  const page = document.getElementById('page-container')

  page.addEventListener('click', e => {
    const action = e.target.closest('[data-action]')?.dataset.action
    if (!action) return

    if (action === 'claim-expert-slot') {
      const area = e.target.closest('[data-action]').dataset.area
      _handleClaimSlot(area)
    }

    if (action === 'contact-expert') {
      const btn = e.target.closest('[data-action]')
      _handleContact(btn.dataset.name)
    }
  })
}

function _handleClaimSlot(area) {
  if (!hasRole('contributor')) {
    showToast({ message: t('toast.needsContributor'), type: 'error' })
    return
  }
  showModal({
    title: t('modal.claimExpert.title'),
    body: `
      <p>${t('modal.claimExpert.body')}</p>
      <div style="margin-top:1rem;padding:1rem;background:var(--color-cobalt-xlight);border-radius:var(--radius-md);font-size:0.875rem;">
        <strong>${t('experts.area')}:</strong> ${area}
      </div>
      <div class="modal__form" style="margin-top:1rem;">
        <div class="form-group">
          <label class="form-label">
            ${window.__lang === 'es' ? '¿Por qué eres el candidato ideal?' : 'Why are you the right candidate?'}
          </label>
          <textarea class="form-textarea" id="expert-bio" placeholder="${window.__lang === 'es' ? 'Tu experiencia en esta área...' : 'Your experience in this area...'}"></textarea>
        </div>
      </div>
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
      <button class="btn btn--pink" id="mc-ok">${t('modal.confirm')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-ok')?.addEventListener('click', () => {
    closeModal()
    showToast({ message: t('toast.submitted'), type: 'success' })
  })
}

function _handleContact(name) {
  showModal({
    title: `${t('experts.contact')}: ${name}`,
    body: `
      <p>${window.__lang === 'es'
        ? `Los mensajes directos a expertos están llegando próximamente. Por ahora, puedes mencionar a ${name} en un hilo de Comunidad.`
        : `Direct expert messaging is coming soon. For now, you can mention ${name} in a Community thread.`}
      </p>
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.close')}</button>
      <button class="btn btn--primary" id="mc-community">${t('nav.community')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-community')?.addEventListener('click', () => { closeModal(); window.location.hash = '#/community' })
}
