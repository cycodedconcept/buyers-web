import { LuFolder } from "react-icons/lu";
import { Link } from "react-router-dom";
import { blogImg1 } from "../../assets/Assets";

const BlogListCard = ({ post, page = 1 }) => {
  const { title, slug, category, readTimeMinutes, excerpt, featuredImageUrl, featuredImageAlt } = post;
  const destination = `/blog-details/${slug}?page=${page}`;

  return (
    <article className="pb-8 mb-8 border-b border-line">
      <Link to={destination} className="block">
        <img
          src={featuredImageUrl || blogImg1}
          onError={(event) => { event.currentTarget.src = blogImg1; }}
          alt={featuredImageAlt || title}
          className="w-full h-56 sm:h-72 md:h-80 lg:h-118.25 object-cover rounded-2xl mb-5"
        />
      </Link>

      <h2 className="text-2xl font-semibold text-heading leading-snug mb-3">
        <Link to={destination} className="hover:text-main transition-colors">
          {title}
        </Link>
      </h2>

      <div className="flex items-center gap-2.5 text-sm mb-3">
        <span className="flex items-center gap-1.5 text-main font-medium">
          <LuFolder size={15} />
          {category?.name || "AutoParts"}
        </span>
        <span className="text-icon">|</span>
        <span className="text-text">{readTimeMinutes || 1} min read</span>
      </div>

      <p className="text-[15px] text-text leading-relaxed">{excerpt}</p>
    </article>
  );
};

export default BlogListCard;
