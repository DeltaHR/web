<template>
    <div v-if="user" class="flex items-center gap-2 md:gap-4">
        <img v-if="user.photoURL" :src="user.photoURL" alt="profile picture" class="aspect-square w-8 md:w-10 rounded-full">
        <span class="collapsed-hidden inline-block text-lg md:taxt-2xl">{{ user.displayName }}</span>
    </div>
</template>

<script setup lang="ts">
import { User } from 'firebase/auth';

const user = useCurrentUser() as Ref<User|null>

</script>
