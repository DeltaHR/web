<template>
  <div class="w-full container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Nieodebrane'" :show-unanswered="true" :pending="isPending" :length-menu="[100,50,25]" />
  </div>
  <div class="w-full container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Wszystkie połączenia'" :pending="isPending" />
  </div>
</template>

<script setup lang="ts">
import { useCallsStore } from "~/stores/callsStore";
import { collection, limit, query, where } from "firebase/firestore";

const callsStore = useCallsStore()

let dateEnd = new Date() 
let dateStart = new Date('2023-07-17')
const isPending = ref(true)
const loadedOnce = ref(false)
const updateIndicator = useState('autoupdate',() => false)

const db = useFirestore();
const callsRef = collection(db, "/CallLog")
const {data: calls, promise} = useCollection(query(callsRef,where('date','<',dateEnd), where('date','>',dateStart), limit(100)))

promise.value.then(() => isPending.value = false)

watch(calls,(newCalls) => {
  
  const idSet = new Set(callsStore.getCalls.map(obj => obj.id));
  const newDocuments = newCalls.filter(obj => !idSet.has(obj.id));
  
  callsStore.addCalls(newDocuments as Call[])
  
  if (loadedOnce.value === false) {
    console.log('update');  
    loadedOnce.value = true
    return
  }

  updateIndicator.value = true
  
},{deep: true})

</script>
