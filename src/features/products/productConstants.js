export const DEFAULT_ACTIVE_FILTERS = {
  partName: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  category: "",
  minPriceKobo: "",
  maxPriceKobo: "",
  condition: "",
};

export const PRODUCT_CATEGORY_OPTIONS = [
  { label: "Engine Components", value: "engine-components" },
  { label: "Brake System", value: "brake-system" },
  { label: "Electrical & Lighting", value: "electrical-lighting" },
  { label: "Filters", value: "filters" },
  { label: "Suspension & Steering", value: "suspension-steering" },
  { label: "Cooling", value: "cooling" },
];

export const PRODUCT_CONDITION_OPTIONS = [
  { label: "All Parts", value: "" },
  { label: "New Parts", value: "new" },
  { label: "Used Parts", value: "used" },
  { label: "OEM Parts", value: "OEM" },
];

export const LISTING_PAGE_LIMIT = 12;
