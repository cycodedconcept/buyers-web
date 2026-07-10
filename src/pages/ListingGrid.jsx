import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Products from "../components/layout/Products";
import Footer from "../components/layout/Footer";
import { heroBgImg } from "../assets/Assets";
import Button from "../components/ui/Button";
import { LuArrowRight } from "react-icons/lu";

const ListingGrid = () => {
  return (
    <>
      <TopInfo />
      <Navbar isHomepage={false}/>
      <div className="hidden sm:block">
        <Hero background={heroBgImg}>
          <div className="max-sm:px-4">
            <h1 className="font-outfit font-semibold text-[42px] lg:text-[70px] text-white mb-4 leading-none">
              Buying and selling car parts <br className="hidden lg:block" />{" "}
              has never been easier!
            </h1>
            <p className="font-outfit text-base lg:text-lg text-line mb-6 leading-[1.3]">
              Leading online car parts buying and selling platform. helps users{" "}
              <br className="hidden lg:block" />
              buy car parts that are right for them.
            </p>
            <Button className="flex items-center text-sm gap-1 px-5 py-3">
              Search for Sport Parts
              <LuArrowRight size={16} />
            </Button>
          </div>
        </Hero>
      </div>
      <div className="block sm:hidden">
        <div className="container px-4 bg-[#121212] py-5">
          <div className="w-full min-h-[160px]">
            <img
              src={heroBgImg}
              alt="hero image"
              className="max-w-full h-full rounded-2xl"
            />
          </div>
          <h1 className="font-outfit text-[28px] text-white font-semibold leading-[1.1] my-4">
            Buying and selling car <br /> parts has never been <br /> easier!
          </h1>
          <Button className="flex items-center text-sm gap-1 px-5 py-3">
            Browse our car parts
          </Button>
        </div>
      </div>
      <Products isListingGrid />
      <div className="container px-4 py-10 bg-[#F9FAFB] block md:hidden">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] rounded-xl bg-[#24272C1A]"></div>
            <div>
              <h5 className="font-medium text-base font-outfit">
                Top 1 Americas
              </h5>
              <p className="text-text text-xs font-outfit">
                Largest Auto Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] rounded-xl bg-[#24272C1A]"></div>
            <div>
              <h5 className="font-medium text-base font-outfit">Parts Sold</h5>
              <p className="text-text text-xs font-outfit">Every 5 minute</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] rounded-xl bg-[#24272C1A]"></div>
            <div>
              <h5 className="font-medium text-base font-outfit">Offers</h5>
              <p className="text-text text-xs font-outfit">
                Stay updated payless
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] rounded-xl bg-[#24272C1A]"></div>
            <div>
              <h5 className="font-medium text-base font-outfit">Compare</h5>
              <p className="text-text text-xs font-outfit">
                Decode the right part
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <Footer listingGridMobile={true}/>
      </div>
    </>
  );
}

export default ListingGrid;