export const formatBuyerDate = (value) => {
  if (!value) return "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";
  return new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date);
};

export const formatBuyerStatus = (value) =>
  value ? value.split("_").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ") : "Not available";
