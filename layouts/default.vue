<template>
    <div>
        <LayoutLoadingScreen v-if="!user" />
        <div v-else class="flex flex-row h-screen">
            <LayoutSidebar/>
            <div class="w-full h-full overflow-auto">
                <LayoutNavbar />
                <main class="pl-14 md:pl-0">
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>

    const user = useCurrentUser()
    
</script>

<style>

</style>