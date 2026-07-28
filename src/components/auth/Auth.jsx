import { useState } from "react";
import { Link } from "react-router-dom";
import { ctaCarouselImg1, authImg } from "../../assets/Assets";
import { LuX, LuUser, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Button from "../ui/Button";

const Auth = ({login = false, title = "Register"}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div
        className="w-full h-dvh relative bg-no-repeat bg-cover before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#00000033] before:z-10"
        style={{ backgroundImage: `url(${ctaCarouselImg1})` }}
      >
        <div className="absolute z-20 left-1/2 top-1/2 -translate-1/2 bg-white rounded-4xl drop-shadow-normal max-w-230 w-full md:grid md:grid-cols-[minmax(0,380px)_1fr]">
          <div className="bg-[#0000000D] w-full h-full">
            <img
              src={authImg}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-10 flex flex-col gap-y-10 relative w-full">
            <button className="absolute top-9.5 right-10">
              <LuX />
            </button>
            <h1 className="font-fraunces text-heading font-semibold text-[40px]">
              {title}
            </h1>
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-5">
                {login ? (
                  <>
                    <div className="">
                      <label
                        htmlFor="email"
                        className="font-outfit text-heading font-medium text-sm"
                      >
                        Email
                      </label>
                      <div className="relative mt-1.5">
                        <LuUser className="absolute left-4.5 top-1/2 -translate-y-1/2 text-icon text-base" />
                        <input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          className="w-full py-4 pl-11 pr-4.5 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="password"
                        className="font-outfit text-heading font-medium text-sm"
                      >
                        Password
                      </label>
                      <div className="relative mt-1.5">
                        <LuLock className="absolute left-4.5 top-1/2 -translate-y-1/2 text-icon text-base" />
                        <input
                          id="password"
                          type="password"
                          placeholder="Your password"
                          className="w-full py-4 pl-11 pr-4.5 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                        />
                      </div>
                      <div className="flex justify-end mt-2.5">
                        <Link
                          to="/forgot-password"
                          className="font-outfit text-heading text-sm"
                        >
                          Forgot password
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="">
                      <label
                        htmlFor="name"
                        className="font-outfit text-heading font-medium text-sm"
                      >
                        User name
                      </label>
                      <div className="relative mt-1.5">
                        <LuUser className="absolute left-4.5 top-1/2 -translate-y-1/2 text-icon text-base" />
                        <input
                          id="name"
                          type="text"
                          placeholder="User name"
                          className="w-full py-4 pl-11 pr-4.5 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="regEmail"
                        className="font-outfit text-heading font-medium text-sm"
                      >
                        Email address
                      </label>
                      <div className="relative mt-1.5">
                        <LuUser className="absolute left-4.5 top-1/2 -translate-y-1/2 text-icon text-base" />
                        <input
                          id="regEmail"
                          type="email"
                          placeholder="Email address"
                          className="w-full py-4 pl-11 pr-4.5 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="regPassword"
                        className="font-outfit text-heading font-medium text-sm"
                      >
                        Password
                      </label>
                      <div className="relative mt-1.5">
                        <LuLock className="absolute left-4.5 top-1/2 -translate-y-1/2 text-icon text-base" />
                        <input
                          id="regPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Your password"
                          className="w-full py-4 pl-11 pr-11 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-4.5 top-1/2 -translate-y-1/2 text-icon text-base"
                        >
                          {showPassword ? <LuEyeOff /> : <LuEye />}
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="confirmPassword"
                        className="font-outfit text-heading font-medium text-sm"
                      >
                        Confirm password
                      </label>
                      <div className="relative mt-1.5">
                        <LuLock className="absolute left-4.5 top-1/2 -translate-y-1/2 text-icon text-base" />
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="w-full py-4 pl-11 pr-11 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute right-4.5 top-1/2 -translate-y-1/2 text-icon text-base"
                        >
                          {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="font-outfit text-center flex flex-col gap-4.5 text-sm">
                <Button className={`w-full flex justify-center`}>
                  {login ? "Login" : "Sign Up"}
                </Button>
                {login ? (
                  <p className="flex items-center justify-center gap-1">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-main">
                      Register
                    </Link>
                  </p>
                ) : (
                  <p className="flex items-center justify-center gap-1">
                    Already have an account?{" "}
                    <Link to="/login" className="text-main">
                      Login
                    </Link>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="flex-1 h-px bg-line" />
                <span className="font-outfit text-text text-xs whitespace-nowrap">
                  {login ? "or login with" : "or signup with"}
                </span>
                <span className="flex-1 h-px bg-line" />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-line font-outfit text-heading text-sm font-medium"
                >
                  <FcGoogle className="text-lg" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-line font-outfit text-heading text-sm font-medium"
                >
                  <FaFacebook className="text-lg text-[#1877F2]" />
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;