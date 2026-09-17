const PageControls = ({ pagination, onPageChange, disabled = false }) => {
  const page = Number(pagination?.page) || 1;
  const totalPages = Number(pagination?.totalPages) || 1;

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-4 font-outfit">
      <button
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-xl border border-line px-4 py-2 text-heading disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-text">Page {page} of {totalPages}</span>
      <button
        type="button"
        disabled={disabled || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-xl border border-line px-4 py-2 text-heading disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};

export default PageControls;
