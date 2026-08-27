import { LuChevronDown } from "react-icons/lu";

const CustomSelect = ({
  label,
  filterOptions,
  onChange,
  open,
  setOpen,
  filterName,
  selectedValue = "",
}) => {
  const activeOption = filterOptions.find((option) => option.value === selectedValue);

  return (
    <>
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => {
            setOpen(open ? null : filterName);
          }}
          className="w-full flex items-center justify-between px-4 py-2 border border-line rounded-2xl font-outfit text-base text-heading bg-white"
        >
          <span>{activeOption?.label || label}</span>
          <LuChevronDown size={20} className="pointer-events-none" />
        </button>
        {open && (
          <div className="absolute left-0 top-full z-30 mt-2 w-full rounded-xl border border-line bg-white py-2 shadow-lg">
            {filterOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => onChange(option.value)}
                className="w-full px-4 py-2 text-left font-outfit text-sm text-heading hover:bg-gray-100"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomSelect;
