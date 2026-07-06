import { useEffect, useState } from "react";
import products from "../../data/products";
import Button from "../ui/Button";
import {
	IoLocationOutline,
	IoHeartOutline,
	IoStarOutline,
	IoChevronBack,
	IoChevronForward,
} from "react-icons/io5";
import { nairaFormatter } from "../../utils/utilityFunc";

const Products = ({
	limit = 8,
	headingText = "Featured Parts",
	fourGridDisplay = true,
	slider = false,
	bgMobile = "#F9FAFB",
	isListingGrid = false
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
						className={`contaniner px-4 py-8 lg:py-15 ${bgMobile} lg:bg-transparent`}
					>
						<h2></h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative w-full">
							{products.map((product, index) => (
								<div
									key={index}
									className="cursor-pointer border border-line rounded-2xl relative"
								>
									<div className="bg-[#eaeaea] w-full h-56.25 rounded-tr-2xl rounded-tl-2xl p-10 relative">
										<div className="absolute top-3 left-3 pr-6 w-full flex justify-between">
											<div>
												<span className="py-1.5 px-3 rounded-3xl bg-main font-outfit text-white font-semibold text-xs">
													{product.tag}
												</span>
											</div>
											<div className="w-7 h-7 rounded-full bg-main flex items-center justify-center">
												<IoHeartOutline className="text-white text-base" />
											</div>
										</div>
										<img
											src={product.img}
											alt={`${product.part} Image`}
											className="w-full h-full object-cover rounded-tr-2xl rounded-tl-2xl"
										/>
										<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
											<button className="w-2 h-2 rounded-full bg-main"></button>
											<button className="w-2 h-2 rounded-full bg-white"></button>
											<button className="w-2 h-2 rounded-full bg-white"></button>
											<button className="w-2 h-2 rounded-full bg-white"></button>
										</div>
									</div>
									<div className="p-4 font-outfit">
										<p className="text-main mb-3 text-sm">{product.car}</p>
										<h4 className="text-lg text-heading font-medium mb-1">
											{product.part}
										</h4>
										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center text-sm gap-1">
												<IoLocationOutline size={16} />
												<p className="text-text">Lagos</p>
											</div>
											<div className="flex items-center gap-1 text-text">
												<IoStarOutline size={16} />
												<p>4.6 · Verified seller</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<h4 className="font-medium text-[20px] text-main">
												{nairaFormatter.format(product.newPrice)}
											</h4>
											<p className="text-sm text-icon">
												<strike>
													{nairaFormatter.format(product.newPrice)}
												</strike>
											</p>
										</div>
										<hr className="my-6 text-line" />
										<button className="inline-block w-full rounded-[14px] py-3 font-medium font-outfit text-sm text-heading cursor-pointer border border-heading">
											Add to Cart
										</button>
									</div>
								</div>
							))}
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
							<Button buttonType="view-all" className="hidden lg:flex">
								View all
							</Button>
							<button className="flex lg:hidden text-main font-outfit">
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
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative w-full">
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
								<div
									key={index}
									className="cursor-pointer border border-line rounded-2xl relative"
								>
									<div className="bg-[#eaeaea] w-full h-56.25 rounded-tr-2xl rounded-tl-2xl p-10 relative">
										<div className="absolute top-3 left-3 pr-6 w-full flex justify-between">
											<div>
												<span className="py-1.5 px-3 rounded-3xl bg-main font-outfit text-white font-semibold text-xs">
													{product.tag}
												</span>
											</div>
											<div className="w-7 h-7 rounded-full bg-main flex items-center justify-center">
												<IoHeartOutline className="text-white text-base" />
											</div>
										</div>
										<img
											src={product.img}
											alt={`${product.part} Image`}
											className="w-full h-full object-cover rounded-tr-2xl rounded-tl-2xl"
										/>
										<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
											<button className="w-2 h-2 rounded-full bg-main"></button>
											<button className="w-2 h-2 rounded-full bg-white"></button>
											<button className="w-2 h-2 rounded-full bg-white"></button>
											<button className="w-2 h-2 rounded-full bg-white"></button>
										</div>
									</div>
									<div className="p-4 font-outfit">
										<p className="text-main mb-3 text-sm">{product.car}</p>
										<h4 className="text-lg text-heading font-medium mb-1">
											{product.part}
										</h4>
										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center text-sm gap-1">
												<IoLocationOutline size={16} />
												<p className="text-text">Lagos</p>
											</div>
											<div className="flex items-center gap-1 text-text">
												<IoStarOutline size={16} />
												<p>4.6 · Verified seller</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<h4 className="font-medium text-[20px] text-main">
												{nairaFormatter.format(product.newPrice)}
											</h4>
											<p className="text-sm text-icon">
												<strike>
													{nairaFormatter.format(product.newPrice)}
												</strike>
											</p>
										</div>
										<hr className="my-6 text-line" />
										<button className="inline-block w-full rounded-[14px] py-3 font-medium font-outfit text-sm text-heading cursor-pointer border border-heading">
											Add to Cart
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Products;
