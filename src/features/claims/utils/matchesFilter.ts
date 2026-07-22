export const matchesFilter = (value: string, filter: string) =>
  filter.trim() === "" || value.toLowerCase().includes(filter.trim().toLowerCase());
