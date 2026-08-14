// import { IoLocationOutline, IoStarOutline } from "react-icons/io5";

const ProductSkeletonCard = () => (
  <div className="border border-line rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse flex flex-col h-full">
    <div className="bg-[#eaeaea] w-full h-56.25" />
    <div className="p-4 flex flex-col flex-1">
      <div className="h-3 w-24 rounded-full bg-slate-200 mb-3" />
      <div className="h-5 w-full rounded-full bg-slate-200 mb-4" />
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="h-3 w-24 rounded-full bg-slate-200" />
        <div className="h-3 w-16 rounded-full bg-slate-200" />
      </div>
      <div className="flex items-center gap-2 mb-6">
        <div className="h-6 w-1/2 rounded-full bg-slate-200" />
        <div className="h-4 w-1/3 rounded-full bg-slate-200" />
      </div>
      <div className="mt-auto">
        <div className="h-px bg-line mb-6" />
        <div className="h-11 w-full rounded-[14px] bg-slate-200" />
      </div>
    </div>
  </div>
);

const ProductLoadingGrid = ({ count = 8 }) => (
  <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 relative w-full">
    {Array.from({ length: count }).map((_, index) => (
      <ProductSkeletonCard key={index} />
    ))}
  </div>
);

export default ProductLoadingGrid;
