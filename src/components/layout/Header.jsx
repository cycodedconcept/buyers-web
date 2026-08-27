import { useEffect, useState } from "react";
import TopInfo from "./TopInfo";
import Navbar from "./Navbar";
import Hero from "./Hero";
import { featherImg, carSideImg } from "../../assets/Assets";
import { LuChevronDown, LuSearch } from "react-icons/lu";
import { heroBg } from "../../assets/Assets";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveFilter } from "../../features/products/productSlice";
import {
  DEFAULT_ACTIVE_FILTERS,
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_CONDITION_OPTIONS,
} from "../../features/products/productConstants";
import { koboToNairaInput, nairaInputToKobo } from "../../utils/utilityFunc";

const buildHomepageFormState = (activeFilters) => {
  return {
    partName: activeFilters.partName,
    vehicleMake: activeFilters.vehicleMake,
    vehicleModel: activeFilters.vehicleModel,
    vehicleYear: activeFilters.vehicleYear,
    category: activeFilters.category,
    minPrice: koboToNairaInput(activeFilters.minPriceKobo),
    maxPrice: koboToNairaInput(activeFilters.maxPriceKobo),
    condition: activeFilters.condition,
  };
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeFilters } = useSelector((state) => state.products);
  const [formValues, setFormValues] = useState(() =>
    buildHomepageFormState(activeFilters),
  );

  useEffect(() => {
    setFormValues(buildHomepageFormState(activeFilters));
  }, [activeFilters]);

  const handleFieldChange = (fieldName, value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));
  };

  const handleConditionChange = (value) => {
    handleFieldChange("condition", value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextFilters = {
      ...DEFAULT_ACTIVE_FILTERS,
      partName: formValues.partName.trim(),
      vehicleMake: formValues.vehicleMake.trim(),
      vehicleModel: formValues.vehicleModel.trim(),
      vehicleYear: formValues.vehicleYear.trim(),
      category: formValues.category,
      minPriceKobo: nairaInputToKobo(formValues.minPrice),
      maxPriceKobo: nairaInputToKobo(formValues.maxPrice),
      condition: formValues.condition,
    };

    dispatch(setActiveFilter(nextFilters));
    navigate("/product-listing");
  };

	return (
		<>
			<TopInfo />
			<Navbar />
			<Hero background={heroBg}>
				<div className="mb-6 lg:mb-12 lg:px-0">
					<p className="bg-main text-white text-sm lg:text-lg font-normal font-dm-sans rounded-4xl py-2 px-4 lg:py-3 lg:px-6 inline-flex gap-2 mb-3 lg:mb-5">
						<img
							src={featherImg}
							alt=""
							className="rotate-y-180 h-5 lg:h-auto"
						/>
						Nigeria's Trusted Parts Marketplace
						<img src={featherImg} alt="" className="h-5 lg:h-auto" />
					</p>
					<h1 className="font-fraunces text-white font-semibold text-[32px] sm:text-[52px] lg:text-[70px] leading-[1.1] mb-3">
						Find Genuine Auto Parts. <br className="hidden sm:block" /> Fast.
						Verified. <span className="hidden lg:inline">Delivered.</span>
					</h1>
					<p className="font-normal text-sm text-white font-outfit leading-5">
						Search thousands of genuine and aftermarket parts from verified
						dealers{" "}
						<span className="hidden lg:inline">
							across Nigeria. Compare prices, check compatibility, and{" "}
						</span>
						<br className="hidden lg:block" /> enjoy reliable nationwide
						delivery.
					</p>
				</div>
				<div className="flex space-x-3 md:space-x-6 mb-5 lg:mb-12 px-4 lg:px-0">
					<div className=" border-r border-[#0000001A] max-[375px]:pr-2 pr-6">
						<h3 className="max-[375]:text-[24px] text-[30px] lg:text-[40px] font-fraunces font-semibold text-white leading-[1.2]">
							200+
						</h3>
						<p className="text-white text-base font-outfit text-[11px]">
							<span className="hidden lg:inline">International</span>
							Brands
						</p>
					</div>
					<div className=" border-r border-[#0000001A] max-[375px]:pr-2 pr-6">
						<h3 className="max-[375]:text-[24px] text-[30px] lg:text-[40px] font-fraunces font-semibold text-white leading-[1.2]">
							2,000+
						</h3>
						<p className="text-white text-base font-outfit text-[11px]">
							<span className="hidden lg:inline">High-Quality</span> Products
						</p>
					</div>
					<div>
						<h3 className="max-[375]:text-[24px] text-[30px] lg:text-[40px] font-fraunces font-semibold text-white leading-[1.2]">
							<span className="hidden lg:inline">30,000+</span>
							<span className="inline lg:hidden">30k</span>
						</h3>
						<p className="text-white text-base font-outfit text-[11px]">
							<span className="hidden lg:inline">Happy </span>Customers
						</p>
					</div>
				</div>
				<div className="relative bg-white md:bg-transparent md:mx-0 rounded-2xl">
					<div className="flex space-x-2 mb-5 max-md:absolute max-md:z-20 max-md:top-4 max-md:left-4.5 w-full">
						{PRODUCT_CONDITION_OPTIONS.map((option) => (
							<button
								key={option.label}
								type="button"
								onClick={() => handleConditionChange(option.value)}
								className={`hero-btn-options ${formValues.condition === option.value ? "bg-main text-white border-main md:border-main" : ""}`}
							>
								{option.label}
							</button>
						))}
					</div>
					<form
						onSubmit={handleSubmit}
						className="bg-white rounded-2xl px-5 py-4 max-md:pt-20 w-full flex flex-col md:flex-row md:flex-wrap gap-x-2 gap-y-3"
					>
						<div className="relative w-full md:flex-1 md:min-w-42">
							<input
								type="text"
								value={formValues.vehicleMake}
								onChange={(event) =>
									handleFieldChange("vehicleMake", event.target.value)
								}
								placeholder="Make"
								aria-label="Vehicle make"
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text active:outline-none focus:outline-none caret-[#4D4DE5]"
							/>
						</div>
						<div className="relative w-full md:flex-1 md:min-w-42">
							<input
								type="text"
								value={formValues.vehicleModel}
								onChange={(event) =>
									handleFieldChange("vehicleModel", event.target.value)
								}
								placeholder="Model"
								aria-label="Vehicle model"
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text active:outline-none focus:outline-none caret-[#4D4DE5]"
							/>
						</div>
						<div className="relative w-full md:w-40">
							<input
								type="number"
								min="1900"
								value={formValues.vehicleYear}
								onChange={(event) =>
									handleFieldChange("vehicleYear", event.target.value)
								}
								placeholder="Year"
								aria-label="Vehicle year"
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text active:outline-none focus:outline-none caret-[#4D4DE5]"
							/>
						</div>
						<div className="relative w-full md:flex-1 md:min-w-45">
							<select
								value={formValues.category}
								onChange={(event) =>
									handleFieldChange("category", event.target.value)
								}
								aria-label="Category"
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
							>
								<option value="">Category</option>
								{PRODUCT_CATEGORY_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
							<LuChevronDown
								className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text"
								size={20}
							/>
						</div>
						<div className="relative w-full md:flex-1 md:min-w-42">
							<input
								type="number"
								min="0"
								value={formValues.minPrice}
								onChange={(event) =>
									handleFieldChange("minPrice", event.target.value)
								}
								placeholder="Min Price (NGN)"
								aria-label="Minimum price in naira"
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text active:outline-none focus:outline-none caret-[#4D4DE5]"
							/>
						</div>
						<div className="relative w-full md:flex-1 md:min-w-42">
							<input
								type="number"
								min="0"
								value={formValues.maxPrice}
								onChange={(event) =>
									handleFieldChange("maxPrice", event.target.value)
								}
								placeholder="Max Price (NGN)"
								aria-label="Maximum price in naira"
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text active:outline-none focus:outline-none caret-[#4D4DE5]"
							/>
						</div>
						<input
							type="search"
							value={formValues.partName}
							onChange={(event) =>
								handleFieldChange("partName", event.target.value)
							}
							placeholder="Search part name"
							aria-label="Part name"
							className="w-full md:flex-1 md:min-w-60 py-3 px-3 border border-line rounded-2xl font-outfit text-sm text-text active:outline-none focus:outline-none caret-[#4D4DE5]"
						/>
						<Button className="w-full md:w-fit md:min-w-0 md:flex-none cursor-pointer justify-center items-center text-base font-medium">
							Search <LuSearch size={16} className="ml-2" />
						</Button>
					</form>
					<div className="space-x-8 mt-10 hidden lg:flex">
						<p className="font-outfit text-sm text-white flex items-center gap-3">
							<img src={carSideImg} alt="" />
							SUV
						</p>
						<p className="font-outfit text-sm text-white flex items-center gap-3">
							<img src={carSideImg} alt="" />
							Hatchback
						</p>
						<p className="font-outfit text-sm text-white flex items-center gap-3">
							<img src={carSideImg} alt="" />
							Coupe
						</p>
						<p className="font-outfit text-sm text-white flex items-center gap-3">
							<img src={carSideImg} alt="" />
							Hybrid
						</p>
					</div>
				</div>
			</Hero>
		</>
	);
};

export default Header;
