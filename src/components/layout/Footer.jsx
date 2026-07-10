import {
	trophyImg,
	soldOutImg,
	offersImg,
	scaleImg,
	logoWhiteImg,
} from "../../assets/Assets";
import Button from "../ui/Button";
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedin,
	FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FOOTERARRAY = [
  [
    { img: trophyImg, label: "Top 1 Americas", text: "Largest Auto Portal" },
    { img: soldOutImg, label: "Parts Sold", text: "Every 5 minutes" },
    { img: offersImg, label: "Offers", text: "Stay updated pay less" },
    { img: scaleImg, label: "Compare", text: "Decode the right part" },
  ],
  [
    {
      label: "About AutoParts",
      links: [
        "About Us",
        "Careers With Us",
        "Terms & Conditions",
        "Privacy Policy",
        "Corporate Policies",
        "Investors",
        "FAQs",
      ],
    },
    {
      label: "Browse Parts",
      links: [
        "Engine Parts",
        "Brakes & Pads",
        "Electrical",
        "Filter & Fluids",
        "Suspension",
        "AC & Cooling",
        "Body Parts",
      ],
    },
    {
      label: "Other",
      links: [
        "Terms and Conditions",
        "Privacy Policy",
        "Copyrights",
        "Help Center",
        "How it Works",
        "Contact Us",
        "Track My Order",
      ],
    },
  ],
  [
    { img: trophyImg, label: "Top 1 Americas", text: "Largest Auto Portal" },
    { img: soldOutImg, label: "Parts Sold", text: "Every 5 minutes" },
    { img: offersImg, label: "Offers", text: "Stay updated pay less" },
    { img: scaleImg, label: "Compare", text: "Decode the right part" },
  ],
];

