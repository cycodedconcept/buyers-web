import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import BlogTitle from "../components/blog/BlogTitle";
import BlogGridCard from "../components/blog/BlogGridCard";
import PageControls from "../components/ui/PageControls";
import Footer from "../components/layout/Footer";
import {
  fetchBlogPosts,
  selectBlogPosts,
  selectBlogPagination,
  selectBlogPostsLoading,
  selectBlogPostsError,
} from "../features/blog/blogSlice";

const BlogGrid = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const posts = useSelector(selectBlogPosts);
  const pagination = useSelector(selectBlogPagination);
  const loading = useSelector(selectBlogPostsLoading);
  const error = useSelector(selectBlogPostsError);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  useEffect(() => {
    dispatch(fetchBlogPosts({ page, perPage: 9 }));
  }, [dispatch, page]);

  return (
    <>
      <TopInfo />
      <Navbar isListingPage isHomepage={false} />
      <div className="container px-4">
        <BlogTitle heading="Blog Grid" />
        <div className="mb-6 flex gap-4 font-outfit text-sm">
          <Link to={`/blog?page=${page}`} className="text-heading hover:text-main">List view</Link>
          <span className="font-semibold text-main">Grid view</span>
        </div>
        {loading ? <p role="status" className="text-text">Loading blog posts...</p> : error ? (
          <div role="alert" className="rounded-2xl border border-line p-6 text-text"><p>{error}</p><button type="button" onClick={() => dispatch(fetchBlogPosts({ page, perPage: 9 }))} className="mt-3 font-semibold text-main">Try again</button></div>
        ) : posts.length ? (
          <div className="grid grid-cols-1 gap-x-9 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <BlogGridCard key={post.id} post={post} page={page} />)}
          </div>
        ) : <p className="rounded-2xl border border-line p-6 text-text">No posts available.</p>}
        <div className="py-12"><PageControls pagination={pagination} onPageChange={(nextPage) => setSearchParams({ page: String(nextPage) })} disabled={loading} /></div>
      </div>
      <div className="hidden lg:block"><Footer /></div>
      <div className="lg:hidden"><Footer listingGridMobile /></div>
    </>
  );
};

export default BlogGrid;
