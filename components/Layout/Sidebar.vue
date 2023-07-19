<template>
  <div
    class="absolute md:static top-14 bottom-0 z-30 shrink-0 bg-slate-900 py-5 overflow-x-hidden transition-all duration-500"
    :class="[isCollapsed ? 'collapsed w-14 md:w-16 md:pt-2' : 'w-72 md:pt-[84px]']"
    @click.native="isCollapsed ? toggleCollapse() : null"

  >
    <div class="flex flex-col w-72 h-full px-3">
      <div class="border-b border-slate-800 mb-5">
        <UserInfo class="text-white transition-all duration-500" :class="[isCollapsed ? 'mb-5 md:mb-2' : 'mb-5']" />
      </div>
      <CommonDateRange />
      <div class="collapsed-hidden mt-auto border-t border-slate-800 pt-5 mb-5">
        <UserLogoutButton class="text-white" />
      </div>
      <div class="border-t border-slate-800 pt-5">
        <button
          class="ml-auto block group px-1 md:px-2 transition-transform duration-500"
          @click.stop="toggleCollapse"
          :class="{ '-translate-x-[235px] md:-translate-x-[225px]': isCollapsed }"
        >
          <svg
            class="w-5 h-5 fill-slate-200 transition duration-500 group-hover:fill-blue-400"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            :class="{ '-rotate-180': isCollapsed }"
          >
            <path
              d="M706.2 958.6c-15 0-30.1-5.7-41.5-17.2L277.1 553.8c-22.9-22.9-22.9-60.1 0-83L664.7 83.2c22.9-22.9 60.1-22.9 83 0s22.9 60.1 0 83l-346 346 346 346c22.9 22.9 22.9 60.1 0 83-11.4 11.6-26.5 17.4-41.5 17.4z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isCollapsed = ref(false);

onMounted(()=>{
    if (window.innerWidth < 768) {
        isCollapsed.value = true
    }
})

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
</script>
<style scoped>
:deep(.collapsed-hidden) {
  @apply transition duration-500;
}
.collapsed:deep(.collapsed-hidden) {
  @apply opacity-0 pointer-events-none;
}
</style>