const Footer = ({listingGridMobile, aboutFooter = false}) => {

	if(aboutFooter) {
		return (
      <>
        <div className="bg-heading font-outfit">
          <div className="container px-4 py-8">
            <div className="grid grid-cols-2 gap-5">
              {FOOTERARRAY[2].map((element, index) => (
                <div key={index} className="flex items-center gap-5">
                  <img src={element.img} alt="" />
                  <div>
                    <h5 className="font-medium text-lg mb-1 text-white">
                      {element.label}
                    </h5>
                    <p className="text-sm text-text">{element.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="py-12">
              <div className="flex flex-col gap-10">
                <div>
                  <h4 className="text-lg font-medium mb-4 text-white">About Us</h4>
                  <ul className="text-sm text-text space-y-2">
                    <li>Our Story</li>
                    <li>Careers</li>
                    <li>Investors</li>
                    <li>FAQ</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-4 text-white">Browse</h4>
                  <ul className="text-sm text-text space-y-2">
                    <li>Engine Parts</li>
                    <li>Electrical</li>
                    <li>AC & Cooling</li>
                    <li>Body Parts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-4 text-white">Help</h4>
                  <ul className="text-sm text-text space-y-2">
                    <li>Terms</li>
                    <li>Privacy</li>
                    <li>Shipping</li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="text-white font-medium text-[20px] mb-7">
                Newsletter
              </h4>
              <p className="text-base text-text mb-3">
                Stay on top of the latest car parts trends and tips.
              </p>
              <input
                placeholder="Your email address"
                className="bg-[#FFFFFF12] py-3 px-3 w-full rounded-2xl mb-3 text-text"
              />
              <Button className="w-full font-outfit text-base font-medium text-white flex justify-center">
                Send
              </Button>
            </div>

            <hr className="my-7 text-text" />

            <div className="text-center mt-7">
              <div className="flex items-center justify-center gap-3">
                <FaFacebookF className="text-text" size={20} />
                <FaLinkedin className="text-text" size={20} />
                <FaXTwitter className="text-text" size={20} />
              </div>
              <p className="text-xs text-text mb-4">
                © 2026 AutoDecar. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </>
    );
	}

	if(listingGridMobile) {
		return (
      <>
        <div className="bg-heading text-white font-outfit">
          <div className="container px-4 py-8">
            <div className="mb-5">
              <h4 className="text-white font-medium text-[20px] mb-7">
                Newsletter
              </h4>
              <p className="text-base text-text mb-3">
                Stay on top of the latest car parts trends and tips.
              </p>
              <input
                placeholder="Your email address"
                className="bg-[#FFFFFF12] py-3 px-3 w-full rounded-2xl mb-3 text-text"
              />
              <Button className="w-full font-outfit text-base font-medium text-white flex justify-center">
                Send
              </Button>
            </div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="text-sm text-text space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Terms</li>
              <li>Privacy</li>
              <li>FAQs</li>
            </ul>
            <div className="text-center mt-7">
              <p className="text-xs text-text mb-4">
                © 2026 AutoDecar. All rights reserved
              </p>
              <div className="flex items-center justify-center gap-3">
                <FaFacebookF className="text-text" size={20}/>
                <FaLinkedin className="text-text" size={20}/>
                <FaXTwitter className="text-text" size={20}/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
	}

	return (
		<>
			<div className="bg-heading text-white font-outfit lg:hidden">
				<div className="container px-4 py-8 space-y-8">
					<p className="text-sm leading-[1.6] text-text">
						Stay on top of the latest trends and buying tips.
					</p>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF14] text-white">
							<FaFacebookF />
						</div>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF14] text-white">
							<FaLinkedin />
						</div>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF14] text-white">
							<FaXTwitter />
						</div>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF14] text-white">
							<FaYoutube />
						</div>
					</div>
					<div className="grid grid-cols-1 gap-6">
						<div>
							<h4 className="text-lg font-medium mb-4">About AutoParts</h4>
							<ul className="space-y-2 text-sm text-text">
								<li>About us</li>
								<li>Careers</li>
								<li>Terms</li>
								<li>Privacy</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-medium mb-4">Browse Parts</h4>
							<ul className="space-y-2 text-sm text-text">
								<li>Engine</li>
								<li>Brakes</li>
								<li>Electrical</li>
								<li>Fluids</li>
							</ul>
						</div>
					</div>
					<hr className="my-7 text-text" />
					<div className="text-center text-sm text-text">
						© 2026 AutoParts. All rights reserved
					</div>
				</div>
			</div>
			<div className="hidden lg:block bg-heading py-[40px] font-outfit">
				<div className="container">
					<div className="flex items-center justify-between">
						{FOOTERARRAY[0].map((element, index) => (
							<div key={index} className="flex items-center gap-5">
								<img src={element.img} alt="" />
								<div>
									<h5 className="font-medium text-lg mb-1 text-white">
										{element.label}
									</h5>
									<p className="text-sm text-text">{element.text}</p>
								</div>
							</div>
						))}
					</div>
					<hr className="my-10 text-text" />
					<div className="grid grid-cols-4">
						{FOOTERARRAY[1].map((element, index) => (
							<div key={index}>
								<h4 className="text-white font-medium text-[20px] mb-5">
									{element.label}
								</h4>
								{element.links.map((link, index) => (
									<ul key={index} className="">
										<li className="text-base text-text mb-1">{link}</li>
									</ul>
								))}
							</div>
						))}
						<div>
							<h4 className="text-white font-medium text-[20px] mb-5">
								Newsletter
							</h4>
							<p className="text-base text-text mb-3">
								Stay on top of the latest part trends, tips, and tricks for
								buying the best parts.
							</p>
							<input
								placeholder="Your email address"
								className="bg-[#FFFFFF12] py-3 px-3 w-full rounded-2xl mb-3 text-text"
							/>
							<Button className="w-full font-outfit text-base font-medium text-white flex justify-center">
								Send
							</Button>
						</div>
					</div>
					<hr className="my-10 text-text" />
					<div className="flex items-center justify-between">
						<img src={logoWhiteImg} alt="brand logo" />
						<div className="flex items-center gap-18">
							<p className="text-sm text-white">
								© 2026 AutoParts. All rights reserved
							</p>
							<div className="flex items-center gap-4 text-white">
								<div className="bg-[#FFFFFF14] w-[40px] h-[40px] rounded-full flex items-center justify-center">
									<FaFacebookF />
								</div>
								<div className="bg-[#FFFFFF14] w-[40px] h-[40px] rounded-full flex items-center justify-center">
									<FaLinkedin />
								</div>
								<div className="bg-[#FFFFFF14] w-[40px] h-[40px] rounded-full flex items-center justify-center">
									<FaXTwitter />
								</div>
								<div className="bg-[#FFFFFF14] w-[40px] h-[40px] rounded-full flex items-center justify-center">
									<FaInstagram />
								</div>
								<div className="bg-[#FFFFFF14] w-[40px] h-[40px] rounded-full flex items-center justify-center">
									<FaYoutube />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
