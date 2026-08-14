import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  resetStatus,
} from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import { ctaCarouselImg1, authImg } from "../../assets/Assets";
import { LuX, LuUser, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import Button from "../ui/Button";

const Auth = ({ login = false, title = "Register" }) => {
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRegFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginFormChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[0-9]/.test(password)) errors.push("one number");
    return errors;
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      Swal.fire({
        icon: "info",
        title: "Missing Fields",
        text: "Please fill in all fields",
        confirmButtonColor: "#0273F9",
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "info",
        text: "Passwords do not match",
        confirmButtonColor: "#0273f9",
      });
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      Swal.fire({
        icon: "info",
        title: "Weak password",
        text: `Password must contain ${passwordErrors.join(", ")}.`,
        confirmButtonColor: "#0273F9",
      });
      return;
    }
    setHasSubmitted(true);
    dispatch(registerUser(formData));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      Swal.fire({
        icon: "info",
        title: "Missing Fields",
        text: "Please fill in all fields",
        confirmButtonColor: "#0273F9",
      });
      return;
    }
    setHasSubmitted(true);
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (!hasSubmitted) return;

    if (isAuthenticated) {
      Swal.fire({
        icon: "success",
        title: login ? "Login successful" : "Registration successful",
        text: message,
        confirmButtonColor: "#0273F9",
      }).then(() => {
        dispatch(resetStatus());
        setHasSubmitted(false);
        navigate("/");
      });
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: login ? "Login failed" : "Registration failed",
        text: error,
        confirmButtonColor: "#0273F9",
      }).then(() => {
        dispatch(resetStatus());
        setHasSubmitted(false);
      });
    }
  }, [
    hasSubmitted,
    isAuthenticated,
    error,
    login,
    navigate,
    dispatch,
    message,
  ]);

  return (
    <>
      <div
        className="w-full min-h-screen overflow-y-auto relative bg-no-repeat bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#00000033] before:z-10"
        style={{ backgroundImage: `url(${ctaCarouselImg1})` }}
      >
        <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-15 sm:px-6 lg:px-8">
          <form
            onSubmit={login ? handleLoginSubmit : handleRegSubmit}
            className="bg-white rounded-4xl drop-shadow-normal max-w-230 w-full md:grid md:grid-cols-[minmax(0,380px)_1fr]"
          >
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
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginFormChange}
                            required
                            disabled={isLoading}
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
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginFormChange}
                            required
                            disabled={isLoading}
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
                            onChange={handleRegFormChange}
                            required
                            disabled={isLoading}
                            name="fullName"
                            value={formData.fullName}
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
                            onChange={handleRegFormChange}
                            required
                            disabled={isLoading}
                            name="email"
                            value={formData.email}
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
                            onChange={handleRegFormChange}
                            required
                            disabled={isLoading}
                            name="password"
                            value={formData.password}
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
                            onChange={handleConfirmPasswordChange}
                            value={confirmPassword}
                            required
                            disabled={isLoading}
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
                  <Button
                    className={`w-full flex justify-center`}
                    disabled={isLoading}
                  >
                    {login
                      ? isLoading
                        ? "Signing in..."
                        : "Login"
                      : isLoading
                        ? "Signing up..."
                        : "Sign up"}
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
