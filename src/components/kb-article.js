import { t, tl } from '../translations.js'

const statusClass = { draft: 'badge--draft', review: 'badge--in-review', verified: 'badge--verified' }

export function renderKBArticle(article) {
  const title = tl(article.title)
  const summary = tl(article.summary)
  const maintainer = article.maintainer

  return `
    <div class="kb-article" data-article-id="${article.id}">
      <div class="kb-article__header">
        <span class="badge ${statusClass[article.status] || 'badge--gray'}">${t('kb.status.' + article.status)}</span>
        <span class="badge badge--cobalt">${t('kb.category.' + article.category)}</span>
      </div>
      <h3 class="kb-article__title">${title}</h3>
      <p class="kb-article__summary">${summary}</p>
      <div class="kb-article__footer">
        <div class="kb-article__maintainer">
          ${maintainer
            ? `<span class="kb-article__maintainer-avatar">${maintainer.avatar}</span>
               <span>${t('kb.maintainer')}: <strong>${maintainer.name}</strong></span>`
            : `<span>${t('kb.maintainer')}: <em>${t('kb.unclaimed')}</em></span>`}
          <span class="kb-article__views">· ${article.views.toLocaleString()} views</span>
        </div>
        <div class="kb-article__actions">
          ${article.status === 'draft' && !article.maintainer
            ? `<button class="btn btn--pink btn--sm" data-action="claim-article" data-id="${article.id}">${t('kb.claim')}</button>`
            : ''}
          <button class="btn btn--outline btn--sm" data-action="read-article" data-id="${article.id}" data-title="${title}">${t('kb.read')}</button>
        </div>
      </div>
    </div>
  `
}
