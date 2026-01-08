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
      path: '/',
      name: 'public',
      component: Public.LayoutPublicView,
      children:[
        {path:'/', name:'home', component: Public.HomePublicView},
        {path:'/about-us', name:'about-us', component: Public.AboutUsPublicView},
        {path:'/blog', name:'blog', component: Public.BlogPublicView},
        {path:'/bookings', name:'bookings', component: Public.BookingsPublicView},
        {path:'/contacts', name:'contacts', component: Public.ContactsPublicView},
        {path:'/projects', name:'projects', component: Public.ProjectsPublicView},
        {path:'/recruitment', name:'recruitment', component: Public.RecruitmentPublicView},
        {path:'/testimonials', name:'testimonials', component: Public.TestimonialsPublicView}
      ]
  },
  {
    path: '/services',
    name: 'services',
    component: Services.LayoutServicesView,
    children:[
      {path:'/services/architecture-design', name:'archi-design', component: Services.ArchiDesignView},
      {path:'/services/design-build', name:'design-build', component: Services.DesignBuildView},
      {path:'/services/immo-gest', name:'immo-gest', component: Services.ImmoGestView},
      {path:'/services/interior-design', name:'interior-design', component: Services.InteriorDesignView},
    ]
  },
    {
        path: '/admin',
        name: 'admin',
        component: Admin.LayoutAdminView,
        // meta: { requiresAuth: true },
        children: [
            { path:'/admin', name:'admin-dashboard', component: Admin.DashboardView },
            { path:'/admin/blog', name:'admin-blog', component: Admin.BlogView },
            { path:'/admin/bookings', name:'admin-bookings', component: Admin.BookingsView },
            { path:'/admin/projects', name:'admin-projects', component: Admin.ProjectsView },
        ]
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: { name: 'ticket' }
    // }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
  const ui = useUiStore()
  ui.showLoader()

  if (to.meta.requiresAuth) {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      ui.hideLoader()
      return next({ name: 'home' })
    }
  }

  next()
})

router.afterEach(() => {
  const ui = useUiStore()
  ui.hideLoader()
})

export default router;
