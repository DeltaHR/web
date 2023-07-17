<template>
    <div>
        <LayoutLoadingScreen v-if="!user" />
        <div v-else class="flex flex-row h-screen">
            <LayoutSidebar/>
            <div class="w-full h-full overflow-auto">
                <LayoutNavbar class="mb-10" />
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>

    const user = useCurrentUser()
    
</script>

<style>

</style>