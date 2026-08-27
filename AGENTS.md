# AGENTS.md — AutoParts Frontend

## Context

This is the frontend for the AutoParts e-commerce platform. It consumes a REST API for products, cart, orders, and payments. This file defines the project conventions (always apply) and the current active task.

---

## Project conventions (apply to every task)

- **Do NOT modify existing Redux setup or existing slice structures.** Read the relevant existing slice (e.g. `productSlice`) before writing code and match its conventions exactly: async thunk style, state shape, reducer patterns, selectors, naming, and how loading/error states are handled. Only extend as strictly needed for the task.
- Do not introduce a new state-management approach or restructure existing state.
- New feature slices go in the `features` folder, following the same file/folder organization as existing features.
- Reuse the existing API client / fetch setup. Do not add a new HTTP layer.
- Reuse the existing auth-token mechanism for authenticated requests — do not invent a new auth approach.
- Do not hardcode the base API URL; use the existing environment/config value.
- All monetary values are in **kobo** (integer minor units). Convert to Naira only for display (÷100), never for storage or requests. Never recompute totals client-side — use backend-provided values.
- Valid product `condition` values are `new`, `used`, `OEM` only. `refurbished` is NOT valid. Ignore stale example/seed data showing `refurbished`.
- Do not add new dependencies unless strictly necessary; prefer what the project already uses.
- No backend changes in any frontend task.
- **Before making changes:** read the relevant existing slice and the API client, match established patterns, and show the plan plus the files you intend to touch.

---

## Already implemented (context only — do not redo)

Complete; do not rebuild. Listed for context:

- **Homepage product filters** on `GET /products` via query params: `partName`; `vehicleMake`/`vehicleModel`/`vehicleYear`; `category`/`minPriceKobo`/`maxPriceKobo`; `condition`. Combinable.
- **Infinite scroll pagination** on the browse page (not numbered), using `page`/`limit` and the response `pagination` object. Scroll appends; filter change resets to page 1 and replaces.
- **Cart** (`cartSlice` in `features`): add item (`POST /cart/items`), get cart (`GET /cart`), modify item (`PATCH /cart/items/:cartItemId`). Auth required. Totals/summary come from the backend and are not recomputed client-side. Remove/clear not yet built.

If a current task interacts with these, follow their established patterns rather than changing them.

---

## CURRENT TASK: Order & Payment Milestone

Implement checkout: create an order, then pay for it via Paystack. Create an `orderSlice` and payment handling (same slice or a `paymentSlice`, following existing feature/slice conventions) in the `features` folder, mirroring existing slice structure. All endpoints require authentication.

### Flow (in order)

1. Buyer enters order info (payment method + delivery address) and submits.
2. Call **create order** → on success, show the returned order details (items, totals, delivery address, status).
3. On the order-details/confirmation screen, buyer proceeds to pay → call **initialize payment**.
4. Initialize returns a Paystack `authorizationUrl` → **redirect the buyer to that URL** to complete payment on Paystack's hosted checkout.
5. After payment, buyer returns to the app (payment return route) → call **payment callback** with the stored `reference` to verify the final status.
6. Reflect the final payment/order status to the buyer.

### Endpoints

**1. Create order**
- `POST /orders` — auth required
- Body (raw JSON):
```json
{
  "paymentMethod": "paystack",
  "deliveryAddress": {
    "label": "Workshop",
    "street": "12 Adeola Odeku Street",
    "city": "Ikeja",
    "state": "Lagos",
    "phone": "08012345678"
  }
}
```
- Response `data`: order `id`, `status` (`pending_payment`), `paymentMethod`, `paymentStatus` (`pending`), `subtotalKobo`, `deliveryFeeKobo`, `totalKobo`, `deliveryAddress`, and `items` (each: `productId`, `title`, `quantity`, `unitPriceKobo`, `lineTotalKobo`, `seller`), plus `createdAt`/`updatedAt`.

**2. Initialize payment**
- `POST /payments/initialize` — auth required
- Body (raw JSON):
```json
{ "orderId": 2 }
```
- Response `data` includes:
  - `authorizationUrl` — Paystack checkout URL the buyer must be redirected to.
  - `accessCode`
  - `order` (id, paymentMethod, paymentStatus, status, totalKobo)
  - `payment` (amountKobo, provider, `reference`, status)
- **Store `payment.reference`** — this exact reference is used to verify payment in the next step.

