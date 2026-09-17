import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import BlogTitle from "../components/blog/BlogTitle";
import BlogListCard from "../components/blog/BlogListCard";
import BlogSidebar from "../components/blog/BlogSidebar";
import PageControls from "../components/ui/PageControls";
import Footer from "../components/layout/Footer";
import {
  fetchBlogPosts,
  selectBlogPosts,
  selectBlogPagination,
  selectBlogPostsLoading,
  selectBlogPostsError,
} from "../features/blog/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const posts = useSelector(selectBlogPosts);
  const pagination = useSelector(selectBlogPagination);
  const loading = useSelector(selectBlogPostsLoading);
  const error = useSelector(selectBlogPostsError);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = (searchParams.get("q") || "").trim().toLowerCase();
  const category = searchParams.get("category") || "";
  const visiblePosts = posts.filter((post) =>
    (!search || `${post.title} ${post.excerpt}`.toLowerCase().includes(search)) &&
    (!category || post.category?.slug === category),
  );

  useEffect(() => {
    dispatch(fetchBlogPosts({ page, perPage: 9 }));
  }, [dispatch, page]);

  return (
    <>
      <TopInfo />
      <Navbar isListingPage />
      <div className="container px-4">
        <BlogTitle />
        <div className="mb-6 flex gap-4 font-outfit text-sm">
          <span className="font-semibold text-main">List view</span>
          <Link to={`/blog-grid?page=${page}`} className="text-heading hover:text-main">Grid view</Link>
        </div>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,840px)_1fr] lg:gap-16">
          <div className="w-full">
            {loading ? <p role="status" className="text-text">Loading blog posts...</p> : error ? (
              <div role="alert" className="rounded-2xl border border-line p-6 text-text"><p>{error}</p><button type="button" onClick={() => dispatch(fetchBlogPosts({ page, perPage: 9 }))} className="mt-3 font-semibold text-main">Try again</button></div>
            ) : visiblePosts.length ? visiblePosts.map((post) => <BlogListCard key={post.id} post={post} page={page} />) : (
              <p className="rounded-2xl border border-line p-6 text-text">No posts found on this page.</p>
            )}
            <PageControls pagination={pagination} onPageChange={(nextPage) => setSearchParams({ page: String(nextPage) })} disabled={loading} />
          </div>
          <div className="w-full"><BlogSidebar posts={posts} page={page} /></div>
        </div>
      </div>
      <div className="hidden lg:block"><Footer /></div>
      <div className="mt-8 lg:hidden"><Footer listingGridMobile /></div>
    </>
  );
};

export default BlogList;
