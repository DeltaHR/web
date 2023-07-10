<script setup>

import { collection, query, limit } from "firebase/firestore";
import { useFirestore } from "vuefire";
const db = useFirestore();
// automatically waits for the data to be loaded on the server
const calls = useCollection(query(collection(db, "call_logs"), limit(5)));
</script>

<template>
  <div>
    <DataTable class="display" :options="{ select: true }">
      <thead>
        <tr>
          <th>First</th>
          <th>Second</th>
          <th>Second</th>
          <th>Second</th>
          <th>Second</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="call in calls" :key="call.deviceName">
          <td>{{ call.duration }}</td>
          <td>{{ call.type }}</td>
          <td>{{ call.date }}</td>
          <td>{{ call.deviceName }}</td>
          <td>{{ call.number }}</td>
        </tr>
      </tbody>
    </DataTable>
  </div>
</template>
