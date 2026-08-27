const nairaFormatter = (koboValue) => {
  const nairaValue = koboValue / 100

  return new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
}).format(nairaValue)};

const nairaInputToKobo = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "";
  }

  return String(Math.round(numericValue * 100));
}

const koboToNairaInput = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "";
  }

  return String(numericValue / 100);
}

const cleanParams = (filters) => {
  const newFiltersObject = Object.fromEntries(Object.entries(filters).filter(([, value]) => {
    return value !== "" && value !== null && value !== undefined;
  }))
  return newFiltersObject;
}

export {nairaFormatter, nairaInputToKobo, koboToNairaInput, cleanParams}
