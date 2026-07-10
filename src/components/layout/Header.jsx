import TopInfo from "./TopInfo";
import Navbar from "./Navbar";
import Hero from "./Hero";
import {featherImg, carSideImg} from "../../assets/Assets"
import { LuChevronDown, LuSearch } from "react-icons/lu";
import { heroBg } from "../../assets/Assets";
import Button from "../ui/Button";
// import { LiaCarSideSolid } from "react-icons/lia";

const Header = () => {
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
						<button className="hero-btn-options">All Parts</button>
						<button className="hero-btn-options">New Parts</button>
						<button className="hero-btn-options">Used Parts</button>
					</div>
					<div className="bg-white rounded-2xl px-5 py-4 max-md:pt-20 w-full flex flex-col md:flex-row gap-x-2 gap-y-3">
						<div className="relative w-full lg:w-62.5">
							<select
								name=""
								id=""
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
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
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
							>
								<option value="">Model</option>
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
								className="w-full py-3 px-4 border border-line rounded-2xl font-outfit text-sm text-text appearance-none pr-10 active:outline-none focus:outline-none caret-[#4D4DE5]"
							>
								<option value="">Price</option>
							</select>
							<LuChevronDown
								className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text"
								size={20}
							/>
						</div>
						<input
							type="search"
							name=""
							id=""
							placeholder="Search part name, vehicle make..."
							className="w-full lg:w-62.5 py-3 px-3 border border-line rounded-2xl font-outfit text-sm text-text active:outline-none focus:outline-none caret-[#4D4DE5]"
						/>
						<Button className="flex-1 cursor-pointer justify-center items-center text-base font-medium">
							Search <LuSearch size={16} className="ml-2" />
						</Button>
					</div>
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
