const nairaFormatter = (koboValue) => {
  const nairaValue = koboValue / 100

  return new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
}).format(nairaValue)};

export {nairaFormatter}