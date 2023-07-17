import { defineStore } from "pinia";

export const useCallsStore = defineStore('calls',{
    state: () :CallStoreI => ({
        calls: []
    }),
    getters: {
        getCalls(state){
            return state.calls
        }
    },
    actions:{
        addCalls(data:Call[]){
            const dataFormatted = formatCalls(data)
            this.calls.push(...dataFormatted)
        }
    }
})