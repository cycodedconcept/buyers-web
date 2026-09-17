import { LuSearch, LuCalendarDays, LuSend } from "react-icons/lu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogImg1 } from "../../assets/Assets";
import { formatBuyerDate } from "../../utils/buyerDisplay";

const POPULAR_TAGS = [
  "Genuine",
  "Workshop",
  "Maintenance",
  "Verified",
  "Fleet",
  "NaijaAuto",
  "Delivery",
];

const BlogSidebar = ({ posts = [], page = 1 }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const categories = Array.from(new Map(posts.filter((post) => post.category?.slug).map((post) => [post.category.slug, post.category])).values());
  const featuredListings = posts.slice(0, 3);

  return (
    <aside className="w-full">
      {/* Search */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-heading mb-4">Search Blog</h3>
        <form className="relative" onSubmit={(event) => { event.preventDefault(); navigate(`/blog?page=${page}&q=${encodeURIComponent(search.trim())}`); }}>
          <LuSearch
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-icon"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search this page..."
            className="w-full rounded-xl border border-line bg-white py-3.5 pl-11 pr-4 text-sm text-heading placeholder:text-icon outline-none focus:border-main transition-colors"
          />
        </form>
      </div>

      {/* Categories */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-heading mb-2">Categories</h3>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.slug}
              className="flex items-center justify-between gap-4 py-3.5 border-b border-line last:border-b-0"
            >
              <Link
                to={`/blog?page=${page}&category=${encodeURIComponent(cat.slug)}`}
                className="text-[15px] font-medium text-heading hover:text-main transition-colors text-left"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-text">Categories and search filter posts on this page.</p>
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
                src={post.featuredImageUrl || blogImg1}
                onError={(event) => { event.currentTarget.src = blogImg1; }}
                alt={post.featuredImageAlt || post.title}
                className="w-17.5 h-15 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <Link to={`/blog-details/${post.slug}?page=${page}`} className="text-[15px] font-semibold text-heading leading-snug line-clamp-2 hover:text-main">{post.title}</Link>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-text">
                  <LuCalendarDays size={13} className="text-icon" />
                  <span>{formatBuyerDate(post.publishedAt)}</span>
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
            <Link
              key={tag}
              to={`/blog?page=${page}&q=${encodeURIComponent(tag)}`}
              className="rounded-full border border-line bg-white px-2.5 py-1.5 text-sm text-heading hover:border-main hover:text-main transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
