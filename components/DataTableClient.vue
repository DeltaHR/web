<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { collection, query, limit } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
const db = useFirestore();
DataTable.use(DataTablesLib);
// automatically waits for the data to be loaded on the server
const calls = useCollection(query(collection(db, "call_logs"), limit(3)));
let letCallsFormat = [];
console.log(calls);
// calls.value.forEach((element) => {
//   console.log(element);
//   letCallsFormat[index] = element;
// });

const dat = [
  [1, 2],
  [3, 4],
];
</script>

<template>
  <div>
    <ClientOnly>
      <DataTable :data="dat" class="display" :options="{ select: true }">
        <thead>
          <tr>
            <th>First</th>
            <th>Second</th>
            <th>Second</th>
            <th>Second</th>
            <th>Second</th>
          </tr>
        </thead>
      </DataTable>
    </ClientOnly>
  </div>
</template>
