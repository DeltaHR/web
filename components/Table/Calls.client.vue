<template>
  <h2
    v-if="title"
    class="sticky top-12 z-20 text-2xl md:text-3xl mb-5 md:mb-8 text-gray-700 font-semibold border-b border-blue-950/10 py-2 bg-white"
  >
    {{ title }}
  </h2>

  <div>
    <div class="flex gap-2.5 flex-wrap justify-between px-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5 text-gray-500 dark:text-gray-400">Wyświetl:</span>
        <USelect v-model.number="length" :options="lengthMenu" class="w-20" />
      </div>
      <UInput v-model="q" placeholder="Szukaj..." class="w-full sm:max-w-[250px]" />
    </div>
    <UTable
      :rows="displayedCalls"
      :columns="computedCols ? computedCols : defaultColsTranslated"
      :loading="pending"
      :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'Brak połączeń.' }"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Ładowanie...' }"
    >

      <template #type-data="{ row }">
        <TableItemStatus :value="(row.type)"/>
      </template>
      <template #duration-data="{ row }">
        <span v-if="row.duration">
          {{ formatTime(row.duration) }}
        </span>
      </template>
      <template #date-data="{ row }">
        <span v-if="row.date">
          {{ row.date.toLocaleString() }}
        </span>
      </template>

    </UTable>
    <div class="pt-5 flex justify-end">
      <UPagination v-model="page" :page-count="length" :total="computedCalls.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCallsStore } from "~/stores/callsStore";
import translateTableKey from "~/utils/translateTableKey"


const props = withDefaults(
  defineProps<{
    title?: string;
    showUnanswered?: boolean;
    pending: boolean;
    lengthMenu?: number[];
  }>(),
  {
    showUnanswered: false,
    pending: true,
    lengthMenu: () => [50, 100],
  }
);

const defaultCols = ['number','type','duration','deviceName','date']
const defaultColsTranslated = defaultCols.map((key) => {
  return {
    key: key,
    label: translateTableKey(key as keyof CallFormatted),
    sortable: true
  }
})

const callsStore = useCallsStore();
const q = ref('')
const length = ref(props.lengthMenu[0])
const page = ref(1)
const showDocId = useState('showDocId')

const computedCalls = computed(() => {

  let calls = []
  if (props.showUnanswered) {
    calls = filterUnanswered(callsStore.getCallsInRange);
  }else{
    calls =  callsStore.getCallsInRange
  }

  for (let index = 0; index < calls.length; index++) {
    let call = calls[index]
    calls[index] = {nr: calls.length - index ,...call}
  }

  if (!q.value) {
    return calls
  }
  
  return calls.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
  
});

const displayedCalls = computed(()=>{
  return computedCalls.value.slice((page.value - 1) * length.value, (page.value) * length.value)
})

const computedCols = computed(() => {
  if (computedCalls.value && computedCalls.value.length > 0) {
    const filteredKeys = Object.keys(computedCalls.value[0]).filter((key) => showDocId.value || key !== "id");
    return filteredKeys.map((key) => {
        const column = {
            [key]: undefined,
            label: translateTableKey(key as keyof CallFormatted),
            key: key,
            sortable: key !== "nr"
          };

          if (key == "date") {
            column.direction = 'desc';
          }
  
          return column;
    });
  }
});

watch([q,length],()=>{
  page.value = 1
})

</script>

<style>

</style>
