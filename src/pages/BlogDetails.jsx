import { useEffect, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import BlogSidebar from "../components/blog/BlogSidebar";
import BlogArticleBody from "../components/blog/BlogArticleBody";
import Footer from "../components/layout/Footer";
import { blogImg1 } from "../assets/Assets";
import { formatBuyerDate } from "../utils/buyerDisplay";
import {
  fetchBlogPosts,
  fetchBlogPostDetails,
  selectBlogPosts,
  selectBlogPagination,
  selectBlogPostDetails,
  selectBlogPostDetailsLoading,
  selectBlogPostDetailsError,
} from "../features/blog/blogSlice";

const BlogDetails = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const requestedSlugRef = useRef(null);
  const posts = useSelector(selectBlogPosts);
  const pagination = useSelector(selectBlogPagination);
  const postDetails = useSelector(selectBlogPostDetails);
  const loading = useSelector(selectBlogPostDetailsLoading);
  const error = useSelector(selectBlogPostDetailsError);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const post = postDetails?.slug === slug ? postDetails : null;

  useEffect(() => {
    if (slug && requestedSlugRef.current !== slug) {
      requestedSlugRef.current = slug;
      dispatch(fetchBlogPostDetails(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (pagination.page !== page || !posts.length) {
      dispatch(fetchBlogPosts({ page, perPage: 9 }));
    }
  }, [dispatch, page, pagination.page, posts.length]);

  return (
    <>
      <TopInfo />
      <Navbar isListingPage isHomepage={false} />
      <div className="container px-4 py-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,840px)_1fr] lg:gap-16">
          <div className="w-full font-outfit">
            <Link to="/blog" className="mb-6 inline-block text-sm font-semibold text-main">← Back to Blog</Link>
            {!slug ? <p className="rounded-2xl border border-line p-6 text-text">Choose a post from the blog list.</p> : (loading || !post) && !error ? (
              <p role="status" className="text-text">Loading post...</p>
            ) : error && !post ? <div role="alert" className="rounded-2xl border border-line p-6 text-text"><p>{error}</p><button type="button" onClick={() => dispatch(fetchBlogPostDetails(slug))} className="mt-3 font-semibold text-main">Try again</button></div> : post ? (
              <article>
                <h1 className="mb-4 font-fraunces text-[32px] font-semibold leading-tight text-heading md:text-[40px]">{post.title}</h1>
                <div className="mb-6 flex flex-wrap gap-4 text-sm text-text">
                  <span>{post.author?.displayName || "AutoParts"}</span>
                  <span>{post.category?.name || "AutoParts"}</span>
                  <span>{formatBuyerDate(post.publishedAt)}</span>
                  <span>{post.readTimeMinutes || 1} min read</span>
                </div>
                <img
                  src={post.featuredImageUrl || blogImg1}
                  onError={(event) => { event.currentTarget.src = blogImg1; }}
                  alt={post.featuredImageAlt || post.title}
                  className="mb-8 aspect-video w-full rounded-2xl object-cover"
                />
                {post.body ? <BlogArticleBody html={post.body} /> : <p className="text-lg leading-8 text-text">{post.excerpt}</p>}
                {!!post.tags?.length && <div className="mt-8 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag.id} className="rounded-full border border-line px-3 py-1 text-sm text-text">{tag.name}</span>)}</div>}
              </article>
            ) : <p className="rounded-2xl border border-line p-6 text-text">This post is unavailable. Return to the blog list to browse published posts.</p>}
          </div>
          <div className="w-full"><BlogSidebar posts={posts} page={page} /></div>
        </div>
      </div>
      <div className="hidden lg:block"><Footer /></div>
      <div className="lg:hidden"><Footer listingGridMobile /></div>
    </>
  );
};

export default BlogDetails;
