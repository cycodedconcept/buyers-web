import { nairaFormatter } from "../../utils/utilityFunc";

const modeContent = {
  review: {
    eyebrow: "Order created",
    title: "Review your order and continue to payment",
    description:
      "Your order is stored on the backend with a pending payment status. Continue to Paystack to complete checkout.",
  },
  success: {
    eyebrow: "Payment confirmed",
    title: "Your order has been confirmed",
    description:
      "We verified your Paystack payment successfully. Your order is now confirmed and ready for fulfilment.",
  },
  failed: {
    eyebrow: "Payment pending",
    title: "We could not confirm this payment yet",
    description:
      "Your order is still available. You can retry Paystack checkout or go back to review the order details.",
  },
};

const statusStyles = {
  pending_payment: "bg-[#FFF5E6] text-[#9A6700]",
  pending: "bg-[#FFF5E6] text-[#9A6700]",
  confirmed: "bg-success/10 text-success",
  paid: "bg-success/10 text-success",
  failed: "bg-[#FFE9E9] text-[#C12A2A]",
  cancelled: "bg-[#FFE9E9] text-[#C12A2A]",
};

const formatStatusLabel = (value) => {
  if (!value) {
    return "Not available";
  }

  return value
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

const formatAddress = (deliveryAddress) => {
  if (!deliveryAddress) {
    return "Delivery address unavailable";
  }

  return [
    deliveryAddress.label,
    deliveryAddress.street,
    deliveryAddress.city,
    deliveryAddress.state,
    deliveryAddress.phone,
  ]
    .filter(Boolean)
    .join(", ");
};

const formatDate = (value) => {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
};

const OrderCompleteStep = ({
  order,
  payment = null,
  mode = "review",
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  isProcessing = false,
  message = null,
}) => {
  const content = modeContent[mode] || modeContent.review;
  const orderItems = order?.items || [];
  const orderStatus = order?.status || "pending";
  const paymentStatus = order?.paymentStatus || payment?.status || "pending";

  return (
    <div className="max-w-230 mx-auto my-12 rounded-[32px] border border-line bg-white p-6 shadow-[0_28px_90px_rgba(18,18,18,0.08)] md:p-10">
      <div className="mb-8 flex flex-col gap-3 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 font-outfit text-sm font-semibold uppercase tracking-[0.24em] text-main">
            {content.eyebrow}
          </p>
          <h2 className="mb-3 font-fraunces text-3xl font-semibold text-heading md:text-[40px]">
            {content.title}
          </h2>
          <p className="font-outfit text-base text-text">{content.description}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <span
            className={`inline-flex rounded-full px-4 py-2 font-outfit text-sm font-semibold ${
              statusStyles[orderStatus] || "bg-[#F3F5F7] text-heading"
            }`}
          >
            Order: {formatStatusLabel(orderStatus)}
          </span>
          <span
            className={`inline-flex rounded-full px-4 py-2 font-outfit text-sm font-semibold ${
              statusStyles[paymentStatus] || "bg-[#F3F5F7] text-heading"
            }`}
          >
            Payment: {formatStatusLabel(paymentStatus)}
          </span>
        </div>
      </div>

      {message ? (
        <div className="mb-8 rounded-2xl border border-line bg-[#F9FAFB] px-5 py-4 font-outfit text-sm text-text">
          {message}
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-line bg-[#FBFBFB] p-5 md:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-outfit text-xl font-semibold text-heading">
                Ordered items
              </h3>
              <span className="font-outfit text-sm text-text">
                {orderItems.length} line item{orderItems.length === 1 ? "" : "s"}
              </span>
            </div>

            {orderItems.length ? (
              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div
                    key={`${item.productId || item.id || item.title}-${index}`}
                    className="rounded-2xl border border-line bg-white p-4"
                  >
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-outfit text-base font-semibold text-heading">
                          {item.title || "Auto part"}
                        </p>
                        <p className="mt-1 font-outfit text-sm text-text">
                          Seller: {item.seller?.businessName || "Unavailable"}
                        </p>
                      </div>
                      <p className="font-outfit text-base font-semibold text-heading">
                        {nairaFormatter(item.lineTotalKobo || 0)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 font-outfit text-sm text-text">
                      <span>Qty: {item.quantity || 0}</span>
                      <span>Unit: {nairaFormatter(item.unitPriceKobo || 0)}</span>
                      <span>Product ID: {item.productId || "N/A"}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-white px-5 py-8 text-center font-outfit text-sm text-text">
                The backend did not return line items for this state, but your
                order and payment status are still shown here.
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-line p-5 md:p-7">
            <h3 className="mb-5 font-outfit text-xl font-semibold text-heading">
              Delivery details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#F9FAFB] px-4 py-4">
                <p className="mb-1 font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-text">
                  Address
                </p>
                <p className="font-outfit text-sm leading-6 text-heading">
                  {formatAddress(order?.deliveryAddress)}
                </p>
              </div>

              <div className="rounded-2xl bg-[#F9FAFB] px-4 py-4">
                <p className="mb-1 font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-text">
                  Payment method
                </p>
                <p className="font-outfit text-sm leading-6 text-heading">
                  {formatStatusLabel(order?.paymentMethod || payment?.provider || "paystack")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-line p-5 md:p-7">
            <h3 className="mb-5 font-outfit text-xl font-semibold text-heading">
              Order details
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-outfit text-sm text-text">Order ID</span>
                <span className="font-outfit text-sm font-semibold text-heading">
                  #{order?.id || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-outfit text-sm text-text">Created</span>
                <span className="font-outfit text-right text-sm font-semibold text-heading">
                  {formatDate(order?.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-outfit text-sm text-text">
                  Payment reference
                </span>
                <span className="font-outfit text-right text-sm font-semibold text-heading">
                  {payment?.reference || "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-outfit text-sm text-text">Provider</span>
                <span className="font-outfit text-sm font-semibold text-heading">
                  {formatStatusLabel(payment?.provider || "paystack")}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-line bg-[#101010] p-5 text-white md:p-7">
            <h3 className="mb-5 font-outfit text-xl font-semibold">
              Payment summary
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-outfit text-sm text-white/70">Subtotal</span>
                <span className="font-outfit text-sm font-semibold">
                  {nairaFormatter(order?.subtotalKobo || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-outfit text-sm text-white/70">Delivery</span>
                <span className="font-outfit text-sm font-semibold">
                  {order?.deliveryFeeKobo > 0
                    ? nairaFormatter(order.deliveryFeeKobo)
                    : "Free"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-outfit text-sm text-white/70">
                  Amount to pay
                </span>
                <span className="font-outfit text-sm font-semibold">
                  {nairaFormatter(payment?.amountKobo || order?.totalKobo || 0)}
                </span>
              </div>
            </div>

            <div className="my-5 h-px bg-white/10" />

            <div className="flex items-center justify-between gap-4">
              <span className="font-outfit text-base font-semibold">Total</span>
              <span className="font-outfit text-2xl font-bold">
                {nairaFormatter(order?.totalKobo || 0)}
              </span>
            </div>
          </div>

          {primaryActionLabel || secondaryActionLabel ? (
            <div className="space-y-3">
              {primaryActionLabel ? (
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  disabled={isProcessing}
                  className="w-full rounded-2xl bg-main px-5 py-4 font-outfit text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isProcessing ? "Please wait..." : primaryActionLabel}
                </button>
              ) : null}

              {secondaryActionLabel ? (
                <button
                  type="button"
                  onClick={onSecondaryAction}
                  disabled={isProcessing}
                  className="w-full rounded-2xl border border-heading px-5 py-4 font-outfit text-base font-semibold text-heading disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {secondaryActionLabel}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderCompleteStep;
