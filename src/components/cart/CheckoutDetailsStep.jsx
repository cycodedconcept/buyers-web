import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { PiCreditCardLight } from "react-icons/pi";
import { LuTicket } from "react-icons/lu";
import QuantityStepper from "./QuantityStepper";

const formatUSD = (value) => `$${value.toFixed(2)}`;

const FieldLabel = ({ children }) => (
  <label className="block font-outfit text-xs font-semibold text-text tracking-wide uppercase mb-1.5">
    {children}
  </label>
);

const inputClasses =
  "w-full rounded-lg border border-[#CBCBCB] py-3 px-4 font-outfit text-sm text-heading placeholder:text-text placeholder:font-outfit outline-none focus:border-heading transition-colors";

const CheckoutDetailsStep = ({
  cartItems,
  onIncrease,
  onDecrease,
  onCheckout,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [useBillingAddress, setUseBillingAddress] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState({
    code: "JenkateMW",
    amount: 25,
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = appliedCoupon ? appliedCoupon.amount : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    setAppliedCoupon({ code: couponInput.trim(), amount: 25 });
    setCouponInput("");
  };

  return (
    <div className="flex gap-10 items-start my-16">
      {/* Left column - forms */}
      <div className="max-w-207.5 w-full flex flex-col gap-8">
        <div className="border border-text rounded-2xl p-8.5">
          <h2 className="font-outfit text-heading text-2xl font-medium mb-6">
            Contact Infomation
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <FieldLabel>First Name</FieldLabel>
              <input
                type="text"
                placeholder="First name"
                className={inputClasses}
              />
            </div>
            <div>
              <FieldLabel>Last Name</FieldLabel>
              <input
                type="text"
                placeholder="Last name"
                className={inputClasses}
              />
            </div>
          </div>
          <div className="mb-5">
            <FieldLabel>Phone Number</FieldLabel>
            <input
              type="tel"
              placeholder="Phone number"
              className={inputClasses}
            />
          </div>
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <input
              type="email"
              placeholder="Your Email"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="border border-text rounded-2xl p-8.5">
          <h2 className="font-outfit text-heading text-2xl font-medium mb-6">
            Shipping Address
          </h2>
          <div className="mb-5">
            <FieldLabel>Street Address *</FieldLabel>
            <input
              type="text"
              placeholder="Stress Address"
              className={`${inputClasses} border-text`}
            />
          </div>
          <div className="mb-5">
            <FieldLabel>Country *</FieldLabel>
            <button
              type="button"
              className={`${inputClasses} flex items-center justify-between text-left border-text`}
            >
              <span className="text-text">Country</span>
              <IoChevronDown className="text-text" size={16} />
            </button>
          </div>
          <div className="mb-5">
            <FieldLabel>Town / City *</FieldLabel>
            <input
              type="text"
              placeholder="Town / City"
              className={`${inputClasses} border-text`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <FieldLabel>State</FieldLabel>
              <input type="text" placeholder="State" className={inputClasses} />
            </div>
            <div>
              <FieldLabel>Zip Code</FieldLabel>
              <input
                type="text"
                placeholder="Zip Code"
                className={`${inputClasses} text-text`}
              />
            </div>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={useBillingAddress}
              onChange={(e) => setUseBillingAddress(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-line accent-heading"
            />
            <span className="font-outfit text-sm text-text">
              Use a different billing address (optional)
            </span>
          </label>
        </div>

        <div className="border border-text rounded-2xl p-8.5">
          <h2 className="font-outfit text-heading text-2xl font-medium mb-6">
            Payment Method
          </h2>
          <div className="flex flex-col gap-3 mb-5">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-between rounded-xl border px-4 py-4 ${
                paymentMethod === "card"
                  ? "border-heading bg-[#F3F5F7]"
                  : "border-heading"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    paymentMethod === "card"
                      ? "border-heading"
                      : "border-heading"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-heading" />
                  )}
                </div>
                <span className="font-outfit text-heading font-semibold text-sm">
                  Pay by Card Credit
                </span>
              </div>
              <PiCreditCardLight className="text-heading" size={20} />
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center justify-between rounded-xl border border-heading px-4 py-4 ${paymentMethod === "paypal" ? "bg-[#F3F5F7]" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    paymentMethod === "paypal"
                      ? "border-heading"
                      : "border-heading"
                  }`}
                >
                  {paymentMethod === "paypal" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-heading" />
                  )}
                </div>
                <span className="font-outfit text-heading font-semibold text-sm">
                  Paypal
                </span>
              </div>
            </button>
          </div>

          {paymentMethod === "card" && (
            <>
              <hr className="text-text my-5" />
              <div className="mb-5">
                <FieldLabel>Card Number</FieldLabel>
                <input
                  type="text"
                  placeholder="1234 1234 1234"
                  className={`${inputClasses} border-text`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Expiration Date</FieldLabel>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className={`${inputClasses} border-text`}
                  />
                </div>
                <div>
                  <FieldLabel>CVC</FieldLabel>
                  <input
                    type="text"
                    placeholder="CVC Code"
                    className={`${inputClasses} border-text`}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onCheckout}
          className="w-full rounded-2xl bg-main text-white font-outfit font-semibold text-base py-4"
        >
          Checkout
        </button>
      </div>

      {/* Right column - order summary */}
      <div className="flex-1">
        <div className="border border-text rounded-2xl p-8">
          <h2 className="font-outfit text-heading text-2xl font-medium mb-6">
            Order Summary
          </h2>

          <div className="mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 mb-5 border-b border-line last:border-b-0 last:mb-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 rounded-lg bg-[#F4F4F4] object-contain p-1.5 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-outfit text-heading font-medium text-sm">
                      {item.name}
                    </p>
                    <p className="font-outfit text-heading font-semibold text-sm">
                      {formatUSD(item.price * item.quantity)}
                    </p>
                  </div>
                  <p className="font-outfit text-text text-sm mb-2.5">
                    Quality: Excellence
                  </p>
                  <QuantityStepper
                    size="sm"
                    quantity={item.quantity}
                    onIncrease={() => onIncrease(item.id)}
                    onDecrease={() => onDecrease(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-5">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Input"
              className="flex-1 rounded-lg border border-line py-3 px-4 font-outfit text-sm text-heading placeholder:text-text outline-none"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="rounded-lg bg-main text-white font-outfit font-semibold text-sm px-6 py-3 shrink-0"
            >
              Apply
            </button>
          </div>

          {appliedCoupon && (
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <LuTicket className="text-icon" size={18} />
                <span className="font-outfit text-heading text-sm">
                  {appliedCoupon.code}
                </span>
              </div>
              <p className="font-outfit text-success text-sm font-medium">
                -{formatUSD(appliedCoupon.amount)}{" "}
                <button
                  type="button"
                  onClick={() => setAppliedCoupon(null)}
                  className="underline"
                >
                  [Remove]
                </button>
              </p>
            </div>
          )}

          <hr className="text-line mb-5" />

          <div className="flex items-center justify-between pb-3 mb-3 border-b border-line">
            <span className="font-outfit text-text text-sm">Shipping</span>
            <span className="font-outfit text-heading text-sm font-medium">
              Free
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-line">
            <span className="font-outfit text-text text-sm">Subtotal</span>
            <span className="font-outfit text-heading text-sm font-semibold">
              {formatUSD(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-outfit text-heading text-lg font-bold">
              Total
            </span>
            <span className="font-outfit text-heading text-lg font-bold">
              {formatUSD(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsStep;
