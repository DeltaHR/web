<template>
  <div>
    <ClientOnly>
      <DataTable v-if="calls.length > 0" :data="computedCalls" class="display" :options="{ select: true }">
        <thead>
          <tr>
            <th v-for="key,index in Object.keys(calls[0]).sort()" :key="index">
            {{ key }}</th>
          </tr>
        </thead>
      </DataTable>
    </ClientOnly>
  </div>
</template>

<script setup>
  import DataTable from "datatables.net-vue3";
  import DataTablesLib from "datatables.net";
  import { collection, query, limit } from "firebase/firestore";
  import { useCollection, useFirestore } from "vuefire";
  const db = useFirestore();
  DataTable.use(DataTablesLib);
  // automatically waits for the data to be loaded on the server
  const calls = useCollection(query(collection(db, "call_logs"), limit(3)));

  const computedCalls = computed(()=>{
    let formattedData = []
    if (calls.value) {
      calls.value.forEach((call)=>{
        let row = [
          call.date,
          call.deviceName,
          call.duration,
          call.number,
          call.type
        ]
        formattedData.push(row)
      })
    }
    return formattedData
  })
  let letCallsFormat = [];

  const dat = [
    [1, 2, 1, 2, 1],
    [3, 4, 3, 4, 3],
  ];
</script>

<style>
@import 'datatables.net-dt';
</style>
