import { t, tl } from '../translations.js'

const typeClass = { module: 'badge--cobalt', article: 'badge--green', review: 'badge--orange', answer: 'badge--pink' }
const dotClass  = { open: 'status-dot--open', claimed: 'status-dot--claimed', completed: 'status-dot--completed' }

export function renderRequestCard(request) {
  const title = tl(request.title)
  const desc  = tl(request.description)
  const isClaimed = request.status === 'claimed'
  const isDone    = request.status === 'completed'

  return `
    <div class="request-card" data-request-id="${request.id}">
      <div class="request-card__header">
        <span class="badge ${typeClass[request.type] || 'badge--gray'}">${t('requests.type.' + request.type)}</span>
        <span class="badge badge--gray">
          <span class="status-dot ${dotClass[request.status] || ''}"></span>
          ${t('requests.status.' + request.status)}
        </span>
      </div>
      <h3 class="request-card__title">${title}</h3>
      <p class="request-card__desc">${desc}</p>
      <div class="request-card__footer">
        <div class="request-card__meta">
          <span class="request-card__watchers">👁 ${request.watchers} ${t('requests.watchers')}</span>
          <span class="text-xs text-muted">${t('requests.postedBy')} ${request.postedBy.name}</span>
          ${isClaimed && request.claimedBy
            ? `<span class="request-card__claimer">
                <span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;color:var(--color-cobalt)">
                  <span style="width:18px;height:18px;border-radius:50%;background:var(--color-cobalt);color:#fff;font-size:0.5rem;font-weight:700;display:inline-flex;align-items:center;justify-content:center;">${request.claimedBy.avatar}</span>
                  ${request.claimedBy.name}
                </span>
               </span>`
            : ''}
        </div>
        <div class="request-card__actions">
          ${!isClaimed && !isDone
            ? `<button class="btn btn--primary btn--sm" data-action="claim-request" data-id="${request.id}">${t('requests.claim')}</button>`
            : ''}
          <button class="btn btn--ghost btn--sm" data-action="watch-request" data-id="${request.id}">
            👁 ${t('requests.watch')}
          </button>
        </div>
      </div>
    </div>
  `
}
