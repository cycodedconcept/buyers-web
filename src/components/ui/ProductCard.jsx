import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  IoLocationOutline,
  IoHeartOutline,
  IoStarOutline,
} from "react-icons/io5";
import { nairaFormatter } from "../../utils/utilityFunc";
import Swal from "sweetalert2";
import {
  addCartItem,
  selectCartItems,
  selectCartLoading,
} from "../../features/cart/cartSlice";

const getErrorMessage = (error) =>
  typeof error === "string"
    ? error
    : error?.error?.message || error?.message || "Something went wrong";

const ProductCard = ({
  product,
  wrapperClass = "cursor-pointer border border-line rounded-2xl relative",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const cartItems = useSelector(selectCartItems);
  const cartLoading = useSelector(selectCartLoading);
  const imageUrl = product.primaryImageUrl?.startsWith("http")
    ? product.primaryImageUrl
    : `${import.meta.env.VITE_API_URL}/${product.primaryImageUrl}`;
  const isOutOfStock = Number(product.stockQty) === 0;
  const isAlreadyInCart = cartItems.some(
    (item) => String(item.product?.id) === String(product.id),
  );
  const isButtonDisabled = isAlreadyInCart || cartLoading || isOutOfStock;
  const buttonLabel = isAlreadyInCart
    ? "Already in Cart"
    : isOutOfStock
      ? "Out of Stock"
      : cartLoading
        ? "Updating..."
        : "Add to Cart";
  const buttonClasses = isAlreadyInCart
    ? "bg-success text-white border-success hover:bg-success hover:text-white hover:border-success disabled:opacity-100"
    : "text-heading border border-heading hover:bg-main hover:text-white hover:border-0 disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-heading disabled:hover:border-heading";

  const handleAddToCart = async () => {
    if (isAlreadyInCart) {
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "info",
        title: "Login required",
        text: "Please log in to add items to your cart.",
        confirmButtonColor: "#0273F9",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId: product.id,
          quantity: 1,
        }),
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Added to cart",
        text: `${product.title} has been added to your cart.`,
        confirmButtonColor: "#0273F9",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to add to cart",
        text: getErrorMessage(error),
        confirmButtonColor: "#0273F9",
      });
    }
  };

  return (
      <div className={`${wrapperClass} flex flex-col h-full`}>
        <Link to={`/product-details/${product.id}`} className="flex flex-1 flex-col">
        <div className="bg-[#eaeaea] w-full h-56.25 rounded-tr-2xl rounded-tl-2xl relative">
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
          <p className="text-main mb-3 text-sm">{product.category?.name}</p>
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
                <span>{product.seller?.rating}</span> · Verified seller
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
        </div>
        </Link>
        <div className="mt-auto p-4 pt-0">
          <hr className="my-6 text-line" />
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isButtonDisabled}
            className={`inline-block w-full rounded-[14px] py-3 font-medium font-outfit text-sm cursor-pointer transition-colors disabled:cursor-not-allowed ${buttonClasses}`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
  );
};

export default ProductCard;
