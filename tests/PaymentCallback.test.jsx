import axios from "axios";
import { screen } from "@testing-library/react";
import PaymentCallback from "../src/pages/PaymentCallback";
import { renderWithProviders } from "./renderWithProviders";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

const buildOrderState = () => ({
  orderId: 2,
  currentOrder: {
    id: 2,
    status: "pending_payment",
    paymentMethod: "paystack",
    paymentStatus: "pending",
    subtotalKobo: 17450000,
    deliveryFeeKobo: 0,
    totalKobo: 17450000,
    deliveryAddress: {
      label: "Workshop",
      street: "12 Adeola Odeku Street",
      city: "Ikeja",
      state: "Lagos",
      phone: "08012345678",
    },
    items: [
      {
        productId: 4001,
        title: "Brake Pad Set",
        quantity: 2,
        unitPriceKobo: 8725000,
        lineTotalKobo: 17450000,
        seller: {
          businessName: "Northern Truck Parts",
        },
      },
    ],
    createdAt: "2026-08-16T09:30:00.000Z",
    updatedAt: "2026-08-16T09:30:00.000Z",
  },
  paymentReference: "APT-2-1782852021494-D8CA6C92",
  payment: {
    amountKobo: 17450000,
    provider: "paystack",
    reference: "APT-2-1782852021494-D8CA6C92",
    status: "pending",
  },
  paymentVerified: false,
  orderLoading: false,
  paymentInitializing: false,
  paymentVerifying: false,
  orderError: null,
  paymentError: null,
});

describe("PaymentCallback", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.patch.mockReset();
  });

  it("verifies the stored payment reference on return and shows success", async () => {
    axios.get
      .mockResolvedValueOnce({
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
          message: "Cart fetched successfully.",
        },
      })
      .mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            id: 2,
            role: "buyer",
            fullName: "Cyril Okeleke",
            email: "cycodedconcept@gmail.com",
            phone: "+2348131529862",
            isVerified: false,
            createdAt: "2026-06-29T20:12:08.000Z",
            updatedAt: "2026-06-29T20:28:43.000Z",
          },
          message: "Buyer profile fetched successfully.",
        },
      })
      .mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            verified: true,
            order: {
              id: 2,
              paymentMethod: "paystack",
              paymentStatus: "paid",
              status: "confirmed",
              totalKobo: 17450000,
            },
            payment: {
              amountKobo: 17450000,
              provider: "paystack",
              reference: "APT-2-1782852021494-D8CA6C92",
              status: "paid",
            },
          },
          message: "Payment verified successfully.",
        },
      })
      .mockResolvedValueOnce({
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
          message: "Cart fetched successfully.",
        },
      });

    renderWithProviders(<PaymentCallback />, {
      preloadedState: {
        auth: {
          token: "secure-token",
          user: {
            id: 2,
            fullName: "Cyril Okeleke",
            email: "cycodedconcept@gmail.com",
            phone: "+2348131529862",
            role: "buyer",
          },
        },
        order: buildOrderState(),
      },
      route: "/payment/callback",
    });

    expect(
      await screen.findByText(/your order has been confirmed/i),
    ).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/payments/callback"),
      expect.objectContaining({
        params: {
          reference: "APT-2-1782852021494-D8CA6C92",
        },
      }),
    );
  });
});
