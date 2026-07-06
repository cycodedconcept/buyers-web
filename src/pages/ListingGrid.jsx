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
      <TopInfo/>
      <Navbar/>
      <div className="hidden lg:block">
        <Hero background={heroBgImg}>
          <div className="max-sm:px-4">
            <h1 className="font-outfit font-semibold text-[42px] lg:text-[70px] text-white mb-4 leading-none">
              Buying and selling car parts <br className="hidden lg:block"/> has never been easier!
            </h1>
            <p className="font-outfit text-base lg:text-lg text-line mb-6 leading-[1.3]">
              Leading online car parts buying and selling platform. helps users <br className="hidden lg:block"/>
              buy car parts that are right for them.
            </p>
            <Button className="flex items-center text-sm gap-1 px-5 py-3">
              Search for Sport Parts
              <LuArrowRight size={16} />
            </Button>
          </div>
        </Hero>
      </div>
      <div>
        
      </div>
      <Products isListingGrid/>
      <Footer/>
    </>
  )
}

export default ListingGrid;