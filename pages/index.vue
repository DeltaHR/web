<template>
  <div class="container mx-auto px-10 mb-20">
    <TableCalls :data="data" :title="'Nieodebrane'" :show-unanswered="true" :pending="pending" />
  </div>
  <div class="container mx-auto px-10 mb-20">
    <TableCalls :data="data" :title="'Wszystkie połączenia'" :pending="pending" />
  </div>
</template>

<script setup lang="ts">

const delay = async () => {
  // temporary fake delay
  return new Promise(resolve=>
    setTimeout(()=>resolve(true),1000)
  )
}

const { data, pending, error, refresh } = useAsyncData<Call[]>(
  async () => {
  await delay();
    return $fetch('./data.example.json');
  },{
    server: false
  }
)
</script>
