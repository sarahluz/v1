const queue = []
let isShowing = false

export function initToast() {
  // container already in index.html
}

export function showToast({ message, type = 'info', duration = 3500 }) {
  queue.push({ message, type, duration })
  if (!isShowing) _processQueue()
}

function _processQueue() {
  if (!queue.length) { isShowing = false; return }
  isShowing = true
  const { message, type, duration } = queue.shift()
  const container = document.getElementById('toast-container')

  const el = document.createElement('div')
  el.className = `toast toast--${type}`
  const icons = { success: '✓', error: '✕', info: 'ℹ' }
  el.innerHTML = `<span class="toast__icon">${icons[type] || icons.info}</span><span class="toast__message">${message}</span>`
  container.appendChild(el)

  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('toast--visible')))

  setTimeout(() => {
    el.classList.remove('toast--visible')
    el.classList.add('toast--hiding')
    setTimeout(() => { el.remove(); _processQueue() }, 350)
  }, duration)
}
