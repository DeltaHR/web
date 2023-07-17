<template>
    <div v-if="user" class="flex justify-center items-center gap-2">
        <img v-if="user.photoURL" :src="user.photoURL" alt="profile picture" class="w-7 h-7 rounded-full">
        <span class="hidden md:inline-block text-lg md:taxt-2xl">{{ user.displayName }}</span>
    </div>
</template>

<script setup lang="ts">
import { User } from 'firebase/auth';

const user = useCurrentUser() as Ref<User|null>

</script>