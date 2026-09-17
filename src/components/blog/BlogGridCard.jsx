import { Link } from "react-router-dom";
import { blogImg1 } from "../../assets/Assets";
import { formatBuyerDate } from "../../utils/buyerDisplay";

const BlogGridCard = ({ post, page = 1 }) => {
  const { title, slug, category, excerpt, publishedAt, author, featuredImageUrl, featuredImageAlt } = post;
  const destination = `/blog-details/${slug}?page=${page}`;

  return (
    <article>
      <Link to={destination} className="block relative">
        <img
          src={featuredImageUrl || blogImg1}
          onError={(event) => { event.currentTarget.src = blogImg1; }}
          alt={featuredImageAlt || title}
          className="w-full aspect-3/2 object-cover rounded-2xl"
        />
        <span className="absolute top-4 left-4 rounded-full bg-main px-3.5 py-1.5 text-xs font-semibold text-white">
          {formatBuyerDate(publishedAt)}
        </span>
      </Link>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="font-semibold text-heading">{author?.displayName || "AutoParts"}</span>
          <span className="text-icon">|</span>
          <span className="text-main font-medium">{category?.name || "AutoParts"}</span>
        </div>

        <h3 className="text-xl font-semibold text-heading leading-snug line-clamp-2 mb-2">
          <Link to={destination} className="hover:text-main transition-colors">{title}</Link>
        </h3>

        <p className="text-sm text-text leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </div>
    </article>
  );
};

export default BlogGridCard;
