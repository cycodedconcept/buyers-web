import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogImg1 } from "../../assets/Assets";
import { formatBuyerDate } from "../../utils/buyerDisplay";
import { fetchBlogPosts, selectBlogPosts, selectBlogPostsLoading } from "../../features/blog/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectBlogPosts);
  const loading = useSelector(selectBlogPostsLoading);

  useEffect(() => {
    if (!posts.length) dispatch(fetchBlogPosts({ page: 1, perPage: 9 }));
  }, [dispatch, posts.length]);

  return (
    <div className="container px-4 py-10 lg:py-20">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h2 className="font-fraunces text-[30px] text-heading">Auto Parts News, Guides &amp; Tips</h2>
          <p className="hidden font-outfit text-base text-text lg:block">Helpful resources to help you maintain your vehicle and make smarter buying decisions.</p>
        </div>
        <Link to="/blog" className="font-outfit font-semibold text-main">View all</Link>
      </div>
      {loading && !posts.length ? <p role="status" className="font-outfit text-text">Loading articles...</p> : posts.length ? (
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog-details/${post.slug}?page=1`} className="space-y-2.5 font-outfit">
              <div className="relative h-67.5 w-full rounded-2xl bg-[#eaeaea]">
                <img src={post.featuredImageUrl || blogImg1} onError={(event) => { event.currentTarget.src = blogImg1; }} alt={post.featuredImageAlt || post.title} className="absolute inset-0 h-full w-full rounded-2xl object-cover" />
                <span className="absolute bottom-3 left-3 rounded-3xl bg-main px-4 py-2 text-xs font-semibold text-white">{formatBuyerDate(post.publishedAt)}</span>
              </div>
              <p className="text-sm font-bold text-heading">{post.author?.displayName || "AutoParts"} <span className="font-normal text-main">· {post.readTimeMinutes || 1} min</span></p>
              <h3 className="line-clamp-2 text-[22px] font-medium leading-tight text-heading">{post.title}</h3>
              <p className="line-clamp-2 text-sm text-text">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      ) : <p className="font-outfit text-text">No articles available right now.</p>}
    </div>
  );
};

export default Blog;
