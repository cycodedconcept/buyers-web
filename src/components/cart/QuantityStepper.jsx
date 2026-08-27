import { PiMinusLight, PiPlusLight } from "react-icons/pi";

const QuantityStepper = ({
  quantity,
  onIncrease,
  onDecrease,
  size = "md",
  disabled = false,
  disableIncrease = false,
  disableDecrease = false,
}) => {
  const isSm = size === "sm";

  return (
    <div
      className={`inline-flex items-center gap-3.5 rounded-lg font-outfit text-heading font-semibold ${
        isSm
          ? "px-2.5 py-1.5 text-sm border-none bg-[#F9FAFB]"
          : "px-3 py-2 text-sm border border-heading bg-transparent"
      }`}
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        disabled={disabled || disableDecrease}
        className="text-heading flex items-center justify-center disabled:opacity-40"
      >
        <PiMinusLight size={16} />
      </button>
      <span className="min-w-3 text-center">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        disabled={disabled || disableIncrease}
        className="text-heading flex items-center justify-center disabled:opacity-40"
      >
        <PiPlusLight size={16} />
      </button>
    </div>
  );
};

export default QuantityStepper;
