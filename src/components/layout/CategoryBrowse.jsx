import Button from "../ui/Button";
import { engineImg, brakeImg, electricImg, filterImg, suspensionImg, coolingImg } from "../../assets/Assets";

const categories = [
  {img: engineImg, label: "Engine", partNo: "2104 Parts"},
  {img: brakeImg, label: "Brakes", partNo: "1820 Parts"},
  { img: electricImg, label: "Electrical", partNo: "980 Parts" },
  { img: filterImg, label: "Filters & Fluids", partNo: "760 Parts" },
  { img: suspensionImg, label: "Suspension", partNo: "640 Parts" },
  { img: coolingImg, label: "AC & Cooling", partNo: "510 Parts" },
]

const CategoryBrowse = () => {
  return (
		<>
			<div className="container my-10">
				<div>
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="font-fraunces text-heading text-[30px]">
								Browse by Category
							</h2>
						</div>
						<div>
							<Button buttonType="view-all">View all</Button>
						</div>
					</div>
					<div className="grid grid-cols-6 gap-6">
						{categories.map((category, index) => (
							<div
								key={index}
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
								<p className="text-on-surface-v1 text-xs">
									{category.partNo}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default CategoryBrowse