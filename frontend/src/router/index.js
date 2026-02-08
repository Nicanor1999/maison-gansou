import { createRouter, createWebHistory } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import * as Admin from '@/views/admin'
import * as Public from '@/views/public'
import * as Services from '@/views/services'
import LoginView from '@/views/Login.vue'

const routes = [
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/admin/login',
        name: 'admin-login',
        component: Admin.LoginAdminView
    },
    {
      path: '/',
      name: 'public',
      component: Public.LayoutPublicView,
      children:[
        {path:'/', name:'home', component: Public.HomePublicView},
        {path:'/about-us', name:'about-us', component: Public.AboutUsPublicView},
        {path:'/blog', name:'blog', component: Public.BlogPublicView},
        {path:'/blog/:id', name:'blog-article', component: Public.ArticlePublicView},
        {path:'/bookings', name:'bookings', component: Public.BookingsPublicView},
        {path:'/contacts', name:'contacts', component: Public.ContactsPublicView},
        {path:'/projects', name:'projects', component: Public.ProjectsPublicView},
        {path:'/projects/:id', name:'projects-selected', component: Public.ProjectsSelected},
        {path:'/recruitment', name:'recruitment', component: Public.RecruitmentPublicView},
        {path:'/testimonials', name:'testimonials', component: Public.TestimonialsPublicView}
      ]
  },
  {
    path: '/services',
    name: 'services',
    component: Services.LayoutServicesView,
    children:[
      {path:'/services', name:'services-home', component: Services.HomeServicesView},
      {path:'/services/architectural-design', name:'archi-design', component: Services.ArchiDesignView},
      {path:'/services/design-build', name:'design-build', component: Services.DesignBuildView},
      {path:'/services/immo-gest', name:'immo-gest', component: Services.ImmoGestView},
      {path:'/services/interior-design', name:'interior-design', component: Services.InteriorDesignView},
    ]
  },
    {
        path: '/admin',
        name: 'admin',
        component: Admin.LayoutAdminView,
        meta: { requiresAuth: true },
        children: [
            { path:'/admin', name:'admin-dashboard', component: Admin.DashboardView },
            { path:'/admin/blog', name:'admin-blog', component: Admin.BlogView },
            { path:'/admin/bookings', name:'admin-bookings', component: Admin.BookingsView },
            { path:'/admin/projects', name:'admin-projects', component: Admin.ProjectsView },
            { path:'/admin/mailbox', name:'admin-mailbox', component: Admin.MailBoxView }
        ]
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: { name: 'ticket' }
    // }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
      return { top: 0 }
    }
})

// Session timeout: 3 hours in milliseconds
const SESSION_TIMEOUT = 3 * 60 * 60 * 1000

// Check if admin session has expired
function isSessionExpired() {
  const loginTime = localStorage.getItem('adminLoginTime')
  if (!loginTime) return true
  const elapsed = Date.now() - parseInt(loginTime, 10)
  return elapsed > SESSION_TIMEOUT
}

// Clear admin session data
function clearAdminSession() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
  localStorage.removeItem('adminLoginTime')
  localStorage.removeItem('rememberMe')
}

router.beforeEach((to, from, next) => {
  const ui = useUiStore()
  ui.showLoader()

  if (to.meta.requiresAuth) {
    const accessToken = localStorage.getItem('accessToken')

    // Check if token exists and session is not expired
    if (!accessToken || isSessionExpired()) {
      clearAdminSession()
      ui.hideLoader()
      // Store intended destination for redirect after login
      if (to.name !== 'admin-login') {
        localStorage.setItem('redirectAfterLogin', to.fullPath)
      }
      return next({ name: 'admin-login', query: { expired: isSessionExpired() && accessToken ? '1' : undefined } })
    }
  }

  next()
})

// afterEach: le loader est géré par App.vue (MutationObserver + waitForImages)

export default router;
