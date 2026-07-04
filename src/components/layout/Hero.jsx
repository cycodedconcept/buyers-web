import {heroBg} from "../../assets/Assets"

const Hero = ({children, background = heroBg}) => {
  return (
		<>
			<div className="relative w-full min-h-195 overflow-hidden flex items-center">
				<video
					className="absolute w-full h-full top-0 left-0 object-cover object-center z-0"
					autoPlay
					loop
					muted
					playsInline
				>
					<source src={background} type="video/mp4" />
				</video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
        
        <div className="relative z-20 container py-12">
          {children}
        </div>
			</div>
		</>
	);
};

export default Hero;