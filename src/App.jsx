import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import ListingGrid from "./pages/ListingGrid";
import ListingGrid2 from "./pages/ListingGrid2";
import ProductDetails from "./pages/ProductDetails";
import CartCheckout from "./pages/CartCheckout";
import BlogList from "./pages/BlogList";
import BlogGrid from "./pages/BlogGrid";
import BlogDetails from "./pages/BlogDetails";
import Faqs from "./pages/Faqs";
import ContactUs from "./pages/ContactUs";
import Auth from "./components/auth/Auth";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
	return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-listing" element={<ListingGrid />} />
          <Route path="/product-listing-grid" element={<ListingGrid2 />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartCheckout />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog-grid" element={<BlogGrid />} />
          <Route path="/blog-details" element={<BlogDetails />} />
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
