import { NavLink } from "react-router-dom";
import brandLogo from "../../assets/logo.png";
import Button from "../ui/Button";
import { LuCarFront } from "react-icons/lu";

const Navbar = () => {
	return (
		<>
			<div className="container py-6 flex items-center justify-between">
				<div>
					<img src={brandLogo} alt="brand logo" />
				</div>
				<nav className="flex items-center space-x-8 font-outfit">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`hover:text-main transition-colors ${isActive ? "text-main" : ""}`
						}
					>
						Home
					</NavLink>
					<NavLink
						to="/browse-parts"
						className={({ isActive }) =>
							`hover:text-main transition-colors ${isActive ? "text-main" : ""}`
						}
					>
						Browse Parts
					</NavLink>
					<NavLink
						to="/vehicle"
						className={({ isActive }) =>
							`hover:text-main transition-colors ${isActive ? "text-main" : ""}`
						}
					>
						By vehicle
					</NavLink>
					<NavLink
						to="/sellers"
						className={({ isActive }) =>
							`hover:text-main transition-colors ${isActive ? "text-main" : ""}`
						}
					>
						Sellers
					</NavLink>
					<NavLink
						to="/blog"
						className={({ isActive }) =>
							`hover:text-main transition-colors ${isActive ? "text-main" : ""}`
						}
					>
						Blog
					</NavLink>
					<NavLink
						to="/contact"
						className={({ isActive }) =>
							`hover:text-main transition-colors ${isActive ? "text-main" : ""}`
						}
					>
						Contact
					</NavLink>
				</nav>
				<Button>
					<LuCarFront className="inline-block mr-2" />
					Register
				</Button>
			</div>
		</>
	);
};

export default Navbar;
