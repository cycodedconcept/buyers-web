import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import Header from "../src/components/layout/Header";
import { renderWithProviders } from "./renderWithProviders";
import { DEFAULT_ACTIVE_FILTERS } from "../src/features/products/productConstants";

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

describe("Header", () => {
  it("writes the homepage filters into Redux and navigates to the browse page", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(
      <>
        <Header />
        <LocationDisplay />
      </>,
    );

    await user.click(screen.getByRole("button", { name: /new parts/i }));
    await user.type(screen.getByLabelText(/vehicle make/i), "Toyota");
    await user.type(screen.getByLabelText(/vehicle model/i), "Camry");
    await user.type(screen.getByLabelText(/vehicle year/i), "2010");
    await user.selectOptions(screen.getByLabelText(/^category$/i), "brake-system");
    await user.type(screen.getByLabelText(/minimum price in naira/i), "10000");
    await user.type(screen.getByLabelText(/maximum price in naira/i), "30000");
    await user.type(screen.getByLabelText(/part name/i), "brake");

    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(store.getState().products.activeFilters).toEqual({
      ...DEFAULT_ACTIVE_FILTERS,
      partName: "brake",
      vehicleMake: "Toyota",
      vehicleModel: "Camry",
      vehicleYear: "2010",
      category: "brake-system",
      minPriceKobo: "1000000",
      maxPriceKobo: "3000000",
      condition: "new",
    });
    expect(screen.getByTestId("location-display")).toHaveTextContent(
      "/product-listing",
    );
  });
});
