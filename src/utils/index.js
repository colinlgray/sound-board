// `Math.scale` method implementation
// from https://github.com/zloirock/core-js
export function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0 ||
    /* eslint-disable */
    x != x ||
    inLow != inLow ||
    inHigh != inHigh ||
    outLow != outLow ||
    outHigh != outHigh
    /* eslint-enable */
  )
    return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return ((x - inLow) * (outHigh - outLow)) / (inHigh - inLow) + outLow;
}
