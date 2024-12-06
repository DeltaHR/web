export default function (data: Call[]): CallFormatted[] {
  const seen = new Set<string>();
  const formattedData: CallFormatted[] = [];
  const normalizeNumber = (number: string): string => {
    return number.replace("+48", "")
  };

  data.forEach((call) => {    

    const key = `${call.deviceName}-${call.type}-${call.duration}-${call.date.toMillis()}`;

    if (!seen.has(key)) {
      seen.add(key);
        
      const formattedCall: CallFormatted = {
        id: call.id,
        number: normalizeNumber(call.number),
        type:
          call.type == 1
            ? "przychodzące"
            : call.type == 2
            ? "wychodzące"
            : call.type == 3 || call.type == 4
            ? "nieodebrane"
            : "nieznane",
        duration: call.duration,
        deviceName: call.deviceName,
        date: call.date.toDate(),
      };
      
      formattedData.push(formattedCall);
    }
  });

  return formattedData;
}
