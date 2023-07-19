export default function (data: CallFormatted[]): CallFormatted[] {
  let filteredArray: CallFormatted[] = [];
  data.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  let numbers = new Set(Object.values(data).map((call) => call.number));

  for (const number of numbers) {
    const latest = data.find((call) => {
      return call.number === number;
    });
    if (latest?.type == "nieodebrane") {
      filteredArray.push(latest);
    }
  }

  return filteredArray;
}
