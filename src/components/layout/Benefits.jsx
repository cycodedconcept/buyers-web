import {
	verifiedIcon,
	verifiedIconMobile,
	trustedIcon,
	trustedIconMobile,
	handShakeIcon,
	handShakeIconMobile,
	benefitsImg,
	benefitsMobileImg,
	toolsIcon,
	mechanicManImg,
} from "../../assets/Assets";

const benefits = [
	{
		img: verifiedIcon,
		mobileImg: verifiedIconMobile,
		title: "Verified Sellers",
		description:
			"Every seller on our platform is verified to help ensure a safer and more reliable buying experience. Shop with confidence from trusted dealers across Nigeria.",
		mobileDescription:
			"Shop with confidence from trusted dealers across Nigeria.",
	},
	{
		img: trustedIcon,
		mobileImg: trustedIconMobile,
		title: "Genuine Parts",
		description:
			"Access quality genuine and aftermarket parts for a wide range of vehicle makes and models, all from trusted suppliers in one place.",
		mobileDescription:
			"Access quality genuine and aftermarket parts for all makes.",
	},
	{
		img: handShakeIcon,
		mobileImg: handShakeIconMobile,
		title: "Fast Delivery",
		description:
			"Get your parts delivered quickly through our trusted logistics network, helping you get back on the road without unnecessary delays.",
		mobileDescription:
			"Get your parts delivered quickly through our trusted network.",
	},
	{
		img: toolsIcon,
		mobileImg: toolsIcon,
		title: "Custom Solutions",
		description:
			"Expert assistance for hard-to-find components and unique fits.",
		mobileDescription:
			"Expert assistance for hard-to-find components and unique fits.",
	},
];

const Benefits = ({ aboutMobile = false }) => {
	return (
    <>
      <div className="py-10 lg:py-15">
        <div className="container px-4 lg:px-0">
          {aboutMobile ? (
            <>
              <div className="md:hidden">
                <h2 className="font-fraunces text-[30px] text-center text-heading mb-2">
                  Why Choose Autoparts?
                </h2>
                <p className="font-outfit text-sm text-text text-center leading-[1.4] mb-4">
                  Our experienced team excels in car sales with many years of
                  successfully navigating the market.
                </p>
              </div>
              <div className="flex flex-col space-y-4 md:hidden">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 py-4 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                      {index === 3 ? (
                        <div className="w-5 h-5 rounded-full bg-main flex items-center justify-center">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#fff7f0] flex items-center justify-center">
                          <img
                            src={benefit.mobileImg || benefit.img}
                            alt={benefit.title}
                            className="w-6 h-6"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-outfit font-medium text-base text-heading mb-1">
                        {benefit.title}
                      </h3>
                      <p className="font-outfit text-[13px] text-text leading-[1.4]">
                        {benefit.mobileDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:hidden">
                <img
                  src={mechanicManImg}
                  alt="Mechanic"
                  className="w-full h-60 object-cover rounded-lg"
                  
                />
              </div>

              <div className="hidden md:block">
                <div className="flex flex-col px-4 md:flex-row items-center justify-between">
                  <div className="max-w-137.5 w-full lg:-mt-20">
                    <div className="mb-5 lg:mb-10">
                      <h2 className="font-fraunces text-[30px] text-heading mb-2">
                        Why Choose Autoparts?
                      </h2>
                      <p className="font-outfit text-sm text-text leading-[1.4]">
                        <span className="hidden lg:inline">
                          Our experienced team excels in car sales with many
                          years
                        </span>
                        successfully navigating the market
                        <span className="hidden lg:inline">
                          , delivering
                        </span>{" "}
                        <span className="inline lg:hidden">for</span> informed{" "}
                        <br className="block lg:hidden" />
                        decisions{" "}
                        <span className="hidden lg:inline">
                          and optimal results.
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col space-y-5">
                      {benefits.slice(0, 3).map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 lg:gap-8 py-6 px-6 hover:shadow-3xl transition-all duration-300 rounded-2xl"
                        >
                          <img
                            src={benefit.img}
                            alt={benefit.title}
                            className="w-12 h-12"
                          />
                          <div>
                            <h3 className="font-outfit font-medium text-lg text-heading mb-0.5 lg:mb-2">
                              {benefit.title}
                            </h3>
                            <p className="font-outfit lg:text-sm text-[13px] text-text leading-[1.4]">
                              <span className="lg:hidden">
                                {benefit.mobileDescription}
                              </span>
                              <span className="hidden lg:inline">
                                {benefit.description}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="max-w-157.5 w-full mt-6 lg:mt-0">
                    <img
                      src={benefitsImg}
                      alt="Benefits"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col px-4 md:flex-row items-center justify-between">
              <div className="max-w-137.5 w-full lg:-mt-20">
                <div className="mb-5 lg:mb-10">
                  <h2 className="font-fraunces text-[30px] text-heading mb-2">
                    Why Choose Autoparts?
                  </h2>
                  <p className="font-outfit text-sm text-text leading-[1.4]">
                    <span className="hidden lg:inline">
                      Our experienced team excels in car sales with many years
                      of
                    </span>
                    successfully navigating the market
                    <span className="hidden lg:inline">, delivering</span>{" "}
                    <span className="inline lg:hidden">for</span> informed{" "}
                    <br className="block lg:hidden" />
                    decisions{" "}
                    <span className="hidden lg:inline">
                      and optimal results.
                    </span>
                  </p>
                </div>
                <div className="flex flex-col space-y-5">
                  {benefits.slice(0, 3).map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 lg:gap-8 py-6 px-6 hover:shadow-3xl transition-all duration-300 rounded-2xl"
                    >
                      <img
                        src={benefit.img}
                        alt={benefit.title}
                        className="w-12 h-12 hidden md:flex"
                      />
                      <img
                        src={benefit.mobileImg}
                        alt={benefit.title}
                        className="w-12 h-12 flex md:hidden"
                      />
                      <div>
                        <h3 className="font-outfit font-medium text-lg text-heading mb-0.5 lg:mb-2">
                          {benefit.title}
                        </h3>
                        <p className="font-outfit lg:text-sm text-[13px] text-text leading-[1.4]">
                          <span className="inline lg:hidden">
                            {benefit.mobileDescription}
                          </span>
                          <span className="hidden lg:inline">
                            {benefit.description}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-w-157.5 w-full mt-6 lg:mt-0">
                <img
                  src={benefitsImg}
                  alt="Benefits"
                  className="w-full h-full object-cover object-center hidden md:flex"
                />
                <img
                  src={benefitsMobileImg}
                  alt="Benefits"
                  className="w-full h-full object-cover object-center flex md:hidden"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Benefits;
