export const formatDate = (isoDate: string | null): string => {
  if (!isoDate) {
    return "-";
  }

  const [year, month, day] = isoDate.slice(0, 10).split("-");

  return `${day}/${month}/${year}`;
};
