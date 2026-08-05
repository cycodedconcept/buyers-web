import { LuFolder } from "react-icons/lu";
import { Link } from "react-router-dom";

const BlogListCard = ({ post }) => {
  const { img, title, category, duration, textContent } = post;

  return (
    <article className="pb-8 mb-8 border-b border-line">
      <Link to="/blog-details" className="block">
        <img
          src={img}
          alt={title}
          className="w-full h-56 sm:h-72 md:h-80 lg:h-118.25 object-cover rounded-2xl mb-5"
        />
      </Link>

      <h2 className="text-2xl font-semibold text-heading leading-snug mb-3">
        <Link to="/blog-details" className="hover:text-main transition-colors">
          {title}
        </Link>
      </h2>

      <div className="flex items-center gap-2.5 text-sm mb-3">
        <span className="flex items-center gap-1.5 text-main font-medium">
          <LuFolder size={15} />
          {category}
        </span>
        <span className="text-icon">|</span>
        <span className="text-text">{duration} mins</span>
      </div>

      <p className="text-[15px] text-text leading-relaxed">{textContent}</p>
    </article>
  );
};

export default BlogListCard;