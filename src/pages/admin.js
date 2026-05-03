import { t, tl } from '../translations.js'
import { adminStats, mockUsers, moderationQueue, openRequests } from '../mock-data.js'
import { showModal, closeModal } from '../components/modal.js'
import { showToast } from '../components/toast.js'
import { isAdmin } from '../auth.js'

let _activeTab = 'stats'
const tabs = ['stats', 'users', 'pending', 'moderation']

export function render() {
  if (!isAdmin()) {
    return `
      <div class="page">
        <div class="container" style="padding:4rem 0;text-align:center;">
          <p style="font-size:3rem;margin-bottom:1rem;">🔒</p>
          <h2>${t('errors.adminOnly')}</h2>
          <p style="color:var(--color-text-muted);margin:1rem 0;">${window.__lang === 'es'
            ? 'Cambia a la cuenta de Admin usando el menú de usuario en la navegación.'
            : 'Switch to the Admin account using the user menu in the navigation.'}</p>
          <a class="btn btn--primary" href="#/">← ${t('general.back')}</a>
        </div>
      </div>
    `
  }

  return `
    <div class="page admin-page">
      <div class="page-header">
        <div class="container">
          <h1 class="page-header__title">🛠 ${t('admin.title')}</h1>
          <p class="page-header__subtitle">${t('admin.subtitle')}</p>
          <p style="color:rgba(255,255,255,0.55);font-size:0.8125rem;margin-top:0.5rem;">
            ${t('admin.managedBy')} the Cloud809 team — ${window.__lang === 'es' ? 'liderado por' : 'led by'} Luis Martínez
          </p>
        </div>
      </div>

      <div class="container" style="padding-top:2rem;padding-bottom:3rem;">
        <div class="admin-layout">
          <!-- Admin Sidebar Nav -->
          <aside class="admin-sidebar">
            ${tabs.map(tab => `
              <button class="admin-nav-btn ${_activeTab === tab ? 'admin-nav-btn--active' : ''}" data-admin-tab="${tab}">
                ${_tabIcon(tab)} ${t('admin.' + tab)}
              </button>
            `).join('')}
          </aside>

          <!-- Content area -->
          <div class="admin-content">
            <div class="admin-section ${_activeTab === 'stats' ? 'admin-section--active' : ''}" id="admin-stats">
              ${_renderStats()}
            </div>
            <div class="admin-section ${_activeTab === 'users' ? 'admin-section--active' : ''}" id="admin-users">
              ${_renderUsers()}
            </div>
            <div class="admin-section ${_activeTab === 'pending' ? 'admin-section--active' : ''}" id="admin-pending">
              ${_renderPending()}
            </div>
            <div class="admin-section ${_activeTab === 'moderation' ? 'admin-section--active' : ''}" id="admin-moderation">
              ${_renderModeration()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

function _renderStats() {
  const stats = [
    { icon: '🎓', value: adminStats.totalUsers, label: t('admin.totalUsers') },
    { icon: '📚', value: adminStats.totalCourses, label: t('admin.totalCourses') },
    { icon: '📄', value: adminStats.totalArticles, label: t('admin.totalArticles') },
    { icon: '🔓', value: adminStats.openRequests, label: t('admin.openRequests') },
    { icon: '⏳', value: adminStats.pendingModeration, label: t('admin.pendingModeration') },
    { icon: '💬', value: adminStats.monthlyActiveUsers, label: window.__lang === 'es' ? 'Usuarios Activos/Mes' : 'Monthly Active Users' },
  ]

  return `
    <h2 style="margin-bottom:1.5rem;">${t('admin.stats')}</h2>
    <div class="admin-stats-grid">
      ${stats.map(s => `
        <div class="stat-card">
          <div class="stat-card__icon">${s.icon}</div>
          <div class="stat-card__value">${s.value.toLocaleString()}</div>
          <div class="stat-card__label">${s.label}</div>
        </div>
      `).join('')}
    </div>

    <h3 style="margin-bottom:1rem;margin-top:1.5rem;">${window.__lang === 'es' ? 'Distribución de Roles' : 'Role Breakdown'}</h3>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr>
          <th>${window.__lang === 'es' ? 'Rol' : 'Role'}</th>
          <th>${window.__lang === 'es' ? 'Cantidad' : 'Count'}</th>
          <th>${window.__lang === 'es' ? 'Porcentaje' : 'Percentage'}</th>
        </tr></thead>
        <tbody>
          ${[
            { role: 'learner', count: adminStats.learners },
            { role: 'contributor', count: adminStats.contributors },
            { role: 'expert', count: adminStats.experts },
            { role: 'admin', count: adminStats.admins },
          ].map(row => {
            const pct = Math.round((row.count / adminStats.totalUsers) * 100)
            return `
              <tr>
                <td><span class="badge badge--role badge--${row.role}">${t('roles.' + row.role)}</span></td>
                <td><strong>${row.count}</strong></td>
                <td>
                  <div style="display:flex;align-items:center;gap:0.5rem;">
                    <div style="flex:1;height:6px;background:var(--color-surface-2);border-radius:3px;overflow:hidden;">
                      <div style="width:${pct}%;height:100%;background:var(--color-cobalt);border-radius:3px;"></div>
                    </div>
                    <span style="font-size:0.75rem;color:var(--color-text-muted);font-family:var(--font-mono);">${pct}%</span>
                  </div>
                </td>
              </tr>
            `
          }).join('')}
        </tbody>
      </table>
    </div>

    <h3 style="margin-bottom:1rem;margin-top:1.5rem;">${window.__lang === 'es' ? 'Estado del Contenido' : 'Content Status'}</h3>
    <div class="grid-3" style="gap:1rem;">
      <div class="stat-card">
        <div class="stat-card__label">${window.__lang === 'es' ? 'Artículos Verificados' : 'Verified Articles'}</div>
        <div class="stat-card__value" style="color:var(--color-success);">${adminStats.verifiedArticles}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">${window.__lang === 'es' ? 'En Revisión' : 'In Review'}</div>
        <div class="stat-card__value" style="color:var(--color-warning);">${adminStats.inReviewArticles}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">${window.__lang === 'es' ? 'Borradores' : 'Drafts'}</div>
        <div class="stat-card__value" style="color:var(--color-text-muted);">${adminStats.draftArticles}</div>
      </div>
    </div>
  `
}

function _renderUsers() {
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:0.75rem;">
      <h2>${t('admin.users')}</h2>
      <button class="btn btn--outline btn--sm" data-action="invite-user">
        + ${window.__lang === 'es' ? 'Invitar Usuario' : 'Invite User'}
      </button>
    </div>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr>
          <th>${window.__lang === 'es' ? 'Usuario' : 'User'}</th>
          <th>${window.__lang === 'es' ? 'Email' : 'Email'}</th>
          <th>${window.__lang === 'es' ? 'Rol' : 'Role'}</th>
          <th>${window.__lang === 'es' ? 'Miembro desde' : 'Joined'}</th>
          <th>${window.__lang === 'es' ? 'Acciones' : 'Actions'}</th>
        </tr></thead>
        <tbody>
          ${mockUsers.map(u => `
            <tr>
              <td>
                <div class="admin-user-cell">
                  <div class="admin-user-avatar">${u.avatar}</div>
                  <span>${u.name}</span>
                </div>
              </td>
              <td style="color:var(--color-text-muted);font-size:0.875rem;">${u.email || u.id + '@cloud809.org'}</td>
              <td><span class="badge badge--role badge--${u.role}">${t('roles.' + u.role)}</span></td>
              <td style="font-size:0.8125rem;color:var(--color-text-muted);font-family:var(--font-mono);">${u.joined}</td>
              <td>
                <div style="display:flex;gap:0.375rem;">
                  <button class="btn btn--outline btn--sm" data-action="promote-user" data-id="${u.id}" data-name="${u.name}" data-role="${u.role}">${t('admin.promote')}</button>
                  <button class="btn btn--danger btn--sm" data-action="demote-user" data-id="${u.id}" data-name="${u.name}" data-role="${u.role}">${t('admin.demote')}</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

function _renderPending() {
  const pending = openRequests.filter(r => r.status === 'open')
  return `
    <h2 style="margin-bottom:1.5rem;">${t('admin.pending')}</h2>
    ${pending.length === 0
      ? `<div class="empty-state"><div class="empty-state__icon">✅</div><p class="empty-state__text">${window.__lang === 'es' ? 'Sin solicitudes pendientes.' : 'No pending requests.'}</p></div>`
      : `<div style="display:flex;flex-direction:column;gap:0.875rem;">
          ${pending.map(r => `
            <div style="background:var(--color-white);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;">
              <div>
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;">
                  <span class="badge badge--${r.type === 'module' ? 'cobalt' : r.type === 'article' ? 'green' : r.type === 'review' ? 'orange' : 'pink'}">${t('requests.type.' + r.type)}</span>
                  <strong style="font-size:0.9375rem;">${r.title[window.__lang] || r.title.en}</strong>
                </div>
                <p style="font-size:0.8125rem;color:var(--color-text-muted);">${t('requests.postedBy')} ${r.postedBy.name} · ${r.watchers} ${t('requests.watchers')}</p>
              </div>
              <div style="display:flex;gap:0.5rem;">
                <button class="btn btn--success btn--sm" data-action="approve-request" data-id="${r.id}">${t('admin.approve')}</button>
                <button class="btn btn--danger btn--sm" data-action="reject-request" data-id="${r.id}">${t('admin.reject')}</button>
              </div>
            </div>
          `).join('')}
        </div>`}
  `
}

function _renderModeration() {
  return `
    <h2 style="margin-bottom:1.5rem;">${t('admin.moderation')}</h2>
    ${moderationQueue.length === 0
      ? `<div class="empty-state"><div class="empty-state__icon">✅</div><p class="empty-state__text">${window.__lang === 'es' ? 'Cola vacía.' : 'Queue is empty.'}</p></div>`
      : `<div style="display:flex;flex-direction:column;gap:0.875rem;">
          ${moderationQueue.map(item => `
            <div style="background:var(--color-white);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:1rem 1.25rem;">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;">
                <div>
                  <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.375rem;">
                    <span class="badge badge--orange">${item.type}</span>
                    <strong style="font-size:0.9375rem;">${tl(item.title)}</strong>
                  </div>
                  <p style="font-size:0.8125rem;color:var(--color-text-muted);">
                    ${window.__lang === 'es' ? 'Enviado por' : 'Submitted by'} ${item.submittedBy.name} ·
                    ${window.__lang === 'es' ? 'Flag' : 'Flag'}: <em>${tl(item.flag)}</em>
                  </p>
                </div>
                <div style="display:flex;gap:0.5rem;flex-shrink:0;">
                  <button class="btn btn--success btn--sm" data-action="mod-approve" data-id="${item.id}">${t('admin.approve')}</button>
                  <button class="btn btn--danger btn--sm" data-action="mod-reject" data-id="${item.id}">${t('admin.reject')}</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>`}
  `
}

export function mount() {
  if (!isAdmin()) return

  const page = document.getElementById('page-container')

  // Tab switching
  page.querySelectorAll('[data-admin-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      _activeTab = btn.dataset.adminTab
      page.querySelectorAll('[data-admin-tab]').forEach(b =>
        b.classList.toggle('admin-nav-btn--active', b.dataset.adminTab === _activeTab))
      page.querySelectorAll('.admin-section').forEach(s => {
        s.classList.toggle('admin-section--active', s.id === 'admin-' + _activeTab)
      })
    })
  })

  // Action buttons
  page.addEventListener('click', e => {
    const el = e.target.closest('[data-action]')
    if (!el) return
    const action = el.dataset.action

    if (action === 'promote-user' || action === 'demote-user') {
      const roles = ['learner', 'contributor', 'expert', 'admin']
      const currentRole = el.dataset.role
      const name = el.dataset.name
      const idx = roles.indexOf(currentRole)
      const newRole = action === 'promote-user'
        ? roles[Math.min(idx + 1, roles.length - 1)]
        : roles[Math.max(idx - 1, 0)]
      if (newRole === currentRole) {
        showToast({ message: window.__lang === 'es' ? 'Ya está en el rol límite.' : 'Already at the role limit.', type: 'info' })
        return
      }
      showModal({
        title: action === 'promote-user' ? t('admin.promote') : t('admin.demote'),
        body: `<p>${window.__lang === 'es'
          ? `¿Cambiar el rol de <strong>${name}</strong> de <strong>${t('roles.' + currentRole)}</strong> a <strong>${t('roles.' + newRole)}</strong>?`
          : `Change <strong>${name}</strong>'s role from <strong>${t('roles.' + currentRole)}</strong> to <strong>${t('roles.' + newRole)}</strong>?`}
        </p>`,
        actions: `
          <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
          <button class="btn btn--primary" id="mc-ok">${t('modal.confirm')}</button>
        `,
      })
      document.getElementById('mc')?.addEventListener('click', closeModal)
      document.getElementById('mc-ok')?.addEventListener('click', () => {
        closeModal()
        showToast({ message: t('toast.saved'), type: 'success' })
      })
    }

    if (action === 'approve-request' || action === 'approve-request' || action === 'mod-approve') {
      showToast({ message: t('admin.approve') + ' ✓', type: 'success' })
    }
    if (action === 'reject-request' || action === 'mod-reject') {
      showToast({ message: t('admin.reject') + ' ✓', type: 'info' })
    }

    if (action === 'invite-user') {
      showModal({
        title: window.__lang === 'es' ? 'Invitar Usuario' : 'Invite User',
        body: `
          <div class="modal__form">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-input" id="invite-email" type="email" placeholder="user@example.com" />
            </div>
            <div class="form-group">
              <label class="form-label">${t('admin.roles')}</label>
              <select class="form-select" id="invite-role">
                <option value="learner">${t('roles.learner')}</option>
                <option value="contributor">${t('roles.contributor')}</option>
                <option value="expert">${t('roles.expert')}</option>
              </select>
            </div>
          </div>
        `,
        actions: `
          <button class="btn btn--outline" id="mc">${t('modal.cancel')}</button>
          <button class="btn btn--primary" id="mc-ok">${window.__lang === 'es' ? 'Enviar Invitación' : 'Send Invite'}</button>
        `,
      })
      document.getElementById('mc')?.addEventListener('click', closeModal)
      document.getElementById('mc-ok')?.addEventListener('click', () => {
        const email = document.getElementById('invite-email')?.value.trim()
        if (!email) return
        closeModal()
        showToast({ message: t('toast.submitted'), type: 'success' })
      })
    }
  })
}

function _tabIcon(tab) {
  const icons = { stats: '📊', users: '👥', pending: '🔓', moderation: '🛡' }
  return icons[tab] || '·'
}
