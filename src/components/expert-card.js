import { t, tl } from '../translations.js'

export function renderExpertCard(slot) {
  if (!slot.filled || !slot.expert) {
    return `
      <div class="expert-card expert-card--open" data-area="${slot.area}">
        <div class="expert-card__icon">${slot.icon}</div>
        <div class="expert-card__area">${window.__lang === 'es' ? slot.areaEs : slot.area}</div>
        <p class="expert-card__open-label">${t('experts.openSlot')}</p>
        <div class="expert-card__actions">
          <button class="btn btn--pink btn--sm" data-action="claim-expert-slot" data-area="${slot.area}">
            ${t('experts.claim')}
          </button>
        </div>
      </div>
    `
  }

  const ex = slot.expert
  const bio = tl(ex.bio)

  return `
    <div class="expert-card" data-expert-id="${ex.id}">
      <div class="expert-card__icon">${slot.icon}</div>
      <div class="expert-card__avatar">${ex.avatar}</div>
      <div class="expert-card__name">${ex.name}</div>
      <div class="expert-card__area">${window.__lang === 'es' ? slot.areaEs : slot.area}</div>
      <p class="expert-card__bio">${bio}</p>
      <div class="expert-card__stats">
        <div class="expert-card__stat">
          <strong>${ex.articles}</strong>
          <span>${t('experts.articles')}</span>
        </div>
        <div class="expert-card__stat">
          <strong>${ex.courses}</strong>
          <span>${t('experts.courses')}</span>
        </div>
      </div>
      <div class="expert-card__actions">
        <button class="btn btn--outline btn--sm" data-action="contact-expert" data-id="${ex.id}" data-name="${ex.name}">
          ${t('experts.contact')}
        </button>
      </div>
    </div>
  `
}
