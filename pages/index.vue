<template>
  <div class="container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Nieodebrane'" :show-unanswered="true" :pending="pending" :length-menu="[100,50,25]" />
  </div>
  <div class="container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Wszystkie połączenia'" :pending="pending" />
  </div>
</template>

<script setup lang="ts">
import { useCallsStore } from "~/stores/callsStore";
import { collection, limit, query, where } from "firebase/firestore";

const callsStore = useCallsStore()

let dateEnd = new Date('2023-07-18') 
let dateStart = new Date('2023-07-17')


const { data, pending, error, refresh } = useAsyncData(
  async () => {
    const db = useFirestore();
    const callsRef = collection(db, "/CallLog")
    const {data: calls,promise} = useCollection(query(callsRef,where('date','<',dateEnd), where('date','>',dateStart),limit(100)));
    
    await promise.value      
    callsStore.addCalls(calls.value as Call[])
  },{
    server: false
  }
)
</script>
