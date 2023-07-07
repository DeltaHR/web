<script setup>
import { collection, query, limit } from "firebase/firestore";
import { useFirestore } from "vuefire";
const user = useCurrentUser();
const db = useFirestore();
// automatically waits for the data to be loaded on the server
const calls = useCollection(query(collection(db, "call_logs"), limit(100)));
</script>

<template>
  <ul>
    <li>{{ user }}</li>
    <li v-for="call in calls" :key="call.deviceName">
      <span>{{ call.duration }}</span>
      <span>{{ call.type }}</span>
      <span>{{ call.date }}</span>
      <span>{{ call.deviceName }}</span>
      <span>{{ call.number }}</span>
    </li>
  </ul>
</template>
