import {
  IoLocationOutline,
  IoHeartOutline,
  IoStarOutline,
} from "react-icons/io5";
import { nairaFormatter } from "../../utils/utilityFunc";
import { Link } from "react-router-dom";

const ProductCard = ({
  product,
  wrapperClass = "cursor-pointer border border-line rounded-2xl relative",
}) => {
  const imageUrl = product.primaryImageUrl?.startsWith("http")
    ? product.primaryImageUrl
    : `${import.meta.env.VITE_API_URL}/${product.primaryImageUrl}`;

  return (
    <Link to={`/product-details/${product.id}`}>
      <div className={`${wrapperClass} flex flex-col h-full`}>
        <div className="bg-[#eaeaea] w-full h-56.25 rounded-tr-2xl rounded-tl-2xl p-10 relative">
          <div className="absolute top-3 left-3 pr-6 w-full flex justify-between">
            <div>
              <span className="py-1.5 px-3 rounded-3xl bg-main font-outfit text-white font-semibold text-xs">
                {product.condition}
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-main flex items-center justify-center">
              <IoHeartOutline className="text-white text-base" />
            </div>
          </div>
          <img
            src={imageUrl}
            alt={`${product.title} Image`}
            className="w-full h-full object-cover rounded-tr-2xl rounded-tl-2xl"
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <button className="w-2 h-2 rounded-full bg-main"></button>
            <button className="w-2 h-2 rounded-full bg-white"></button>
            <button className="w-2 h-2 rounded-full bg-white"></button>
            <button className="w-2 h-2 rounded-full bg-white"></button>
          </div>
        </div>
        <div className="p-4 font-outfit flex flex-col flex-1">
          <p className="text-main mb-3 text-sm">{product.category.name}</p>
          <h4 className="text-lg text-heading font-medium mb-1">
            {product.title}
          </h4>
          <div className="flex flex-row md:flex-col lg:flex-row items-center md:items-start lg:items-center justify-between mb-3">
            <div className="flex items-center text-sm gap-1">
              <IoLocationOutline size={16} />
              <p className="text-text">{product.location}</p>
            </div>
            <div className="flex items-center gap-1 text-text">
              <IoStarOutline size={16} />
              <p>
                <span>{product.seller.rating}</span> · Verified seller
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-[20px] text-main">
              {nairaFormatter(product.priceKobo)}
            </h4>
            <p className="text-sm text-icon">
              <strike>{nairaFormatter(product.priceKobo + 1000000)}</strike>
            </p>
          </div>
          <div className="mt-auto">
            <hr className="my-6 text-line" />
            <button className="inline-block w-full rounded-[14px] py-3 font-medium font-outfit text-sm text-heading cursor-pointer border border-heading transition-colors hover:bg-main hover:text-white hover:border-0">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
