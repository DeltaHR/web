<template>
    <div>
        <LayoutLoadingScreen v-if="!user" />
        <div v-else>
            <LayoutNavbar class="mb-10" />
            <slot />
        </div>
    </div>
</template>

<script setup>

    const user = useCurrentUser()
    
</script>

<style>

</style>