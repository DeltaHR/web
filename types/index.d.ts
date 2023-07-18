import { Timestamp } from "firebase/firestore";

export { Call, CallFormatted };


declare global {
  interface Call {
    tel: string;
    status: "odebrane" | "nieodebrane";
    type: "incoming" | "outgoing";
    date: Timestamp;
  }

  interface CallFormatted extends Call {
    type: "przychodzące" | "wychodzące";
    date: Date;
  }

  interface CallStoreI {
    calls: CallFormatted[]
  }
}
