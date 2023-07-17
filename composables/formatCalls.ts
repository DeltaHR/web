export default function (data:Call[]) :CallFormatted[] {
    let formattedData: CallFormatted[] = []
    data.forEach((call)=>{
      let formattedCall :CallFormatted = {
        tel: call.tel,
        status: call.status,
        type: call.type == "incoming" ? 'przychodzące':'wychodzące',
        date: new Date(call.date)
      }
      formattedData.push(formattedCall)
    })

    return formattedData
}