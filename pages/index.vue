<template>
  <div class="w-full lg:container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Nieodebrane'" :show-unanswered="true" :pending="(pending || initialLoading) && !error" :length-menu="[25,50,100,200,1000,2000,5000]" />
  </div>
  <div class="w-full lg:container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Wszystkie połączenia'" :pending="(pending || initialLoading) && !error" :length-menu="[25,50,100,200,1000,2000,5000]" />
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
  if (process.dev) {
    return query(
    callsRef,
    where('date','>',callsStore.dateRange[0]),
    where('date','<',callsStore.dateRange[1]),
    limit(100))

  }else{
    return query(
      callsRef,
      where('date','>',callsStore.dateRange[0]),
      where('date','<',callsStore.dateRange[1]),
      )
  }

})
 
const db = useFirestore();
const callsRef = collection(db, "/CallLog")
const {data: calls, promise, pending, error } = useCollection(callsQuery)
watch(error,()=>{
  callsStore.error = error.value
})

promise.value.then(() => initialLoading.value = false)

watch(calls,(newCalls) => {
  
  const idSet = new Set(callsStore.getCalls.map(obj => obj.id));
  const newDocuments = newCalls.filter(obj => !idSet.has(obj.id));
  
  callsStore.addCalls(newDocuments as Call[])
  if (loadedOnce.value === false) {
    loadedOnce.value = true
    return
  }

  if (newDocuments.length > 0) {
    updateIndicator.value = true
  }
  
},{deep: true})

</script>
