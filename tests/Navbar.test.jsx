import axios from "axios";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import Navbar from "../src/components/layout/Navbar";
import { renderWithProviders } from "./renderWithProviders";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockNavbarRequests = () => {
  axios.get.mockImplementation((url) => {
    if (url.includes("/cart")) {
      return Promise.resolve({
        data: {
          success: true,
          data: {
            id: 1,
            items: [],
            summary: {
              itemCount: 0,
              subtotalKobo: 0,
              deliveryFeeKobo: 0,
              totalKobo: 0,
            },
          },
        },
      });
    }

    if (url.includes("/me")) {
      return Promise.resolve({
        data: {
          success: true,
          data: {
            id: 2,
            role: "buyer",
            fullName: "cyril okeleke",
            email: "cycodedconcept@gmail.com",
            phone: "+2348131529862",
            isVerified: false,
            createdAt: "2026-06-29T20:12:08.000Z",
            updatedAt: "2026-06-29T20:28:43.000Z",
          },
          message: "Buyer profile fetched successfully.",
        },
      });
    }

    return Promise.resolve({ data: { success: true, data: {} } });
  });
};

describe("Navbar", () => {
  beforeEach(() => {
    axios.get.mockReset();
    mockNavbarRequests();
  });

  it("shows the backend cart count badge when cart items exist", () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: {
          token: null,
        },
        cart: {
          cartId: 1,
          items: [],
          summary: {
            itemCount: 4,
            subtotalKobo: 1250000,
            deliveryFeeKobo: 0,
            totalKobo: 1250000,
          },
          cartLoading: false,
          cartError: null,
        },
      },
    });

    expect(screen.getAllByText("4").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });

  it("shows the current user details and logout action from the user icon menu", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Navbar isHomepage={false} />, {
      preloadedState: {
        auth: {
          token: "secure-token",
          user: {
            id: 2,
            role: "buyer",
            fullName: "cyril okeleke",
            email: "cycodedconcept@gmail.com",
            phone: "+2348131529862",
            isVerified: false,
            createdAt: "2026-06-29T20:12:08.000Z",
          },
          isLoading: false,
          error: null,
          message: null,
          isAuthenticated: true,
        },
        cart: {
          cartId: 1,
          items: [],
          summary: {
            itemCount: 0,
            subtotalKobo: 0,
            deliveryFeeKobo: 0,
            totalKobo: 0,
          },
          cartLoading: false,
          cartError: null,
        },
      },
    });

    await user.click(screen.getAllByRole("button", { name: /user account/i })[0]);

    expect(screen.getAllByText(/cyril okeleke/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/cycodedconcept@gmail.com/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("button", { name: /logout/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
  });
});
