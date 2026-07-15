import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import QuantityStepper from "./QuantityStepper";

const formatUSD = (value) => `$${value.toFixed(2)}`;

const shippingOptions = [
  { id: "free", label: "Free Shipping", value: "$0.00" },
  { id: "express", label: "Express Shipping", value: "+$15.00" },
  { id: "pickup", label: "Pick Up", value: "%21.00" },
];

const ShoppingCartStep = ({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) => {
  const [shippingMethod, setShippingMethod] = useState("free");
  const [couponCode, setCouponCode] = useState("");

  return (
    <div className="flex gap-10 items-start my-16">
      {/* Left column - product table + coupon */}
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
                src={item.image}
                alt={item.name}
                className="w-20 h-24 rounded-lg bg-[#F4F4F4] object-contain p-2 shrink-0"
              />
              <div>
                <p className="font-outfit text-heading text-sm font-medium mb-2">
                  {item.name}
                </p>
                <p className="font-outfit text-text text-xs mb-2">
                  Quality: {item.quality}
                </p>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="flex items-center gap-1 text-text font-bold text-sm font-outfit"
                >
                  <IoClose size={24} />
                  Remove
                </button>
              </div>
            </div>
            <div className="w-32 flex justify-center">
              <QuantityStepper
                quantity={item.quantity}
                onIncrease={() => onIncrease(item.id)}
                onDecrease={() => onDecrease(item.id)}
              />
            </div>
            <div className="w-32 text-center font-outfit text-heading text-lg">
              {formatUSD(item.price)}
            </div>
            <div className="w-24 text-right font-outfit text-heading text-lg">
              {formatUSD(item.price * item.quantity)}
            </div>
          </div>
        ))}

        <div className="mt-14">
          <h2 className="font-outfit text-heading text-xl mb-2">
            Have a Coupon?
          </h2>
          <p className="font-outfit text-text text-base mb-5">
            Add your code for an instant cart discount
          </p>
          <div className="max-w-125 w-full border border-text rounded-2xl flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3 flex-1">
              <LuTicket className="text-text shrink-0" size={20} />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code"
                className="flex-1 bg-transparent outline-none font-outfit text-base text-heading placeholder:text-text"
              />
            </div>
            <button
              type="button"
              className="font-outfit font-medium text-heading text-base shrink-0"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Right column - cart summary */}
      <div className="flex-1">
        <div className="border border-text rounded-2xl p-8">
          <h2 className="font-outfit text-heading text-xl mb-5">
            Cart Summary
          </h2>

          <div className="mb-7">
            {shippingOptions.map((option) => {
              const isSelected = shippingMethod === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setShippingMethod(option.id)}
                  className={`w-full flex items-center justify-between rounded-xl border px-4 py-3.5 mb-3 last:mb-0 transition-colors border-heading ${
                    isSelected ? "bg-[#F3F5F7]" : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 border-heading`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-heading" />
                      )}
                    </div>
                    <span className="font-outfit text-heading text-sm font-medium">
                      {option.label}
                    </span>
                  </div>
                  <span className="font-outfit text-heading text-sm font-medium">
                    {option.value}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="">
            <div className="flex items-center justify-between">
              <span className="font-outfit text-text text-sm">Subtotal</span>
              <span className="font-outfit text-heading text-sm font-semibold">
                $1234.00
              </span>
            </div>
            <hr className="text-line my-2.5" />
            <div className="flex items-center justify-between mb-6">
              <span className="font-outfit text-heading text-lg font-bold">
                Total
              </span>
              <span className="font-outfit text-heading text-lg font-bold">
                $1345.00
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            className="w-full rounded-2xl bg-main text-white font-outfit font-bold text-lg py-3"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartStep;