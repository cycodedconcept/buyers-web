import axios from "axios";
import { expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListingGrid2 from "../src/pages/ListingGrid2";
import { renderWithProviders } from "./renderWithProviders";

vi.mock("axios", () => ({
  default: { get: vi.fn() },
}));

const product = (id) => ({
  id,
  title: `Product ${id}`,
  category: { id: 1, name: "Brake System", slug: "brake-system" },
  condition: "new",
  priceKobo: 1850000,
  location: "Lagos",
  seller: { id: 1, businessName: "Seller", rating: 4.7 },
  primaryImageUrl: `https://example.com/product-${id}.jpg`,
});

it("requests the selected product page and resets to page one when the size changes", async () => {
  axios.get.mockReset();
  axios.get.mockImplementation((_url, { params }) =>
    Promise.resolve({
      data: {
        success: true,
        data: {
          products: [product(params.page)],
          pagination: {
            page: params.page,
            limit: params.limit,
            total: 25,
            totalPages: Math.ceil(25 / params.limit),
          },
        },
      },
    }),
  );

  const user = userEvent.setup();
  renderWithProviders(<ListingGrid2 />, { route: "/product-listing-grid" });

  expect(await screen.findByText("Product 1")).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(
    expect.stringContaining("/products"),
    expect.objectContaining({ params: { page: 1, limit: 12 } }),
  );
  expect(screen.getByText("There Are Currently 25 Results")).toBeInTheDocument();
  expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Next" }));
  await waitFor(() => {
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });
  expect(axios.get).toHaveBeenLastCalledWith(
    expect.stringContaining("/products"),
    expect.objectContaining({ params: { page: 2, limit: 12 } }),
  );

  await user.selectOptions(screen.getByRole("combobox", { name: "Products per page" }), "24");
  await waitFor(() => {
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });
  expect(axios.get).toHaveBeenLastCalledWith(
    expect.stringContaining("/products"),
    expect.objectContaining({ params: { page: 1, limit: 24 } }),
  );
});
