import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
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

const categories = [
	{
		img: engineImg,
		mobileImg: engineMobileImg,
		label: "Engine",
		value: "engine-components",
		partNo: "2104 Parts",
	},
	{
		img: brakeImg,
		mobileImg: brakeMobileImg,
		label: "Brakes",
		value: "brake-system",
		partNo: "1820 Parts",
	},
	{
		img: electricImg,
		mobileImg: electricalMobileImg,
		label: "Electrical",
		value: "electrical-lighting",
		partNo: "980 Parts",
	},
	{
		img: filterImg,
		mobileImg: filterMobileImg,
		label: "Filters & Fluids",
		value: "filters",
		partNo: "760 Parts",
	},
	{
		img: suspensionImg,
		mobileImg: suspensionMobileImg,
		label: "Suspension",
		value: "suspension-steering",
		partNo: "640 Parts",
	},
	{
		img: coolingImg,
		mobileImg: coolingMobileImg,
		label: "AC & Cooling",
		value: "cooling",
		partNo: "510 Parts",
	},
];

const CategoryBrowse = () => {
	const dispatch = useDispatch();
	// const {activeFilters} = useSelector(state => state.products)
	const navigate = useNavigate();
	const getMobileCategoryLabel = (label) => {
		if (label.includes("Fluids")) {
			return "Fluids";
		}

		return label;
	};

	const handleCategoryBrowse = (value) => {
		dispatch(setActiveFilter({category: value}))
		navigate("/product-listing")
	}

	return (
		<>
			<div className="container py-10 px-3 lg:px-0">
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
					<div className="hidden lg:grid grid-cols-6 gap-6">
						{categories.map((category, index) => (
							<div
								key={index}
								onClick={() => handleCategoryBrowse(category.value)}
								className="flex flex-col items-center text-center font-outfit"
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
								<p className="text-on-surface-v1 text-xs">{category.partNo}</p>
							</div>
						))}
					</div>
					<div className="grid grid-cols-3 lg:hidden gap-6">
						{categories.map((category, index) => (
							<div
								key={index}
								onClick={() => handleCategoryBrowse(category.value)}
								className="flex flex-col items-center text-center font-outfit"
							>
								<div className="w-full h-30 py-5 bg-[#FF71010F] flex flex-col items-center justify-center rounded-2xl">
									<img
										src={category.mobileImg || category.img}
										alt={category.label}
										className="w-10 h-10 object-cover mb-3"
									/>
									<h4 className="text-on-surface text-sm font-medium leading-[1.4]">
										{getMobileCategoryLabel(category.label)}
									</h4>
									<p className="text-on-surface-v1 text-xs">
										{category.partNo}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoryBrowse;
