export default function numerateCalls(calls: CallFormatted[]) {
  for (let index = 0; index < calls.length; index++) {
    let call = calls[index];
    calls[index] = { nr: calls.length - index, ...call };
  }
}
