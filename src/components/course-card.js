import { t, tl } from '../translations.js'

export function renderCourseCard(course) {
  const lang = window.__lang || 'en'
  const title = tl(course.title)
  const desc = tl(course.description)
  const thumbSrc = course.youtubeId
    ? `https://img.youtube.com/vi/${course.youtubeId}/mqdefault.jpg`
    : null

  const langLabels = { es: '🇩🇴 ES', en: '🌐 EN', both: '🌐 Bilingual' }
  const langLabel = langLabels[course.lang] || ''

  const coAuthors = course.coAuthors.map(a =>
    `<span class="course-card__author-avatar" title="${a.name}">${a.avatar}</span>`
  ).join('')

  return `
    <div class="course-card" data-course-id="${course.id}">
      <div class="course-card__thumbnail">
        ${thumbSrc
          ? `<img src="${thumbSrc}" alt="${title}" loading="lazy" />`
          : `<div class="course-card__placeholder">📚</div>`}
        <span class="badge course-card__level badge--${course.level}">${t('courses.level.' + course.level)}</span>
        ${langLabel ? `<span class="course-card__lang">${langLabel}</span>` : ''}
      </div>
      <div class="course-card__body">
        <h3 class="course-card__title">${title}</h3>
        <p class="course-card__desc">${desc}</p>
        <div class="course-card__meta">
          <span>📦 ${course.modules} ${t('courses.modules')}</span>
          <span>🕐 ${course.duration}</span>
          <span>👥 ${course.enrolled} ${t('courses.enrolled')}</span>
        </div>
        ${course.coAuthors.length ? `
          <div class="course-card__authors">
            ${coAuthors}
            <span>${t('courses.coAuthoredBy')} ${course.coAuthors.map(a => a.name).join(', ')}</span>
          </div>
        ` : ''}
        <div class="course-card__tags">
          ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="course-card__actions">
          <button class="btn btn--primary btn--sm" data-action="watch-course" data-id="${course.id}" data-yt="${course.youtubeId || ''}">
            ▶ ${t('courses.watch')}
          </button>
          <button class="btn btn--outline btn--sm" data-action="contribute-course" data-id="${course.id}">
            ${t('courses.contribute')}
          </button>
        </div>
      </div>
    </div>
  `
}
