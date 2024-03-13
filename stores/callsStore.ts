import { defineStore } from "pinia";

export const useCallsStore = defineStore('calls',{
    state: () :CallStoreI => ({
        calls: [],
        callsRaw: [],
        dateRange: [
            new Date(new Date().setDate(new Date().getDate() - 14)),
            new Date(new Date().setHours(23,59,59,999))
        ],
        enterDate: new Date(),
        error: undefined
    }),
    getters: {
        getCalls(state){
            return state.calls
        },
        getCallsRaw(state){
            return state.callsRaw
        },
        getCallsInRange(state){
            const filteredData = state.calls.filter(item => {
                return item.date >= state.dateRange[0] && item.date <= state.dateRange[1];
              });
              return filteredData
        },
    },
    actions:{
        addCalls(data:Call[]){
            const dataFormatted = formatCalls(data)
            
            this.callsRaw.push(...data)
            this.calls.push(...dataFormatted)
        }
    }
})