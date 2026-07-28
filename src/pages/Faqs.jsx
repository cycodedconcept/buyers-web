import { useState } from "react";
import BlogTitle from "../components/blog/BlogTitle";
import Navbar from "../components/layout/Navbar";
import TopInfo from "../components/layout/TopInfo";
import Footer from "../components/layout/Footer";
import faqData from "../data/faq";
import { LuPlus, LuMinus } from "react-icons/lu";

const Faqs = () => {
  const [openPanel, setOpenPanel] = useState(null);

  const handleToggle = (sectionId, itemId) => {
    const panelKey = `${sectionId}-${itemId}`;
    setOpenPanel((prevOpenPanel) =>
      prevOpenPanel === panelKey ? null : panelKey,
    );
  };

  return (
    <>
      <TopInfo />
      <Navbar isHomepage={false} />
      <div className="container px-4">
        <BlogTitle heading="Frequently Asked Questions" />

        {faqData.map((data, sectionId) => (
          <div key={sectionId} className="my-7 space-y-4.5">
            <h3 className="text-heading font-fraunces text-[30px]">
              {data.title}
            </h3>
            <div className="flex flex-col gap-3">
              {data.items.map((item, itemId) => {
                const panelKey = `${sectionId}-${itemId}`;
                const isOpen = openPanel === panelKey;

                return (
                  <div key={panelKey}>
                    <button
                      onClick={() => handleToggle(sectionId, itemId)}
                      className="border border-line rounded-2xl flex w-full justify-between items-center py-6 px-8 hover:bg-out-line transition-colors"
                    >
                      <h5 className="font-medium text-heading text-lg font-outfit">
                        {item.question}
                      </h5>
                      <LuPlus size={20} className="text-heading" />
                    </button>
                    {isOpen && (
                      <div className="bg-[#FF71010F] py-6 px-8 rounded-2xl mt-1.5">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-main text-lg font-outfit">
                            {item.question}
                          </h5>
                          <button
                            onClick={() => handleToggle(sectionId, itemId)}
                          >
                            <LuMinus size={20} className="text-main" />
                          </button>
                        </div>
                        <p className="font-outfit text-heading text-sm leading-[1.4]">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
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

export default Faqs;
