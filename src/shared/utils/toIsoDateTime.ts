// Appends a midnight-UTC time to a bare yyyy-mm-dd input value instead of round-tripping
// through `new Date(value)`, which would interpret the bare date as local midnight and
// could shift the UTC date by ±1 day depending on the browser's timezone offset.
export const toIsoDateTime = (value: string): string | null =>
  value === "" ? null : `${value}T00:00:00.000Z`;
