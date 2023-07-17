<template>
  <DataTable v-if="computedCalls && computedCols" :columns="computedCols" class="display">
    <tbody>
      <tr v-for="row,index in computedCalls" :key="index"
      :class="[index % 2 != 0 ? 'odd': 'even']">
        <td v-for="(item,key) in row" class="h-6">
          <TableItemStatus v-if="key == 'status'" :value="(item as CallFormatted['status'])"/>
          <div v-else>
            {{ item }}
          </div>
        </td>
      </tr>
    </tbody>
  </DataTable>

  <table v-else class="display w-full dataTable pt-20 max-h-screen overflow-hidden">
    <tbody>
      <tr v-for="index in 10" :key="index"
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
// const db = useFirestore();
DataTable.use(DataTablesLib);

const props = withDefaults(defineProps<{
  data: Call[],
  showUnanswered?: boolean
}>(),{
  showUnanswered: false
})
// automatically waits for the data to be loaded on the server
// const calls = useCollection(query(collection(db, "call_logs"), limit(1000)));

const computedCalls = computed(() => {
  if (props.data) {
    const calls = formatCalls(props.data)

    if (props.showUnanswered) {
      return filterUnanswered(calls)
    }

    return calls
  }
});

const computedCols = computed(()=>{
  if (computedCalls.value) {
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
