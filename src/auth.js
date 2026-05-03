// TODO: replace with Supabase auth

const MOCK_USERS = [
  {
    id: '1',
    name: 'María Santos',
    email: 'maria@cloud809.org',
    role: 'learner',
    avatar: 'MS',
    bio: { en: 'Learning web development from Santo Domingo.', es: 'Aprendiendo desarrollo web desde Santo Domingo.' },
    joined: '2025-01-15',
  },
  {
    id: '2',
    name: 'Carlos Rivera',
    email: 'carlos@cloud809.org',
    role: 'contributor',
    avatar: 'CR',
    bio: { en: 'Full-stack developer, contributor since 2024.', es: 'Desarrollador full-stack, contribuidor desde 2024.' },
    joined: '2024-11-02',
  },
  {
    id: '3',
    name: 'Ana Pérez',
    email: 'ana@cloud809.org',
    role: 'expert',
    area: 'JavaScript',
    avatar: 'AP',
    bio: { en: 'JavaScript expert. Maintains the JS area and co-authors courses.', es: 'Experta en JavaScript. Mantiene el área de JS y co-escribe cursos.' },
    joined: '2024-06-20',
  },
  {
    id: '4',
    name: 'Luis Martínez',
    email: 'luis@cloud809.org',
    role: 'admin',
    avatar: 'LM',
    bio: { en: 'Platform lead. Cloud809 is maintained by this team.', es: 'Líder de plataforma. Cloud809 es mantenida por este equipo.' },
    joined: '2024-01-01',
  },
]

const AUTH_KEY = 'cloud809_auth'

export function getCurrentUser() {
  const stored = localStorage.getItem(AUTH_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // corrupted storage
    }
  }
  return MOCK_USERS[0]
}

export function setCurrentUser(userId) {
  const user = MOCK_USERS.find(u => u.id === userId)
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    return user
  }
  return null
}

export function getMockUsers() {
  return MOCK_USERS
}

export function hasRole(minRole) {
  const order = ['learner', 'contributor', 'expert', 'admin']
  const current = getCurrentUser()
  return order.indexOf(current.role) >= order.indexOf(minRole)
}

export function isAdmin() {
  return getCurrentUser().role === 'admin'
}
