import { Timestamp } from "firebase/firestore"

export default function (data:Call[]) :CallFormatted[] {
    let formattedData: CallFormatted[] = []
    data.forEach((call)=>{
      let formattedCall :CallFormatted = {
        tel: call.tel,
        status: call.status,
        type: call.type == "incoming" ? 'przychodzące':'wychodzące',
        date: call.date.toDate()
      }
      formattedData.push(formattedCall)
    })

    return formattedData
}