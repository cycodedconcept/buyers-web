import { heroBg } from "../../assets/Assets";

const Hero = ({
	children,
	background = heroBg,
	isListingGrid = false,
}) => {
	const isVideo =
		typeof background === "string" && /\.(mp4|webm|ogg)$/i.test(background);
	const isImage =
		typeof background === "string" &&
		/\.(jpg|jpeg|png|webp|gif)$/i.test(background);

	return (
		<>
			{isListingGrid ? (
				<div className="relative w-full max-sm:min-h-115 min-h-143.5 overflow-hidden flex items-center">
					<img
						src={background}
						alt="listing grid background"
						className="absolute w-full h-full top-0 left-0 object-cover object-center z-0"
					/>
					<div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10 max-sm:hidden" />
					<div className="relative z-20 container py-12 px-4">{children}</div>
				</div>
			) : (
				<>
					{isVideo ? (
						<div className="relative w-full min-h-143.5 overflow-hidden flex items-center">
							<video
								className="absolute w-full h-full top-0 left-0 object-cover object-center z-0"
								autoPlay
								loop
								muted
								playsInline
							>
								<source src={background} type="video/mp4" />
							</video>
							<div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
							<div className="relative z-20 container py-12 px-4">{children}</div>
						</div>
					) : isImage ? (
						<div className="relative w-full max-sm:min-h-115 min-h-143.5 overflow-hidden flex items-center">
							<img
								src={background}
								alt="hero background"
								className="absolute w-full h-full top-0 left-0 object-cover object-center z-0"
							/>
							<div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10" />
							<div className="relative z-20 container py-12 px-4">{children}</div>
						</div>
					) : null}
				</>
			)}
		</>
	);
};

export default Hero;
