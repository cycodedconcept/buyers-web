import { FaSquareInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const socials = [<FaFacebookF/>, <FaLinkedinIn/>, <FaXTwitter/>, <FaSquareInstagram/>];

const BlogTitle = ({ heading = "Blog List" }) => {
  return (
    <>
      <div className="flex items-center justify-between my-10">
        <h2 className="text-heading font-fraunces font-semibold text-[40px]">
          {heading}
        </h2>
        <div className="flex items-center gap-4">
          <p className="font-outfit text-sm text-heading">Share this page:</p>
          <div className="flex items-center gap-3">
            {socials.map(icon => (
              <button key={icon} className="w-10 h-10 flex items-center justify-center rounded-full border border-line text-base text-heading">
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
