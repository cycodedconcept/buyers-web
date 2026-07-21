import { LuSearch, LuCalendarDays, LuSend } from "react-icons/lu";
import blogs from "../../data/blog";

const CATEGORIES = [
  { name: "Market Updates", count: 50 },
  { name: "Buying Tips", count: 34 },
  { name: "Car Maintenance & Repairs", count: 69 },
  { name: "Workshop & Mechanic Tips", count: 25 },
  { name: "Fleet Management", count: 12 },
  { name: "Seller Resources", count: 12 },
  { name: "Delivery & Logistics", count: 69 },
];

const POPULAR_TAGS = [
  "Genuine",
  "Workshop",
  "Maintenance",
  "Verified",
  "Fleet",
  "NaijaAuto",
  "Delivery",
];

// Featured listings pull the first 3 posts straight from blog.js
const featuredListings = blogs.slice(0, 3);

const BlogSidebar = () => {
  return (
    <aside className="w-full">
      {/* Search */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-heading mb-4">Search Blog</h3>
        <div className="relative">
          <LuSearch
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-icon"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-line bg-white py-3.5 pl-11 pr-4 text-sm text-heading placeholder:text-icon outline-none focus:border-main transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-heading mb-2">Categories</h3>
        <ul>
          {CATEGORIES.map((cat) => (
            <li
              key={cat.name}
              className="flex items-center justify-between gap-4 py-3.5 border-b border-line last:border-b-0"
            >
              <button
                type="button"
                className="text-[15px] font-medium text-heading hover:text-main transition-colors text-left"
              >
                {cat.name}
              </button>
              <span className="text-sm text-text shrink-0">({cat.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured listings */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-heading mb-2">
          Featured listings
        </h3>
        <ul>
          {featuredListings.map((post, i) => (
            <li
              key={i}
              className="flex items-start gap-3 py-4 border-b border-line last:border-b-0"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-17.5 h-15 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-heading leading-snug line-clamp-2">
                  {post.title}
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-text">
                  <LuCalendarDays size={13} className="text-icon" />
                  <span>{post.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-heading mb-3">
          Join our newsletter
        </h3>
        <p className="text-sm text-text leading-relaxed mb-4">
          Signup to be the first to hear about exclusive deals, special offers
          and upcoming collections
        </p>
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full rounded-full border border-line bg-white py-3.5 pl-5 pr-10 text-sm text-heading placeholder:text-icon outline-none focus:border-main transition-colors"
          />
          <button
            type="submit"
            aria-label="Subscribe to newsletter"
            className="absolute right-5 top-1/2 -translate-y-1/2 text-main"
          >
            <LuSend size={15} />
          </button>
        </form>
      </div>

      {/* Popular tags */}
      <div>
        <h3 className="text-xl font-semibold text-heading mb-4">
          Popular tags
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-full border border-line bg-white px-2.5 py-1.5 text-sm text-heading hover:border-main hover:text-main transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
