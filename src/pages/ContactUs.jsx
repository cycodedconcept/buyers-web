import { contactMapImg } from "../assets/Assets";
import BlogTitle from "../components/blog/BlogTitle";
import Navbar from "../components/layout/Navbar";
import TopInfo from "../components/layout/TopInfo";
import ReplyForm from "../components/layout/ReplyForm";
import Footer from "../components/layout/Footer";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaPinterestP } from "react-icons/fa";
import { LuMapPin, LuPhone, LuMail } from "react-icons/lu";
import { PiSteeringWheelBold } from "react-icons/pi";

const ICONS = [<FaFacebookF/>, <FaInstagram/>, <FaYoutube/>, <FaTwitter/>, <FaPinterestP/>];

const ContactUs = () => {
  return (
    <>
      <TopInfo />
      <Navbar isHomepage={false} />

      <div className="w-full h-205 relative group overflow-hidden">
        <img
          src={contactMapImg}
          alt="Office location map"
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Location pin dot */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-main border-4 border-white shadow-md z-10 pointer-events-none" />

        {/* Tooltip card */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(100%+18px)]
          w-90 bg-white rounded-2xl shadow-xl flex flex-col items-center gap-6
          opacity-0 invisible scale-95 origin-bottom
          group-hover:opacity-100 group-hover:visible group-hover:scale-100
          transition-all duration-300 z-20 pointer-events-none"
        >
          <div className="w-full h-50 flex items-center justify-center bg-[#F8FAFB] rounded-tl-2xl rounded-tr-2xl">
            <div className="flex h-30 w-30 items-center justify-center rounded-full bg-[#FF710114] text-main">
              <PiSteeringWheelBold className="h-14 w-14" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 px-8 pb-8">
            <h5 className="font-outfit font-semibold text-heading text-lg">
              Office Address
            </h5>
            <div className="flex flex-col gap-2">
              <p className="flex items-start gap-2 font-outfit text-text text-sm">
                <LuMapPin className="text-icon shrink-0 mt-0.5" />
                6, Taiwo Aina Street, Maryland, Lagos
              </p>
              <p className="flex items-center gap-2 font-outfit text-text text-sm">
                <LuPhone className="text-icon shrink-0" />
                (+234) 812-3409-675
              </p>
              <p className="flex items-center gap-2 font-outfit text-text text-sm">
                <LuMail className="text-icon shrink-0" />
                support@autoparts.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4">
        <BlogTitle heading="Contact Us" />

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,840px)_1fr] md:gap-10">
          <ReplyForm
            contactPage={true}
            heading="Drop Us a Line"
            headingText="Feel free to connect with us through our online channels for updates, news, and more"
            buttonText="Send Message"
          />

          <div className="w-full border border-line shadow-md p-8 flex flex-col gap-y-7 rounded-2xl">
            <h2 className="font-medium text-heading font-fraunces text-[30px]">
              Contact Us
            </h2>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-2">
                <h5 className="font-medium text-heading font-outfit text-lg">
                  Address:
                </h5>
                <p className="text-text text-sm font-outfit leading-[1.4]">
                  6, Taiwo Aina Street, Maryland, <br /> Lagos State
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-medium text-heading font-outfit text-lg">
                  Information:
                </h5>
                <p className="text-text text-sm font-outfit leading-[1.4]">
                  (+234) 812-3409-675 <br /> support@autoparts.com
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-medium text-heading font-outfit text-lg">
                  Opentime:
                </h5>
                <p className="text-text text-sm font-outfit leading-[1.4]">
                  Monay - Friday: 08:00 - 20:00 <br /> Saturday - Sunday: 10:00
                  - 18:00
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-medium text-heading font-outfit text-lg">
                  Follow Us:
                </h5>
                <div className="flex gap-3 items-center">
                  {ICONS.map((icon, id) => (
                    <button
                      key={id}
                      className="border border-line text-icon text-xs"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block mt-10">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <Footer listingGridMobile={true} />
      </div>
    </>
  );
};

export default ContactUs;
