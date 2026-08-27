import { useEffect, useRef, useState } from "react";
import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  setActiveFilter,
  DEFAULT_ACTIVE_FILTERS,
} from "../features/products/productSlice";
import {
  LISTING_PAGE_LIMIT,
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_CONDITION_OPTIONS,
} from "../features/products/productConstants";
import { cleanParams, nairaFormatter } from "../utils/utilityFunc";
import Footer from "../components/layout/Footer";
import { heroBgImg } from "../assets/Assets";
import Button from "../components/ui/Button";
import { LuChevronDown, LuArrowRight } from "react-icons/lu";
import ProductCard from "../components/ui/ProductCard";
import CustomSelect from "../components/ui/CustomSelect";
import ProductLoadingGrid from "../components/ui/ProductLoadingGrid";
import ProductErrorState from "../components/ui/ProductErrorState";
import ProductEmptyState from "../components/ui/ProductEmptyState";

const filterOptions = {
  categories: PRODUCT_CATEGORY_OPTIONS,
  make: [
    { label: "Honda", value: "Honda" },
    { label: "Toyota", value: "Toyota" },
    { label: "Lexus", value: "Lexus" },
  ],
  conditions: PRODUCT_CONDITION_OPTIONS,
};

const buildResultsText = (total) => {
  if (total === 0) {
    return "There are currently no results";
  }

  if (total === 1) {
    return "There is currently 1 result";
  }

  return `There are currently ${total} results`;
};

