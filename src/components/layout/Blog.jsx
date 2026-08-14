import blogs from "../../data/blog";
import Button from "../ui/Button";

const mobileBlogOverrides = [
  {
    author: "Jerome Bell",
    date: "January 28, 2024",
    duration: "furniture",
    title: "How to spot counterfeit brake pads",
    textContent:
      "The sub-4 metre SUV segment has been quite active over the last six months or so, with the launch of various facelifted...",
  },
  {
    author: "Jerome Bell",
    date: "January 28, 2024",
    duration: "furniture",
    title: "5 engine warning signs to watch",
    textContent:
      "The sub-4 metre SUV segment has been quite active over the last six months or so, with the launch of various facelifted...",
  },
];

const Blog = () => {
  return (
    <>
      <div className="container py-10 lg:py-20 px-4 lg:px-0">
        <div className="mb-7 flex items-center justify-between">
          <div className="">
            <h2 className="font-fraunces text-heading text-[30px]">
              <span className="lg:hidden">
                Auto Parts News <br /> & Guides
              </span>
              <span className="hidden lg:inline">
                Auto Parts News, Guides & Tips
              </span>
            </h2>
            <p className="hidden lg:flex text-base font-outfit text-text">
              Helpful resources to help you maintain your vehicle and make
              smarter buying decisions.
            </p>
          </div>
          <div className="hidden md:flex">
            <Button buttonType="view-all" className="hidden md:flex">
              View all
            </Button>
          </div>
          <button className="flex md:hidden text-main font-outfit">
            View all
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 md:hidden">
          {blogs.slice(0, 2).map((blog, index) => {
            const mobileBlog = mobileBlogOverrides[index] || {};
            const title = mobileBlog.title || blog.title;
            const textContent = mobileBlog.textContent || blog.textContent;
            const date = mobileBlog.date || blog.date;
            const duration = mobileBlog.duration || blog.duration;
            const author = mobileBlog.author || "AutoParts Editorial";

            return (
              <div
                key={index}
                className="font-outfit cursor-pointer space-y-2.5"
              >
                <div className="relative h-67.5 w-full rounded-2xl bg-[#eaeaea]">
                  <img
                    src={blog.img}
                    alt="blog image"
                    className="absolute left-0 top-0 h-full w-full rounded-2xl object-cover"
                  />
                  <span className="absolute bottom-3 left-3 z-20 rounded-3xl bg-main px-4 py-2 text-xs font-semibold text-white">
                    {date}
                  </span>
                </div>
                <div>
                  <span className="border-r-2 border-r-out-line pr-2 text-sm font-bold text-heading">
                    {author}
                  </span>
                  <span className="pl-2 text-sm text-main">{duration} min</span>
                </div>
                <h4 className="text-[22px] font-medium leading-[1.1] text-heading line-clamp-2">
                  {title}
                </h4>
                <p className="text-sm leading-[1.4] text-text line-clamp-2">
                  {textContent}
                </p>
              </div>
            );
          })}
        </div>
        <div className="hidden md:flex md:items-center md:gap-5 lg:gap-8">
          {blogs.slice(0,3).map((blog, index) => (
            <div key={index} className="font-outfit cursor-pointer space-y-2.5">
              <div className="relative h-67.5 w-full rounded-2xl bg-[#eaeaea]">
                <img
                  src={blog.img}
                  alt="blog image"
                  className="absolute left-0 top-0 h-full w-full rounded-2xl object-cover"
                />
                <span className="absolute bottom-3 left-3 z-20 rounded-3xl bg-main px-4 py-2 text-xs font-semibold text-white">
                  {blog.date}
                </span>
              </div>
              <div>
                <span className="border-r-2 border-r-out-line pr-2 text-sm font-bold text-heading">
                  AutoParts Editorial
                </span>
                <span className="pl-2 text-sm text-main">{blog.duration}</span>
              </div>
              <h4 className="text-[22px] font-medium leading-[1.1] text-heading line-clamp-2">
                {blog.title}
              </h4>
              <p className="text-sm leading-[1.4] text-text line-clamp-2">
                {blog.textContent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
