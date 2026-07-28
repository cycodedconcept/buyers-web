import { Link } from "react-router-dom";

const BlogGridCard = ({ post, author }) => {
  const { img, title, category, textContent, date } = post;

  return (
    <article>
      <Link to="/blog-details" className="block relative">
        <img
          src={img}
          alt={title}
          className="w-full aspect-3/2 object-cover rounded-2xl"
        />
        <span className="absolute top-4 left-4 rounded-full bg-main px-3.5 py-1.5 text-xs font-semibold text-white">
          {date}
        </span>
      </Link>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="font-semibold text-heading">{author}</span>
          <span className="text-icon">|</span>
          <span className="text-main font-medium">{category}</span>
        </div>

        <h3 className="text-xl font-semibold text-heading leading-snug line-clamp-2 mb-2">
          <Link to="/blog-details" className="hover:text-main transition-colors">{title}</Link>
        </h3>

        <p className="text-sm text-text leading-relaxed line-clamp-2">
          {textContent}
        </p>
      </div>
    </article>
  );
};

export default BlogGridCard;
