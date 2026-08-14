import { FaSquareInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const socials = [<FaFacebookF/>, <FaLinkedinIn/>, <FaXTwitter/>, <FaSquareInstagram/>];

const BlogTitle = ({ heading = "Blog List" }) => {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-5 md:my-10">
        <h2 className="text-heading font-fraunces font-semibold text-[28px] sm:text-[32px] md:text-[40px]">
          {heading}
        </h2>
        <div className="flex items-center gap-3 md:gap-4">
          <p className="font-outfit text-sm text-heading">Share this page:</p>
          <div className="flex items-center gap-2.5 md:gap-3">
            {socials.map((icon, i) => (
              <button
                key={i}
                type="button"
                aria-label="Share"
                className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-line text-sm md:text-base text-heading hover:border-main hover:text-main transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTitle;
