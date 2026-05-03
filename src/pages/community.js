import { t, tl } from '../translations.js'
import { communityThreads, expertSlots } from '../mock-data.js'
import { showModal, closeModal } from '../components/modal.js'
import { showToast } from '../components/toast.js'
import { hasRole } from '../auth.js'

export function render() {
  const lang = window.__lang || 'en'
  const hotThreads = communityThreads.filter(t => t.hot)
  const allThreads = [...communityThreads].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))

  return `
    <div class="page community-page">
      <div class="page-header">
        <div class="container">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
            <div>
              <h1 class="page-header__title">${t('community.title')}</h1>
              <p class="page-header__subtitle">${t('community.subtitle')}</p>
            </div>
            <button class="btn btn--pink" data-action="new-thread">+ ${t('community.newThread')}</button>
          </div>
        </div>
      </div>

      <div class="container" style="padding-top:2.5rem;padding-bottom:3rem;">
        <div class="community-layout">
          <!-- Thread list -->
          <div>
            <h2 class="section-title">${t('community.latestThreads')}</h2>
            <div class="threads-list" id="threads-list">
              ${allThreads.map(thread => _renderThread(thread)).join('')}
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="community-sidebar">
            <!-- Hot threads -->
            <div class="community-sidebar-card">
              <p class="community-sidebar-card__title">🔥 Hot Discussions</p>
              ${hotThreads.map(th => `
                <div style="padding:0.5rem 0;border-bottom:1px solid var(--color-border);">
                  <p style="font-size:0.875rem;font-weight:500;line-height:1.35;">${tl(th.title)}</p>
                  <p style="font-size:0.75rem;color:var(--color-text-muted);margin-top:0.2rem;">
                    ${th.replies} ${t('community.replies')} · ${th.views} ${t('community.views')}
                  </p>
                </div>
              `).join('')}
            </div>

            <!-- Active experts -->
            <div class="community-sidebar-card">
              <p class="community-sidebar-card__title">⭐ Active Experts</p>
              ${expertSlots.filter(s => s.filled).map(s => `
                <div style="display:flex;align-items:center;gap:0.625rem;padding:0.5rem 0;border-bottom:1px solid var(--color-border);">
                  <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--color-cobalt),var(--color-cobalt-light));color:#fff;font-size:0.625rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    ${s.expert.avatar}
                  </div>
                  <div>
                    <div style="font-size:0.875rem;font-weight:500;">${s.expert.name}</div>
                    <div style="font-size:0.75rem;color:var(--color-cobalt);">${window.__lang === 'es' ? s.areaEs : s.area}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Ask a question CTA -->
            <div class="community-sidebar-card" style="text-align:center;">
              <p style="font-size:0.9375rem;font-weight:600;margin-bottom:0.5rem;">${t('community.askQuestion')}</p>
              <p style="font-size:0.8125rem;color:var(--color-text-muted);margin-bottom:1rem;">
                ${lang === 'es' ? 'La comunidad y los expertos están listos para responder.' : 'The community and experts are ready to answer.'}
              </p>
              <button class="btn btn--primary btn--full" data-action="new-thread">${t('community.newThread')}</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `
}

function _renderThread(thread) {
  const title = tl(thread.title)
  const body  = tl(thread.body)

  return `
    <div class="thread-card ${thread.hot ? 'thread-card--hot' : ''}" data-thread-id="${thread.id}">
      <h3 class="thread-card__title">${title}</h3>
      <p class="thread-card__body">${body}</p>
      ${thread.expertAnswer ? `
        <div class="thread-card__expert-answer">
          <div class="thread-card__expert-icon">${thread.expertAnswer.by.avatar}</div>
          <div class="thread-card__expert-body">
            <div class="thread-card__expert-label">⭐ ${t('community.expertAnswer')}</div>
            <p class="thread-card__expert-text">${tl(thread.expertAnswer.text)}</p>
          </div>
        </div>
      ` : ''}
      <div class="thread-card__footer">
        <div class="thread-card__meta">
          <span>💬 ${thread.replies} ${t('community.replies')}</span>
          <span>👁 ${thread.views} ${t('community.views')}</span>
          <span style="color:var(--color-text-light);">${t('community.postedBy')} ${thread.postedBy.name}</span>
          ${thread.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="thread-card__actions">
          <button class="btn btn--outline btn--sm" data-action="reply-thread" data-id="${thread.id}">
            ${t('community.reply')}
          </button>
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

    if (action === 'new-thread') {
      _showNewThreadModal()
    }

    if (action === 'reply-thread') {
      const id = e.target.closest('[data-action]').dataset.id
      _showReplyModal(id)
    }
  })
}

function _showNewThreadModal() {
  if (!hasRole('learner')) {
    showToast({ message: t('errors.loginRequired'), type: 'error' })
    return
  }
  showModal({
    title: t('modal.newThread.title'),
    body: `
      <div class="modal__form">
        <div class="form-group">
          <label class="form-label">${t('modal.newThread.titleLabel')}</label>
          <input class="form-input" id="thread-title" type="text" placeholder="${t('modal.newThread.titleLabel')}" />
        </div>
        <div class="form-group">
          <label class="form-label">${t('modal.newThread.bodyLabel')}</label>
          <textarea class="form-textarea" id="thread-body" placeholder="${t('modal.newThread.bodyLabel')}"></textarea>
        </div>
      </div>
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
      <button class="btn btn--primary" id="mc-ok">${t('modal.newThread.submit')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-ok')?.addEventListener('click', () => {
    const title = document.getElementById('thread-title')?.value.trim()
    if (!title) return
    closeModal()
    showToast({ message: t('toast.threadPosted'), type: 'success' })
  })
}

function _showReplyModal(id) {
  const thread = communityThreads.find(t => t.id === id)
  if (!thread) return
  const title = tl(thread.title)
  showModal({
    title: `${t('community.reply')}: ${title}`,
    body: `
      <div class="form-group">
        <label class="form-label">${t('community.reply')}</label>
        <textarea class="form-textarea" id="reply-body" placeholder="${window.__lang === 'es' ? 'Tu respuesta...' : 'Your reply...'}"></textarea>
      </div>
      ${hasRole('expert') ? `
        <div style="margin-top:0.75rem;display:flex;align-items:center;gap:0.5rem;">
          <input type="checkbox" id="mark-expert" style="accent-color:var(--color-cobalt);width:16px;height:16px;" />
          <label for="mark-expert" style="font-size:0.875rem;font-weight:500;">
            ${window.__lang === 'es' ? 'Marcar como Respuesta Experta' : 'Mark as Expert Answer'}
          </label>
        </div>
      ` : ''}
    `,
    actions: `
      <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
      <button class="btn btn--primary" id="mc-ok">${t('community.reply')}</button>
    `,
  })
  document.getElementById('mc')?.addEventListener('click', closeModal)
  document.getElementById('mc-ok')?.addEventListener('click', () => {
    const body = document.getElementById('reply-body')?.value.trim()
    if (!body) return
    closeModal()
    showToast({ message: t('toast.submitted'), type: 'success' })
  })
}
