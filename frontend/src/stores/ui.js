import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isLoading: false,
    isMenuOpen: false,
    isFilterOpen: false,
    showServicesNav: false,
    servicesNavItems: [],
  }),
  actions: {
    showLoader() {
      this.isLoading = true
    },
    hideLoader() {
      this.isLoading = false
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    openMenu() {
      this.isMenuOpen = true
    },
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen
    },
    closeFilter() {
      this.isFilterOpen = false
    },
    openFilter() {
      this.isFilterOpen = true
    },
    setServicesNav(show, items = []) {
      this.showServicesNav = show
      this.servicesNavItems = items
    },
    hideServicesNav() {
      this.showServicesNav = false
    },
  },
})
