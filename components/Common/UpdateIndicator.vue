<template>
    <Transition>
        <div v-if="updateIndicator" class="flex items-center gap-1">
            <p class="text-slate-800">
                Zaktualizowano połączenia
            </p>
            <svg class="update-icon" width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="stroke-slate-900/20" cx="10" cy="10" r="9.5"/>
                <path class="stroke-blue-400" d="M6 9.5L9.516667 13.5L15.5 7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    const updateIndicator = useState('autoupdate')

    watch(updateIndicator,(newValue)=>{
        if (newValue === true) {
            setTimeout(()=>{
                updateIndicator.value = false
            },2000)
        }
    })
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes update-circle {
    0%{
        stroke-dasharray: 15;
        stroke-dashoffset: 0;
        opacity: 1;
    }
    80%{
        stroke-dasharray: 15;
        stroke-dashoffset: 60;
        opacity: 1;
    }
    100%{
        stroke-dasharray: 60;
        stroke-dashoffset: 300;
        opacity: 0;
    }
}

@keyframes update-check {
    0%{
        stroke-dasharray: 30;
        stroke-dashoffset: 30;
    }
    60%{
        stroke-dasharray: 30;
        stroke-dashoffset: 30;
    }
    100%{
        stroke-dasharray: 30;
        stroke-dashoffset: 0;
    }
}

svg.update-icon{
    @apply shrink-0
}
svg.update-icon circle{
    animation: update-circle 1.8s ease forwards;
}
svg.update-icon path{
    animation: update-check 2s cubic-bezier(0, 0, 0.2, 1) forwards;
}


</style>