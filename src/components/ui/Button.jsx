import { MdArrowRightAlt } from "react-icons/md";

const Button = ({ children, className, buttonType = "primary" }) => {
	if (buttonType === "view-all") {
		return (
			<>
				<button className={`flex items-center gap-0.5 cursor-pointer lg:border border-line text-heading font-outfit text-sm font-medium px-6 py-2 rounded-2xl hover:bg-heading hover:text-white hover:border}`}>
					{children}
					<MdArrowRightAlt size={16} />
				</button> 
			</>
		)
	}

	return (
		<>
			<button className={`${className} text-white font-outfit font-medium text-base bg-main flex items-center px-8 py-3 rounded-xl`}>
				{" "}
				{children}{" "}
			</button>
		</>
	);
};

export default Button;
