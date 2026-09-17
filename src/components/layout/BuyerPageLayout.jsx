import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TopInfo from "./TopInfo";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BuyerPageLayout = ({ title, children }) => {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <TopInfo />
      <Navbar isListingPage isHomepage={false} />
      <main className="container min-h-[55vh] px-4 py-10 font-outfit md:py-14">
        <h1 className="mb-8 font-fraunces text-3xl font-semibold text-heading md:text-[40px]">
          {title}
        </h1>
        {token ? children : (
          <div className="rounded-3xl border border-line bg-white p-8 text-center">
            <p className="mb-5 text-text">Sign in to view your {title.toLowerCase()}.</p>
            <Link to="/login" className="inline-block rounded-2xl bg-main px-6 py-3 font-semibold text-white">
              Go to Login
            </Link>
          </div>
        )}
      </main>
      <div className="hidden lg:block"><Footer /></div>
      <div className="lg:hidden"><Footer listingGridMobile /></div>
    </>
  );
};

export default BuyerPageLayout;
