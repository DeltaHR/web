<template>
  <div class="w-full container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Nieodebrane'" :show-unanswered="true" :pending="pending || initialLoading" :length-menu="[25,50,100]" />
  </div>
  <div class="w-full container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Wszystkie połączenia'" :pending="pending || initialLoading" />
  </div>
</template>

<script setup lang="ts">
import { useCallsStore } from "~/stores/callsStore";
import { collection, query, where, limit } from "firebase/firestore";

const callsStore = useCallsStore()
const initialLoading = ref(true)
const loadedOnce = ref(false)
const updateIndicator = useState('autoupdate',() => false)

const callsQuery = computed(()=>{
  return query(
    callsRef,
    where('date','>',callsStore.dateRange[0]),
    where('date','<',callsStore.dateRange[1]),
    limit(50))
})
 
const db = useFirestore();
const callsRef = collection(db, "/CallLog")
const {data: calls, promise, pending } = useCollection(callsQuery)

promise.value.then(() => initialLoading.value = false)

watch(calls,(newCalls) => {
  
  const idSet = new Set(callsStore.getCalls.map(obj => obj.id));
  const newDocuments = newCalls.filter(obj => !idSet.has(obj.id));
  
  callsStore.addCalls(newDocuments as Call[])

  if (loadedOnce.value === false) {
    console.log('update');  
    loadedOnce.value = true
    return
  }

  if (newDocuments.length > 0) {
    updateIndicator.value = true
  }
  
},{deep: true})

</script>
