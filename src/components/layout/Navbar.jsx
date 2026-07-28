import { NavLink } from "react-router-dom";
import {logoImg, logoImg2} from "../../assets/Assets";
import Button from "../ui/Button";
import { LuCarFront, LuMenu } from "react-icons/lu";

const Navbar = ({isHomepage = true, isListingPage = false}) => {
	return (
    <>
      <div className="container px-4 py-6">
        <div
          className={`block lg:hidden ${isListingPage && "border-b border-b-line pb-5"}`}
        >
          {isHomepage ? (
            <>
              <LuMenu size={24} className="block lg:hidden" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Button>Register</Button>
                <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-line">
                  <LuMenu size={28} className="inline lg:hidden rounded-sm" />
                </button>
              </div>
            </>
          )}
        </div>
        <div className="hidden lg:flex items-center justify-between">
          <div>
            {isHomepage ? (
              <img src={logoImg} alt="brand logo" />
            ) : (
              <img src={logoImg2} alt="brand logo" />
            )}
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
