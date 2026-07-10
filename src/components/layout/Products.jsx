import { useEffect, useState } from "react";
import products from "../../data/products";
import Button from "../ui/Button";
import ProductCard from "../ui/ProductCard";
import {
  IoLocationOutline,
  IoHeartOutline,
  IoStarOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";
import { ImEqualizer2 } from "react-icons/im";
import { nairaFormatter } from "../../utils/utilityFunc";

const Products = ({
  limit = 8,
  headingText = "Featured Parts",
  fourGridDisplay = true,
  slider = false,
  bgMobile = "#F9FAFB",
  isListingGrid = false,
}) => {
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return limit;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 6;
    return limit;
  });

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

  const productsArr = products.slice(0, visibleCount);
  return (
    <>
      {isListingGrid ? (
        <>
          <div
            className={`container px-4 py-8 lg:py-15 ${bgMobile} lg:bg-transparent overflow-hidden`}
          >
            <h2 className="font-outfit font-medium text-[30px] text-heading">
              Listing Grid
            </h2>
            <p className="text-text text-sm font-outfit mt-4 mb-6">
              There Are Currently 17 Results
            </p>
            <div className="flex flex-nowrap items-center gap-5 mb-6 overflow-x-auto hide-scrollbar pb-2">
              <div className="relative flex-shrink-0">
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

              <div className="relative flex-shrink-0">
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

              <div className="relative flex-shrink-0">
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

              <div className="relative flex-shrink-0">
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

              <div className="relative flex-shrink-0">
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

              <div className="relative flex-shrink-0">
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

              <div className="relative flex-shrink-0">
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

              <div className="relative flex-shrink-0">
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

              <div className="relative w-[188px] flex-shrink-0 flex justify-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative w-full">
              {products.slice(0, 12).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <div className="mt-8 hidden items-center justify-center gap-3 md:flex">
              <button className="flex h-12 w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                <IoChevronBack size={20} />
              </button>
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                1
              </button>
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                2
              </button>
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-main bg-main text-white">
                3
              </button>
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                4
              </button>
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                ...
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                <IoChevronForward size={20} />
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-main bg-main text-white">
                1
              </button>
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                2
              </button>
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                3
              </button>
              <button className="flex h-12 min-w-[48px] items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                4
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`container px-3 lg:px-0 py-12 lg:py-20 ${bgMobile} lg:bg-transparent`}
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
                <button className="hover:border-b-2 hover:border-b-main focus:border-b-2 focus:border-b-main pb-1 lg:pb-4 lg:pr-4 cursor-pointer">
                  All
                </button>
                <button className="hover:border-b-2 hover:border-b-main focus:border-b-2 focus:border-b-main pb-1 lg:pb-4 lg:pr-4 cursor-pointer">
                  New
                </button>
                <button className="hover:border-b-2 hover:border-b-main focus:border-b-2 focus:border-b-main pb-1 lg:pb-4 lg:pr-4 cursor-pointer">
                  Used
                </button>
                <button className="hover:border-b-2 hover:border-b-main focus:border-b-2 focus:border-b-main pb-1 lg:pb-4 lg:pr-4 cursor-pointer">
                  OEM
                </button>
                <button className="hover:border-b-2 hover:border-b-main focus:border-b-2 focus:border-b-main pb-1 lg:pb-4 lg:pr-4 cursor-pointer">
                  Port Harcourt
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 relative w-full">
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
              {productsArr.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
