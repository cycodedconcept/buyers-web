import QuantityStepper from "./QuantityStepper";
import { nairaFormatter } from "../../utils/utilityFunc";

const formatDelivery = (deliveryFeeKobo) =>
  deliveryFeeKobo > 0 ? nairaFormatter(deliveryFeeKobo) : "Free";

const ShoppingCartStep = ({
  cartItems,
  summary,
  onIncrease,
  onDecrease,
  onCheckout,
  isUpdating = false,
}) => {
  return (
    <>
      <div className="hidden md:flex gap-10 items-start my-16">
        <div className="max-w-207.5 w-full">
          <div className="flex items-center pb-4 border-b border-heading font-outfit text-base font-bold text-heading">
            <div className="flex-1">Product</div>
            <div className="w-32 text-center">Quantity</div>
            <div className="w-32 text-center">Price</div>
            <div className="w-24 text-right">Subtotal</div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-5.5 border-b border-line last:border-b-0"
            >
              <div className="flex-1 flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-20 h-24 rounded-lg bg-[#F4F4F4] object-contain p-2 shrink-0"
                />
                <div>
                  <p className="font-outfit text-heading text-sm font-medium mb-2">
                    {item.title}
                  </p>
                  <p className="font-outfit text-text text-xs mb-2">
                    Condition: {item.condition}
                  </p>
                  <p className="font-outfit text-text text-xs">
                    Ships from: {item.location || "Seller location unavailable"}
                  </p>
                </div>
              </div>
              <div className="w-32 flex justify-center">
                <QuantityStepper
                  quantity={item.quantity}
                  onIncrease={() => onIncrease(item)}
                  onDecrease={() => onDecrease(item)}
                  disabled={isUpdating}
                  disableDecrease={item.quantity <= 1}
                  disableIncrease={
                    item.stockQty !== null &&
                    item.stockQty !== undefined &&
                    item.quantity >= item.stockQty
                  }
                />
              </div>
              <div className="w-32 text-center font-outfit text-heading text-lg">
                {nairaFormatter(item.unitPriceKobo)}
              </div>
              <div className="w-24 text-right font-outfit text-heading text-lg">
                {nairaFormatter(item.lineTotalKobo)}
              </div>
            </div>
          ))}

          <div className="mt-10 rounded-2xl bg-[#F7F7F7] px-6 py-5">
            <p className="font-outfit text-heading text-base font-medium mb-1">
              Cart updates sync from the backend.
            </p>
            <p className="font-outfit text-text text-sm">
              Quantity changes refresh line totals and your summary automatically.
            </p>
          </div>
        </div>

        <div className="flex-1">
          <div className="border border-text rounded-2xl p-8">
            <h2 className="font-outfit text-heading text-xl mb-5">
              Cart Summary
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-outfit text-text text-sm">Items</span>
                <span className="font-outfit text-heading text-sm font-semibold">
                  {summary.itemCount}
                </span>
              </div>
              <hr className="text-line" />
              <div className="flex items-center justify-between">
                <span className="font-outfit text-text text-sm">Delivery</span>
                <span className="font-outfit text-heading text-sm font-semibold">
                  {formatDelivery(summary.deliveryFeeKobo)}
                </span>
              </div>
              <hr className="text-line" />
              <div className="flex items-center justify-between">
                <span className="font-outfit text-text text-sm">Subtotal</span>
                <span className="font-outfit text-heading text-sm font-semibold">
                  {nairaFormatter(summary.subtotalKobo)}
                </span>
              </div>
              <hr className="text-line" />
              <div className="flex items-center justify-between mb-6">
                <span className="font-outfit text-heading text-lg font-bold">
                  Total
                </span>
                <span className="font-outfit text-heading text-lg font-bold">
                  {nairaFormatter(summary.totalKobo)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              disabled={!cartItems.length || isUpdating}
              className="w-full rounded-2xl bg-main text-white font-outfit font-bold text-lg py-3 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-4 my-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border border-out-line rounded-2xl p-4 flex gap-4"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-25 h-25 rounded-lg bg-[#F4F4F4]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-outfit text-heading text-base font-semibold truncate">
                  {item.title}
                </p>
              </div>
              <span className="inline-block bg-success/10 text-success text-xs font-medium rounded-full px-2.5 py-1 mb-3">
                {item.condition}
              </span>
              <div className="flex items-center justify-between">
                <QuantityStepper
                  size="sm"
                  quantity={item.quantity}
                  onIncrease={() => onIncrease(item)}
                  onDecrease={() => onDecrease(item)}
                  disabled={isUpdating}
                  disableDecrease={item.quantity <= 1}
                  disableIncrease={
                    item.stockQty !== null &&
                    item.stockQty !== undefined &&
                    item.quantity >= item.stockQty
                  }
                />
                <span className="font-outfit text-main text-lg font-bold">
                  {nairaFormatter(item.lineTotalKobo)}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-[#F7F7F7] rounded-2xl p-6 mt-6 mb-4">
          <h2 className="font-outfit text-heading text-lg font-semibold mb-4">
            Cart Summary
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-outfit text-text text-sm">Items</span>
              <span className="font-outfit text-heading text-sm font-semibold">
                {summary.itemCount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-outfit text-text text-sm">Delivery</span>
              <span className="font-outfit text-heading text-sm font-semibold">
                {formatDelivery(summary.deliveryFeeKobo)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-outfit text-text text-sm">Subtotal</span>
              <span className="font-outfit text-heading text-sm font-semibold">
                {nairaFormatter(summary.subtotalKobo)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5 mt-4">
            <span className="font-outfit text-heading text-lg font-bold">
              Total
            </span>
            <span className="font-outfit text-heading text-lg font-bold">
              {nairaFormatter(summary.totalKobo)}
            </span>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={!cartItems.length || isUpdating}
            className="w-full rounded-2xl bg-main text-white font-outfit font-bold text-lg py-3 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartStep;
