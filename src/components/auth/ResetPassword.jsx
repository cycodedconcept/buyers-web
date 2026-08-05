import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetStatus } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import { ctaCarouselImg1, authImg } from "../../assets/Assets";
import { LuX, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import Button from "../ui/Button";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token: routeToken } = useParams();
  const queryToken = new URLSearchParams(location.search).get("token");
  const resetToken = routeToken || queryToken;
  console.log(
    "reset token from URL:",
    resetToken,
    "length:",
    resetToken?.length,
  );
  const { isLoading, error, message } = useSelector((state) => state.auth);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[0-9]/.test(password)) errors.push("one number");
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "info",
        title: "Missing fields",
        text: "Please fill in both fields",
        confirmButtonColor: "#0273F9",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "info",
        text: "Passwords do not match",
        confirmButtonColor: "#0273F9",
      });
      return;
    }
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      Swal.fire({
        icon: "info",
        title: "Weak password",
        text: `Password must contain ${passwordErrors.join(", ")}.`,
        confirmButtonColor: "#0273F9",
      });
      return;
    }

    if (!resetToken) {
      Swal.fire({
        icon: "error",
        title: "Invalid reset link",
        text: "The reset token is missing. Please open the link from your email again.",
        confirmButtonColor: "#0273F9",
      });
      return;
    }

    dispatch(resetPassword({ token: resetToken, newPassword })).then(
      (result) => {
        if (resetPassword.fulfilled.match(result)) {
          console.log("Reset password succeeded:", result.payload);
          Swal.fire({
            icon: "success",
            title: "Password reset",
            text:
              result.payload.message ||
              "You can now log in with your new password.",
            confirmButtonColor: "#0273F9",
          }).then(() => {
            dispatch(resetStatus());
            navigate("/login");
          });
        } else {
          console.log("Reset password rejected:", result.payload);
          Swal.fire({
            icon: "error",
            title: "Reset failed",
            text:
              result.payload.error.message ||
              "This link may have expired. Please request a new one.",
            confirmButtonColor: "#0273F9",
          }).then(() => dispatch(resetStatus()));
        }
      },
    );
  };

  return (
    <>
      <div
        className="w-full min-h-screen overflow-y-auto relative bg-no-repeat bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#00000033] before:z-10"
        style={{ backgroundImage: `url(${ctaCarouselImg1})` }}
      >
        <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-15 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
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
              <Link to="/login" className="absolute top-9.5 right-10">
                <LuX />
              </Link>
              <h1 className="font-fraunces text-heading font-semibold text-[40px]">
                Reset password
              </h1>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="font-outfit text-heading font-medium text-sm"
                    >
                      New password
                    </label>
                    <div className="relative mt-1.5">
                      <LuLock className="absolute left-4.5 top-1/2 -translate-y-1/2 text-icon text-base" />
                      <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="Your new password"
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
                  <div>
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="Confirm new password"
                        className="w-full py-4 pl-11 pr-11 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-4.5 top-1/2 -translate-y-1/2 text-icon text-base"
                      >
                        {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="font-outfit text-center flex flex-col gap-4.5 text-sm">
                  <Button
                    className="w-full flex justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? "Resetting..." : "Reset password"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