const ListingGrid = ({ bgMobile = "#F9FAFB" }) => {
  const dispatch = useDispatch();
  const loadMoreRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(null);
  const {
    products,
    activeFilters,
    pagination,
    productsLoading,
    productsLoadingMore,
    productsError,
  } = useSelector((state) => state.products);

  const hasMorePages = pagination.page < pagination.totalPages;
  const activeFilterSummary = [
    activeFilters.partName ? `Part: ${activeFilters.partName}` : null,
    activeFilters.vehicleMake ? `Make: ${activeFilters.vehicleMake}` : null,
    activeFilters.vehicleModel ? `Model: ${activeFilters.vehicleModel}` : null,
    activeFilters.vehicleYear ? `Year: ${activeFilters.vehicleYear}` : null,
    activeFilters.category
      ? `Category: ${
          PRODUCT_CATEGORY_OPTIONS.find(
            (option) => option.value === activeFilters.category,
          )?.label || activeFilters.category
        }`
      : null,
    activeFilters.minPriceKobo
      ? `Min: ${nairaFormatter(Number(activeFilters.minPriceKobo))}`
      : null,
    activeFilters.maxPriceKobo
      ? `Max: ${nairaFormatter(Number(activeFilters.maxPriceKobo))}`
      : null,
    activeFilters.condition ? `Condition: ${activeFilters.condition}` : null,
  ].filter(Boolean);

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        params: cleanParams({
          ...activeFilters,
          page: 1,
          limit: LISTING_PAGE_LIMIT,
        }),
      }),
    );
  }, [activeFilters, dispatch]);

  useEffect(() => {
    if (!loadMoreRef.current || productsLoading || productsLoadingMore || !hasMorePages) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting || productsLoadingMore) {
          return;
        }

        dispatch(
          fetchAllProducts({
            params: cleanParams({
              ...activeFilters,
              page: pagination.page + 1,
              limit: pagination.limit || LISTING_PAGE_LIMIT,
            }),
            append: true,
          }),
        );
      },
      {
        rootMargin: "200px 0px",
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [
    activeFilters,
    dispatch,
    hasMorePages,
    pagination.limit,
    pagination.page,
    productsLoading,
    productsLoadingMore,
  ]);

  const handleSelectFilter = (filterName, value) => {
    dispatch(
      setActiveFilter({
        [filterName]: value,
      }),
    );
    setFilterOpen(null);
  };

  const handleRetry = () => {
    dispatch(
      fetchAllProducts({
        params: cleanParams({
          ...activeFilters,
          page: 1,
          limit: LISTING_PAGE_LIMIT,
        }),
      }),
    );
  };

  const handleLoadMoreRetry = () => {
    if (!hasMorePages) {
      return;
    }

    dispatch(
      fetchAllProducts({
        params: cleanParams({
          ...activeFilters,
          page: pagination.page + 1,
          limit: pagination.limit || LISTING_PAGE_LIMIT,
        }),
        append: true,
      }),
    );
  };

  const totalResults = pagination.total || products.length;

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
          {buildResultsText(totalResults)}
        </p>
        <div className="flex flex-wrap items-center gap-5 mb-6 pb-2">
          <CustomSelect
            label="Condition"
            selectedValue={activeFilters.condition}
            filterOptions={filterOptions.conditions}
            onChange={(value) => handleSelectFilter("condition", value)}
            open={filterOpen === "condition"}
            setOpen={setFilterOpen}
            filterName="condition"
          />
          <div className="relative shrink-0">
            <select
              className="py-2 px-4 border border-line rounded-2xl font-outfit text-base text-heading appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
              aria-label="Sort products"
              defaultValue=""
            >
              <option value="">Sort by: Recent</option>
            </select>
            <LuChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-heading"
              size={20}
            />
          </div>
          <CustomSelect
            label="Make"
            selectedValue={activeFilters.vehicleMake}
            filterOptions={filterOptions.make}
            onChange={(value) => handleSelectFilter("vehicleMake", value)}
            open={filterOpen === "vehicleMake"}
            setOpen={setFilterOpen}
            filterName="vehicleMake"
          />
          <CustomSelect
            label="Category"
            selectedValue={activeFilters.category}
            filterOptions={filterOptions.categories}
            onChange={(value) => handleSelectFilter("category", value)}
            open={filterOpen === "category"}
            setOpen={setFilterOpen}
            filterName="category"
          />
          {activeFilterSummary.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(setActiveFilter(DEFAULT_ACTIVE_FILTERS))}
              className="rounded-2xl border border-line px-4 py-2 font-outfit text-sm text-heading"
            >
              Clear filters
            </button>
          )}
        </div>
        {activeFilterSummary.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-3">
            {activeFilterSummary.map((filterLabel) => (
              <span
                key={filterLabel}
                className="rounded-full bg-[#FF71010F] px-4 py-2 font-outfit text-sm text-heading"
              >
                {filterLabel}
              </span>
            ))}
          </div>
        )}
        {productsLoading ? (
          <ProductLoadingGrid count={LISTING_PAGE_LIMIT} />
        ) : productsError && products.length === 0 ? (
          <ProductErrorState message={productsError} onRetry={handleRetry} />
        ) : products.length === 0 ? (
          <ProductEmptyState
            title="No products match your filters"
            message="Please try a different search or clear filters to discover available parts."
            actionLabel="Clear filters"
            onAction={() => dispatch(setActiveFilter(DEFAULT_ACTIVE_FILTERS))}
          />
        ) : (
          <>
            <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative w-full">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {productsError && (
              <div className="mt-6 rounded-2xl border border-line bg-white px-6 py-4 font-outfit text-sm text-heading">
                <p className="mb-3">{productsError}</p>
                <button
                  type="button"
                  onClick={handleLoadMoreRetry}
                  className="rounded-xl border border-heading px-4 py-2 text-sm font-medium"
                >
                  Retry loading more
                </button>
              </div>
            )}
            {productsLoadingMore && (
              <div className="mt-6 text-center font-outfit text-sm text-text">
                Loading more parts...
              </div>
            )}
            {hasMorePages ? (
              <div
                ref={loadMoreRef}
                data-testid="infinite-scroll-sentinel"
                className="h-10"
              />
            ) : (
              <p className="mt-6 text-center font-outfit text-sm text-text">
                You&apos;ve reached the end of the catalog.
              </p>
            )}
          </>
        )}
      </div>
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
