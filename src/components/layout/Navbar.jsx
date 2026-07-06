import { NavLink } from "react-router-dom";
import brandLogo from "../../assets/logo.png";
import Button from "../ui/Button";
import { LuCarFront, LuMenu } from "react-icons/lu";

const Navbar = ({isHomepage = true}) => {
	return (
		<>
			<div className="container py-6 px-3 lg:px-0">
				<div className="block lg:hidden">
					{isHomepage ? (
						<>
							<LuMenu size={24} className="block lg:hidden" />
						</>
					) : (
						<>
							<div className="flex items-center gap-4">
								<Button>Register</Button>
								<LuMenu
									size={24}
									className="inline lg:hidden border border-line rounded-sm"
								/>
							</div>
						</>
					)}
				</div>
				<div className="hidden lg:flex items-center justify-between">
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
			</div>
		</>
	);
};

export default Navbar;
