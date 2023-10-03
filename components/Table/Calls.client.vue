<template>
  <h2
    v-if="title"
    class="sticky top-12 z-30 text-2xl md:text-3xl dark:text-slate-200 text-gray-700 font-semibold border-b dark:border-slate-800 border-blue-950/10 py-2 dark:bg-slate-950 bg-white"
  >
    {{ title }}
  </h2>

  <div>
    <div class="flex gap-2.5 flex-wrap justify-between px-3 pt-5 lg:pt-8 sticky top-[97px] dark:bg-slate-950 bg-white z-20">
      <div class="flex items-center gap-2.5 flex-wrap">
        <div class="flex gap-1.5 items-center w-full min-[490px]:w-auto">
          <span class="text-sm leading-5 text-gray-500 dark:text-gray-400">Wyświetl:</span>
          <USelect v-model.number="length" :options="lengthMenu" class="w-20" />
        </div>
        <div class="flex gap-1.5 items-center w-full min-[490px]:w-auto">
          <span class="text-sm leading-5 text-gray-500 dark:text-gray-400">Kolumny:</span>
          <USelectMenu
            v-model="selectedColumns"
            by="label"
            :options="computedCols.filter((col) => col.key != 'nr')"
            multiple
            placeholder="Kolumny"
            class="w-32"
          >
            <template #label>
              <span v-if="selectedColumnsFiltered.length" class="whitespace-nowrap">
                {{ selectedColumnsFiltered.length }}
                {{ selectedColumnsFiltered.length < 5 ? "Wybrane" : "Wybranych" }}
              </span>
              <span v-else> Wybierz </span>
            </template>
          </USelectMenu>
        </div>
      </div>
      <UInput v-model="q" placeholder="Szukaj..." class="w-full lg:max-w-[250px]" />
    </div>
    <UTable
      :rows="displayedCalls"
      :columns="computedCols ? selectedColumnsSorted : defaultColsTranslated"
      :loading="pending"
      :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'Brak połączeń.' }"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Ładowanie...' }"
      :ui="{
        td: {
          base: 'whitespace-nowrap relative',
        },
        thead:
          'sticky top-[233px] min-[490px]:top-[191px] lg:top-[161px] dark:bg-slate-950 bg-white z-10 dark:shadow-gray-800 shadow-gray-200 shadow-[0_0.5px_0_0]',
        wrapper: 'relative !overflow-visible',
        tbody: 'overflow-x-auto',
      }"
    >
      <template #nr-data="{ row }" :class="'!p-0'">
        <div>
          <span v-show="callsStore.enterDate < row.date" class="absolute left-0 inset-y-0 w-0.5 bg-blue-500"></span>
          {{ row.nr }}
        </div>
      </template>
      <template #type-data="{ row }">
        <TableItemStatus :value="row.type" />
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
  </div>
  <div class="pt-5 flex justify-end">
    <UPagination v-model="page" :page-count="length" :total="computedCalls.length" />
  </div>
</template>

<script setup lang="ts">
import { useCallsStore } from "~/stores/callsStore";
import translateTableKey from "~/utils/translateTableKey";
import numerateCalls from "~/utils/numerateCalls";

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

const defaultCols = ["number", "type", "duration", "deviceName", "date"];
const defaultColsTranslated = defaultCols.map((key) => {
  return {
    key: key,
    label: translateTableKey(key as keyof CallFormatted),
    sortable: true,
  };
});
const callsStore = useCallsStore();
const q = ref("");
const length = ref(props.lengthMenu[0]);
const page = ref(1);
const { width } = useWindowSize();

const computedCalls = computed(() => {
  let calls = [];
  if (props.showUnanswered) {
    calls = filterUnanswered(callsStore.getCallsInRange);
  } else {
    calls = callsStore.getCallsInRange;
  }

  numerateCalls(calls)

  if (!q.value) {
    return calls;
  }

  return calls.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const displayedCalls = computed(() => {
  return computedCalls.value.slice((page.value - 1) * length.value, page.value * length.value);
});

const computedCols = computed(() => {
  if (computedCalls.value && computedCalls.value.length > 0) {
    const columnKeys = Object.keys(computedCalls.value[0]);
    return columnKeys.map((key) => {
      const column = {
        [key]: undefined,
        label: translateTableKey(key as keyof CallFormatted),
        key: key,
        sortable: key !== "nr",
      };

      if (key == "date") {
        column.direction = "desc";
      }

      return column;
    });
  }

  return [];
});

const selectedColumns = ref([...defaultColsTranslated]);

const selectedColumnsFiltered = computed(() => {
  return selectedColumns.value.filter((col) => col.key != "nr");
});

const selectedColumnsSorted = computed(() => {
  return selectedColumns.value.sort((a, b) => {
    const indexA = defaultColsTranslated.findIndex((item) => item.key === a.key);
    const indexB = defaultColsTranslated.findIndex((item) => item.key === b.key);
    return indexA - indexB;
  });
});

watch([q, length], () => {
  page.value = 1;
});

watch(computedCols, (newCols) => {
  if (newCols.length > 0) {
    selectedColumns.value = newCols.filter((col) => col.key != "id");
  } else {
    selectedColumns.value = defaultColsTranslated;
  }
});

watch(width, () => {
  const colsBreakpoints: { [key: number]: string[] } = {
    0: ["number", "date"],
    535: ["number", "type", "date"],
    768: ["number", "type", "duration", "date"],
    1024: ["nr", "number", "type", "duration", "deviceName", "date"],
  };
  let allCols = computedCols.value.length > 0 ? computedCols.value : defaultColsTranslated;
  let breakpointKey = Object.keys(colsBreakpoints)
    .reverse()
    .find((breakpoint) => parseInt(breakpoint) <= width.value);
  let breakpointColsKeys = colsBreakpoints[1024];

  if (breakpointKey) {
    breakpointColsKeys = colsBreakpoints[parseInt(breakpointKey)];
  }

  selectedColumns.value = allCols.filter((col) => breakpointColsKeys.includes(col.key));
});
</script>

<style></style>
