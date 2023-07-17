export default function (data:CallFormatted[]) :CallFormatted[] {
    let filteredArray: CallFormatted[] = []
    data.sort((a,b) => {
        a.date - b.date
    })

    let numbers = new Set(Object.values(data).map(call => call.tel))

    for (const number of numbers) {
        const unanswered = data.find(call => {
            return call.tel === number && call.status === 'nieodebrane' 
        })
        filteredArray.push(unanswered)
    }


    return filteredArray
}