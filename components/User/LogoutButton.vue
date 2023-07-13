<template>
    <UiButton @click="logoutUser()">
        Wyloguj
    </UiButton>
</template>

<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth";

    function logoutUser(){
        const auth = getAuth();
        signOut(auth);

        (window as Window).location = 'https://deltahr.pl/'
    }</script>