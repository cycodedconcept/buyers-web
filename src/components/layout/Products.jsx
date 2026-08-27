import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  setActiveFilter,
  DEFAULT_ACTIVE_FILTERS,
} from "../../features/products/productSlice";
import Button from "../ui/Button";
import ProductCard from "../ui/ProductCard";
import ProductLoadingGrid from "../ui/ProductLoadingGrid";
import ProductErrorState from "../ui/ProductErrorState";
import ProductEmptyState from "../ui/ProductEmptyState";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";
import { ImEqualizer2 } from "react-icons/im";
import { cleanParams } from "../../utils/utilityFunc";
import { PRODUCT_CONDITION_OPTIONS } from "../../features/products/productConstants";

const Products = ({
  limit = 8,
  headingText = "Featured Parts",
  fourGridDisplay = true,
  slider = false,
  bgMobile = "#F9FAFB",
  isListingGrid = false,
  sectionClassName = "",
  autoFetch = true,
}) => {
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return limit;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 6;
    return limit;
  });
  const dispatch = useDispatch();
  const { productsLoading, productsError, products, activeFilters } = useSelector(
    (state) => state.products,
  );

  const handleConditionClick = (value) => {
    if (value === "") {
      dispatch(setActiveFilter(DEFAULT_ACTIVE_FILTERS));
      return;
    }

    dispatch(
      setActiveFilter({
        ...DEFAULT_ACTIVE_FILTERS,
        condition: value,
      }),
    );
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(6);
      } else {
        setVisibleCount(limit);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [limit]);

  useEffect(() => {
    if (!autoFetch) {
      return undefined;
    }

    dispatch(
      fetchAllProducts({
        params: cleanParams(activeFilters),
      }),
    );

    return undefined;
  }, [activeFilters, autoFetch, dispatch]);

  const productsArr = products.slice(0, visibleCount);
  return (
    <>
      {isListingGrid ? (
        <>
          <div
            className={`container px-4 py-8 lg:py-15 ${bgMobile} lg:bg-transparent overflow-hidden ${sectionClassName}`}
          >
            <h2 className="font-outfit font-medium text-[30px] text-heading">
              Listing Grid
            </h2>
            <p className="text-text text-sm font-outfit mt-4 mb-6">
              There Are Currently 17 Results
            </p>
            <div className="flex flex-nowrap items-center gap-5 mb-6 overflow-x-auto hide-scrollbar pb-2">
              <div className="relative shrink-0">
                <select
                  name=""
                  id=""
                  className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">Used Part</option>
                </select>
                <LuChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                  size={20}
                />
              </div>

              <div className="relative shrink-0">
                <select
                  name=""
                  id=""
                  className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">Sort by: Recent</option>
                </select>
                <LuChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                  size={20}
                />
              </div>

              <div className="relative shrink-0">
                <select
                  name=""
                  id=""
                  className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">Availability</option>
                </select>
                <LuChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading hidden"
                  size={20}
                />
              </div>

              <div className="relative shrink-0">
                <select
                  name=""
                  id=""
                  className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">Body</option>
                </select>
                <LuChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                  size={20}
                />
              </div>

              <div className="relative shrink-0">
                <select
                  name=""
                  id=""
                  className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">Make</option>
                </select>
                <LuChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                  size={20}
                />
              </div>

              <div className="relative shrink-0">
                <select
                  name=""
                  id=""
                  className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">Filter by date</option>
                </select>
                <LuChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading hidden"
                  size={20}
                />
              </div>

              <div className="relative shrink-0">
                <select
                  name=""
                  id=""
                  className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">Year</option>
                </select>
                <LuChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                  size={20}
                />
              </div>

              <div className="relative shrink-0">
                <select
                  name=""
                  id=""
                  className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">Category</option>
                </select>
                <LuChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                  size={20}
                />
              </div>

              <div className="relative w-47 shrink-0 flex justify-center">
                <select
                  name=""
                  id=""
                  className="py-2 w-full ps-8 border border-line rounded-2xl font-outfit text-base text-heading appearance-none active:outline-none focus:outline-none caret-[#4D4DE5]"
                >
                  <option value="">More Filters</option>
                </select>
                <ImEqualizer2
                  className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                  size={20}
                />
              </div>
            </div>
            <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative w-full">
              {products.slice(0, 12).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`container px-3 py-12 lg:px-0 lg:py-20 ${bgMobile} lg:bg-transparent ${sectionClassName}`}
          >
            <div className="flex items-center justify-between mb-7">
              <h2 className="font-outfit lg:font-fraunces text-heading text-[20px] lg:text-[30px]">
                {headingText}
              </h2>
              <div className="hidden md:flex">
                <Button buttonType="view-all" className="hidden md:flex">
                  View all
                </Button>
              </div>
              <button className="flex md:hidden text-main font-outfit">
                View all
              </button>
            </div>
            {!fourGridDisplay && (
              <div className="flex gap-4 text-black font-outfit text-base mb-3 lg:mb-5">
                {PRODUCT_CONDITION_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleConditionClick(option.value)}
                    className={`hover:border-b-2 hover:border-b-main pb-1 lg:pb-4 lg:pr-4 cursor-pointer ${activeFilters.condition === option.value ? "border-b border-b-main" : "border-0"} ${option.disabled ? "text-text" : "text-black"}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            {productsLoading ? (
              <ProductLoadingGrid count={visibleCount} />
            ) : productsError ? (
              <ProductErrorState
                message={productsError}
                onRetry={() =>
                  dispatch(
                    fetchAllProducts({
                      params: cleanParams(activeFilters),
                    }),
                  )
                }
              />
            ) : products.length === 0 ? (
              <ProductEmptyState
                title="No products match your filters"
                message="Please try a different search or clear filters to discover available parts."
                actionLabel="Clear filters"
                onAction={() => {
                  dispatch(setActiveFilter(DEFAULT_ACTIVE_FILTERS));
                }}
              />
            ) : (
              <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 relative w-full">
                {slider && (
                  <div className="absolute inset-y-0 -left-6 -right-6 z-20 flex items-center justify-between pointer-events-none">
                    <button className="pointer-events-auto cursor-pointer flex h-12 w-12 items-center justify-center rounded-full bg-white text-heading shadow-lg">
                      <IoChevronBack size={20} />
                    </button>
                    <button className="pointer-events-auto cursor-pointer flex h-12 w-12 items-center justify-center rounded-full bg-white text-heading shadow-lg">
                      <IoChevronForward size={20} />
                    </button>
                  </div>
                )}
                {productsArr.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
