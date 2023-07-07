<script setup>
import { doc, getDoc, collection } from "firebase/firestore";
import { useDocument, useFirestore } from "vuefire";
const user = useCurrentUser();
const db = useFirestore();
// automatically waits for the data to be loaded on the server
const calls = useCollection(
  collection(db, "call_logs"),
  where(documentId(), "in", 10)
);
</script>

<template>
  <ul>
    <li>{{ user }}</li>
    <li v-for="call in calls" :key="call.id">
      <span>{{ call.duration }}</span>
      <span>{{ call.type }}</span>
      <span>{{ call.date }}</span>
      <span>{{ call.deviceName }}</span>
      <span>{{ call.number }}</span>
    </li>
  </ul>
</template>
