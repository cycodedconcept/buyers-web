import { useEffect, useState } from "react";
import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  setActiveFilter,
} from "../features/products/productSlice";
import { cleanParams } from "../utils/utilityFunc";
// import Products from "../components/layout/Products";
import Footer from "../components/layout/Footer";
import { heroBgImg } from "../assets/Assets";
import Button from "../components/ui/Button";
// import { IoChevronBack, IoChevronForward  } from "react-icons/io5";
import { LuChevronDown, LuArrowRight } from "react-icons/lu";
import { ImEqualizer2 } from "react-icons/im";
import ProductCard from "../components/ui/ProductCard";
import CustomSelect from "../components/ui/CustomSelect";
import Pagination from "../components/ui/Pagination";

const filterOptions = {
  categories: [
    {
      label: "Engine",
      value: "engine-components",
    },
    {
      label: "Brakes",
      value: "brake-system",
    },
    {
      label: "Electrical",
      value: "electrical-lighting",
    },
    {
      label: "Filters & Fluids",
      value: "filters",
    },
    {
      label: "Suspension",
      value: "suspension-steering",
    },
    {
      label: "AC & Cooling",
      value: "cooling",
    },
  ],
  make: [
    { label: "Honda", value: "Honda" },
    { label: "Toyota", value: "Toyota" },
    { label: "Lexus", value: "Lexus" },
  ],
  model: [
    { label: "Camry", value: "Camry" },
    { label: "Hilux", value: "Hilux" },
    { label: "Accord", value: "Accord" },
    { label: "Corolla", value: "Corolla" },
  ],
  conditions: [
    { label: "Used Part", value: "used" },
    { label: "New Part", value: "new" },
    { label: "OEM Part", value: "OEM" },
    { label: "All Parts", value: "all" },
  ],
};

const ListingGrid = ({ bgMobile = "#F9FAFB" }) => {
  const dispatch = useDispatch();
  const { products, activeFilters } = useSelector((state) => state.products);
  const [filterOpen, setFilterOpen] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts(cleanParams(activeFilters)));
  }, [dispatch, activeFilters]);

  const handleFetchChange = (value) => {
    const selectedValue = value === "all" ? "" : value;
    const updatedFilters = {
      ...activeFilters,
      category: "",
      condition: selectedValue,
    };
    dispatch(setActiveFilter({ category: "", condition: selectedValue }));
    dispatch(fetchAllProducts(cleanParams(updatedFilters)));
    setFilterOpen(false);
  };

  return (
    <>
      <TopInfo />
      <Navbar isHomepage={false} />
      <div className="hidden sm:block">
        <Hero background={heroBgImg}>
          <div className="max-sm:px-4">
            <h1 className="font-outfit font-semibold text-[42px] lg:text-[70px] text-white mb-4 leading-none">
              Buying and selling car parts <br className="hidden lg:block" />{" "}
              has never been easier!
            </h1>
            <p className="font-outfit text-base lg:text-lg text-line mb-6 leading-[1.3]">
              Leading online car parts buying and selling platform. helps users{" "}
              <br className="hidden lg:block" />
              buy car parts that are right for them.
            </p>
            <Button className="flex items-center text-sm gap-1 px-5 py-3">
              Search for Sport Parts
              <LuArrowRight size={16} />
            </Button>
          </div>
        </Hero>
      </div>
      <div className="block sm:hidden">
        <div className="container px-4 bg-[#121212] py-5">
          <div className="w-full min-h-40">
            <img
              src={heroBgImg}
              alt="hero image"
              className="max-w-full h-full rounded-2xl"
            />
          </div>
          <h1 className="font-outfit text-[28px] text-white font-semibold leading-[1.1] my-4">
            Buying and selling car <br /> parts has never been <br /> easier!
          </h1>
          <Button className="flex items-center text-sm gap-1 px-5 py-3">
            Browse our car parts
          </Button>
        </div>
      </div>
      <div
        className={`container px-4 py-8 lg:py-15 ${bgMobile} lg:bg-transparent overflow-hidden`}
      >
        <h2 className="font-outfit font-medium text-[30px] text-heading">
          Listing Grid
        </h2>
        <p className="text-text text-sm font-outfit mt-4 mb-6">
          {products.length === 0
            ? "There are currently no results"
            : products.length === 1
              ? `There is currently ${products.length} result`
              : `There Are Currently ${products.length} Results`}
        </p>
        <div className="flex flex-nowrap items-center gap-5 mb-6 pb-2">
          <CustomSelect
            label="condition"
            filterOptions={filterOptions.conditions}
            onChange={handleFetchChange}
            open={filterOpen === "condition"}
            setOpen={setFilterOpen}
            filterName="condition"
          />
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
              className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5] focus:ring-2 focus:ring-main"
            >
              <option value="">Body</option>
            </select>
            <LuChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
              size={20}
            />
          </div>

          <CustomSelect
            label="make"
            filterOptions={filterOptions.make}
            onChange={handleFetchChange}
            open={filterOpen === "make"}
            setOpen={setFilterOpen}
            filterName="make"
          />

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

          <CustomSelect
            label="category"
            filterOptions={filterOptions.categories}
            onChange={handleFetchChange}
            open={filterOpen === "category"}
            setOpen={setFilterOpen}
            filterName="category"
          />

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
          {products.slice(0, 12).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <Pagination />
      </div>
      {/* <Products isListingGrid /> */}
      <div className="container px-4 py-10 bg-[#F9FAFB] block md:hidden">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#24272C1A]"></div>
            <div>
              <h5 className="font-medium text-base font-outfit">
                Top 1 Americas
              </h5>
              <p className="text-text text-xs font-outfit">
                Largest Auto Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#24272C1A]"></div>
            <div>
              <h5 className="font-medium text-base font-outfit">Parts Sold</h5>
              <p className="text-text text-xs font-outfit">Every 5 minute</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#24272C1A]"></div>
            <div>
              <h5 className="font-medium text-base font-outfit">Offers</h5>
              <p className="text-text text-xs font-outfit">
                Stay updated payless
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#24272C1A]"></div>
            <div>
              <h5 className="font-medium text-base font-outfit">Compare</h5>
              <p className="text-text text-xs font-outfit">
                Decode the right part
              </p>
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

export default ListingGrid;
