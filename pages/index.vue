<template>
  <div class="container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Nieodebrane'" :show-unanswered="true" :pending="pending" />
  </div>
  <div class="container mx-auto px-5 md:px-10 mb-20">
    <TableCalls :title="'Wszystkie połączenia'" :pending="pending" />
  </div>
</template>

<script setup lang="ts">
import { useCallsStore } from "~/stores/callsStore";

const callsStore = useCallsStore()

const delay = async () => {
  // temporary fake delay
  return new Promise(resolve=>
    setTimeout(()=>resolve(true),1000)
  )
}

const { data, pending, error, refresh } = useAsyncData<Call[]>(
  async () => {
    await delay();

    const calls = await $fetch('./data.example.json') as Call[];
    callsStore.addCalls(calls)

    return calls
  },{
    server: false
  }
)
</script>
