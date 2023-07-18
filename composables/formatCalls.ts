import { Timestamp } from "firebase/firestore";

export default function (data: Call[]): CallFormatted[] {
  let formattedData: CallFormatted[] = [];
  data.forEach((call) => {
    let formattedCall: CallFormatted = {
      id: call.id,
      number: call.number,
      type:
        call.type == 1
          ? "przychodzące"
          : call.type == 2
          ? "wychodzące"
          : "nieznane",
      date: call.date.toDate(),
    };
    formattedData.push(formattedCall);
  });

  return formattedData;
}
