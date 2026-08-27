import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Navbar from "../components/layout/Navbar";
import TopInfo from "../components/layout/TopInfo";
import CheckoutStepper from "../components/cart/CheckoutStepper";
import ShoppingCartStep from "../components/cart/ShoppingCartStep";
import CheckoutDetailsStep from "../components/cart/CheckoutDetailsStep";
import OrderCompleteStep from "../components/cart/OrderCompleteStep";
import Footer from "../components/layout/Footer";
import {
  fetchCart,
  selectCartError,
  selectCartItems,
  selectCartLoading,
  selectCartSummary,
  updateCartItem,
} from "../features/cart/cartSlice";
import {
  createOrder,
  initializePayment,
  resetOrderState,
  selectCurrentOrder,
  selectCurrentPayment,
  selectOrderError,
  selectOrderLoading,
  selectPaymentError,
  selectPaymentInitializing,
  selectPaymentStatus,
  selectPaymentVerified,
} from "../features/order/orderSlice";

const getCartItemImageUrl = (primaryImageUrl) => {
  if (!primaryImageUrl) {
    return "https://placehold.co/160x160?text=Auto+Part";
  }

  return primaryImageUrl.startsWith("http")
    ? primaryImageUrl
    : `${import.meta.env.VITE_API_URL}/${primaryImageUrl}`;
};

const normalizeCartItem = (item) => ({
  id: item.id,
  quantity: item.quantity,
  unitPriceKobo: item.unitPriceKobo,
  lineTotalKobo: item.lineTotalKobo,
  title: item.product?.title || "Auto part",
  condition: item.product?.condition || "N/A",
  location: item.product?.location || "",
  stockQty: item.product?.stockQty,
  imageUrl: getCartItemImageUrl(item.product?.primaryImageUrl),
});

const getErrorMessage = (error) =>
  typeof error === "string"
    ? error
    : error?.error?.message || error?.message || "Something went wrong";

const buildInitialCheckoutValues = (user) => {
  const fullName = user?.fullName?.trim() || "";
  const [firstName = "", ...restNames] = fullName.split(/\s+/).filter(Boolean);

  return {
    firstName,
    lastName: restNames.join(" "),
    email: user?.email || "",
    phone: user?.phone || "",
    addressLabel: "",
    street: "",
    city: "",
    state: "",
  };
};

const redirectToAuthorizationUrl = (authorizationUrl) => {
  if (!authorizationUrl) {
    return;
  }

  window.location.assign(authorizationUrl);
};

const CartCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentRedirectError, setPaymentRedirectError] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const cartItems = useSelector(selectCartItems);
  const cartSummary = useSelector(selectCartSummary);
  const cartLoading = useSelector(selectCartLoading);
  const cartError = useSelector(selectCartError);
  const currentOrder = useSelector(selectCurrentOrder);
  const currentPayment = useSelector(selectCurrentPayment);
  const orderLoading = useSelector(selectOrderLoading);
  const orderError = useSelector(selectOrderError);
  const paymentInitializing = useSelector(selectPaymentInitializing);
  const paymentError = useSelector(selectPaymentError);
  const paymentStatus = useSelector(selectPaymentStatus);
  const paymentVerified = useSelector(selectPaymentVerified);

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(fetchCart());
  }, [dispatch, token]);

  useEffect(() => {
    if (currentOrder?.id && step !== 3) {
      setStep(3);
      return;
    }

    if (!currentOrder?.id && step === 3) {
      setStep(1);
    }
  }, [currentOrder?.id, step]);

  const displayCartItems = cartItems.map(normalizeCartItem);
  const initialCheckoutValues = useMemo(
    () => buildInitialCheckoutValues(user),
    [user],
  );
  const isPaymentComplete =
    paymentVerified &&
    paymentStatus === "paid" &&
    currentOrder?.status === "confirmed";

  const pageTitle =
    step === 3
      ? isPaymentComplete
        ? "Order Complete"
        : "Order Review"
      : step === 2
        ? "Checkout Details"
        : "Shopping Cart";

  const updateQuantity = async (item, nextQuantity) => {
    if (nextQuantity < 1) return;
    if (
      item.stockQty !== null &&
      item.stockQty !== undefined &&
      nextQuantity > item.stockQty
    ) {
      return;
    }

    try {
      await dispatch(
        updateCartItem({
          cartItemId: item.id,
          quantity: nextQuantity,
        }),
      ).unwrap();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to update cart",
        text: getErrorMessage(error),
        confirmButtonColor: "#0273F9",
      });
    }
  };

  const handleCreateOrder = async (payload) => {
    setPaymentRedirectError(null);

    try {
      await dispatch(createOrder(payload)).unwrap();
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleInitializePayment = async () => {
    if (!currentOrder?.id) {
      setPaymentRedirectError(
        "We could not find a valid order to send to Paystack. Please recreate your order details.",
      );
      return;
    }

    setPaymentRedirectError(null);

    try {
      const response = await dispatch(
        initializePayment({
          orderId: currentOrder.id,
        }),
      ).unwrap();
      const authorizationUrl = response?.data?.authorizationUrl;

      if (!authorizationUrl) {
        setPaymentRedirectError(
          "We could not start the Paystack checkout page. Please try again.",
        );
        return;
      }

      redirectToAuthorizationUrl(authorizationUrl);
    } catch {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReturnToCheckout = () => {
    dispatch(resetOrderState());
    setPaymentRedirectError(null);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinueShopping = () => {
    dispatch(resetOrderState());
    setPaymentRedirectError(null);
    navigate("/product-listing");
  };

  const increaseQuantity = (item) => {
    updateQuantity(item, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    updateQuantity(item, item.quantity - 1);
  };

  const orderMessage = paymentRedirectError || paymentError;

  return (
    <>
      <div>
        <TopInfo />
      </div>
      <Navbar isListingPage isHomepage={false} />

      <div className="container px-4 py-10 md:py-16">
        <h1 className="mb-7 text-start font-fraunces text-[40px] font-semibold text-heading md:text-center">
          {pageTitle}
        </h1>

        {!token ? (
          <div className="mx-auto max-w-150 rounded-3xl border border-line bg-white p-8 text-center">
            <h2 className="mb-3 font-outfit text-2xl font-semibold text-heading">
              Sign in to view your cart
            </h2>
            <p className="mb-6 font-outfit text-base text-text">
              Cart items are tied to your account, so we need you logged in
              before we can load them.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/login"
                className="rounded-2xl bg-main px-6 py-3 font-outfit font-semibold text-white"
              >
                Go to Login
              </Link>
              <Link
                to="/product-listing"
                className="rounded-2xl border border-heading px-6 py-3 font-outfit font-semibold text-heading"
              >
                Browse Parts
              </Link>
            </div>
          </div>
        ) : currentOrder?.id ? (
          <>
            <CheckoutStepper currentStep={3} />

            <OrderCompleteStep
              order={currentOrder}
              payment={currentPayment}
              mode={isPaymentComplete ? "success" : "review"}
              primaryActionLabel={
                isPaymentComplete ? "Continue Shopping" : "Proceed to Pay"
              }
              secondaryActionLabel={
                isPaymentComplete ? null : "Edit Checkout Details"
              }
              onPrimaryAction={
                isPaymentComplete
                  ? handleContinueShopping
                  : handleInitializePayment
              }
              onSecondaryAction={
                isPaymentComplete ? undefined : handleReturnToCheckout
              }
              isProcessing={paymentInitializing}
              message={isPaymentComplete ? null : orderMessage}
            />
          </>
        ) : cartLoading && !displayCartItems.length ? (
          <div className="rounded-3xl border border-line bg-white px-6 py-12 text-center">
            <p className="mb-2 font-outfit text-xl font-semibold text-heading">
              Loading your cart...
            </p>
            <p className="font-outfit text-base text-text">
              We&apos;re pulling the latest items and totals from the server.
            </p>
          </div>
        ) : cartError && !displayCartItems.length ? (
          <div className="mx-auto max-w-150 rounded-3xl border border-line bg-white p-8 text-center">
            <h2 className="mb-3 font-outfit text-2xl font-semibold text-heading">
              We couldn&apos;t load your cart
            </h2>
            <p className="mb-6 font-outfit text-base text-text">{cartError}</p>
            <button
              type="button"
              onClick={() => dispatch(fetchCart())}
              className="rounded-2xl bg-main px-6 py-3 font-outfit font-semibold text-white"
            >
              Retry
            </button>
          </div>
        ) : !displayCartItems.length ? (
          <div className="mx-auto max-w-150 rounded-3xl border border-line bg-white p-8 text-center">
            <h2 className="mb-3 font-outfit text-2xl font-semibold text-heading">
              Your cart is empty
            </h2>
            <p className="mb-6 font-outfit text-base text-text">
              Add a few parts and they&apos;ll show up here with live totals from
              the backend.
            </p>
            <Link
              to="/product-listing"
              className="inline-flex rounded-2xl bg-main px-6 py-3 font-outfit font-semibold text-white"
            >
              Browse Parts
            </Link>
          </div>
        ) : (
          <>
            <CheckoutStepper currentStep={step} />

            {step === 1 ? (
              <ShoppingCartStep
                cartItems={displayCartItems}
                summary={cartSummary}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onCheckout={() => setStep(2)}
                isUpdating={cartLoading}
              />
            ) : (
              <CheckoutDetailsStep
                cartItems={displayCartItems}
                summary={cartSummary}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onCheckout={handleCreateOrder}
                isUpdating={cartLoading || orderLoading}
                orderError={orderError}
                initialValues={initialCheckoutValues}
              />
            )}
          </>
        )}
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <Footer listingGridMobile={true} />
      </div>
    </>
  );
};

export default CartCheckout;
