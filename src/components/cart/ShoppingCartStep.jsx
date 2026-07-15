import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import QuantityStepper from "./QuantityStepper";

const formatUSD = (value) => `$${value.toFixed(2)}`;

const shippingOptions = [
  { id: "free", label: "Free delivery", value: "$0.00" },
  { id: "express", label: "Express delivery", value: "+$15.00" },
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
    <>
      <div className="hidden md:flex gap-10 items-start my-16">
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

      <div className="md:hidden flex flex-col gap-4 my-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border border-out-line rounded-2xl p-4 flex gap-4"
          >
              <img
                src={item.image}
                alt={item.name}
                className="w-25 h-25 rounded-lg bg-[#F4F4F4]"
              />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-outfit text-heading text-base font-semibold truncate">
                  {item.name}
                </p>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove item"
                  className="text-icon shrink-0"
                >
                  <IoClose size={18} />
                </button>
              </div>
              <span className="inline-block bg-success/10 text-success text-xs font-medium rounded-full px-2.5 py-1 mb-3">
                {item.quality}
              </span>
              <div className="flex items-center justify-between">
                <QuantityStepper
                  size="sm"
                  quantity={item.quantity}
                  onIncrease={() => onIncrease(item.id)}
                  onDecrease={() => onDecrease(item.id)}
                />
                <span className="font-outfit text-main text-lg font-bold">
                  {formatUSD(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Cart summary */}
        <div className="bg-[#F7F7F7] rounded-2xl p-6 mt-6 mb-4">
          <h2 className="font-outfit text-heading text-lg font-semibold mb-4">
            Cart Summary
          </h2>

          <div className="flex flex-col gap-3.5 mb-5">
            {shippingOptions.slice(0, 2).map((option) => {
              const isSelected = shippingMethod === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setShippingMethod(option.id)}
                  className={`w-full flex items-center justify-between rounded-xl border bg-white px-4 py-3.5 transition-colors ${
                    isSelected ? "border-main border-2" : "border-line"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-main" : "border border-line"
                      }`}
                    >
                      {/* {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )} */}
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

          <hr className="text-out-line my-4" />

          <div className="flex items-center justify-between mb-4.5">
            <span className="font-outfit text-text text-sm">Subtotal</span>
            <span className="font-outfit text-heading text-sm font-semibold">
              $1,234.00
            </span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="font-outfit text-heading text-lg font-bold">
              Total
            </span>
            <span className="font-outfit text-heading text-lg font-bold">
              $1,345.00
            </span>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            className="w-full rounded-2xl bg-main text-white font-outfit font-bold text-base py-3.5"
          >
            Checkout
          </button>
        </div>

        {/* Coupon */}
        <div>
          <h2 className="font-outfit text-heading text-xl font-semibold mb-3">
            Have a Coupon?
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon Code"
              className="flex-1 min-w-0 rounded-full border border-line px-5 py-3.5 font-outfit text-sm text-heading placeholder:text-text outline-none"
            />
            <button
              type="button"
              className="shrink-0 rounded-2xl bg-heading text-white font-outfit font-semibold text-sm px-6 py-3.5"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartStep;