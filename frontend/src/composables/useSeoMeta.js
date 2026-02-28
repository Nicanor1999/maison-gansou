import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const BASE_URL = 'https://maisongansou.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`
const SITE_NAME = 'MAISON GANSOU'

/**
 * Composable pour gérer les meta tags SEO dynamiquement
 * @param {Object} options - Options SEO
 * @param {string} options.title - Titre de la page
 * @param {string} options.description - Description de la page
 * @param {string} options.image - URL de l'image OG (optionnel)
 * @param {string} options.type - Type OG (website, article, etc.)
 * @param {string} options.canonical - URL canonique (optionnel, auto-généré sinon)
 */
export function useSeoMeta(options = {}) {
  const route = useRoute()

  const updateMeta = () => {
    const {
      title = SITE_NAME,
      description = "Architecture, design d'intérieur et gestion d'actifs immobiliers à Cotonou.",
      image = DEFAULT_IMAGE,
      type = 'website',
      canonical = null
    } = options

    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
    const pageUrl = canonical || `${BASE_URL}${route.path}`

    // Title
    document.title = fullTitle

    // Meta description
    updateMetaTag('name', 'description', description)

    // Canonical
    updateLinkTag('canonical', pageUrl)

    // Open Graph
    updateMetaTag('property', 'og:title', fullTitle)
    updateMetaTag('property', 'og:description', description)
    updateMetaTag('property', 'og:image', image)
    updateMetaTag('property', 'og:url', pageUrl)
    updateMetaTag('property', 'og:type', type)

    // Twitter Card
    updateMetaTag('name', 'twitter:title', fullTitle)
    updateMetaTag('name', 'twitter:description', description)
    updateMetaTag('name', 'twitter:image', image)
    updateMetaTag('name', 'twitter:url', pageUrl)
  }

  onMounted(() => {
    updateMeta()
  })

  watch(() => route.path, () => {
    updateMeta()
  })
}

function updateMetaTag(attr, key, value) {
  let element = document.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

function updateLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

// Configurations SEO prédéfinies pour chaque page
export const seoConfigs = {
  home: {
    title: 'MAISON GANSOU',
    description: "Architecture, design d'intérieur et gestion d'actifs immobiliers à Cotonou. L'excellence dans chaque détail de vos projets."
  },
  about: {
    title: 'À Propos',
    description: "Découvrez MAISON GANSOU, cabinet d'architecture et design d'intérieur à Cotonou. Notre équipe d'experts transforme vos espaces avec créativité."
  },
  projects: {
    title: 'Nos Projets',
    description: "Explorez nos réalisations en architecture, design d'intérieur et construction à Cotonou et au Bénin."
  },
  blog: {
    title: 'Blog',
    description: "Actualités, tendances et conseils en architecture et design d'intérieur par MAISON GANSOU."
  },
  contacts: {
    title: 'Contact',
    description: 'Contactez MAISON GANSOU pour vos projets d\'architecture et design d\'intérieur à Cotonou. Demandez un devis gratuit.'
  },
  bookings: {
    title: 'Réservations',
    description: 'Réservez votre séjour dans nos espaces d\'hébergement à Cotonou. Confort et design au rendez-vous.'
  },
  testimonials: {
    title: 'Témoignages',
    description: 'Découvrez les avis de nos clients satisfaits sur nos services d\'architecture et design d\'intérieur.'
  },
  recruitment: {
    title: 'Recrutement',
    description: 'Rejoignez l\'équipe MAISON GANSOU. Consultez nos offres d\'emploi en architecture et design.'
  },
  services: {
    home: {
      title: 'Nos Services',
      description: "Découvrez nos services : conception architecturale, design d'intérieur, construction et gestion immobilière à Cotonou."
    },
    architecturalDesign: {
      title: 'Conception Architecturale',
      description: "Services de conception architecturale à Cotonou. Plans, permis de construire et suivi de projet par MAISON GANSOU."
    },
    designBuild: {
      title: 'Design & Construction',
      description: "Service clé en main : conception et construction de votre projet immobilier à Cotonou avec MAISON GANSOU."
    },
    interiorDesign: {
      title: 'Design d\'Intérieur',
      description: "Aménagement et décoration d'intérieur à Cotonou. Transformez vos espaces avec MAISON GANSOU."
    },
    immoGest: {
      title: 'Gestion Immobilière',
      description: "Services de gestion d'actifs immobiliers à Cotonou. Location, entretien et valorisation de vos biens."
    }
  }
}
