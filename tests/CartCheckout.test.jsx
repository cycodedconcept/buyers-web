import axios from "axios";
import { screen } from "@testing-library/react";
import CartCheckout from "../src/pages/CartCheckout";
import { renderWithProviders } from "./renderWithProviders";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("CartCheckout", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.patch.mockReset();
  });

  it("loads cart items from Redux fetch data and shows backend totals", async () => {
    const cartResponse = {
      data: {
        success: true,
        data: {
          id: 1,
          items: [
            {
              id: 3,
              quantity: 2,
              unitPriceKobo: 2750000,
              lineTotalKobo: 5500000,
              product: {
                id: 4005,
                title: "Fuel Pump Assembly for Toyota Hilux",
                condition: "used",
                location: "Kano",
                stockQty: 6,
                primaryImageUrl:
                  "https://example.com/products/fuel-pump-hilux-1.jpg",
              },
            },
          ],
          summary: {
            itemCount: 2,
            subtotalKobo: 5500000,
            deliveryFeeKobo: 0,
            totalKobo: 5500000,
          },
        },
        message: "Cart fetched successfully.",
      },
    };

    axios.get.mockResolvedValue(cartResponse);

    renderWithProviders(<CartCheckout />, {
      preloadedState: {
        auth: {
          token: "secure-token",
        },
      },
      route: "/cart",
    });

    expect(
      (await screen.findAllByText("Fuel Pump Assembly for Toyota Hilux")).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("₦55,000").length).toBeGreaterThan(0);
    expect(screen.getAllByText("₦27,500").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Free").length).toBeGreaterThan(0);
  });

  it("prompts signed-out users to log in before viewing the cart", () => {
    renderWithProviders(<CartCheckout />, {
      route: "/cart",
    });

    expect(
      screen.getByText(/sign in to view your cart/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to login/i }),
    ).toBeInTheDocument();
  });
});
