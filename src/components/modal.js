import { t } from '../translations.js'

export function showModal({ title, body, actions, wide = false }) {
  const container = document.getElementById('modal-container')
  container.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop">
      <div class="modal${wide ? ' modal--wide' : ''}" role="dialog" aria-modal="true" tabindex="-1">
        <div class="modal__header">
          <h2 class="modal__title">${title}</h2>
          <button class="modal__close" id="modal-close" aria-label="${t('modal.close')}">✕</button>
        </div>
        <div class="modal__body">${body}</div>
        ${actions ? `<div class="modal__footer">${actions}</div>` : ''}
      </div>
    </div>
  `

  const backdrop = document.getElementById('modal-backdrop')
  document.getElementById('modal-close').addEventListener('click', closeModal)
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal() })

  document.addEventListener('keydown', _escListener)

  const modal = container.querySelector('.modal')
  setTimeout(() => modal?.focus(), 50)
}

function _escListener(e) {
  if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', _escListener) }
}

export function closeModal() {
  const container = document.getElementById('modal-container')
  const modal = container.querySelector('.modal')
  const backdrop = container.querySelector('.modal-backdrop')
  if (!modal) return
  modal.style.animation = 'modal-out 180ms ease forwards'
  if (backdrop) backdrop.style.animation = 'backdrop-in 180ms ease reverse forwards'
  setTimeout(() => { container.innerHTML = '' }, 200)
  document.removeEventListener('keydown', _escListener)
}
