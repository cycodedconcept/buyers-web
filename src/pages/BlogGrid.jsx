import TopInfo from "../components/layout/TopInfo";
import Navbar from "../components/layout/Navbar";
import BlogTitle from "../components/blog/BlogTitle";
import Pagination from "../components/ui/Pagination";
import Footer from "../components/layout/Footer";
import blogs from "../data/blog";
import BlogGridCard from "../components/blog/BlogGridCard";

const GRID_SIZE = 9;

const AUTHORS = ["Emeka Okonkwo", "Tunde Adeyemi", "Chisom Eze"];

const getGridPosts = (count) =>
  Array.from({ length: count }, (_, i) => blogs[i % blogs.length]);

const BlogGrid = () => {
  const posts = getGridPosts(GRID_SIZE);

  return (
    <>
      <TopInfo />
      <Navbar isListingPage isHomepage={false} />
      <div className="container px-4">
        <BlogTitle heading="Blog Grid" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-12">
          {posts.map((post, i) => (
            <BlogGridCard
              key={i}
              post={post}
              author={AUTHORS[i % AUTHORS.length]}
            />
          ))}
        </div>

        <div className="flex justify-center py-12">
          <Pagination/>
        </div>
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <Footer listingGridMobile={true} />
      </div>
    </>
  );
};

export default BlogGrid;
