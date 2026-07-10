import testimony from "../../data/testimony";

const Testimony = () => {
	return (
		<div className="container py-7 lg:py-18 px-4 lg:px-0">
			<h2 className="font-fraunces text-[30px] text-heading text-center mb-4">
				What Our Customers Say
			</h2>
			<div className="md:hidden">
				<div className="flex flex-col gap-6 font-outfit">
					{testimony.slice(0, 1).map((testi, index) => (
						<div key={index} className="rounded-[20px] p-8 shadow-tiny">
							<div className="flex items-center justify-between">
								<img src={testi.rating} alt="" className="w-[112px]" />
								<p className="text-xs text-text">{testi.date}</p>
							</div>
							<p className="my-5 text-base text-heading">"{testi.comment}"</p>
							<div className="flex items-center gap-3">
								<img
									src={testi.customerImg}
									alt="customer image"
									className="object-cover w-15 h-15 rounded-full"
								/>
								<div>
									<h4 className="font-medium text-lg text-heading">
										{testi.name}
									</h4>
									<p className="text-xs text-text">{testi.occupation}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="hidden md:flex flex-wrap md:gap-6 font-outfit">
				{testimony.map((testi, index) => (
					<div key={index} className="rounded-[20px] p-8 shadow-tiny lg:flex-1">
						<div className="flex items-center justify-between">
							<img src={testi.rating} alt="" className="w-[112px]" />
							<p className="text-xs text-text">{testi.date}</p>
						</div>
						<p className="my-5 text-base text-heading">"{testi.comment}"</p>
						<div className="flex items-center gap-3">
							<img
								src={testi.customerImg}
								alt="customer image"
								className="object-cover w-15 h-15 rounded-full"
							/>
							<div>
								<h4 className="font-medium text-lg text-heading">
									{testi.name}
								</h4>
								<p className="text-xs text-text">{testi.occupation}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="mt-10 hidden items-center justify-center gap-1 lg:flex">
				{[...Array(6)].map((_, index) => {
					const isActive = index === 2;
					return (
						<button
							key={index}
							className={`hidden h-5 w-5 items-center justify-center rounded-full bg-transparent ${isActive ? "border-1 border-main" : "border-0"} lg:flex`}
							aria-label={`Go to slide ${index + 1}`}
						>
							<div
								className={`h-3 w-3 rounded-full transition-colors ${
									isActive ? "bg-main" : "bg-out-line"
								}`}
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Testimony;
