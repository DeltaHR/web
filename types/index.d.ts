export { Call, CallFormatted };

declare global {
  interface Call {
    tel: string;
    status: "odebrane" | "nieodebrane";
    type: "incoming" | "outgoing";
    date: string;
  }

  interface CallFormatted extends Call {
    type: "przychodzące" | "wychodzące";
    date: Date;
  }

  interface CallStoreI {
    calls: CallFormatted[]
  }
}
