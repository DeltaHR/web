export { Call, CallFormatted };

declare global {
  interface Call {
    tel: string;
    status: "odebrane" | "nieodebrane";
    type: "incoming" | "outgoing";
    date: string;
  }

  interface CallFormatted {
    tel: string;
    status: "odebrane" | "nieodebrane";
    type: "przychodzące" | "wychodzące";
    date: Date;
  }
}
