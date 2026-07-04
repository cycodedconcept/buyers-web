import products from "../../data/products";
import Button from "../ui/Button";
import { IoLocationOutline, IoHeartOutline, IoStarOutline } from "react-icons/io5";
import { nairaFormatter } from "../../utils/utilityFunc";

const Products = ({limit = 8, headingText = "Featured Parts", fourGridDisplay = true}) => {
  const productsArr = products.slice(0, limit)
  return (
		<>
			<div className="container my-26">
				<div className="flex items-center justify-between mb-7">
					<h2 className="font-fraunces text-heading text-[30px]">
						{headingText}
					</h2>
					<Button buttonType="view-all">View all</Button>
				</div>
				{!fourGridDisplay && (
					<div className="flex text-black font-outfit text-base mb-5">
						<button className="hover:border-b hover:border-b-main focus:border-b focus:border-b-main pb-4 pr-4 cursor-pointer">
							All
						</button>
						<button className="hover:border-b hover:border-b-main focus:border-b focus:border-b-main pb-4 pr-4 cursor-pointer">
							New
						</button>
						<button className="hover:border-b hover:border-b-main focus:border-b focus:border-b-main pb-4 pr-4 cursor-pointer">
							Used
						</button>
						<button className="hover:border-b hover:border-b-main focus:border-b focus:border-b-main pb-4 pr-4 cursor-pointer">
							OEM
						</button>
						<button className="hover:border-b hover:border-b-main focus:border-b focus:border-b-main pb-4 pr-4 cursor-pointer">
							Port Harcourt
						</button>
					</div>
					)}
					<div className="grid grid-cols-4 gap-5">
						{productsArr.map((product, index) => (
							<div key={index} className="cursor-pointer border border-line rounded-2xl">
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
									<div className="absolute bottom-2 -translate-middle-x w-full space-x-1">
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
										<h4 className="font-medium text-[20px] text-main">{nairaFormatter.format(product.newPrice)}</h4>
										<p className="text-sm text-icon">
											<strike>{nairaFormatter.format(product.newPrice)}</strike>
										</p>
									</div>
									<hr className="my-6 text-line" />
									<button className="inline-block w-full rounded-[14px] py-3 font-medium font-outfit text-sm text-heading cursor-pointer border border-heading">Add to Cart</button>
								</div>
							</div>
						))}
					</div>
				</div>
		</>
	);
};

export default Products;