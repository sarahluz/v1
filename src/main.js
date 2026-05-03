import './styles/base.css'
import './styles/components.css'
import './styles/layout.css'

import { detectLanguage } from './translations.js'
import { detectTheme } from './theme.js'
import { renderNav, mountNav } from './components/nav.js'
import { initToast } from './components/toast.js'
import { initRouter } from './router.js'

// 1. Detect theme first — prevents flash of wrong theme
detectTheme()

// 2. Detect language (sets window.__lang)
detectLanguage()

// 3. Render nav immediately so it's never empty
const navContainer = document.getElementById('nav-container')
navContainer.innerHTML = renderNav()
mountNav()

// 3. Toast system
initToast()

// 4. Router (renders initial page)
initRouter()