**3. Verify payment (callback)**
- `GET /payments/callback?reference=<reference>` — auth required
- Use the `reference` returned by the initialize step (stored in state). Do NOT use any other reference source.
- Call after the buyer returns from Paystack to confirm the final payment status.
- Response `data`:
```json
{
  "success": true,
  "data": {
    "verified": true,
    "order": {
      "id": 2,
      "paymentMethod": "paystack",
      "paymentStatus": "paid",
      "status": "confirmed",
      "totalKobo": 17450000
    },
    "payment": {
      "amountKobo": 17450000,
      "provider": "paystack",
      "reference": "APT-2-1782852021494-D8CA6C92",
      "status": "paid"
    }
  },
  "message": "Payment verified successfully."
}
```
- `verified` (boolean) is the source of truth for success. On `verified: true` with `payment.status: paid` and `order.status: confirmed`, treat the payment as complete.

### Payment return route (BUILD THIS — does not exist yet)

The frontend does not yet have a route to handle the buyer's return from Paystack. Create it as part of this task.

- Add a dedicated frontend route (e.g. `/payment/callback` or the project's routing equivalent) that Paystack redirects the buyer to after they complete or cancel payment on the hosted checkout.
- On mounting this route:
  1. Read the payment `reference` stored in state during the initialize step. (Use the stored reference — this is the source of truth. Do not rely on any reference in the return URL.)
  2. Call the verify endpoint: `GET /payments/callback?reference=<storedReference>`.
  3. While verifying, show a clear "verifying payment" loading state.
  4. On `data.verified === true` and `data.payment.status === "paid"`: show a success state, reflect the confirmed order (`order.status: confirmed`, `paymentStatus: paid`) in state, and direct the buyer to an order-confirmation/success view.
  5. On `data.verified === false` or a non-paid status: show a failed/pending state with an option to retry or re-initialize payment.
- Edge cases to handle:
  - If there is no stored reference when this route loads (e.g. buyer navigates here directly or state was lost on redirect), handle gracefully — show an appropriate message rather than crashing, and do not call verify with an empty reference.
  - Guard against calling the verify endpoint more than once on mount (avoid duplicate verification requests).
- Follow the project's existing routing setup and conventions. Do not restructure existing routing.

> **State persistence across redirect:** because the buyer leaves the app for Paystack and returns via a full page reload, the stored `reference` (and `orderId`) must survive the round trip. If Redux state does not persist across a full redirect, persist them using whatever mechanism the project already uses (e.g. existing storage/persistence approach, or sessionStorage). Do not introduce a new persistence library — use what the project has or the simplest consistent approach. If no persistence is set up, flag this in your plan before implementing.

### Behaviour

- **Create order:** dispatch with `{ paymentMethod, deliveryAddress }`; on success store the order and show details. Order starts `status: pending_payment`, `paymentStatus: pending`.
- **Initialize payment:** dispatch with `{ orderId }` (id from the created order); on success store `payment.reference`, then redirect the buyer to `authorizationUrl`.
- **Redirect to Paystack:** send the buyer to `authorizationUrl`. Do NOT process card/payment details in-app — payment happens on Paystack's hosted checkout.
- **Verify on return:** on the payment return route, call the callback with the stored `reference` and read the result:
  - `data.verified === true` and `data.payment.status === "paid"` → payment succeeded; order is `confirmed`. Update state with returned `order` and `payment`; show success.
  - `data.verified === false` (or status not `paid`) → not confirmed; show failed/pending state and allow retry or re-initialize.
- Surface clear states: order created → awaiting payment → verifying → paid/confirmed vs. failed.

### State & rules

- Store the created order (`data`) and the payment `reference`; follow the existing slice's loading/error conventions.
- Money is in kobo — display in Naira (÷100), never recompute; use `subtotalKobo`, `deliveryFeeKobo`, `totalKobo`, `unitPriceKobo`, `lineTotalKobo` from the backend.
- `paymentMethod` is `paystack` for this milestone.
- Keep the chain linked in state: order `id` → `orderId` for initialize; initialize `reference` → callback verification.
- Full status chain: after create order (`pending_payment`/`pending`) → after initialize (reference stored, still `pending`) → after successful callback (`order.status: confirmed`, `paymentStatus/payment.status: paid`, `verified: true`). Drive the buyer-facing UI off these values.
- Handle auth failures consistently with the rest of the app.

### Selectors

- Provide selectors (matching existing patterns) for: the current order, order items, totals/summary, the payment reference, payment/order status, and loading/error state.

### Out of scope

- No payment methods beyond Paystack this milestone.
- No custom card-input UI — payment is delegated to Paystack's hosted checkout via `authorizationUrl`.
- No backend changes.