<template>
  <div class="bg-white relative">
    <div class="header relative h-screen w-screen bg-red-400">
      <nav class="h-[10vh] w-auto flex justify-center items-end pt-[20vh] md:pt-[25vh]">
        <ul class="flex h-auto w-full md:w-[70%] gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar text-gray-500">
          <li class="min-w-max h-[4vh] bg-white flex items-center justify-center">
            <router-link to="/services/architectural-design" class="px-2 py-2 text-center hover:text-black">CONCEPTION ARCHITECTURALE</router-link>
          </li>
          <li class="min-w-max h-[4vh] bg-white flex items-center justify-center">
            <router-link to="/services/interior-design" class="px-2 py-2 text-center hover:text-black">DECORATION TEXTILE</router-link>
          </li>
          <li class="min-w-max h-[4vh] bg-white flex items-center justify-center">
            <router-link to="/services/design-build" class="px-2 py-2 text-center hover:text-black">CONCEPTION ET CONSTRUCTION</router-link>
          </li>
          <li class="min-w-max h-[4vh] bg-white flex items-center justify-center">
            <router-link to="/services/immo-gest" class="px-2 py-2 text-center hover:text-black">GESTION IMMOBILIERE</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeServicesView',
}
</script>
<style scoped>
@media (min-width: 768px) {
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE et Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari et Opera */
}
}
@media (min-width: 1536px) {
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE et Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari et Opera */
}
}
</style>
