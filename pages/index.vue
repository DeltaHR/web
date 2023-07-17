<template>
  <div class="container mx-auto px-10 mb-20">
    <TableMain :data="data" :show-unanswered="true" />
  </div>
  <div class="container mx-auto px-10 mb-20">
    <TableMain :data="data" />
  </div>
</template>

<script setup lang="ts">

const delay = async () => {
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
