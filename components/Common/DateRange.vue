<template>
    <div class="text-slate-200">
    <div class="flex">
      <svg class="shrink-0 ml-1 md:ml-1.5 mr-3 md:mr-[26px] fill-slate-200" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
        />
      </svg>
      <h3 class="collapsed-hidden text-base md:text-lg mb-2">Zakres czasu</h3>
    </div>

    <div class="collapsed-hidden">
        <span class="mb-1 block">od:</span>
        <input
          type="date"
          class="w-full accent-slate-800 appearance-none bg-blue-400/10 hover:bg-blue-400/20 text-white p-2 rounded-md mb-5 transition duration-200"
        />
        <span class="mb-1 block">do:</span>
        <input type="date" class="w-full accent-slate-800 appearance-none bg-blue-400/10 hover:bg-blue-400/20 text-white p-2 rounded-md" />
    </div>
    <div class="collapsed-hidden border-b border-slate-800"></div>
  </div>
</template>

<script setup lang="ts">

</script>