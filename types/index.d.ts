import { Timestamp } from "firebase/firestore";

export { Call, CallFormatted };

declare global {
  interface Call {
    id: string;
    number: number;
    type: 1 | 2 | 3 | 4;
    date: Timestamp;
  }

  interface CallFormatted extends Call {
    type: "przychodzące" | "wychodzące" | "nieznane";
    date: Date;
  }

  interface CallStoreI {
    calls: CallFormatted[];
  }
}
/*
case CallLog.Calls.INCOMING_TYPE:
  callTypeString = 1;
  break;
case CallLog.Calls.OUTGOING_TYPE:
  callTypeString = 2;
  break;
case CallLog.Calls.MISSED_TYPE:
  callTypeString = 3;
case default:
  callTypeString = 4;
  */
