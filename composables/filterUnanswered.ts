export default function (data: CallFormatted[]): CallFormatted[] {
  let filteredArray: CallFormatted[] = [];
  let seenNumbers = new Set<string>();

  data.sort((a, b) => b.date.getTime() - a.date.getTime());

  for (const call of data) {
    if (!seenNumbers.has(call.number)) {
      seenNumbers.add(call.number);

      if (call.type === "nieodebrane") {
        filteredArray.push(call);
      }
    }
  }

  return filteredArray;
}