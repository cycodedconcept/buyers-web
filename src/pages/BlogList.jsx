import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import BlogTitle from "../components/blog/BlogTitle";
import BlogListCard from "../components/blog/BlogListCard";
import BlogSidebar from "../components/blog/BlogSidebar";
import Pagination from "../components/ui/Pagination";
import Footer from "../components/layout/Footer";
import blogs from "../data/blog";

const BlogList = () => {
  const posts = blogs.slice(0,5);
  return (
    <>
      <TopInfo />
      <Navbar isListingPage />
      <div className="container px-4">
        <BlogTitle />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,840px)_1fr] items-start gap-10 lg:gap-16">
          <div className="w-full">
            {posts.map((post, id) => (
              <BlogListCard key={id} post={post} />
            ))}
            <div className="flex justify-center mb-10">
              <Pagination />
            </div>
          </div>

          <div className="w-full">
            <BlogSidebar />
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="block lg:hidden mt-8">
        <Footer listingGridMobile={true} />
      </div>
    </>
  );
}

export default BlogList;