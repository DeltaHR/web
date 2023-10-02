import { defineStore } from "pinia";

export const useCallsStore = defineStore('calls',{
    state: () :CallStoreI => ({
        calls: [],
        callsRaw: [],
        dateRange: [
            new Date(new Date().setDate(new Date().getDate() - 7)),
            new Date()
        ],
        enterDate: new Date()
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