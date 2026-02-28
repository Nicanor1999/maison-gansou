<template>
  <div class="about-us-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content" data-aos="fade-up" data-aos-duration="1000">
        <h2 class="hero-title">A Propos de Nous</h2>
        <!-- <p class="hero-subtitle">Maison Gansou - Excellence en Architecture et Hospitalite</p> -->
        <div class="hero-breadcrumb">
          <router-link to="/">Accueil</router-link>
          <span class="separator">/</span>
          <span class="current">A Propos</span>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-image" data-aos="fade-right" data-aos-duration="800">
            <img
              :src="images.intro"
              alt="Maison Gansou"
              class="main-image"
              @error="handleImageError"
            />
            <div class="experience-badge">
              <span class="years">10+</span>
              <span class="text">Annees d'Experience</span>
            </div>
          </div>
          <div class="intro-content" data-aos="fade-left" data-aos-duration="800">
            <span class="section-tag">Qui Sommes-Nous</span>
            <h3 class="section-title">Maison Gansou, Votre Partenaire de Confiance</h3>
            <p class="intro-text">
              Maison Gansou est une entreprise beninoise specialisee dans l'architecture, la
              construction et l'hebergement de qualite. Fondee avec la vision de transformer le
              paysage architectural du Benin, nous combinons innovation, tradition et excellence
              dans chacun de nos projets.
            </p>
            <p class="intro-text">
              Notre equipe de professionnels passionnes s'engage a offrir des services
              exceptionnels, que ce soit pour la conception de votre maison de reve, la realisation
              de projets commerciaux ou pour vous accueillir dans nos etablissements d'hebergement.
            </p>
            <div class="intro-features">
              <div class="feature-item">
                <span class="material-symbols-outlined">verified</span>
                <span>Qualite Garantie</span>
              </div>
              <div class="feature-item">
                <span class="material-symbols-outlined">schedule</span>
                <span>Respect des Delais</span>
              </div>
              <div class="feature-item">
                <span class="material-symbols-outlined">support_agent</span>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values Section -->
    <section class="mvv-section">
      <div class="container">
        <div class="mvv-grid">
          <div
            class="mvv-card mission"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="0"
          >
            <div class="mvv-icon">
              <span class="material-symbols-outlined">flag</span>
            </div>
            <h3>Notre Mission</h3>
            <p>
              Concevoir et realiser des espaces de vie et de travail qui allient fonctionnalite,
              esthetique et durabilite, tout en offrant une experience client exceptionnelle.
            </p>
          </div>
          <div
            class="mvv-card vision"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            <div class="mvv-icon">
              <span class="material-symbols-outlined">visibility</span>
            </div>
            <h3>Notre Vision</h3>
            <p>
              Devenir la reference en matiere d'architecture et d'hebergement au Benin et en Afrique
              de l'Ouest, reconnue pour notre innovation et notre engagement envers l'excellence.
            </p>
          </div>
          <div
            class="mvv-card values"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="400"
          >
            <div class="mvv-icon">
              <span class="material-symbols-outlined">favorite</span>
            </div>
            <h3>Nos Valeurs</h3>
            <p>
              Integrite, Innovation, Excellence, Respect de l'environnement et Satisfaction client
              sont les piliers qui guident chacune de nos actions.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up" data-aos-duration="600">
          <span class="section-tag">Ce Que Nous Faisons</span>
          <h2 class="section-title">Nos Services</h2>
          <p class="section-description">
            Une gamme complete de services pour repondre a tous vos besoins
          </p>
        </div>
        <div class="services-grid">
          <div
            class="service-card"
            v-for="(service, index) in services"
            :key="index"
            data-aos="zoom-in"
            data-aos-duration="500"
            :data-aos-delay="index * 100"
          >
            <div class="service-icon" :style="{ backgroundColor: service.color + '20' }">
              <span class="material-symbols-outlined" :style="{ color: service.color }">{{
                service.icon
              }}</span>
            </div>
            <h4>{{ service.title }}</h4>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-overlay"></div>
      <div class="container">
        <div class="stats-grid">
          <div
            class="stat-item"
            v-for="(stat, index) in stats"
            :key="index"
            data-aos="fade-up"
            data-aos-duration="600"
            :data-aos-delay="index * 100"
          >
            <span class="material-symbols-outlined stat-icon">{{ stat.icon }}</span>
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up" data-aos-duration="600">
          <span class="section-tag">Notre Equipe</span>
          <h2 class="section-title">Les Visages Derriere Notre Succes</h2>
          <p class="section-description">
            Une equipe de professionnels devoues a votre satisfaction
          </p>
        </div>
        <div class="team-grid">
          <div
            class="team-card"
            v-for="(member, index) in teamMembers"
            :key="index"
            data-aos="fade-up"
            data-aos-duration="600"
            :data-aos-delay="index * 100"
          >
            <div class="team-image">
              <img :src="member.image" :alt="member.name" @error="handleTeamImageError" />
              <div class="team-social">
                <a v-if="member.linkedin" :href="member.linkedin" target="_blank">
                  <span class="material-symbols-outlined">link</span>
                </a>
                <a v-if="member.email" :href="'mailto:' + member.email">
                  <span class="material-symbols-outlined">email</span>
                </a>
              </div>
            </div>
            <div class="team-info">
              <h4>{{ member.name }}</h4>
              <span class="role">{{ member.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-us-section">
      <div class="container">
        <div class="why-us-grid">
          <div class="why-us-content" data-aos="fade-right" data-aos-duration="800">
            <span class="section-tag">Pourquoi Nous Choisir</span>
            <h2 class="section-title">L'Excellence au Service de Vos Projets</h2>
            <div class="reasons-list">
              <div class="reason-item" v-for="(reason, index) in reasons" :key="index">
                <div class="reason-number">{{ String(index + 1).padStart(2, '0') }}</div>
                <div class="reason-content">
                  <h4>{{ reason.title }}</h4>
                  <p>{{ reason.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="why-us-image" data-aos="fade-left" data-aos-duration="800">
            <img :src="images.whyUs" alt="Pourquoi nous choisir" @error="handleImageError" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-overlay"></div>
      <div class="container">
        <div class="cta-content" data-aos="zoom-in" data-aos-duration="800">
          <h2>Pret a Demarrer Votre Projet ?</h2>
          <p>
            Contactez-nous des aujourd'hui pour discuter de vos besoins et obtenir un devis gratuit.
          </p>
          <div class="cta-buttons">
            <router-link to="/contacts" class="btn-primary">
              <span class="material-symbols-outlined">mail</span>
              Nous Contacter
            </router-link>
            <router-link to="/projects" class="btn-secondary">
              <span class="material-symbols-outlined">visibility</span>
              Voir Nos Projets
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <div
      class="footerPart relative h-[85vh] bg-[var(--bg-1)] w-screen flex justify-center items-center border-[var(--bg-2)] border-t-4"
    >
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import FooterComponent from '@/components/views/public/FooterComponent.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSeoMeta, seoConfigs } from '@/composables/useSeoMeta'

export default {
  name: 'AboutUsPublicView',
  components: {
    FooterComponent,
  },
  setup() {
    useSeoMeta(seoConfigs.about)
  },
  data() {
    return {
      images: {
        intro: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=500&fit=crop',
        whyUs: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=500&fit=crop',
      },
      services: [
        {
          icon: 'architecture',
          title: 'Architecture',
          description:
            'Conception architecturale innovante et personnalisee pour vos projets residentiels et commerciaux.',
          color: '#4F46E5',
        },
        {
          icon: 'construction',
          title: 'Construction',
          description:
            'Realisation de travaux de construction avec des materiaux de qualite et un savoir-faire reconnu.',
          color: '#059669',
        },
        {
          icon: 'hotel',
          title: 'Hebergement',
          description:
            "Des espaces d'hebergement confortables et modernes pour vos sejours professionnels ou de loisirs.",
          color: '#DC2626',
        },
        {
          icon: 'design_services',
          title: 'Design Interieur',
          description: 'Amenagement et decoration interieure pour creer des espaces a votre image.',
          color: '#7C3AED',
        },
        {
          icon: 'engineering',
          title: 'Consultation',
          description:
            'Conseil et accompagnement expert pour tous vos projets immobiliers et architecturaux.',
          color: '#EA580C',
        },
        {
          icon: 'home_repair_service',
          title: 'Renovation',
          description:
            'Renovation et rehabilitation de batiments anciens avec respect du patrimoine.',
          color: '#0891B2',
        },
      ],
      stats: [
        { icon: 'folder', value: '150+', label: 'Projets Realises' },
        { icon: 'groups', value: '500+', label: 'Clients Satisfaits' },
        { icon: 'calendar_month', value: '10+', label: "Annees d'Experience" },
        { icon: 'emoji_people', value: '25+', label: 'Experts Devoues' },
      ],
      teamMembers: [
        {
          name: 'M. Gansou',
          role: 'Directeur General',
          image: 'https://via.placeholder.com/300x300?text=DG',
          linkedin: '#',
          email: 'direction@maisongansou.com',
        },
        {
          name: 'Architecte Principal',
          role: 'Chef Architecte',
          image: 'https://via.placeholder.com/300x300?text=Architecte',
          linkedin: '#',
          email: 'architecture@maisongansou.com',
        },
        {
          name: 'Responsable Projets',
          role: 'Chef de Projets',
          image: 'https://via.placeholder.com/300x300?text=Chef+Projets',
          linkedin: '#',
          email: 'projets@maisongansou.com',
        },
        {
          name: 'Responsable Hebergement',
          role: 'Directrice Hebergement',
          image: 'https://via.placeholder.com/300x300?text=Hebergement',
          linkedin: '#',
          email: 'hebergement@maisongansou.com',
        },
      ],
      reasons: [
        {
          title: 'Expertise Reconnue',
          description:
            "Plus de 10 ans d'experience dans le domaine de l'architecture et de la construction au Benin.",
        },
        {
          title: 'Approche Personnalisee',
          description:
            'Chaque projet est unique. Nous adaptons nos solutions a vos besoins specifiques.',
        },
        {
          title: 'Qualite Superieure',
          description:
            'Nous utilisons uniquement des materiaux de premiere qualite et respectons les normes internationales.',
        },
        {
          title: 'Suivi Rigoureux',
          description:
            'Un accompagnement de A a Z avec une communication transparente tout au long du projet.',
        },
      ],
    }
  },
  mounted() {
    AOS.init({
      once: true,
      offset: 100,
    })
    window.scrollTo(0, 0)
  },
  methods: {
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/600x400?text=Maison+Gansou'
    },
    handleTeamImageError(event) {
      event.target.src = 'https://via.placeholder.com/300x300?text=Team+Member'
    },
  },
}
</script>

<style scoped>
/* General Styles */
.about-us-page {
  font-family: 'Poppins', sans-serif;
  color: #1f2937;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-tag {
  display: inline-block;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 15px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 15px;
}

.section-description {
  color: #6b7280;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 400px;
  /* background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); */
  background-image: url("@/assets/pictures/D.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  /* background: linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(124, 58, 237, 0.85) 100%); */
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 25px;
}

.hero-breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.95rem;
}

.hero-breadcrumb a {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.hero-breadcrumb a:hover {
  opacity: 1;
}

.hero-breadcrumb .separator {
  opacity: 0.5;
}

.hero-breadcrumb .current {
  opacity: 1;
  font-weight: 500;
}

/* Introduction Section */
.intro-section {
  padding: 100px 0;
  background: #fafafa;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.intro-image {
  position: relative;
}

.intro-image .main-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.experience-badge {
  position: absolute;
  bottom: -30px;
  right: -30px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 25px 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 15px 30px rgba(79, 70, 229, 0.3);
}

.experience-badge .years {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.experience-badge .text {
  font-size: 0.85rem;
  opacity: 0.9;
}

.intro-content .section-title {
  font-size: 2.2rem;
}

.intro-text {
  color: #6b7280;
  line-height: 1.8;
  margin-bottom: 20px;
}

.intro-features {
  display: flex;
  gap: 25px;
  margin-top: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4f46e5;
  font-weight: 500;
}

.feature-item .material-symbols-outlined {
  font-size: 1.2rem;
}

/* MVV Section */
.mvv-section {
  padding: 100px 0;
  background: white;
}

.mvv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.mvv-card {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border-top: 4px solid;
}

.mvv-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}

.mvv-card.mission {
  border-color: #4f46e5;
}

.mvv-card.vision {
  border-color: #059669;
}

.mvv-card.values {
  border-color: #dc2626;
}

.mvv-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.mvv-card.mission .mvv-icon {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.mvv-card.vision .mvv-icon {
  background: rgba(5, 150, 105, 0.1);
  color: #059669;
}

.mvv-card.values .mvv-icon {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
}

.mvv-icon .material-symbols-outlined {
  font-size: 2rem;
}

.mvv-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1f2937;
}

.mvv-card p {
  color: #6b7280;
  line-height: 1.7;
}

/* Services Section */
.services-section {
  padding: 100px 0;
  background: #f9fafb;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  background: white;
  padding: 35px 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 70px;
  height: 70px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.service-icon .material-symbols-outlined {
  font-size: 2rem;
}

.service-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
}

.service-card p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  position: relative;
  padding: 80px 0;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.stats-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.95) 0%, rgba(124, 58, 237, 0.9) 100%);
}

.stats-section .container {
  position: relative;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.stat-item {
  text-align: center;
  color: white;
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  opacity: 0.8;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* Team Section */
.team-section {
  padding: 100px 0;
  background: white;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.team-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
}

.team-card:hover {
  transform: translateY(-10px);
}

.team-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.team-card:hover .team-image img {
  transform: scale(1.1);
}

.team-social {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  display: flex;
  justify-content: center;
  gap: 15px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s;
}

.team-card:hover .team-social {
  opacity: 1;
  transform: translateY(0);
}

.team-social a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  transition: all 0.3s;
}

.team-social a:hover {
  background: #4f46e5;
  color: white;
}

.team-info {
  padding: 20px;
  text-align: center;
}

.team-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 5px;
}

.team-info .role {
  color: #6b7280;
  font-size: 0.9rem;
}

/* Why Us Section */
.why-us-section {
  padding: 100px 0;
  background: #f9fafb;
}

.why-us-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.why-us-content .section-title {
  font-size: 2.2rem;
}

.reasons-list {
  margin-top: 30px;
}

.reason-item {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.reason-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.reason-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 5px;
}

.reason-content p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
}

.why-us-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

/* CTA Section */
.cta-section {
  position: relative;
  padding: 100px 0;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.95) 0%, rgba(124, 58, 237, 0.9) 100%);
}

.cta-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.cta-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 35px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-primary {
  background: white;
  color: #4f46e5;
}

.btn-primary:hover {
  background: #f3f4f6;
  transform: translateY(-3px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #4f46e5;
  transform: translateY(-3px);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .intro-grid,
  .why-us-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .experience-badge {
    bottom: 20px;
    right: 20px;
  }

  .mvv-grid,
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-grid,
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .intro-section,
  .mvv-section,
  .services-section,
  .team-section,
  .why-us-section {
    padding: 60px 0;
  }

  .mvv-grid,
  .services-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  .stat-number {
    font-size: 2.2rem;
  }

  .intro-features {
    flex-direction: column;
    gap: 15px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .why-us-image {
    order: -1;
  }

  .why-us-image img {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 50vh;
    min-height: 350px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.7rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .experience-badge {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
    display: inline-block;
  }

  .intro-image {
    text-align: center;
  }

  .team-image {
    height: 220px;
  }
}
</style>
