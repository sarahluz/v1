const LANG_KEY = 'cloud809_lang'

const translations = {
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      kb: 'Knowledge Base',
      experts: 'Experts',
      requests: 'Open Requests',
      community: 'Community',
      admin: 'Admin',
      languageToggle: 'ES',
      menu: 'Menu',
    },
    home: {
      hero: {
        tagline: 'Born in DR.\nBuilt for Everyone.',
        subtitle: 'A free, community-driven tech education platform. Learn, contribute, and grow — in any language.',
        cta: 'Start Learning',
        contribute: 'Contribute',
      },
      activity: { title: 'Live Activity' },
      requests: { title: 'Open Requests', viewAll: 'View all requests →' },
      courses: { title: 'Featured Courses', viewAll: 'View all courses →' },
      pulse: {
        learners: 'Learners',
        contributors: 'Contributors',
        experts: 'Experts',
        articles: 'Articles',
        requests: 'Open Requests',
        threads: 'Discussions',
      },
    },
    courses: {
      title: 'Courses',
      subtitle: 'Community-built courses, co-authored by experts.',
      watch: 'Watch Course',
      contribute: 'Contribute',
      modules: 'modules',
      enrolled: 'enrolled',
      coAuthoredBy: 'Co-authored by',
      filter: {
        all: 'All Levels',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
      },
      level: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
      },
      requestModule: 'Request a Module',
      noResults: 'No courses match that filter.',
      language: { es: 'Spanish', en: 'English', both: 'Bilingual' },
    },
    kb: {
      title: 'Knowledge Base',
      subtitle: 'Verified articles, maintained by community experts.',
      search: 'Search articles…',
      searchBtn: 'Search',
      claim: 'Claim Article',
      read: 'Read',
      maintainer: 'Maintained by',
      unclaimed: 'Unclaimed',
      newArticle: 'Propose Article',
      status: {
        draft: 'Draft',
        review: 'In Review',
        verified: 'Verified',
      },
      category: {
        all: 'All Categories',
        webdev: 'Web Dev',
        devops: 'DevOps',
        data: 'Data',
        tools: 'Tools',
        design: 'Design',
        career: 'Career',
      },
      noResults: 'No articles match that search.',
    },
    experts: {
      title: 'Experts',
      subtitle: 'People who maintain a tech area, verify knowledge, and co-author courses.',
      area: 'Tech Area',
      openSlot: 'Open Slot — Claim this area',
      claim: 'Become the Expert',
      contact: 'Contact',
      ledBy: 'led by',
      verified: 'Verified',
      articles: 'articles',
      courses: 'courses',
      noSlots: 'No open slots right now.',
    },
    requests: {
      title: 'Open Requests',
      subtitle: 'The collaboration engine. Claim work, watch progress, post what the community needs.',
      claim: 'Claim',
      watch: 'Watch',
      post: 'Post Request',
      claimed: 'Claimed',
      watchers: 'watching',
      type: {
        module: 'Course Module',
        article: 'KB Article',
        review: 'Peer Review',
        answer: 'Thread Answer',
      },
      status: {
        open: 'Open',
        claimed: 'Claimed',
        completed: 'Completed',
      },
      filter: {
        all: 'All Types',
        module: 'Course Modules',
        article: 'KB Articles',
        review: 'Peer Reviews',
        answer: 'Thread Answers',
      },
      postedBy: 'Posted by',
      noResults: 'No requests match that filter.',
    },
    community: {
      title: 'Community',
      subtitle: 'Threads, questions, and expert-verified answers.',
      newThread: 'Start a Thread',
      reply: 'Reply',
      expertAnswer: 'Expert Answer',
      views: 'views',
      replies: 'replies',
      askQuestion: 'Ask a Question',
      latestThreads: 'Latest Threads',
      postedBy: 'Posted by',
      answeredBy: 'Answered by',
    },
    admin: {
      title: 'Admin Dashboard',
      subtitle: 'Manage users, content, and platform settings.',
      users: 'Users & Roles',
      pending: 'Pending Requests',
      moderation: 'Content Moderation',
      stats: 'Site Stats',
      approve: 'Approve',
      reject: 'Reject',
      promote: 'Promote',
      demote: 'Demote',
      totalUsers: 'Total Users',
      totalCourses: 'Courses',
      totalArticles: 'Articles',
      openRequests: 'Open Requests',
      pendingModeration: 'Pending Review',
      managedBy: 'Platform maintained by',
    },
    roles: {
      learner: 'Learner',
      contributor: 'Contributor',
      expert: 'Expert',
      admin: 'Admin',
      switchTo: 'Switch demo account',
    },
    modal: {
      close: 'Close',
      confirm: 'Confirm',
      cancel: 'Cancel',
      claim: {
        title: 'Claim this item',
        body: 'You\'re about to claim this. This means you commit to completing or maintaining it. Are you sure?',
      },
      watch: {
        title: 'You\'re watching this',
        body: 'You\'ll be notified when there\'s progress on this item.',
      },
      contribute: {
        title: 'Want to contribute?',
        learnerBody: 'Upgrade your role to Contributor or higher to submit content, claim requests, and co-author courses. Contact an admin to request a role upgrade.',
      },
      comingSoon: {
        title: 'Coming Soon',
        body: 'This feature is on the roadmap. Want to help build it? Post a request or reach out on Community.',
      },
      claimExpert: {
        title: 'Claim Expert Slot',
        body: 'You\'re applying to become the expert for this tech area. An admin will review your profile. This is a volunteer role.',
      },
      newThread: {
        title: 'Start a New Thread',
        titleLabel: 'Thread title',
        bodyLabel: 'What do you want to discuss?',
        submit: 'Post Thread',
      },
      newRequest: {
        title: 'Post a Request',
        typeLabel: 'Request type',
        titleLabel: 'What are you requesting?',
        bodyLabel: 'Give context so someone can pick this up.',
        submit: 'Post Request',
      },
      newArticle: {
        title: 'Propose an Article',
        body: 'Submit a title and topic for a new Knowledge Base article. An expert will review it.',
        titleLabel: 'Article title',
        submit: 'Propose',
      },
      watchCourse: {
        title: 'Watch on YouTube',
        body: 'This course is hosted on YouTube. The link will open in a new tab.',
        openYoutube: 'Open on YouTube',
      },
      readArticle: {
        title: 'Read Article',
        body: 'Full article content would be displayed here.',
        comingSoonNote: 'Full article pages are coming soon. For now, preview below:',
      },
    },
    toast: {
      claimed: 'Claimed! Thank you for contributing.',
      watching: 'You\'re now watching this.',
      submitted: 'Submitted successfully.',
      saved: 'Saved.',
      copied: 'Copied to clipboard.',
      roleChanged: 'Role changed.',
      threadPosted: 'Thread posted!',
      requestPosted: 'Request posted!',
      articleProposed: 'Article proposed!',
      needsContributor: 'You need to be a Contributor or higher to do this.',
      needsExpert: 'You need to be an Expert or higher to do this.',
      needsAdmin: 'This action requires Admin access.',
    },
    errors: {
      adminOnly: 'This page is restricted to admins.',
      notFound: 'Page not found.',
      loginRequired: 'You need to be signed in to do this.',
    },
    general: {
      learnMore: 'Learn More',
      viewAll: 'View All',
      back: 'Back',
      by: 'by',
      and: 'and',
      loading: 'Loading…',
      tagline: 'Born in DR. Built for Everyone.',
    },
  },

  es: {
    nav: {
      home: 'Inicio',
      courses: 'Cursos',
      kb: 'Base de Conocimiento',
      experts: 'Expertos',
      requests: 'Solicitudes',
      community: 'Comunidad',
      admin: 'Admin',
      languageToggle: 'EN',
      menu: 'Menú',
    },
    home: {
      hero: {
        tagline: 'Nacido en RD.\nHecho para todos.',
        subtitle: 'Una plataforma educativa tecnológica gratuita, impulsada por la comunidad. Aprende, contribuye y crece — en cualquier idioma.',
        cta: 'Comenzar',
        contribute: 'Contribuir',
      },
      activity: { title: 'Actividad Reciente' },
      requests: { title: 'Solicitudes Abiertas', viewAll: 'Ver todas las solicitudes →' },
      courses: { title: 'Cursos Destacados', viewAll: 'Ver todos los cursos →' },
      pulse: {
        learners: 'Estudiantes',
        contributors: 'Contribuidores',
        experts: 'Expertos',
        articles: 'Artículos',
        requests: 'Solicitudes',
        threads: 'Discusiones',
      },
    },
    courses: {
      title: 'Cursos',
      subtitle: 'Cursos creados por la comunidad, co-escritos con expertos.',
      watch: 'Ver Curso',
      contribute: 'Contribuir',
      modules: 'módulos',
      enrolled: 'inscritos',
      coAuthoredBy: 'Co-escrito por',
      filter: {
        all: 'Todos los Niveles',
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
      },
      level: {
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
      },
      requestModule: 'Solicitar Módulo',
      noResults: 'Ningún curso coincide con ese filtro.',
      language: { es: 'Español', en: 'Inglés', both: 'Bilingüe' },
    },
    kb: {
      title: 'Base de Conocimiento',
      subtitle: 'Artículos verificados, mantenidos por expertos de la comunidad.',
      search: 'Buscar artículos…',
      searchBtn: 'Buscar',
      claim: 'Reclamar Artículo',
      read: 'Leer',
      maintainer: 'Mantenido por',
      unclaimed: 'Sin asignar',
      newArticle: 'Proponer Artículo',
      status: {
        draft: 'Borrador',
        review: 'En Revisión',
        verified: 'Verificado',
      },
      category: {
        all: 'Todas las Categorías',
        webdev: 'Desarrollo Web',
        devops: 'DevOps',
        data: 'Datos',
        tools: 'Herramientas',
        design: 'Diseño',
        career: 'Carrera',
      },
      noResults: 'Ningún artículo coincide con esa búsqueda.',
    },
    experts: {
      title: 'Expertos',
      subtitle: 'Personas que mantienen un área tecnológica, verifican el conocimiento y co-escriben cursos.',
      area: 'Área Tecnológica',
      openSlot: 'Puesto Disponible — Reclamar esta área',
      claim: 'Ser el Experto',
      contact: 'Contactar',
      ledBy: 'liderado por',
      verified: 'Verificado',
      articles: 'artículos',
      courses: 'cursos',
      noSlots: 'No hay puestos disponibles en este momento.',
    },
    requests: {
      title: 'Solicitudes Abiertas',
      subtitle: 'El motor de colaboración. Toma trabajo, sigue el progreso, publica lo que la comunidad necesita.',
      claim: 'Tomar',
      watch: 'Seguir',
      post: 'Publicar Solicitud',
      claimed: 'Tomado',
      watchers: 'siguiendo',
      type: {
        module: 'Módulo de Curso',
        article: 'Artículo KB',
        review: 'Revisión',
        answer: 'Respuesta',
      },
      status: {
        open: 'Abierta',
        claimed: 'Tomada',
        completed: 'Completada',
      },
      filter: {
        all: 'Todos los Tipos',
        module: 'Módulos de Cursos',
        article: 'Artículos KB',
        review: 'Revisiones',
        answer: 'Respuestas',
      },
      postedBy: 'Publicado por',
      noResults: 'Ninguna solicitud coincide con ese filtro.',
    },
    community: {
      title: 'Comunidad',
      subtitle: 'Hilos, preguntas y respuestas verificadas por expertos.',
      newThread: 'Iniciar Hilo',
      reply: 'Responder',
      expertAnswer: 'Respuesta Experta',
      views: 'vistas',
      replies: 'respuestas',
      askQuestion: 'Hacer una Pregunta',
      latestThreads: 'Hilos Recientes',
      postedBy: 'Publicado por',
      answeredBy: 'Respondido por',
    },
    admin: {
      title: 'Panel de Administración',
      subtitle: 'Gestiona usuarios, contenido y configuración de la plataforma.',
      users: 'Usuarios y Roles',
      pending: 'Solicitudes Pendientes',
      moderation: 'Moderación de Contenido',
      stats: 'Estadísticas',
      approve: 'Aprobar',
      reject: 'Rechazar',
      promote: 'Promover',
      demote: 'Degradar',
      totalUsers: 'Total Usuarios',
      totalCourses: 'Cursos',
      totalArticles: 'Artículos',
      openRequests: 'Solicitudes Abiertas',
      pendingModeration: 'En Revisión',
      managedBy: 'Plataforma mantenida por',
    },
    roles: {
      learner: 'Estudiante',
      contributor: 'Contribuidor',
      expert: 'Experto',
      admin: 'Admin',
      switchTo: 'Cambiar cuenta demo',
    },
    modal: {
      close: 'Cerrar',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      claim: {
        title: 'Reclamar este elemento',
        body: 'Estás a punto de reclamar esto. Significa que te comprometes a completarlo o mantenerlo. ¿Estás seguro?',
      },
      watch: {
        title: 'Estás siguiendo esto',
        body: 'Recibirás notificaciones cuando haya progreso en este elemento.',
      },
      contribute: {
        title: '¿Quieres contribuir?',
        learnerBody: 'Actualiza tu rol a Contribuidor o superior para enviar contenido, reclamar solicitudes y co-escribir cursos. Contacta un administrador para solicitar un cambio de rol.',
      },
      comingSoon: {
        title: 'Próximamente',
        body: 'Esta función está en el roadmap. ¿Quieres ayudar a construirla? Publica una solicitud o contáctanos en Comunidad.',
      },
      claimExpert: {
        title: 'Reclamar Puesto de Experto',
        body: 'Estás solicitando ser el experto de esta área tecnológica. Un administrador revisará tu perfil. Este es un rol voluntario.',
      },
      newThread: {
        title: 'Iniciar un Nuevo Hilo',
        titleLabel: 'Título del hilo',
        bodyLabel: '¿Sobre qué quieres discutir?',
        submit: 'Publicar Hilo',
      },
      newRequest: {
        title: 'Publicar una Solicitud',
        typeLabel: 'Tipo de solicitud',
        titleLabel: '¿Qué estás solicitando?',
        bodyLabel: 'Da contexto para que alguien pueda tomarlo.',
        submit: 'Publicar',
      },
      newArticle: {
        title: 'Proponer un Artículo',
        body: 'Envía un título y tema para un nuevo artículo. Un experto lo revisará.',
        titleLabel: 'Título del artículo',
        submit: 'Proponer',
      },
      watchCourse: {
        title: 'Ver en YouTube',
        body: 'Este curso está alojado en YouTube. El enlace se abrirá en una nueva pestaña.',
        openYoutube: 'Abrir en YouTube',
      },
      readArticle: {
        title: 'Leer Artículo',
        body: 'El contenido completo del artículo se mostraría aquí.',
        comingSoonNote: 'Las páginas completas de artículos están próximamente. Por ahora, vista previa abajo:',
      },
    },
    toast: {
      claimed: '¡Tomado! Gracias por contribuir.',
      watching: 'Ahora estás siguiendo esto.',
      submitted: 'Enviado correctamente.',
      saved: 'Guardado.',
      copied: 'Copiado al portapapeles.',
      roleChanged: 'Rol cambiado.',
      threadPosted: '¡Hilo publicado!',
      requestPosted: '¡Solicitud publicada!',
      articleProposed: '¡Artículo propuesto!',
      needsContributor: 'Necesitas ser Contribuidor o superior para hacer esto.',
      needsExpert: 'Necesitas ser Experto o superior para hacer esto.',
      needsAdmin: 'Esta acción requiere acceso de Administrador.',
    },
    errors: {
      adminOnly: 'Esta página está restringida a administradores.',
      notFound: 'Página no encontrada.',
      loginRequired: 'Necesitas estar conectado para hacer esto.',
    },
    general: {
      learnMore: 'Saber Más',
      viewAll: 'Ver Todo',
      back: 'Atrás',
      by: 'por',
      and: 'y',
      loading: 'Cargando…',
      tagline: 'Nacido en RD. Hecho para todos.',
    },
  },
}

export function detectLanguage() {
  const stored = localStorage.getItem(LANG_KEY)
  if (stored && (stored === 'en' || stored === 'es')) {
    window.__lang = stored
    return
  }
  const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase()
  window.__lang = browserLang === 'es' ? 'es' : 'en'
  localStorage.setItem(LANG_KEY, window.__lang)
}

export function setLanguage(lang) {
  window.__lang = lang
  localStorage.setItem(LANG_KEY, lang)
  document.documentElement.lang = lang
}

export function t(key) {
  const lang = window.__lang || 'en'
  const keys = key.split('.')
  let obj = translations[lang]
  for (const k of keys) {
    if (obj == null) break
    obj = obj[k]
  }
  if (obj != null && typeof obj === 'string') return obj
  // fallback to en
  let fallback = translations.en
  for (const k of keys) {
    if (fallback == null) break
    fallback = fallback[k]
  }
  return (typeof fallback === 'string' ? fallback : key)
}

export function tl(obj) {
  const lang = window.__lang || 'en'
  return obj[lang] || obj.en || obj.es || ''
}
