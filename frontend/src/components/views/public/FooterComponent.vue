<template>
  <div class="footer h-[85%] w-[93%]">
    <div class="h-[66%] w-full flex flex-col justify-between">
      <div class="h-[20%] text-center">
        Si vous avez un projet ou une commande dont vous souhaitez discuter,
        <a class="underline hover:text-[var(--second-orange)]" href="#">envoyez-nous un email</a> ou
        appelez-nous au +229 01 60 73 97 55
      </div>
      <div class="h-[35%] w-full flex justify-between md:justify-around">
        <div class="h-full w-[30%] md:h-full md:w-[10%] flex items-center">
          <img class="h-full w-full" src="@/assets/pictures/MG logo 2.png" alt="" />
        </div>
        <div class="h-full w-[35%] flex justify-end">
          <ul class="h-full  flex flex-col justify-around text-right">
            <li class="underline">SUIVEZ-NOUS</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Tiktok</li>
          </ul>
        </div>
      </div>
      <div class="h-[15%] md:h-[20%] w-full flex flex-col justify-between items-center">
        <span class="text-[var(--second-orange)] font-bold">NEWSLETTER</span>
        <form class="w-[80%] md:w-[40%] flex justify-between border-b-[2px] border-white" action="">
          <input
            type="email"
            class="outline-none focus:outline-none border-none italic"
            placeholder="Entrez votre adresse email"
          />
          <input
            type="submit"
            value="SOUSCRIRE"
            class="text-xs cursor-pointer hover:text-[var(--second-orange)]"
          />
        </form>
      </div>
    </div>
    <div class="h-[33%] w-full flex items-end">
      <div class="h-[50%] w-full flex items-end justify-center">
        <!-- <div class="h-[40%] w-full flex justify-around">
          <img src="@/assets/pictures/MG logo 2.png" alt="" />
          <img src="@/assets/pictures/MG logo 2.png" alt="" />
          <img src="@/assets/pictures/MG logo 2.png" alt="" />
          <img src="@/assets/pictures/MG logo 2.png" alt="" />
        </div> -->
        <div class="text-center">
          <span> © 2026 Maison Gansou. Tous droits réservés. </span>
          <div>Site By:</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterComponent',
}
</script>
<style>
.footer {
  color: white;
}
</style>
