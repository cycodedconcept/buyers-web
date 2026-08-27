import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchAllProducts } from "../features/products/productSlice";
import Navbar from "../components/layout/Navbar";
import TopInfo from "../components/layout/TopInfo";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import {
  LuChevronDown,
  LuChevronLeft,
  LuCheck,
} from "react-icons/lu";
import { CgMenuGridO } from "react-icons/cg";
import { FaListUl, FaTimes } from "react-icons/fa";
import ProductCard from "../components/ui/ProductCard";
import Footer from "../components/layout/Footer";

const ListingGrid2 = () => {
  const minLimit = 2000;
  const maxLimit = 2025;
  const totalRange = maxLimit - minLimit;

  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(2020);

  const currentMin = Math.min(startYear, endYear);
  const currentMax = Math.max(startYear, endYear);

  const leftPercent = ((currentMin - minLimit) / totalRange) * 100;
  const widthPercent =
    ((currentMax - minLimit) / totalRange) * 100 - leftPercent;

    const {products} = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchAllProducts())
    }, [dispatch])

  return (
    <>
      <div className="hidden md:block">
        <TopInfo />
      </div>
        <Navbar isListingPage isHomepage={false}/>
      <div className="container px-3 md:py-14">
        <div className="hidden md:block">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: "Home", to: "/" },
              { label: "Used parts for sale" },
            ]}
          />

          <div>
            <h2 className="font-outfit font-medium text-[30px] text-heading mb-4">
              Listing Grid
            </h2>
            <p className="text-text text-sm font-outfit mb-6">
              There Are Currently {products.length} Results
            </p>

            <div className="mb-7 w-full">
              <h1 className="font-fraunces text-[30px] text-heading leading[1.1] mb-4">
                10,000+ Get The Best Deals On Used Parts
              </h1>
              <p className="text-sm font-outfit text-text">
                Browse thousands of genuine auto spare parts — new, used, and
                refurbished. From brake pads to alternators, our verified
                sellers stock parts for Toyota, Honda, Mercedes-Benz, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <h2 className="font-fraunces font-medium text-[30px] text-heading mb-4">
            10,900+ Get The Best <br /> Deals On Car Parts
          </h2>
          <p className="font-inter text-text text-sm mb-4">
            Browse thousands of genuine auto spare parts — <br /> new, used, and
            refurbished.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <div className="border border-line rounded-3xl p-6 bg-[#F9FAFB] md:bg-white shadow-sm font-outfit">
              <div className="hidden md:flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-[20px] font-medium text-heading">
                    Filters and sort
                  </h4>
                </div>
                <button className="text-heading font-medium text-sm flex items-center gap-2 hover:text-main">
                  <FaTimes /> Clear
                </button>
              </div>

              <div className="flex md:hidden justify-between items-center">
                <h4 className="font-inter text-base font-semibold">
                  Filters and sort
                </h4>
                <button className="text-main">Clear</button>
              </div>

              <div className="block md:hidden mt-5 space-y-3">
                <div className="relative w-full lg:w-62.5">
                  <select
                    name=""
                    id=""
                    className="w-full py-2 px-4 bg-white border border-line rounded-xl font-outfit text-sm text-text appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                  >
                    <option value="">Category</option>
                  </select>
                  <LuChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text"
                    size={20}
                  />
                </div>

                <div className="relative w-full lg:w-62.5">
                  <select
                    name=""
                    id=""
                    className="w-full py-2 px-4 bg-white border border-line rounded-xl font-outfit text-sm text-text appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                  >
                    <option value="">Make</option>
                  </select>
                  <LuChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text"
                    size={20}
                  />
                </div>

                <div className="relative w-full lg:w-62.5">
                  <select
                    name=""
                    id=""
                    className="w-full py-2 px-4 bg-white border border-line rounded-xl font-outfit text-sm text-text appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                  >
                    <option value="">Price Range</option>
                  </select>
                  <LuChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text"
                    size={20}
                  />
                </div>

                <div className="relative w-full lg:w-62.5">
                  <select
                    name=""
                    id=""
                    className="w-full py-2 px-4 bg-white border border-line rounded-xl font-outfit text-sm text-text appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                  >
                    <option value="">Condition</option>
                  </select>
                  <LuChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text"
                    size={20}
                  />
                </div>
              </div>

              <div className="hidden md:block">
                <div className="space-y-4">
                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>Make</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>Models</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>Part Condition</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="py-6">
                    <div className="flex items-center gap-1 text-sm font-medium text-heading mb-3">
                      <span>Price:</span>
                      <span>$0 - $250,000</span>
                    </div>
                    <div className="range-slider-container">
                      {/* Grey Background Track */}
                      <div className="range-slider-track"></div>

                      {/* Dynamic Orange Filled Area with dynamic style injections */}
                      <div
                        className="range-slider-fill"
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      ></div>

                      {/* Left Thumb Input */}
                      <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value))}
                        className="range-slider"
                      />

                      {/* Right Thumb Input */}
                      <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                        className="range-slider"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>Location</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>Vehicle Compatibility</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>Category</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>Part Number</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>Availability</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <select className="w-full rounded-2xl border border-line bg-white py-3 px-4 pr-10 text-base text-text font-outfit appearance-none focus:outline-none">
                      <option>OEM</option>
                    </select>
                    <LuChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-heading"
                      size={18}
                    />
                  </div>

                  <div className="py-6">
                    <div className="flex items-center gap-1 text-sm font-medium text-heading mb-3">
                      <span>Year</span>
                      <span>2000 - 2025</span>
                    </div>
                    <div className="range-slider-container">
                      {/* Grey Background Track */}
                      <div className="range-slider-track"></div>

                      {/* Dynamic Orange Filled Area with dynamic style injections */}
                      <div
                        className="range-slider-fill"
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      ></div>

                      {/* Left Thumb Input */}
                      <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value))}
                        className="range-slider"
                      />

                      {/* Right Thumb Input */}
                      <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                        className="range-slider"
                      />
                    </div>
                  </div>

                  <div className="py-4">
                    <div className="flex items-center text-sm font-medium text-heading mb-3">
                      <span>Discount (60%)</span>
                    </div>
                    <div className="range-slider-container">
                      {/* Grey Background Track */}
                      <div className="range-slider-track"></div>

                      {/* Dynamic Orange Filled Area with dynamic style injections */}
                      <div
                        className="range-slider-fill"
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      ></div>

                      {/* Left Thumb Input */}
                      <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value))}
                        className="range-slider"
                      />

                      {/* Right Thumb Input */}
                      <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                        className="range-slider"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-line pt-6">
                  <h5 className="font-medium text-heading text-base mb-4">
                    Featured
                  </h5>
                  <div className="space-y-3 max-h-140 overflow-y-auto pr-2">
                    {[
                      "OEM-Grade",
                      "Multi-vehicle Compatible",
                      "CAC-Verified Seller",
                      "In-Stock",
                      "Warranty Included",
                      "Universal Fit",
                      "Touchscreen display",
                      "Return Accepted",
                      "Free Delivery Available",
                      "In-car Wi-Fi",
                      "Nationwide Delivery",
                      "Brand New In-Box",
                      "Load-Tested",
                      "Electrically Tested",
                      "Bulk Pricing Available",
                    ].map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-3 text-sm text-heading font-outfit cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={label === "Multi-vehicle Compatible"}
                          className="peer sr-only"
                        />
                        <span className="h-6 w-6 flex items-center justify-center rounded-lg border border-line bg-transparent transition-all duration-200 peer-checked:bg-main peer-checked:border-main peer-checked:text-white">
                          <LuCheck className="h-4 w-4 stroke-current text-current opacity-0 peer-checked:opacity-100" />
                        </span>
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="hidden md:flex items-center justify-between mb-6">
              <div className="space-x-2">
                <button className="bg-main py-2 px-6 font-outfit text-white text-base font-medium rounded-xl">
                  All car
                </button>
                <button className="bg-line py-2 px-6 font-outfit text-heading text-base font-medium rounded-xl">
                  New car
                </button>
                <button className="bg-line py-2 px-6 font-outfit text-heading text-base font-medium rounded-xl">
                  Used car
                </button>
              </div>
              <div className="flex gap-2 items-center">
                <button className="px-2 py-2 border border-line rounded-lg">
                  <CgMenuGridO size={16} className="text-icon" />
                </button>
                <button className="px-2 py-2 border border-line rounded-lg">
                  <FaListUl size={16} className="text-icon" />
                </button>
                <div className="relative shrink-0">
                  <select
                    name=""
                    id=""
                    className="py-1 px-4 border border-line rounded-lg font-outfit text-base text-heading appearance-none pr-15 active:outline-none focus:outline-none caret-[#4D4DE5]"
                  >
                    <option value="">Show: 50</option>
                  </select>
                  <LuChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                    size={20}
                  />
                </div>

                <div className="relative shrink-0">
                  <select
                    name=""
                    id=""
                    className="py-1 px-4 border border-line rounded-lg font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
                  >
                    <option value="">Sort by (Default)</option>
                  </select>
                  <LuChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="flex md:hidden my-6 items-center justify-between">
              <p className="text-xs text-black font-inter font-semibold">
                17 Results
              </p>
              <p className="text-xs font-inter text-black font-semibold">
                <span className="text-text font-normal">Sort by:</span> Recent
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
            <div className="mt-8 hidden md:flex items-center justify-center gap-3">
              <button className="flex h-12 w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                <LuChevronLeft size={20} />
              </button>
              <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                1
              </button>
              <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                2
              </button>
              <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-main bg-main text-white">
                3
              </button>
              <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                4
              </button>
              <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                ...
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                <LuChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <Footer listingGridMobile={true} />
      </div>
    </>
  );
};

export default ListingGrid2;
