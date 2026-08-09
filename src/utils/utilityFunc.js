const nairaFormatter = (koboValue) => {
  const nairaValue = koboValue / 100

  return new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
}).format(nairaValue)};

const cleanParams = (filters) => {
  const newFiltersObject = Object.fromEntries(Object.entries(filters).filter(([, value]) => {
    return value !== "";
  }))
  return newFiltersObject;
}

export {nairaFormatter, cleanParams}