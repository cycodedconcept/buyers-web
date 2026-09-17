import { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import ListingGrid from "./pages/ListingGrid";
import ListingGrid2 from "./pages/ListingGrid2";
import ProductDetails from "./pages/ProductDetails";
import CartCheckout from "./pages/CartCheckout";
import PaymentCallback from "./pages/PaymentCallback";
import BuyerOrders from "./pages/BuyerOrders";
import BuyerOrderDetails from "./pages/BuyerOrderDetails";
import BuyerOrderReceipt from "./pages/BuyerOrderReceipt";
import BuyerDisputes from "./pages/BuyerDisputes";
import NewDispute from "./pages/NewDispute";
import DisputeDetails from "./pages/DisputeDetails";
import BlogList from "./pages/BlogList";
import BlogGrid from "./pages/BlogGrid";
import BlogDetails from "./pages/BlogDetails";
import Faqs from "./pages/Faqs";
import ContactUs from "./pages/ContactUs";
import Auth from "./components/auth/Auth";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

const PaystackCallbackRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectedReferenceRef = useRef(null);

  useEffect(() => {
    const reference = new URLSearchParams(location.search).get("reference");

    if (
      location.pathname !== "/" ||
      !reference ||
      redirectedReferenceRef.current === reference
    ) {
      return;
    }

    redirectedReferenceRef.current = reference;
    navigate("/payment/callback", { replace: true });
  }, [location.pathname, location.search, navigate]);

  return null;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <PaystackCallbackRedirect />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-listing" element={<ListingGrid />} />
          <Route path="/product-listing-grid" element={<ListingGrid2 />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartCheckout />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />
          <Route path="/orders" element={<BuyerOrders />} />
          <Route path="/orders/:orderId" element={<BuyerOrderDetails />} />
          <Route path="/orders/:orderId/receipt" element={<BuyerOrderReceipt />} />
          <Route path="/orders/:orderId/disputes/new" element={<NewDispute />} />
          <Route path="/disputes" element={<BuyerDisputes />} />
          <Route path="/disputes/:disputeId" element={<DisputeDetails />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog-grid" element={<BlogGrid />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/blog-details/:slug" element={<BlogDetails />} />
          <Route path="/FAQs" element={<Faqs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Auth login={true} title="Login" />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
