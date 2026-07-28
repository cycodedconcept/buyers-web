import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import BlogSidebar from "../components/blog/BlogSidebar";
import ReplyForm from "../components/layout/ReplyForm";
import Footer from "../components/layout/Footer";
import { LuUser, LuFolder, LuMessageCircle, LuCalendarDays } from "react-icons/lu";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaSquareInstagram } from "react-icons/fa6";
import blogs from "../data/blog";
import blogReviews from "../data/blogReview";

const TAGS = ["Genuine", "NaijaAuto", "Maintenance"];
const SHARE_ICONS = [FaFacebookF, FaLinkedinIn, FaXTwitter, FaSquareInstagram];
const heroImg = blogs[3].img;
const galleryImages = [blogs[3].img, blogs[2].img];

const BlogDetails = () => {
  return (
    <>
      <TopInfo />
      <Navbar isListingPage isHomepage={false} />
      <div className="container px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,840px)_1fr] items-start gap-10 lg:gap-16">
          <div className="w-full">
            {/* Article */}
            <article className="">
              {/* Header */}
              <h1 className="font-fraunces font-semibold text-heading text-[32px] md:text-[40px] leading-[1.15] mb-4">
                The Most Common Fake Parts Circulating in Lagos Auto Markets
                Right Now
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-outfit mb-6">
                <span className="flex items-center gap-1.5 text-main font-medium">
                  <LuUser size={15} />
                  Fatima Bello
                </span>
                <span className="flex items-center gap-1.5 text-main font-medium">
                  <LuFolder size={15} />
                  News &amp; Industry Updates
                </span>
                <span className="flex items-center gap-1.5 text-text">
                  <LuMessageCircle size={15} className="text-icon" />0 comment
                </span>
                <span className="flex items-center gap-1.5 text-text">
                  <LuCalendarDays size={15} className="text-icon" />
                  February 24, 2026
                </span>
              </div>

              <hr className="text-line my-7" />

              <p className="font-outfit text-base font-medium text-heading mb-6">
                Counterfeit auto parts are not a new problem in Nigeria — but
                the scale is getting worse.
              </p>

              <img
                src={heroImg}
                alt="Mechanic repairing a car engine with a wrench"
                className="w-full aspect-video object-cover rounded-2xl mb-8"
              />

              {/* Body */}
              <h2 className="font-outfit font-medium text-heading text-2xl mt-2 mb-4">
                The problem is bigger than most drivers realise
              </h2>

              <p className="font-outfit text-sm text-text mb-5 leading-[1.4]">
                Walk through Ladipo Market in Lagos or any major auto parts
                market in Aba, Nnewi, or Kano, and you will find parts from
                dozens of different sources sitting side by side on the same
                shelf — genuine OEM stock next to low-grade counterfeits
                packaged to look identical. For the average Nigerian car owner,
                telling them apart is nearly impossible without knowing exactly
                what to look for.
              </p>

              <p className="font-outfit text-sm text-text leading-[1.4] mb-5">
                A 2024 industry report estimated that up to 40% of auto spare
                parts in circulation across sub-Saharan African markets are
                counterfeit or substandard. In Nigeria, brake pads, oil filters,
                and alternators are the three most commonly faked categories —
                and they are also three of the most safety-critical parts on any
                vehicle.
              </p>

              <div className="border-l-4 border-main bg-main/6 rounded-xl px-6 py-5 my-6">
                <p className="font-outfit text-base text-main leading-[1.4]">
                  Alternators are more expensive to counterfeit than pads or
                  filters, but the margin on a convincing fake is significant
                  enough that they circulate widely — particularly in the
                  refurbished segment. A genuine refurbished alternator has been
                  fully disassembled, tested, rewound if necessary, and
                  reassembled to OEM specification. A fake "refurbished"
                  alternator may simply be a failed unit cleaned up and
                  repackaged.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 my-6">
                {galleryImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-full aspect-4/3 object-cover rounded-2xl"
                  />
                ))}
              </div>

              <p className="font-outfit text-sm text-text leading-relaxed mb-5">
                Every seller on AutoParts is required to submit their CAC
                registration documents and pass an admin verification review
                before their first listing goes live. Sellers are required to
                include photos, part numbers, and compatibility information on
                every listing. Buyers can filter exclusively by verified sellers
                and rate their experience after every confirmed delivery.
              </p>

              <p className="font-outfit text-sm text-text leading-relaxed mb-5">
                If a part arrives and does not match the listing — wrong part,
                damaged, or suspected counterfeit — buyers can raise a dispute
                within 48 hours of delivery. Our admin team reviews evidence
                from both parties and issues a ruling within 24 hours. If a
                return is approved, our logistics partners handle the reverse
                pickup.
              </p>

              <p className="font-outfit text-sm text-text leading-relaxed mb-5">
                Counterfeit parts cost more than the price difference. A ₦3,500
                fake brake pad that fails at 80km/h on the Lagos–Ibadan
                expressway costs infinitely more than the ₦14,500 genuine set.
                Buying from a verified seller, checking part numbers, and
                knowing what genuine packaging looks like are the three habits
                that will protect your car — and your safety.
              </p>

              <p className="font-outfit text-sm text-text leading-relaxed mb-5">
                Oil filters are cheap to counterfeit because the casing looks
                simple. But inside a genuine oil filter is a precisely
                engineered filtration medium that removes particles as small as
                20 microns from your engine oil. Fake filters use low-density
                filter paper that allows contaminants to pass through — slowly
                destroying your engine from the inside over thousands of
                kilometres.
              </p>

              {/* Tags + Share */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 mt-2 border-t border-line">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-outfit text-sm font-medium text-heading mr-1">
                    Tags:
                  </span>
                  {TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="font-outfit rounded-full border border-line bg-white px-4 py-1.5 text-sm text-heading hover:border-main hover:text-main transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-outfit text-sm font-medium text-heading">
                    Share this post:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {SHARE_ICONS.map((Icon, i) => (
                      <button
                        key={i}
                        type="button"
                        className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-heading hover:bg-main hover:text-white hover:border-main transition-colors"
                      >
                        <Icon size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comments */}
              <h3 className="font-fraunces font-semibold text-heading text-2xl pb-4 mt-10 border-b border-line">
                Comment ({blogReviews.length})
              </h3>

              <div>
                {blogReviews.map((review, i) => (
                  <div
                    key={i}
                    className="flex flex-col py-6 border-b border-line last:border-b-0"
                  >
                    <div className="flex items-center gap-4.5 mb-4">
                      <div>
                        <img
                          src={review.reviewerImg}
                          alt={review.name}
                          className="w-15 h-15 rounded-full object-cover shrink-0"
                        />
                      </div>
                      <div>
                        <h4 className="font-outfit font-medium text-lg text-heading leading-none mb-1">
                          {review.name}
                        </h4>
                        <p className="font-dm-sans text-xs text-text leading-none">
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <p className="font-outfit text-sm text-text leading-[1.4] mb-3">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-3 text-sm font-outfit text-text">
                      <span>Is this review helpful?</span>
                      <button
                        type="button"
                        className="rounded-2xl border border-line px-3 py-1 text-xs text-heading hover:border-main hover:text-main transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl border border-line px-3 py-1 text-xs text-heading hover:border-main hover:text-main transition-colors"
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <ReplyForm />
              </div>
            </article>
          </div>
          <div className="w-full">
            <BlogSidebar />
          </div>
        </div>
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

export default BlogDetails;
