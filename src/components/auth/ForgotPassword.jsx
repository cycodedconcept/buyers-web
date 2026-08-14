import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetStatus } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import { ctaCarouselImg1, authImg } from "../../assets/Assets";
import { LuX, LuUser } from "react-icons/lu";
import Button from "../ui/Button";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "info",
        title: "Missing email",
        text: "Please enter your email address",
        confirmButtonColor: "#0273F9",
      });
      return;
    }
    dispatch(forgotPassword({ email })).then((result) => {
      if (forgotPassword.fulfilled.match(result)) {
        console.log("Forgot password fulfilled:", result.payload);
        Swal.fire({
          icon: "success",
          title: "Check your email",
          text: result.payload.message || "We've sent you a link to reset your password.",
          confirmButtonColor: "#0273F9",
        }).then(() => {
          dispatch(resetStatus());
          navigate("/login");
        });
      } else {
        console.log("Forgot password rejected:", result.payload);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: result.payload.error.message || "Please try again",
          confirmButtonColor: "#0273F9",
        }).then(() => dispatch(resetStatus()));
      }
    });
  }
  
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
              <div>
                <h1 className="font-fraunces text-heading font-semibold text-[40px]">
                  Forgot password
                </h1>
                <p className="font-outfit text-text text-sm mt-2">
                  Enter the email tied to your account and we'll send you a link
                  to reset it.
                </p>
              </div>
              <div className="flex flex-col gap-7">
                <div>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="Your email"
                      className="w-full py-4 pl-11 pr-4.5 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                    />
                  </div>
                </div>
                <div className="font-outfit text-center flex flex-col gap-4.5 text-sm">
                  <Button
                    className="w-full flex justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                  <p className="flex items-center justify-center gap-1">
                    Remember your password?{" "}
                    <Link to="/login" className="text-main">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;