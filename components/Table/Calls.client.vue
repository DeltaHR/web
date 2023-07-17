<template>
  <h2 v-if="title" class=" sticky top-12 z-20 text-2xl md:text-3xl mb-5 md:mb-8 text-gray-700 font-semibold border-b border-blue-950/10 py-2 bg-white">{{ title }}</h2>
  <DataTable v-if="computedCalls && computedCols" :columns="computedCols" class="display">
    <tbody>
      <tr v-for="row,index in computedCalls" :key="index"
      :class="[index % 2 != 0 ? 'odd': 'even']">
        <td v-for="(item,key) in row" class="h-6">
          <TableItemStatus v-if="key == 'status'" :value="(item as CallFormatted['status'])"/>
          <div v-else-if="key == 'date'">
            {{ item.toLocaleString() }}
          </div>
          <div v-else>
            {{ item }}
          </div>
        </td>
      </tr>
    </tbody>
  </DataTable>

  <table v-else-if="pending" class="display w-full dataTable pt-10 max-h-screen overflow-hidden">
    <tbody>
      <tr v-for="index in 5" :key="index"
      class="animate-pulse pointer-events-none"
      :class="[index % 2 != 0 ? 'odd': 'even']"
      :style="{'animation-delay': `${index * 100}ms`}">
        <td class="h-6">
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { useCallsStore } from "~/stores/callsStore";

// const db = useFirestore();
// automatically waits for the data to be loaded on the server
// const calls = useCollection(query(collection(db, "call_logs"), limit(1000)));

DataTable.use(DataTablesLib);

const props = withDefaults(defineProps<{
  title?: String
  showUnanswered?: boolean
  pending: boolean,
}>(),{
  showUnanswered: false,
  pending:true
})

const callsStore = useCallsStore()

const computedCalls = computed(() => {
  if (props.showUnanswered) {
    return filterUnanswered(callsStore.getCalls)
  }
  return callsStore.getCalls
});

const computedCols = computed(()=>{
  if (computedCalls.value && computedCalls.value.length > 0) {
    return Object.keys(computedCalls.value[0]).map((key)=>{
      return {
        data: key,
        title:key
      } 
    })
  }
})
</script>

<style>
@import "datatables.net-dt";
</style>
