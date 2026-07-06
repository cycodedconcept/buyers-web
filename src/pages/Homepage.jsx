import Header from "../components/layout/Header";
import CategoryBrowse from "../components/layout/CategoryBrowse";
import Products from "../components/layout/Products";
import Benefits from "../components/layout/Benefits";
import Cta from "../components/layout/Cta";
import Testimony from "../components/layout/Testimony";
import Blog from "../components/layout/Blog";
import Partners from "../components/ui/Partners";
import Footer from "../components/layout/Footer";
import {
	carFindIcon,
	carMoneyIcon,
	carHandIcon,
	toolsIcon,
} from "../assets/Assets";

const infoArray = [
	{
		icon: carFindIcon,
		title: "Reach Buyers Nationwide",
		description:
			"Expand beyond your local market and connect with vehicle owners, mechanics, and fleet operators actively searching for auto parts.",
	},
	{
		icon: carMoneyIcon,
		title: "Easy Product Management",
		description:
			"List products, update pricing, manage inventory, and track stock levels from a simple dashboard designed for auto parts sellers.",
	},
	{
		icon: carHandIcon,
		title: "Secure Payments & Payouts",
		description:
			"Receive payments securely and track your earnings with transparent payout processes that help you manage your business with confidence.",
	},
	{
		icon: toolsIcon,
		title: "Order & Delivery Tracking",
		description:
			"Monitor orders from purchase to delivery, keeping your customers informed while ensuring a smooth fulfilment experience.",
	},
];

const Homepage = () => {
	return (
		<>
			<Header />
			<CategoryBrowse />
			<Products fourGridDisplay={false} />
			<Benefits />
			<Cta />
			<div className="lg:hidden">
				<Cta ctaType="single" />
				<Testimony />
			</div>
			<div className="hidden lg:block">
				<div className="container pt-20 pb-10">
					<div>
						<div className="mb-9">
							<h2 className="font-fraunces text-[30px] text-on-surface mb-4">
								Everything You Need to Sell Auto Parts Online
							</h2>
							<p className="font-outfit text-base text-text leading-[1.4]">
								From inventory management to secure payouts, AutoParts
								Marketplace provides the tools and support you <br /> need to
								grow your business and reach customers across Nigeria.
							</p>
						</div>
						<div className="grid grid-cols-4 gap-6">
							{infoArray.map((info, index) => (
								<div
									key={index}
									className="bg-white rounded-2xl p-7.5 font-outfit hover:shadow-3xl transition-all duration-300"
								>
									<img src={info.icon} alt="info icon" />
									<h4 className="text-heading text-[20px] mt-2 mb-6">
										{info.title}
									</h4>
									<p className="text-sm text-text leading-[1.4]">
										{info.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<Products
					limit={4}
					headingText="More Parts You May Need"
					slider={true}
				/>
				<Testimony />
				<Cta ctaType="single" />
			</div>
			<Blog />
			<div className="hidden lg:block">
				<Partners />
			</div>
			<Footer />
		</>
	);
};

export default Homepage;
