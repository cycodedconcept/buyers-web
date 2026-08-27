import { screen } from "@testing-library/react";
import ProductCard from "../src/components/ui/ProductCard";
import { renderWithProviders } from "./renderWithProviders";

const buildProduct = (id, overrides = {}) => ({
  id,
  title: `Product ${id}`,
  category: {
    id: 1000 + id,
    name: "Brake System",
    slug: "brake-system",
  },
  condition: "new",
  priceKobo: 1500000,
  location: "Lagos",
  stockQty: 5,
  seller: {
    id: 5000 + id,
    businessName: `Seller ${id}`,
    rating: 4.8,
  },
  primaryImageUrl: `https://example.com/product-${id}.jpg`,
  ...overrides,
});

describe("ProductCard", () => {
  it("disables add to cart when the product is already in the cart", () => {
    const product = buildProduct(1);

    renderWithProviders(<ProductCard product={product} />, {
      preloadedState: {
        cart: {
          cartId: 1,
          items: [
            {
              id: 10,
              quantity: 1,
              unitPriceKobo: 1500000,
              lineTotalKobo: 1500000,
              product: {
                id: 1,
                title: product.title,
              },
            },
          ],
          summary: {
            itemCount: 1,
            subtotalKobo: 1500000,
            deliveryFeeKobo: 0,
            totalKobo: 1500000,
          },
          cartLoading: false,
          cartError: null,
        },
      },
    });

    const button = screen.getByRole("button", { name: /already in cart/i });

    expect(button).toBeDisabled();
    expect(button.className).toContain("bg-success");
  });
});
