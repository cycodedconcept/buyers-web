import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import TopInfo from "../components/layout/TopInfo";
import Footer from "../components/layout/Footer";
import OrderCompleteStep from "../components/cart/OrderCompleteStep";
import { fetchCart } from "../features/cart/cartSlice";
import {
  initializePayment,
  resetOrderState,
  selectCurrentOrder,
  selectCurrentOrderId,
  selectCurrentPayment,
  selectPaymentError,
  selectPaymentInitializing,
  selectPaymentStatus,
  selectPaymentVerified,
  selectPaymentVerifying,
  verifyPayment,
} from "../features/order/orderSlice";

const redirectToAuthorizationUrl = (authorizationUrl) => {
  if (!authorizationUrl) {
    return;
  }

  window.location.assign(authorizationUrl);
};

const getReferenceFromSearch = (search) =>
  new URLSearchParams(search).get("reference");

const PaymentCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const verificationRequestedRef = useRef(null);
  const [localMessage, setLocalMessage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const currentOrder = useSelector(selectCurrentOrder);
  const currentOrderId = useSelector(selectCurrentOrderId);
  const currentPayment = useSelector(selectCurrentPayment);
  const paymentError = useSelector(selectPaymentError);
  const paymentInitializing = useSelector(selectPaymentInitializing);
  const paymentVerifying = useSelector(selectPaymentVerifying);
  const paymentStatus = useSelector(selectPaymentStatus);
  const paymentVerified = useSelector(selectPaymentVerified);
  const callbackReference = getReferenceFromSearch(location.search);

  const isPaymentComplete =
    paymentVerified &&
    paymentStatus === "paid" &&
    currentOrder?.status === "confirmed";

  useEffect(() => {
    if (
      !token ||
      !callbackReference ||
      verificationRequestedRef.current === callbackReference
    ) {
      return;
    }

    verificationRequestedRef.current = callbackReference;
    setLocalMessage(null);

    dispatch(
      verifyPayment({
        reference: callbackReference,
      }),
    )
      .unwrap()
      .then((response) => {
        if (
          response?.data?.verified === true &&
          response?.data?.payment?.status === "paid"
        ) {
          dispatch(fetchCart());
        }

        navigate("/product-listing", { replace: true });
      })
      .catch(() => {});
  }, [callbackReference, dispatch, navigate, token]);

  const handleRetryPayment = async () => {
    if (!currentOrderId) {
      setLocalMessage(
        "We could not find the order linked to this payment. Please return to your cart and create the order again.",
      );
      return;
    }

    setLocalMessage(null);

    try {
      const response = await dispatch(
        initializePayment({
          orderId: currentOrderId,
        }),
      ).unwrap();
      const authorizationUrl = response?.data?.authorizationUrl;

      if (!authorizationUrl) {
        setLocalMessage(
          "We could not restart Paystack checkout right now. Please try again.",
        );
        return;
      }

      redirectToAuthorizationUrl(authorizationUrl);
    } catch {}
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const handleContinueShopping = () => {
    dispatch(resetOrderState());
    navigate("/product-listing");
  };

  const missingReferenceMessage = currentOrderId
    ? "We couldn't find a Paystack reference in the callback URL. You can restart payment for this saved order."
    : "No Paystack reference was found in the callback URL. Please return to your cart and create the order again.";
  const fallbackOrder =
    currentOrder || (currentOrderId ? { id: currentOrderId } : null);

  return (
    <>
      <div>
        <TopInfo />
      </div>
      <Navbar isListingPage isHomepage={false} />

      <div className="container px-4 py-10 md:py-16">
        <h1 className="mb-7 text-start font-fraunces text-[40px] font-semibold text-heading md:text-center">
          Payment Callback
        </h1>

        {!token ? (
          <div className="mx-auto max-w-150 rounded-3xl border border-line bg-white p-8 text-center">
            <h2 className="mb-3 font-outfit text-2xl font-semibold text-heading">
              Sign in to verify this payment
            </h2>
            <p className="mb-6 font-outfit text-base text-text">
              Payment verification is tied to your account, so please log in
              before retrying this callback.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/login"
                className="rounded-2xl bg-main px-6 py-3 font-outfit font-semibold text-white"
              >
                Go to Login
              </Link>
              <button
                type="button"
                onClick={handleBackToCart}
                className="rounded-2xl border border-heading px-6 py-3 font-outfit font-semibold text-heading"
              >
                Back to Cart
              </button>
            </div>
          </div>
        ) : !callbackReference ? (
          currentOrderId ? (
            <OrderCompleteStep
              order={fallbackOrder}
              payment={currentPayment}
              mode="failed"
              primaryActionLabel="Retry Paystack Payment"
              secondaryActionLabel="Back to Cart"
              onPrimaryAction={handleRetryPayment}
              onSecondaryAction={handleBackToCart}
              isProcessing={paymentInitializing}
              message={localMessage || missingReferenceMessage}
            />
          ) : (
            <div className="mx-auto max-w-150 rounded-3xl border border-line bg-white p-8 text-center">
              <h2 className="mb-3 font-outfit text-2xl font-semibold text-heading">
                No Paystack reference found
              </h2>
              <p className="mb-6 font-outfit text-base text-text">
                {missingReferenceMessage}
              </p>
              <button
                type="button"
                onClick={handleBackToCart}
                className="rounded-2xl bg-main px-6 py-3 font-outfit font-semibold text-white"
              >
                Back to Cart
              </button>
            </div>
          )
        ) : paymentVerifying ? (
          <div className="mx-auto max-w-150 rounded-[32px] border border-line bg-white p-8 text-center shadow-[0_28px_90px_rgba(18,18,18,0.08)] md:p-12">
            <p className="mb-3 font-outfit text-sm font-semibold uppercase tracking-[0.24em] text-main">
              Verifying payment
            </p>
            <h2 className="mb-4 font-fraunces text-3xl font-semibold text-heading md:text-[40px]">
              We&apos;re confirming your Paystack payment
            </h2>
            <p className="mx-auto max-w-3xl font-outfit text-base text-text">
              Please wait while we verify the Paystack reference from the
              callback URL with the backend. You&apos;ll be sent back to the
              product page as soon as this request succeeds.
            </p>
          </div>
        ) : isPaymentComplete ? (
          <OrderCompleteStep
            order={fallbackOrder}
            payment={currentPayment}
            mode="success"
            primaryActionLabel="Continue Shopping"
            onPrimaryAction={handleContinueShopping}
          />
        ) : (
          <OrderCompleteStep
            order={fallbackOrder}
            payment={currentPayment}
            mode="failed"
            primaryActionLabel={currentOrderId ? "Retry Paystack Payment" : null}
            secondaryActionLabel="Back to Cart"
            onPrimaryAction={currentOrderId ? handleRetryPayment : undefined}
            onSecondaryAction={handleBackToCart}
            isProcessing={paymentInitializing}
            message={
              localMessage ||
              paymentError ||
              "This payment has not been confirmed yet. You can retry checkout or return to your cart."
            }
          />
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

export default PaymentCallback;
