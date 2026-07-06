import { useState, useEffect, useRef } from "react";
import { ctaCarouselImg1, ctaSingleImg } from "../../assets/Assets";
import Button from "../ui/Button";
import { nairaFormatter } from "../../utils/utilityFunc";

const Cta = ({ ctaType }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slides = [
		{ url: ctaCarouselImg1 },
		{ url: ctaCarouselImg1 },
		{ url: ctaCarouselImg1 },
	];
	const timerRef = useRef(null);

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setCurrentSlide((prevSlide) =>
				prevSlide === slides.length - 1 ? 0 : prevSlide + 1,
			);
		}, 4000);
	};

	useEffect(() => {
		startTimer();

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, []);

	const resetTimer = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		startTimer();
	};

	const goToSlide = (slideIndex) => {
		setCurrentSlide(slideIndex);
		resetTimer();
	};

	if (ctaType === "single") {
		return (
			<>
				<div className="container max-sm:py-16 px-4 max-sm:bg-heading">
					<div className="w-full overflow-hidden max-sm:rounded-[20px] lg:h-121.25 md:rounded-tr-2xl md:rounded-br-2xl">
						<div className="relative flex min-h-[320px] flex-col justify-center rounded-[20px] bg-gradient-to-r from-[#ff7101] to-[rgba(12,26,46,0.95)] px-5 py-8 lg:h-full lg:items-center lg:rounded-tr-2xl lg:rounded-br-2xl lg:bg-transparent lg:px-12 lg:py-0">
							<div className="absolute inset-0 hidden lg:block">
								<div
									className="h-full w-full bg-cover bg-center bg-no-repeat"
									style={{ backgroundImage: `url(${ctaSingleImg})` }}
								/>
								<div className="absolute inset-0 bg-linear-[to_right,#0C1A2EF2,#0C1A2EE5,#0C1A2EBA,#0C1A2E4D,#0C1A2E00]" />
							</div>
							<div className="relative z-10 w-full lg:px-12">
								<h2 className="font-outfit text-[28px] font-semibold leading-[1.2] text-white lg:font-fraunces lg:text-[50px]">
									<span className="lg:hidden">
										Ready To Sell Across Nigeria?
									</span>
									<span className="hidden lg:inline">
										Ready To Sell Auto Parts <br className="hidden lg:block" />{" "}
										Across Nigeria?
									</span>
								</h2>
								<p className="my-5 font-outfit text-[13px] leading-[1.4] text-white lg:text-base">
									<span className="lg:hidden">
										Connect with mechanics and owners across Nigeria from a
										single platform.
									</span>
									<span className="hidden lg:inline">
										Stop limiting your sales to your local market. With
										AutoParts Marketplace, you can connect with{" "}
										<br className="hidden lg:block" /> mechanics, vehicle
										owners, and fleet operators across Nigeria. List your
										products, manage inventory,{" "}
										<br className="hidden lg:block" /> receive secure payments,
										and grow your business from a single platform.
									</span>
								</p>
								<Button className="px-10 py-2.5 lg:px-14">
									Become a Seller
								</Button>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="container lg:py-10">
				<div className="w-full h-123.75 overflow-hidden relative ">
					<div
						className="flex transition-transform ease-out duration-1000 w-full h-full relative z-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#00000033] before:z-10 before:rounded-2xl"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						{slides.map((slide, index) => (
							<div
								key={index}
								className="w-full h-full flex items-end lg:items-center shrink-0 lg:rounded-2xl bg-cover bg-center bg-no-repeat max-sm:p-5 lg:px-10 overflow-hidden"
								style={{ backgroundImage: `url(${ctaCarouselImg1})` }}
							>
								<div className="z-30 relative">
									<p className="font-outfit lg:font-fraunces text-[#0C0407] font-medium text-sm bg-white py-1 px-4 rounded-md inline-block">
										<span className="hidden lg:inline">
											Part of the Week —{" "}
										</span>{" "}
										Featured Listing
									</p>
									<h2 className="font-outfit lg:font-fraunces text-white font-bold lg:font-semibold text-[32px] lg:text-[70px]">
										10% OFF!
									</h2>
									<h4 className="font-outfit font-medium text-[20px] text-white mb-2">
										Bosch Front Disc Brake Kit Toyota Camry{" "}
										<span className="hidden lg:block">2015–2020</span>
									</h4>
									<p className="hidden lg:block font-outfit text-base text-line leading-[1.4]">
										OEM-grade. Sealed original packaging. Compatible with 2015,
										2016, 2017, 2018, <br /> 2019 & 2020 Toyota Camry
										SE/XSE/XLE. Ships from Lagos within 24 hours.
									</p>
									<div className="flex items-center gap-2 my-3">
										<h2 className="font-outfit lg:font-fraunces font-bold text-[30px] text-main">
											{nairaFormatter.format(22000)}
										</h2>
										<p className="font-outfit text-base text-icon">
											<strike>{nairaFormatter.format(25000)}</strike>
										</p>
									</div>
									<Button className="px-14 py-2.5 max-sm:w-full flex justify-center">
										Add to Cart
									</Button>
								</div>
							</div>
						))}
					</div>
					<div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-3 bg-white rounded-[20px] py-2 px-3 z-20">
						{slides.map((_, index) => (
							<button
								key={index}
								className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${index === currentSlide ? "bg-main" : "bg-icon"}`}
								onClick={() => goToSlide(index)}
							/>
						))}
					</div>
					{/* <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-2xl z-0" /> */}
				</div>
			</div>
		</>
	);
};

export default Cta;
