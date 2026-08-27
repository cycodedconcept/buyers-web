import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFilter } from "../../features/products/productSlice";
import {
  engineImg,
  engineMobileImg,
  brakeImg,
  brakeMobileImg,
  electricImg,
  electricalMobileImg,
  filterImg,
  filterMobileImg,
  suspensionImg,
  suspensionMobileImg,
  coolingImg,
  coolingMobileImg,
} from "../../assets/Assets";

const CATEGORY_ASSET_MAP = {
  "engine-components": {
    img: engineImg,
    mobileImg: engineMobileImg,
  },
  "brake-system": {
    img: brakeImg,
    mobileImg: brakeMobileImg,
  },
  "electrical-lighting": {
    img: electricImg,
    mobileImg: electricalMobileImg,
  },
  filters: {
    img: filterImg,
    mobileImg: filterMobileImg,
  },
  "suspension-steering": {
    img: suspensionImg,
    mobileImg: suspensionMobileImg,
  },
  cooling: {
    img: coolingImg,
    mobileImg: coolingMobileImg,
  },
};

const FALLBACK_CATEGORY_ASSETS = [
  CATEGORY_ASSET_MAP["engine-components"],
  CATEGORY_ASSET_MAP["brake-system"],
  CATEGORY_ASSET_MAP["electrical-lighting"],
  CATEGORY_ASSET_MAP.filters,
  CATEGORY_ASSET_MAP["suspension-steering"],
  CATEGORY_ASSET_MAP.cooling,
];

const getCategoryAssets = (slug, index) => {
  return CATEGORY_ASSET_MAP[slug] || FALLBACK_CATEGORY_ASSETS[index % FALLBACK_CATEGORY_ASSETS.length];
};

const buildCategories = (products) => {
  const categoryMap = new Map();

  products.forEach((product) => {
    const category = product?.category;

    if (!category?.slug || !category?.name) {
      return;
    }

    if (categoryMap.has(category.slug)) {
      categoryMap.get(category.slug).count += 1;
      return;
    }

    const assets = getCategoryAssets(category.slug, categoryMap.size);
    categoryMap.set(category.slug, {
      img: assets.img,
      mobileImg: assets.mobileImg,
      label: category.name,
      value: category.slug,
      count: 1,
    });
  });

  return Array.from(categoryMap.values());
};

const buildPartCountLabel = (count) => {
  return `${count} ${count === 1 ? "Part" : "Parts"}`;
};

const CategoryBrowse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, productsLoading } = useSelector((state) => state.products);
  const categories = buildCategories(products);
  const placeholderCards = Array.from({ length: 6 }, (_, index) => index);
  const shouldShowPlaceholders = productsLoading && categories.length === 0;
  const shouldShowEmptyState = !productsLoading && categories.length === 0;

  const handleCategoryBrowse = (value) => {
    dispatch(setActiveFilter({ category: value }));
    navigate("/product-listing");
  };

  return (
    <>
      <div className="container py-10 px-3 lg:px-0 lg:my-16 lg:px-6">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="w-1/2">
              <h2 className="font-fraunces text-heading text-[30px] leading-none">
                Browse by Category
              </h2>
            </div>
            <div className="">
              <Button buttonType="view-all" className="">
                View all
              </Button>
            </div>
          </div>
          {shouldShowEmptyState ? (
            <div className="rounded-2xl bg-[#FF71010A] px-6 py-8 text-center font-outfit text-sm text-on-surface-v1">
              Categories will appear here once products are available.
            </div>
          ) : (
            <>
              <div className="hidden lg:grid grid-cols-6 gap-6">
                {shouldShowPlaceholders
                  ? placeholderCards.map((placeholder) => (
                      <div
                        key={placeholder}
                        className="flex flex-col items-center text-center font-outfit animate-pulse"
                      >
                        <div className="w-full h-26.75 bg-[#FF71010F] rounded-2xl" />
                        <div className="mt-5 h-5 w-3/4 rounded-full bg-[#24272C1A]" />
                        <div className="mt-2 h-3 w-1/2 rounded-full bg-[#24272C12]" />
                      </div>
                    ))
                  : categories.map((category) => (
                      <div
                        key={category.value}
                        onClick={() => handleCategoryBrowse(category.value)}
                        className="flex cursor-pointer flex-col items-center text-center font-outfit"
                      >
                        <div className="w-full h-26.75 bg-[#FF71010F] flex items-center justify-center rounded-2xl">
                          <img
                            src={category.img}
                            alt={category.label}
                            className="w-12.5 h-12.5 mb-2 object-cover"
                          />
                        </div>
                        <h4 className="text-on-surface text-lg font-medium mt-5 mb-1 leading-[1.4]">
                          {category.label}
                        </h4>
                        <p className="text-on-surface-v1 text-xs">
                          {buildPartCountLabel(category.count)}
                        </p>
                      </div>
                    ))}
              </div>
              <div className="grid grid-cols-3 lg:hidden gap-6">
                {shouldShowPlaceholders
                  ? placeholderCards.map((placeholder) => (
                      <div
                        key={placeholder}
                        className="w-full h-30 rounded-2xl bg-[#FF71010F] animate-pulse"
                      />
                    ))
                  : categories.map((category) => (
                      <div
                        key={category.value}
                        onClick={() => handleCategoryBrowse(category.value)}
                        className="flex cursor-pointer flex-col items-center text-center font-outfit"
                      >
                        <div className="w-full h-30 py-5 bg-[#FF71010F] flex flex-col items-center justify-center rounded-2xl">
                          <img
                            src={category.mobileImg || category.img}
                            alt={category.label}
                            className="w-10 h-10 object-cover mb-3"
                          />
                          <h4 className="text-on-surface text-sm font-medium leading-[1.4]">
                            {category.label}
                          </h4>
                          <p className="text-on-surface-v1 text-xs">
                            {buildPartCountLabel(category.count)}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryBrowse;
