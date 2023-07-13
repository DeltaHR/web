
<template>
    <div class="w-full bg-blue-100">
    <div class="container px-10 mx-auto">
        <div class="flex items-center justify-between">
            <img height="50" width="150" src="/images/deltaHR-logo.png">
            <div class="flex items-center gap-5 py-2">
                <div v-if="user" class="flex justify-center items-center gap-2">
                    <img v-if="user.photoURL" :src="user.photoURL" alt="profile picture" class="w-7 h-7 rounded-full">
                    <span>{{ user.displayName }}</span>
                </div>
                <button class="px-4 py-1.5 border-2 border-blue-300 hover:bg-blue-400/20 rounded-md transition duration-200" 
                @click="logoutUser">
                    Wyloguj
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { User, getAuth, signOut } from "firebase/auth";

    const user = useCurrentUser() as Ref<User|null>

    function logoutUser(){
        const auth = getAuth()
        signOut(auth)

        if (process.client) {
            (window as Window).location = 'https://deltahr.pl/'
        }
    }

</script>

<style>

</style>