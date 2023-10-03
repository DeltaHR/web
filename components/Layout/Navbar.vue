
<template>
    <div class="sticky inset-x-0 top-0 z-40 w-full mb-10 dark:bg-slate-900/50 bg-blue-200/50 backdrop-blur-md">
    <div class="lg:container px-5 md:px-10 mx-auto">
        <div class="flex items-center justify-between h-14">
            <img v-if="isDark" height="50" width="150" src="/images/deltaHR-logo-white.png" referrerpolicy="no-referrer">
            <img v-else height="50" width="150" src="/images/deltaHR-logo.png" referrerpolicy="no-referrer">
            <CommonUpdateIndicator />      
        </div>
    </div>
</div>
</template>

<script setup>
const colorMode = useColorMode()
const isDark = computed(()=>
   colorMode.value === 'dark' 
)
</script>


