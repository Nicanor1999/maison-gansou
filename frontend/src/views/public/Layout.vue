<template>
  <div>
    <SidebarComponent class="z-2" />
    <HiddenComponent class="z-1" />

    <router-view class="z-0"></router-view>
  </div>
</template>
<script>
import SidebarComponent from '@/components/views/public/SidebarComponent.vue'
import HiddenComponent from '@/components/views/public/HiddenComponent.vue'

export default {
  name: 'LayoutPublicView',
  components: {
    SidebarComponent,
    HiddenComponent,
  },
}
</script>
