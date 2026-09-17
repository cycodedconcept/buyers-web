import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import orderReducer, {
  createOrder,
  fetchBuyerOrders,
  fetchBuyerOrderDetails,
  fetchBuyerOrderStatus,
  fetchBuyerOrderReceipt,
  fetchBuyerOrderReceiptHtml,
  selectCurrentOrder,
  selectBuyerOrders,
  selectBuyerOrderDetails,
} from "../src/features/order/orderSlice";
import disputeReducer, {
  createDispute,
  respondToDispute,
  fetchOrderDisputes,
  fetchBuyerDisputes,
  selectDisputeDetails,
  selectOrderDisputes,
  selectBuyerDisputes,
} from "../src/features/disputes/disputeSlice";
import blogReducer, {
  fetchBlogPosts,
  fetchBlogPostDetails,
  selectBlogPosts,
  selectBlogPostDetails,
} from "../src/features/blog/blogSlice";
import BlogArticleBody from "../src/components/blog/BlogArticleBody";

vi.mock("axios", () => ({ default: { get: vi.fn(), post: vi.fn() } }));

const testStore = () => configureStore({
  reducer: {
    auth: (state = { token: "buyer-token" }) => state,
    order: orderReducer,
    disputes: disputeReducer,
    blog: blogReducer,
  },
});

describe("buyer API features", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    window.sessionStorage.clear();
  });

  it("loads order history, details, status, and receipts without replacing checkout order", async () => {
    const store = testStore();
    axios.post.mockResolvedValueOnce({ data: { data: { id: 2, status: "pending_payment", totalKobo: 10000 } } });
    await store.dispatch(createOrder({ paymentMethod: "paystack", deliveryAddress: {} })).unwrap();

    axios.get
      .mockResolvedValueOnce({ data: { data: { orders: [{ id: 4, totalKobo: 3700000 }], pagination: { page: 1, totalPages: 1 } } } })
      .mockResolvedValueOnce({ data: { data: { id: 4, items: [{ productId: 4001 }], totalKobo: 3700000 } } })
      .mockResolvedValueOnce({ data: { data: { orderId: 4, history: [{ status: "confirmed" }] } } })
      .mockResolvedValueOnce({ data: { data: { receiptNumber: "RCPT-4", orderId: 4, totalKobo: 3700000 } } })
      .mockResolvedValueOnce({ data: "<h1>Receipt</h1>" });

    await store.dispatch(fetchBuyerOrders({ page: 1, limit: 10 })).unwrap();
    await store.dispatch(fetchBuyerOrderDetails(4)).unwrap();
    await store.dispatch(fetchBuyerOrderStatus(4)).unwrap();
    await store.dispatch(fetchBuyerOrderReceipt(4)).unwrap();
    const html = await store.dispatch(fetchBuyerOrderReceiptHtml(4)).unwrap();

    expect(selectCurrentOrder(store.getState()).id).toBe(2);
    expect(selectBuyerOrders(store.getState())[0].id).toBe(4);
    expect(selectBuyerOrderDetails(store.getState()).totalKobo).toBe(3700000);
    expect(html).toContain("Receipt");
    expect(axios.get.mock.calls.map(([url]) => url)).toEqual([
      expect.stringContaining("/orders"),
      expect.stringContaining("/orders/4"),
      expect.stringContaining("/orders/4/status"),
      expect.stringContaining("/orders/4/receipt"),
      expect.stringContaining("/orders/4/receipt"),
    ]);
    expect(axios.get.mock.calls[0][1].headers.Authorization).toBe("Bearer buyer-token");
    expect(axios.get.mock.calls[4][1].params).toEqual({ format: "html" });
  });

  it("sends dispute evidence and responses as authenticated multipart form data", async () => {
    const store = testStore();
    const file = new File(["photo"], "damage.png", { type: "image/png" });
    axios.post
      .mockResolvedValueOnce({ data: { data: { dispute: { id: 1, orderId: 7, status: "open" } } } })
      .mockResolvedValueOnce({ data: { data: { dispute: { id: 1, orderId: 7, status: "in_review" } } } });
    axios.get
      .mockResolvedValueOnce({ data: { data: { disputes: [{ id: 1, orderId: 7 }], pagination: { page: 1 } } } })
      .mockResolvedValueOnce({ data: { data: { disputes: [{ id: 1, orderId: 7 }], pagination: { page: 1 } } } });

    await store.dispatch(createDispute({ orderId: 7, sellerId: 9008, reason: "wrong_item_sent", description: "Wrong part", evidence: [file] })).unwrap();
    await store.dispatch(respondToDispute({ disputeId: 1, message: "More detail", attachments: [file] })).unwrap();
    await store.dispatch(fetchOrderDisputes({ orderId: 7 })).unwrap();
    await store.dispatch(fetchBuyerDisputes({ status: "open" })).unwrap();

    expect(axios.post.mock.calls[0][0]).toContain("/orders/7/disputes");
    expect(axios.post.mock.calls[0][1].get("reason")).toBe("wrong_item_sent");
    expect(axios.post.mock.calls[0][1].get("evidence")).toBe(file);
    expect(axios.post.mock.calls[0][2].headers.Authorization).toBe("Bearer buyer-token");
    expect(axios.post.mock.calls[1][0]).toContain("/disputes/1/respond");
    expect(axios.post.mock.calls[1][1].get("message")).toBe("More detail");
    expect(axios.post.mock.calls[1][1].get("attachments")).toBe(file);
    expect(selectDisputeDetails(store.getState()).dispute.status).toBe("in_review");
    expect(selectOrderDisputes(store.getState())).toHaveLength(1);
    expect(selectBuyerDisputes(store.getState())).toHaveLength(1);
    expect(axios.get.mock.calls[1][1].params.status).toBe("open");
  });

  it("loads public blog posts and full article content by slug", async () => {
    const store = testStore();
    axios.get
      .mockResolvedValueOnce({ data: { data: { posts: [{ id: 4, slug: "parts-replaced" }], pagination: { page: 1, limit: 9 } } } })
      .mockResolvedValueOnce({ data: { data: { id: 4, slug: "parts-replaced", body: "<p>Article</p>" } } });

    await store.dispatch(fetchBlogPosts({ page: 1, perPage: 9 })).unwrap();
    await store.dispatch(fetchBlogPostDetails("parts-replaced")).unwrap();

    expect(selectBlogPosts(store.getState())[0].slug).toBe("parts-replaced");
    expect(selectBlogPostDetails(store.getState()).body).toContain("Article");
    expect(axios.get.mock.calls[0][1].params).toEqual({ page: 1, per_page: 9, sort: "latest" });
    expect(axios.get.mock.calls[1][0]).toContain("/blog/posts/parts-replaced");
  });

  it("renders article HTML without executable elements or unsafe links", () => {
    const { container } = render(<BlogArticleBody html={'<p>Hello <strong>buyer</strong></p><script>alert(1)</script><a href="javascript:alert(1)">unsafe</a>'} />);
    expect(screen.getByText("buyer")).toBeTruthy();
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("a")).toBeNull();
  });
});
