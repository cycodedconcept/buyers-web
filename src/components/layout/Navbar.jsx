import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoImg } from "../../assets/Assets";
import Button from "../ui/Button";
import {
  LuBadgeCheck,
  LuCarFront,
  LuLogOut,
  LuMail,
  LuMenu,
  LuPhone,
  LuShoppingCart,
  LuUser,
} from "react-icons/lu";
import { fetchCart, selectCartItemCount } from "../../features/cart/cartSlice";
import { getCurrentUser, logout } from "../../features/auth/authSlice";

const formatJoinedDate = (createdAt) => {
  if (!createdAt) return "N/A";

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
  }).format(new Date(createdAt));
};

const getUserInitials = (fullName) => {
  if (!fullName) return "U";

  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0]?.toUpperCase())
    .join("");
};

const UserAccountMenu = ({ user, isLoading, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="User account"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-heading transition-colors hover:bg-[#F3F5F7] hover:text-main"
      >
        <span className="absolute right-1.5 top-1.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full border border-white bg-success" />
        </span>
        <LuUser size={22} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-[0_24px_80px_rgba(18,18,18,0.16)]">
          {isLoading && !user ? (
            <div className="space-y-3">
              <p className="font-outfit text-heading text-base font-semibold">
                Loading your account...
              </p>
              <p className="font-outfit text-sm text-text">
                We&apos;re pulling the latest profile details for this session.
              </p>
            </div>
          ) : user ? (
            <>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F3F5F7] font-fraunces text-lg font-semibold text-heading">
                  {getUserInitials(user.fullName)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-fraunces text-xl font-semibold text-heading">
                      {user.fullName}
                    </h3>
                    <span className="rounded-full bg-success/10 px-2.5 py-1 font-outfit text-[11px] font-semibold uppercase tracking-wide text-success">
                      {user.role}
                    </span>
                  </div>
                  <p className="mt-1 font-outfit text-sm text-text">
                    Joined {formatJoinedDate(user.createdAt)}
                  </p>
                </div>
              </div>

              <div className="my-5 grid gap-3 rounded-2xl bg-[#F9FAFB] p-4">
                <div className="flex items-center gap-3">
                  <LuMail className="shrink-0 text-main" size={18} />
                  <div className="min-w-0">
                    <p className="font-outfit text-xs uppercase tracking-wide text-text">
                      Email
                    </p>
                    <p className="truncate font-outfit text-sm font-medium text-heading">
                      {user.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <LuPhone className="shrink-0 text-main" size={18} />
                  <div className="min-w-0">
                    <p className="font-outfit text-xs uppercase tracking-wide text-text">
                      Phone
                    </p>
                    <p className="font-outfit text-sm font-medium text-heading">
                      {user.phone || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <LuBadgeCheck className="shrink-0 text-main" size={18} />
                  <div className="min-w-0">
                    <p className="font-outfit text-xs uppercase tracking-wide text-text">
                      Verification
                    </p>
                    <p className="font-outfit text-sm font-medium text-heading">
                      {user.isVerified ? "Verified account" : "Verification pending"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-heading px-4 py-3 font-outfit text-sm font-semibold text-white transition-colors hover:bg-main"
              >
                <LuLogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <p className="font-outfit text-heading text-base font-semibold">
                We couldn&apos;t load your account details right now.
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-heading px-4 py-3 font-outfit text-sm font-semibold text-white transition-colors hover:bg-main"
              >
                <LuLogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Navbar = ({ isHomepage = true, isListingPage = false }) => {
  const dispatch = useDispatch();
  const { token, user, isLoading } = useSelector((state) => state.auth);
  const cartItemCount = useSelector(selectCartItemCount);
  const badgeCount = cartItemCount > 99 ? "99+" : cartItemCount;
  const isLoggedIn = Boolean(token);

  useEffect(() => {
    if (!token) return;

    dispatch(fetchCart());
    dispatch(getCurrentUser());
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const cartLinkClasses =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-3 py-3 font-outfit text-sm font-medium text-heading transition-colors hover:bg-[#F3F5F7] hover:text-main";

  return (
    <>
      <div className="container px-4 py-6">
        <div
          className={`block lg:hidden ${isListingPage && "border-b border-b-line pb-5"}`}
        >
          {isHomepage ? (
            <div className="flex items-center justify-between">
              <LuMenu size={24} className="block lg:hidden" />
              <div className="flex items-center gap-2">
                <Link to="/cart" className={`${cartLinkClasses} px-3 py-2`}>
                  <span className="relative inline-flex">
                    <LuShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <span className="absolute -right-2.5 -top-2 inline-flex min-w-5 justify-center rounded-full bg-main px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {badgeCount}
                      </span>
                    )}
                  </span>
                </Link>
                {isLoggedIn && (
                  <UserAccountMenu
                    user={user}
                    isLoading={isLoading}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/cart" className={`${cartLinkClasses} px-3 py-3`}>
                <span className="relative inline-flex">
                  <LuShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -right-2.5 -top-2 inline-flex min-w-5 justify-center rounded-full bg-main px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {badgeCount}
                    </span>
                  )}
                </span>
              </Link>
              {isLoggedIn ? (
                <UserAccountMenu
                  user={user}
                  isLoading={isLoading}
                  onLogout={handleLogout}
                />
              ) : (
                <Button>Register</Button>
              )}
              <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-line">
                <LuMenu size={28} className="inline lg:hidden rounded-sm" />
              </button>
            </div>
          )}
        </div>
        <div className="hidden lg:flex items-center justify-between">
          <div>
            <img src={logoImg} alt="brand logo" />
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
              to="/product-listing"
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
              to="/contact-us"
              className={({ isActive }) =>
                `hover:text-main transition-colors ${isActive ? "text-main" : ""}`
              }
            >
              Contact
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/cart" className={cartLinkClasses}>
              <span className="relative inline-flex">
                <LuShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -right-2.5 -top-2 inline-flex min-w-5 justify-center rounded-full bg-main px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {badgeCount}
                  </span>
                )}
              </span>
              Cart
            </Link>
            {isLoggedIn ? (
              <UserAccountMenu
                user={user}
                isLoading={isLoading}
                onLogout={handleLogout}
              />
            ) : (
              <Link to="/register">
                <Button>
                  <LuCarFront className="inline-block mr-2" />
                  Register
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
