import TopInfo from "./TopInfo";
import Navbar from "./Navbar";
import Hero from "./Hero";
import {featherImg, carSideImg} from "../../assets/Assets"
import { LuChevronDown, LuSearch } from "react-icons/lu";
import Button from "../ui/Button";
// import { LiaCarSideSolid } from "react-icons/lia";

const Header = () => {
	return (
		<>
			<TopInfo />
			<Navbar />
			<Hero>
				<div className="mb-12">
					<p className="bg-main text-white text-lg font-normal font-dm-sans rounded-4xl py-3 px-6 inline-flex gap-2 mb-5">
						<img src={featherImg} alt="" className="rotate-y-180" />
						Nigeria's Trusted Parts Marketplace
						<img src={featherImg} alt="" />
					</p>
					<h1 className="font-fraunces text-white font-semibold text-[70px] leading-18 mb-3">
						Find Genuine Auto Parts. <br /> Fast. Verified. Delivered.
					</h1>
					<p className="font-normal text-sm text-white font-outfit leading-5">
						Search thousands of genuine and aftermarket parts from verified
						dealers across Nigeria. Compare prices, check compatibility, <br />{" "}
						and enjoy reliable nationwide delivery.
					</p>
				</div>
				<div className="flex space-x-6 mb-12">
					<div className=" border-r border-[#0000001A] pr-6">
						<h3 className="text-[40px] font-fraunces font-semibold text-white leading-[1.2]">
							200+
						</h3>
						<p className="font-normal text-white text-base font-outfit">
							International Brands
						</p>
					</div>
					<div className=" border-r border-[#0000001A] pr-6">
						<h3 className="text-[40px] font-fraunces font-semibold text-white leading-[1.2]">
							2,000+
						</h3>
						<p className="font-normal text-white text-base font-outfit">
							High-Quality Products
						</p>
					</div>
					<div>
						<h3 className="text-[40px] font-fraunces font-semibold text-white leading-[1.2]">
							30,000+
						</h3>
						<p className="font-normal text-white text-base font-outfit">
							Happy Customers
						</p>
					</div>
				</div>
				<div>
					<div className="flex space-x-2 mb-5">
						<button className="hero-btn-options">All Parts</button>
						<button className="hero-btn-options">New Parts</button>
						<button className="hero-btn-options">Used Parts</button>
					</div>
					<div className="bg-white rounded-xl px-5 py-4 w-full flex space-x-2">
						<div className="relative w-62.5">
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
						<div className="relative w-62.5">
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
						<div className="relative w-62.5">
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
							className="w-62.5 py-3 px-3 border border-line rounded-2xl font-outfit text-sm text-text active:outline-none focus:outline-none caret-[#4D4DE5]"
						/>
						<Button className="flex-1 cursor-pointer justify-center items-center text-base font-medium">
							Search <LuSearch size={16} className="ml-2"/>
						</Button>
					</div>
					<div className="flex space-x-8 mt-10">
						<p className="font-outfit text-sm text-white flex items-center gap-3"><img src={carSideImg} alt="" />SUV</p>
						<p className="font-outfit text-sm text-white flex items-center gap-3"><img src={carSideImg} alt="" />Hatchback</p>
						<p className="font-outfit text-sm text-white flex items-center gap-3"><img src={carSideImg} alt="" />Coupe</p>
						<p className="font-outfit text-sm text-white flex items-center gap-3"><img src={carSideImg} alt="" />Hybrid</p>
					</div>
				</div>
			</Hero>
		</>
	);
};

export default Header;
