import { FirestoreError, Timestamp } from "firebase/firestore";

export { Call, CallFormatted };

declare global {
  interface Call {
    id: string;
    deviceName: string;
    number: string;
    type: 1 | 2 | 3 | 4;
    duration: number;
    date: Timestamp;
  }

  interface CallFormatted extends Call {
    type: "przychodzące" | "wychodzące" | "nieodebrane" | "nieznane";
    date: Date;
  }

  interface CallStoreI {
    calls: CallFormatted[];
    callsRaw: Call[];
    dateRange: [Date,Date]
    enterDate: Date,
    error: undefined|FirestoreError
  }

}
