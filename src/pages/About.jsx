import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import {
	heroBgImg,
	agentImg1,
	agentImg2,
	agentImg3,
	agentImg4,
} from "../assets/Assets";
import Button from "../components/ui/Button";
import Benefits from "../components/layout/Benefits";
import Partners from "../components/ui/Partners";
import Testimony from "../components/layout/Testimony";
import Products from "../components/layout/Products";
import { LuArrowRight } from "react-icons/lu";
// import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import {FaEnvelope, FaPhoneAlt} from "react-icons/fa";

const About = () => {
	return (
    <>
      <TopInfo />
      <Navbar isHomepage={false} />
      <Hero background={heroBgImg}>
        <div className="max-sm:px-3">
          <h1 className="font-outfit font-semibold text-[40px] lg:text-[70px] text-white mb-4 leading-none">
            Buying and selling car parts <br className="hidden lg:block" /> has
            never been easier!
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
      <div>
        <Benefits aboutMobile />
      </div>
      <div className="py-7 lg:py-15">
        <div className="container px-4 lg:px-0">
          <div className="">
            <div className="mb-8 text-center">
              <h2 className="font-fraunces text-[30px] text-heading mb-3">
                Meet Our Agents
              </h2>
              <p className="font-outfit text-sm text-text leading-[1.6] max-w-xl mx-auto">
                Our experienced staff is ready to support you with expert advice
                and reliable service.
              </p>
            </div>
            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
              {[
                {
                  img: agentImg3,
                  name: "Oluwaseun Femi",
                  title: "Administrative Staff",
                },
                {
                  img: agentImg2,
                  name: "Emeka Nwosu",
                  title: "Administrative Staff",
                },
                {
                  img: agentImg1,
                  name: "Tunde Adebayo",
                  title: "Administrative Staff",
                },
                {
                  img: agentImg4,
                  name: "Adeaze Uche",
                  title: "Administrative Staff",
                },
              ].map((agent, index) => (
                <div key={index} className="">
                  <div className="overflow-hidden rounded-[22px]">
                    <img
                      src={agent.img}
                      alt={agent.name}
                      className="w-full h-75 object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="pt-4">
                      <h3 className="font-outfit text-lg font-semibold text-heading leading-none">
                        {agent.name}
                      </h3>
                      <p className="font-outfit text-[13px] text-text mb-4">
                        {agent.title}
                      </p>
                    </div>
                    <div className="hidden items-center gap-3 md:flex">
                      <div className="w-8 h-8 flex items-center justify-center border border-line text-icon text-sm rounded-full">
                        <FaPhoneAlt />
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center border border-line text-icon text-sm rounded-full">
                        <FaEnvelope />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-outfit text-text text-center">
              Become an agent and get the commission you deserve.{" "}
              <span className="text-main">Contact us</span>
            </p>
          </div>
        </div>
      </div>

      <Partners />
      <Testimony />
      <div className="hidden lg:block">
        <Products
          limit={4}
          headingText="Recommended Parts For You"
          slider={true}
        />
      </div>
      <div className="lg:hidden block">
        <Products limit={4} headingText="Recommended Parts" slider={false} />
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <Footer aboutFooter={true}/>
      </div>
    </>
  );
};

export default About;
