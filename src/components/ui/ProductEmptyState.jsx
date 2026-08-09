import { IoSearchOutline } from "react-icons/io5";

const ProductEmptyState = ({
  title = "No products found",
  message = "Try adjusting your filters or search terms to discover available parts.",
  actionLabel,
  onAction,
}) => (
  <div className="col-span-full rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4ff] text-main">
      <IoSearchOutline size={28} />
    </div>
    <h3 className="text-xl font-semibold text-heading mb-2">{title}</h3>
    <p className="text-text mb-6 max-w-xl mx-auto">{message}</p>
    {onAction && actionLabel && (
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center justify-center rounded-[14px] border border-heading bg-white px-6 py-3 text-sm font-medium text-heading transition hover:bg-heading hover:text-white"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default ProductEmptyState;
