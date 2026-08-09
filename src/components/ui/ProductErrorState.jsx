import { IoWarningOutline } from "react-icons/io5";

const ProductErrorState = ({ message, onRetry }) => (
  <div className="col-span-full rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe6e0] text-main">
      <IoWarningOutline size={28} />
    </div>
    <h3 className="text-xl font-semibold text-heading mb-2">
      Unable to load products
    </h3>
    <p className="text-text mb-6 max-w-xl mx-auto">
      {message || "We couldn't load products right now. Please try again."}
    </p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center justify-center rounded-[14px] border border-heading bg-white px-6 py-3 text-sm font-medium text-heading transition hover:bg-heading hover:text-white"
      >
        Retry
      </button>
    )}
  </div>
);

export default ProductErrorState;
