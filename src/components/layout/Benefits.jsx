import { verifiedIcon, trustedIcon, handShakeIcon, benefitsImg } from "../../assets/Assets";

const benefits = [
	{
		img: verifiedIcon,
		title: "Verified Sellers",
		description:
			"Every seller on our platform is verified to help ensure a safer and more reliable buying experience. Shop with confidence from trusted dealers across Nigeria.",
	},
	{
		img: trustedIcon,
		title: "Genuine Parts",
		description:
			"Access quality genuine and aftermarket parts for a wide range of vehicle makes and models, all from trusted suppliers in one place.",
	},
	{
		img: handShakeIcon,
		title: "Fast Delivery",
		description:
			"Get your parts delivered quickly through our trusted logistics network, helping you get back on the road without unnecessary delays.",
	},
];

const Benefits = () => {
	return (
		<>
			<div className="py-16">
				<div className="container">
					<div className="flex items-center justify-between">
						<div className="max-w-137.5 w-full -mt-20">
							<div className="mb-10">
								<h2 className="font-fraunces text-[30px] text-heading mb-2">
									Why Choose Autoparts?
								</h2>
								<p className="font-outfit text-sm text-text leading-[1.4]">
									Our experienced team excels in car sales with many years of
									successfully navigating the market, delivering informed
									decisions and optimal results.
								</p>
							</div>
							<div className="flex flex-col space-y-5">
								{benefits.map((benefit, index) => (
									<div
										key={index}
										className="flex items-start gap-8 py-6 px-6 hover:shadow-3xl transition-all duration-300 rounded-2xl"
									>
										<img
											src={benefit.img}
											alt={benefit.title}
											className="w-12 h-12"
										/>
										<div>
											<h3 className="font-outfit font-medium text-lg text-heading mb-2">
												{benefit.title}
											</h3>
											<p className="font-outfit text-sm text-text leading-[1.4]">
												{benefit.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="max-w-157.5 w-full">
							<img
								src={benefitsImg}
								alt="Benefits"
								className="w-full h-full object-cover object-center"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Benefits;
