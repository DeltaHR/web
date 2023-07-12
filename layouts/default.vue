<template>
    <div>
        <div v-if="!user" class="h-screen w-screen flex justify-center items-center">
            <div>
                <p>
                    Await for login...
                </p>
            </div>
        </div>
        <div v-else>
            <slot />
        </div>
    </div>
</template>

<script setup>

    const user = useCurrentUser()
    
</script>

<style>

</style>