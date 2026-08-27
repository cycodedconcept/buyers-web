import { useEffect, useState } from "react";
import { PiCreditCardLight } from "react-icons/pi";
import QuantityStepper from "./QuantityStepper";
import { nairaFormatter } from "../../utils/utilityFunc";

const FieldLabel = ({ children }) => (
  <label className="mb-1.5 block font-outfit text-xs font-semibold uppercase tracking-wide text-text">
    {children}
  </label>
);

const inputClasses =
  "w-full rounded-lg border border-out-line px-4 py-3 font-outfit text-sm text-heading placeholder:font-outfit placeholder:text-text outline-none transition-colors focus:border-heading";

const createInitialFormState = (initialValues = {}) => ({
  firstName: initialValues.firstName || "",
  lastName: initialValues.lastName || "",
  email: initialValues.email || "",
  phone: initialValues.phone || "",
  addressLabel: initialValues.addressLabel || "",
  street: initialValues.street || "",
  city: initialValues.city || "",
  state: initialValues.state || "",
});

const CheckoutDetailsStep = ({
  cartItems,
  summary,
  onIncrease,
  onDecrease,
  onCheckout,
  isUpdating = false,
  orderError = null,
  initialValues = {},
}) => {
  const [formState, setFormState] = useState(createInitialFormState(initialValues));
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    setFormState(createInitialFormState(initialValues));
  }, [initialValues]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const requiredFields = [
      { key: "addressLabel", label: "address label" },
      { key: "street", label: "street address" },
      { key: "city", label: "city" },
      { key: "state", label: "state" },
      { key: "phone", label: "phone number" },
    ];

    const missingField = requiredFields.find(
      ({ key }) => !formState[key]?.trim(),
    );

    if (missingField) {
      setFormError(`Please enter your ${missingField.label}.`);
      return;
    }

    setFormError(null);
    onCheckout({
      paymentMethod: "paystack",
      deliveryAddress: {
        label: formState.addressLabel.trim(),
        street: formState.street.trim(),
        city: formState.city.trim(),
        state: formState.state.trim(),
        phone: formState.phone.trim(),
      },
    });
  };

  const errorMessage = formError || orderError;

  return (
    <>
      <div className="my-16 hidden items-start gap-10 md:flex">
        <div className="max-w-207.5 flex w-full flex-col gap-8">
          <div className="rounded-2xl border border-text p-8.5">
            <h2 className="mb-6 font-outfit text-2xl font-medium text-heading">
              Contact Information
            </h2>
            <div className="mb-5 grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>First Name</FieldLabel>
                <input
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleFieldChange}
                  placeholder="First name"
                  className={inputClasses}
                />
              </div>
              <div>
                <FieldLabel>Last Name</FieldLabel>
                <input
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleFieldChange}
                  placeholder="Last name"
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="mb-5">
              <FieldLabel>Phone Number *</FieldLabel>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleFieldChange}
                placeholder="Phone number"
                className={inputClasses}
              />
            </div>
            <div>
              <FieldLabel>Email Address</FieldLabel>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleFieldChange}
                placeholder="Your email"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-text p-8.5">
            <h2 className="mb-6 font-outfit text-2xl font-medium text-heading">
              Delivery Address
            </h2>
            <div className="mb-5">
              <FieldLabel>Address Label *</FieldLabel>
              <input
                type="text"
                name="addressLabel"
                value={formState.addressLabel}
                onChange={handleFieldChange}
                placeholder="Workshop, home, office..."
                className={`${inputClasses} border-text`}
              />
            </div>
            <div className="mb-5">
              <FieldLabel>Street Address *</FieldLabel>
              <input
                type="text"
                name="street"
                value={formState.street}
                onChange={handleFieldChange}
                placeholder="12 Adeola Odeku Street"
                className={`${inputClasses} border-text`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Town / City *</FieldLabel>
                <input
                  type="text"
                  name="city"
                  value={formState.city}
                  onChange={handleFieldChange}
                  placeholder="Ikeja"
                  className={`${inputClasses} border-text`}
                />
              </div>
              <div>
                <FieldLabel>State *</FieldLabel>
                <input
                  type="text"
                  name="state"
                  value={formState.state}
                  onChange={handleFieldChange}
                  placeholder="Lagos"
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-text p-8.5">
            <h2 className="mb-6 font-outfit text-2xl font-medium text-heading">
              Payment Method
            </h2>
            <div className="rounded-xl border border-heading bg-[#F3F5F7] px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-heading">
                    <div className="h-2.5 w-2.5 rounded-full bg-heading" />
                  </div>
                  <div>
                    <p className="font-outfit text-sm font-semibold text-heading">
                      Paystack hosted checkout
                    </p>
                    <p className="mt-1 font-outfit text-sm text-text">
                      We&apos;ll redirect you to Paystack after order creation.
                    </p>
                  </div>
                </div>
                <PiCreditCardLight className="text-heading" size={22} />
              </div>
            </div>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-[#F0B7B7] bg-[#FFF5F5] px-5 py-4 font-outfit text-sm text-[#B43C3C]">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUpdating}
            className="w-full rounded-2xl bg-main py-4 font-outfit text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUpdating ? "Creating order..." : "Create Order"}
          </button>
        </div>

        <div className="flex-1">
          <div className="rounded-2xl border border-text p-8">
            <h2 className="mb-6 font-outfit text-2xl font-medium text-heading">
              Order Summary
            </h2>

            <div className="mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-5 flex gap-4 border-b border-line pb-5 last:mb-0 last:border-b-0 last:pb-0"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-24 w-20 shrink-0 rounded-lg bg-[#F4F4F4] object-contain p-1.5"
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between">
                      <p className="font-outfit text-sm font-medium text-heading">
                        {item.title}
                      </p>
                      <p className="font-outfit text-sm font-semibold text-heading">
                        {nairaFormatter(item.lineTotalKobo)}
                      </p>
                    </div>
                    <p className="mb-2.5 font-outfit text-sm text-text">
                      Condition: {item.condition}
                    </p>
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
                  </div>
                </div>
              ))}
            </div>

            <hr className="mb-5 text-line" />

            <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
              <span className="font-outfit text-sm text-text">Delivery</span>
              <span className="font-outfit text-sm font-medium text-heading">
                {summary.deliveryFeeKobo > 0
                  ? nairaFormatter(summary.deliveryFeeKobo)
                  : "Free"}
              </span>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
              <span className="font-outfit text-sm text-text">Subtotal</span>
              <span className="font-outfit text-sm font-semibold text-heading">
                {nairaFormatter(summary.subtotalKobo)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-outfit text-lg font-bold text-heading">
                Total
              </span>
              <span className="font-outfit text-lg font-bold text-heading">
                {nairaFormatter(summary.totalKobo)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 md:hidden">
        <div className="mb-7 rounded-2xl border border-out-line p-4.5">
          <h2 className="mb-4 font-outfit text-lg font-medium text-[#1A1A1A]">
            Contact Information
          </h2>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>First Name</FieldLabel>
                <input
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleFieldChange}
                  placeholder="First name"
                  className={inputClasses}
                />
              </div>
              <div>
                <FieldLabel>Last Name</FieldLabel>
                <input
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleFieldChange}
                  placeholder="Last name"
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <FieldLabel>Phone Number *</FieldLabel>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleFieldChange}
                placeholder="Phone number"
                className={inputClasses}
              />
            </div>
            <div>
              <FieldLabel>Email Address</FieldLabel>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleFieldChange}
                placeholder="Your email"
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        <div className="mb-7 rounded-2xl border border-out-line p-4.5">
          <h2 className="mb-4 font-outfit text-lg font-medium text-[#1A1A1A]">
            Delivery Address
          </h2>
          <div className="space-y-5">
            <div>
              <FieldLabel>Address Label *</FieldLabel>
              <input
                type="text"
                name="addressLabel"
                value={formState.addressLabel}
                onChange={handleFieldChange}
                placeholder="Workshop, home, office..."
                className={`${inputClasses} border-[#E8E8E8]`}
              />
            </div>
            <div>
              <FieldLabel>Street Address *</FieldLabel>
              <input
                type="text"
                name="street"
                value={formState.street}
                onChange={handleFieldChange}
                placeholder="12 Adeola Odeku Street"
                className={`${inputClasses} border-[#E8E8E8]`}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Town / City *</FieldLabel>
                <input
                  type="text"
                  name="city"
                  value={formState.city}
                  onChange={handleFieldChange}
                  placeholder="Ikeja"
                  className={`${inputClasses} border-[#E8E8E8]`}
                />
              </div>
              <div>
                <FieldLabel>State *</FieldLabel>
                <input
                  type="text"
                  name="state"
                  value={formState.state}
                  onChange={handleFieldChange}
                  placeholder="Lagos"
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-7 rounded-2xl border border-out-line p-4">
          <h2 className="mb-4 font-outfit text-lg font-medium text-[#1A1A1A]">
            Payment Method
          </h2>
          <div className="rounded-xl border border-[#1A1A1A] bg-[#F3F5F7] px-4 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#1A1A1A]">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#1A1A1A]" />
                </div>
                <div>
                  <p className="font-outfit text-sm font-semibold text-[#1A1A1A]">
                    Paystack hosted checkout
                  </p>
                  <p className="mt-1 font-outfit text-sm text-[#6B6B6B]">
                    Redirect after order creation.
                  </p>
                </div>
              </div>
              <PiCreditCardLight className="text-[#1A1A1A]" size={20} />
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div className="mb-7 rounded-2xl border border-[#F0B7B7] bg-[#FFF5F5] px-4 py-4 font-outfit text-sm text-[#B43C3C]">
            {errorMessage}
          </div>
        ) : null}

        <div className="rounded-2xl border border-out-line bg-[#F9FAFB] p-4">
          <h2 className="mb-4 font-outfit text-lg font-medium text-[#1A1A1A]">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-10 w-10 shrink-0 rounded-sm bg-[#F4F4F4] object-contain p-1.5"
                />
                <div className="mb-2.5 flex-1">
                  <p className="font-outfit text-sm font-semibold text-heading">
                    {item.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-4">
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
                    <span className="font-outfit text-base font-semibold text-heading">
                      {nairaFormatter(item.lineTotalKobo)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="mb-4 border-out-line" />

          <div className="mb-3 flex items-center justify-between">
            <span className="font-outfit text-sm text-text">Delivery</span>
            <span className="font-outfit text-sm font-medium text-heading">
              {summary.deliveryFeeKobo > 0
                ? nairaFormatter(summary.deliveryFeeKobo)
                : "Free"}
            </span>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span className="font-outfit text-sm text-text">Subtotal</span>
            <span className="font-outfit text-sm font-semibold text-heading">
              {nairaFormatter(summary.subtotalKobo)}
            </span>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-outfit text-lg font-bold text-heading">
              Total
            </span>
            <span className="font-outfit text-lg font-bold text-heading">
              {nairaFormatter(summary.totalKobo)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUpdating}
            className="w-full rounded-2xl bg-main py-4 font-outfit text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUpdating ? "Creating order..." : "Create Order"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutDetailsStep;
