<template>
  <UiButton @click="logoutUser()"> Wyloguj </UiButton>
</template>

<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth";

const router = useRouter()

function logoutUser() {
  const auth = getAuth();
  signOut(auth);

  router.push({path:'/'})
}
</script>
