import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../features/products/productSlice";
import {
  addCartItem,
  selectCartItems,
  selectCartLoading,
} from "../features/cart/cartSlice";
import Navbar from "../components/layout/Navbar";
import TopInfo from "../components/layout/TopInfo";
import Products from "../components/layout/Products";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import {
  PiGitBranchLight,
  PiSpeedometerLight,
  PiMinusLight,
  PiPlusLight,
  PiArrowRight,
  PiArrowLeft,
  PiHouseLineLight,
  PiCalendarCheck,
  PiSeatLight,
  PiBuildingApartment,
  PiRoadHorizonLight,
  PiStoolLight,
  PiGasPumpLight,
  PiDoorLight,
  PiEngine,
  PiSteeringWheel,
  PiCheckCircleFill,
  PiBookOpenTextLight,
  PiHeart,
} from "react-icons/pi";
import {
  HiArrowsRightLeft,
  HiOutlineShare,
  HiOutlinePhone,
  HiOutlineBookmark,
  HiOutlineFlag,
} from "react-icons/hi2";
import {
  IoCarOutline,
  IoColorFillOutline,
  IoChevronDown,
  IoChevronForward,
  IoChevronBack,
  IoStarSharp,
  IoStarOutline,
  IoArrowDownCircle,
  IoShieldCheckmarkOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { FaListOl } from "react-icons/fa6";
import { nairaFormatter } from "../utils/utilityFunc";
import {
  mapLargeImg,
  radiatorImg,
  mechanicManImg,
} from "../assets/Assets";
import { reviews } from "../data/reviews";
import { parts } from "../data/parts";
import ReplyForm from "../components/layout/ReplyForm";
import ProductLoadingGrid from "../components/ui/ProductLoadingGrid";
import ProductErrorState from "../components/ui/ProductErrorState";
import ProductEmptyState from "../components/ui/ProductEmptyState";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuresShow, setFeaturesShow] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetailsLoading, productDetailsError, productDetails, products } =
    useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);
  const cartItems = useSelector(selectCartItems);
  const cartLoading = useSelector(selectCartLoading);
  const { id } = useParams();
  const productDetailsId = productDetails?.id;
  const reviewList = productDetails?.reviews ?? [];
  const compatibilityList = productDetails?.compatibility ?? [];
  const compatibilityLabel = compatibilityList.length
    ? compatibilityList
        .map((item) =>
          `${item.make ?? ""} ${item.model ?? ""} ${item.yearFrom ?? ""}-${item.yearTo ?? ""}`.trim(),
        )
        .join(", ")
    : "";
  const compatibilityYears = compatibilityList.length
    ? compatibilityList
        .map((item) => {
          if (item.yearFrom && item.yearTo) {
            return `${item.yearFrom}-${item.yearTo}`;
          }
          return item.yearFrom || item.yearTo || "";
        })
        .filter(Boolean)
        .join(", ")
    : "";

  useEffect(() => {
    if (!id) return;
    if (productDetailsId && String(productDetailsId) === String(id)) return;

    dispatch(fetchProductDetails(id));
  }, [dispatch, id, productDetailsId]);

  useEffect(() => {
    setCurrentSlide(0);
    setSelectedQuantity(1);
  }, [productDetailsId]);

  const toggleAccordion = (id) => {
    setFeaturesShow(featuresShow === id ? null : id);
  };

  const images = productDetails?.photos?.length
    ? [...productDetails.photos]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((photo) => photo.url)
    : productDetails?.primaryImageUrl
      ? [productDetails.primaryImageUrl]
      : [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const isOutOfStock = Number(productDetails?.stockQty) === 0;
  const isAlreadyInCart = cartItems.some(
    (item) => String(item.product?.id) === String(productDetails?.id),
  );
  const addToCartButtonLabel = isAlreadyInCart
    ? "Already in Cart"
    : isOutOfStock
      ? "Out of Stock"
      : cartLoading
        ? "Updating..."
        : "Add to Cart";
  const desktopAddToCartClasses = isAlreadyInCart
    ? "bg-success disabled:opacity-100"
    : "bg-success disabled:opacity-60";
  const mobileAddToCartClasses = isAlreadyInCart
    ? "bg-success disabled:opacity-100"
    : "bg-main disabled:opacity-60";

  const increaseSelectedQuantity = () => {
    setSelectedQuantity((currentQuantity) => {
      if (
        productDetails?.stockQty !== undefined &&
        productDetails?.stockQty !== null
      ) {
        if (productDetails.stockQty <= 0) {
          return currentQuantity;
        }

        return Math.min(currentQuantity + 1, productDetails.stockQty);
      }

      return currentQuantity + 1;
    });
  };

  const decreaseSelectedQuantity = () => {
    setSelectedQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const getCartErrorMessage = (error) =>
    typeof error === "string"
      ? error
      : error?.error?.message || error?.message || "Something went wrong";

  const handleAddToCart = async ({ redirectToCart = false } = {}) => {
    if (!productDetails?.id) return;

    if (isAlreadyInCart) {
      if (redirectToCart) {
        navigate("/cart");
      }
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
          productId: productDetails.id,
          quantity: selectedQuantity,
        }),
      ).unwrap();

      if (redirectToCart) {
        navigate("/cart");
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Added to cart",
        text: `${selectedQuantity} item${selectedQuantity > 1 ? "s" : ""} added to your cart.`,
        confirmButtonColor: "#0273F9",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to add to cart",
        text: getCartErrorMessage(error),
        confirmButtonColor: "#0273F9",
      });
    }
  };

  const partOverview = [
    {
      icon: <IoCarOutline size={20} />,
      label: "Condition",
      value: productDetails?.condition ?? "",
    },
    {
      icon: <PiHouseLineLight size={20} />,
      label: "Part Number",
      value: productDetails?.partNumber ?? "",
    },
    { icon: <FaListOl size={20} />, label: "Brand", value: "" },
    {
      icon: <PiCalendarCheck size={20} />,
      label: "Category",
      value: productDetails?.category?.name ?? "",
    },
    {
      icon: <PiSeatLight size={20} />,
      label: "Placement",
      value: compatibilityLabel,
    },
    {
      icon: <PiBuildingApartment size={20} />,
      label: "Material",
      value: "",
    },
    {
      icon: <PiRoadHorizonLight size={20} />,
      label: "Set Includes",
      value: "",
    },
    {
      icon: <PiStoolLight size={20} />,
      label: "Warranty",
      value: "",
    },
    {
      icon: <PiGasPumpLight size={20} />,
      label: "Stock",
      value:
        productDetails?.stockQty !== undefined &&
        productDetails?.stockQty !== null
          ? `${productDetails.stockQty} units available`
          : "",
    },
    {
      icon: <PiDoorLight size={20} />,
      label: "Listed",
      value: "",
    },
    {
      icon: <IoColorFillOutline size={20} />,
      label: "Color",
      value: "",
    },
    {
      icon: <PiGitBranchLight size={20} />,
      label: "Ships from",
      value: productDetails?.location ?? "",
    },
    {
      icon: <PiEngine size={20} />,
      label: "Delivery Estimate",
      value: "",
    },
    {
      icon: <PiSteeringWheel size={20} />,
      label: "Year",
      value: compatibilityYears,
    },
  ];

  const partOverviewMobile = [
    { label: "Condition:", value: productDetails?.condition ?? "" },
    { label: "Location:", value: productDetails?.location ?? "" },
    { label: "Brand:", value: productDetails?.seller?.businessName ?? "" },
    { label: "Category:", value: productDetails?.category?.name ?? "" },
  ];

  const features = [
    {
      label: "Condition & Quality",
      featureValues: [
        productDetails?.condition ?? ""
      ],
    },
    {
      label: "Fitment",
      featureValues: compatibilityLabel ? [compatibilityLabel] : [],
    },
    {
      label: "Performance",
      featureValues: productDetails?.description ? [productDetails.description] : [],
    },
    {
      label: "Packaging & Extras",
      featureValues:
        productDetails?.stockQty !== undefined && productDetails?.stockQty !== null
          ? [`${productDetails.stockQty} units available`]
          : [],
    },
  ];

  return (
    <>
      <div className="hidden md:block">
        <TopInfo />
      </div>
      <Navbar isListingPage={true} isHomepage={false} />
      {productDetailsLoading ? (
        <ProductLoadingGrid />
      ) : productDetailsError ? (
        <ProductErrorState
          message={productDetailsError}
          onRetry={() => id && dispatch(fetchProductDetails(id))}
        />
      ) : !productDetails ? (
        <ProductEmptyState
          title="Product not found"
          message="We couldn't find the product details for this listing."
        />
      ) : (
        <div className="hidden md:block">
          <div className="container px-3 py-6 md:py-10">
            <Breadcrumbs
              className="mb-6"
              items={[
                { label: "Home", to: "/" },
                { label: "Used parts for sale", to: "/product-listing-grid" },
                { label: productDetails.title },
              ]}
            />
            <div className="flex items-start justify-between my-6">
              <div className="max-w-207.5 w-full">
                <h1 className="text-heading font-outfit md:font-fraunces font-semibold md:text-[40px]">
                  {productDetails.title}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-0.5 font-outfit text-text">
                    <PiSpeedometerLight /> {productDetails.condition}
                  </p>
                  <p className="flex items-center gap-0.5 font-outfit text-text">
                    <PiGitBranchLight /> {productDetails.location}
                  </p>
                </div>
                <div className="flex items-center justify-between my-6">
                  <div className="flex items-center gap-1">
                    <p className="font-outfit md:font-fraunces text-[30px] text-main">
                      {nairaFormatter(productDetails.priceKobo)}
                    </p>
                  </div>
                  <div>
                    <div className="py-2 px-4 rounded-lg bg-[#EDF2F4] text-heading font-semibold text-[20px] flex items-center">
                      <button
                        type="button"
                        onClick={decreaseSelectedQuantity}
                        className="cursor-pointer"
                      >
                        <PiMinusLight size={12.6} color="#121212" />
                      </button>
                      <span className="mx-7">{selectedQuantity}</span>
                      <button
                        type="button"
                        onClick={increaseSelectedQuantity}
                        className="cursor-pointer"
                      >
                        <PiPlusLight size={12.6} color="#121212" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleAddToCart({ redirectToCart: true })}
                    disabled={isOutOfStock || cartLoading}
                    className="w-1/2 rounded-2xl flex justify-center font-medium text-base text-white py-3 bg-main disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddToCart()}
                    disabled={isAlreadyInCart || isOutOfStock || cartLoading}
                    className={`w-1/2 rounded-2xl flex justify-center font-medium text-base text-white py-3 disabled:cursor-not-allowed ${desktopAddToCartClasses}`}
                  >
                    {addToCartButtonLabel}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-15 h-15 rounded-full border border-line flex items-center justify-center">
                  <HiOutlineShare className="text-heading text-[19px]" />
                </div>
                <div className="w-15 h-15 rounded-full border border-line flex items-center justify-center">
                  <HiOutlineBookmark className="text-heading text-[19px]" />
                </div>
                <div className="w-15 h-15 rounded-full border border-line flex items-center justify-center">
                  <HiArrowsRightLeft className="text-heading text-[19px]" />
                </div>
              </div>
            </div>

            <div className="my-10 w-full h-137.5">
              <div
                className="w-full h-full bg-[#eaeaea] rounded-lg overflow-hidden relative transition-transform ease-out duration-1000"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${productDetails.title} ${index + 1}`}
                    className="w-full h-full shrink-0 object-contain"
                  />
                ))}
                <div className="absolute left-0 w-full pointer-events-none top-1/2 -translate-y-1/2">
                  <div className="flex justify-between px-4 w-full">
                    <button className="w-12 h-12 rounded-2xl bg-[#0000004D] backdrop-blur-xs pointer-events-auto flex items-center justify-center">
                      <PiArrowLeft
                        className="text-white text-2xl"
                        onClick={prevSlide}
                      />
                    </button>
                    <button className="w-12 h-12 rounded-2xl bg-[#0000004D] backdrop-blur-xs pointer-events-auto flex items-center justify-center">
                      <PiArrowRight
                        className="text-white text-2xl"
                        onClick={nextSlide}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center mt-10">
                {images.map((_, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`hidden h-5 w-5 items-center justify-center rounded-full bg-transparent ${isActive ? "border border-main" : "border-0"} lg:flex`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <div
                        className={`h-3 w-3 rounded-full transition-colors ${
                          isActive ? "bg-main" : "bg-out-line"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-5 py-15">
              <button className="border border-line rounded-full py-2 5 font-outfit text-base text-heading font-medium bg-white hover:bg-main hover:text-white focus:bg-main focus:text-white">
                Overview
              </button>
              <button className="border border-line rounded-full py-2 5 font-outfit text-base text-heading font-medium bg-white hover:bg-main hover:text-white focus:bg-main focus:text-white">
                Specs & features
              </button>
              <button className="border border-line rounded-full py-2 5 font-outfit text-base text-heading font-medium bg-white hover:bg-main hover:text-white focus:bg-main focus:text-white">
                Recommended Parts
              </button>
              <button className="border border-line rounded-full py-2 5 font-outfit text-base text-heading font-medium bg-white hover:bg-main hover:text-white focus:bg-main focus:text-white">
                Part Reviews & Rating
              </button>
            </div>

            <div className="flex gap-10 items-start">
              <div className="max-w-207.5 w-full">
                <hr className="text-line mb-9" />
                <div>
                  <h2 className="text-heading text-[30px] mb-5 font-fraunces">
                    Description
                  </h2>
                  <div className="text-text text-sm font-outfit">
                    <p className="leading-[1.4] mb-3">
                      {productDetails.description}
                    </p>
                    {/* <button className="flex items-center gap-2 border border-line py-2 px-3 rounded-lg bg-[#fcfcfc] text-sm text-heading font-outfit font-medium mb-3">
                      <img src={pdfIconImg} alt="" className="w-7.5 h-7.5 " />
                      Download brochure
                    </button> */}
                  </div>
                  <hr className="text-line my-9" />
                  <div>
                    <h2 className="text-heading text-[30px] mb-6 font-fraunces">
                      Part Overview
                    </h2>
                    <div className="flex w-full">
                      <div className="w-1/2 space-y-4.5">
                        {partOverview.slice(0, 7).map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-1/2">
                              <p className="font-outfit text-text text-sm font-medium flex items-center gap-2">
                                {item.icon}
                                {item.label}:
                              </p>
                            </div>
                            <div className="w-1/2">
                              <p className="text-sm font-outfit font-medium text-heading">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-1/2 space-y-4.5">
                        {partOverview
                          .slice(7, partOverview.length)
                          .map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-1/2">
                                <p className="font-outfit text-text text-sm font-medium flex items-center gap-2">
                                  {item.icon}
                                  {item.label}:
                                </p>
                              </div>
                              <div className="w-1/2">
                                <p className="text-sm font-outfit font-medium text-heading">
                                  {item.value}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <hr className="text-line my-9" />
                  <div>
                    <h2 className="text-heading text-[30px] mb-5 font-fraunces">
                      Features
                    </h2>
                    <div>
                      {features.map((item, index) => {
                        const isOpen = featuresShow === index;

                        return (
                          <div
                            key={index}
                            className="border-b border-line last:border-b-0"
                          >
                            <button
                              onClick={() => toggleAccordion(index)}
                              aria-expanded={isOpen}
                              className="flex justify-between items-center w-full py-5 font-medium text-lg text-heading font-outfit focus:outline-none"
                            >
                              <span>{item.label}</span>
                              <IoChevronDown
                                className={`transform transiton-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            <div
                              className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                            >
                              <div className="overflow-hidden">
                                <div className="grid grid-cols-3 gap-4 pb-4">
                                  {item.featureValues.map((value, index) => (
                                    <p
                                      key={index}
                                      className="flex items-center gap-2 font-outfit text-text text-sm"
                                    >
                                      <PiCheckCircleFill className="w-5 h-5 text-success rounded-full" />
                                      {value}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <hr className="text-line my-9" />
                  <div>
                    <h2 className="text-heading text-[30px] font-outfit">
                      Location
                    </h2>
                    <p className="flex items-center gap-2 font-outfit font-medium text-sm text-text mb-5">
                      <PiBookOpenTextLight />
                      {productDetails?.location ?? ""}
                    </p>
                    <img
                      src={mapLargeImg}
                      alt="seller map location"
                      className="w-full h-130 rounded-2xl object-cover"
                    />
                  </div>
                  <hr className="text-line my-9" />
                  <div>
                    <h2 className="text-heading text-[25px] font-fraunces">
                      Car User Reviews & Rating
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-17 h-17 rounded-full bg-[#FF71011A] flex items-center justify-center">
                          <IoStarSharp size={32} className="text-main" />
                        </div>
                        <div>
                          <h2 className="font-outfit text-[70px] font-bold text-main">
                            {productDetails?.seller?.rating ?? 0}
                          </h2>
                        </div>
                        <div className="font-outfit text-heading text-sm">
                          <p className="">Overall Rating</p>
                          <p>
                            Base on{" "}
                            <span className="font-semibold">
                              {reviewList.length} Reviews
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3">
                        {[
                          "All",
                          "Fitment",
                          "Condition",
                          "Delivery",
                          "Value",
                          "Comfort",
                        ].map((item) => (
                          <button
                            className="border border-line rounded-lg py-2 px-4 font-outfit text-base font-medium text-heading hover:bg-heading hover:text-white focus:bg-heading focus:text-white transition-colors duration-200 ease-in"
                            key={item}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="font-outfit my-12">
                      <h4 className="text-heading font-semibold text-xl">
                        {reviewList.length} Ratings and Reviews
                      </h4>
                      <div>
                        {reviewList.map((review, index) => (
                          <div
                            key={index}
                            className="py-5 space-y-4 border-b border-b-line last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <img
                                  src={review.profileImg}
                                  alt="reviewer's profile image"
                                  className="w-15 h-15 rounded-full object-cover"
                                />
                                <div>
                                  <h5 className="font-outfit font-medium text-lg text-heading">
                                    {review.name}
                                  </h5>
                                  <div className="flex items-center gap-0 5">
                                    {[...Array(review.rating)].map((_, id) => (
                                      <IoStarSharp
                                        key={id}
                                        size={12}
                                        className="text-main"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="text-text text-xs font-dm-sans">
                                {review.date}
                              </div>
                            </div>
                            <div className="text-text text-sm">
                              <p className="leading-[1.4]">{review.comment}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-text">
                                Is this review helpful?
                              </p>
                              <div className="flex items-center gap-1">
                                <button className="border border-line py-1 5 px-2 5 text-xs font-outfit text-heading">
                                  Yes
                                </button>
                                <button className="border border-line py-1 5 px-2 5 text-xs font-outfit text-heading">
                                  No
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="text-main font-outfit text-base font-medium flex items-center gap-1.5 mt-4">
                        {reviewList.length > 3 ? (
                          <>
                            <span>View More Reviews</span>
                            <IoArrowDownCircle
                              size={16}
                              className="text-main"
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                    <ReplyForm />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="font-outfit">
                  <div className="border border-line rounded-2xl p-8.5 5 flex flex-col gap-8.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={mechanicManImg}
                        alt="seller image"
                        className="w-22.5 h-22.5 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-heading text-xl font-medium mb-2">
                          {productDetails?.seller?.businessName ?? "Verified Seller"}
                        </h4>
                        <p className="inline-flex items-center gap-1.5 text-xs text-success py-1.5 px-2.5 bg-[#7ED3211A] border border-[#7ED32124] rounded-full">
                          <IoShieldCheckmarkOutline />
                          Verified Seller
                        </p>
                      </div>
                    </div>
                    <hr className="text-line" />
                    <div>
                      <p className="flex items-center gap-2 font-outfit font-medium text-sm text-text mb-3">
                        <PiBookOpenTextLight />
                        {productDetails?.location ?? ""}
                      </p>
                      <img
                        src={mapLargeImg}
                        alt="seller map location"
                        className="w-full h-47.5 rounded-2xl object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-outfit text-heading font-medium text-base mb-1.5">
                        Contact dealer
                      </p>
                      <div className="flex items-center gap-4">
                        <button className="flex-1 font-medium font-outfit text-white flex items-center justify-center rounded-xl gap-2.5 bg-main py-2.5">
                          <HiOutlinePhone />
                          Call to seller
                        </button>
                        <button className="flex-1 font-medium font-outfit text-white flex items-center justify-center rounded-xl gap-2.5 bg-success py-2.5">
                          <IoLogoWhatsapp />
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-text text-sm flex items-center gap-2 mt-5 mb-8">
                    <HiOutlineFlag /> Report this listing
                  </p>
                </div>
                <div className="border border-line rounded-2xl p-8.5 5 flex flex-col gap-8.5 font-outfit">
                  <div>
                    <h3 className="font-medium text-heading text-2xl mb-3">
                      Recommended Parts
                    </h3>
                    <p className="text-sm text-text">
                      Other parts buyers viewed
                    </p>
                  </div>
                  <div className="flex flex-col gap-7 mt-5">
                    {products?.slice(0,3)?.map((product, index) => (
                      <div key={index} className="flex gap-3">
                        {/* <div className="w-32.5 h-24.5 bg-[#0000000D] rounded-2xl relative"> */}
                        <img
                          src={product.primaryImageUrl}
                          alt={`${product.title} image`}
                          className="w-32.5 h-24.5 rounded-2xl"
                        />
                        {/* </div> */}
                        <div>
                          <p className="text-heading text-base leading-[1.4] mb-2">
                            {product.title}
                          </p>
                          <p className="font-bold text-heading">
                            {nairaFormatter(product.priceKobo)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="text-main font-outfit text-base font-medium flex items-center gap-1.5 mt-1">
                    <span>View More</span>
                    <IoArrowDownCircle size={16} className="text-main" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Products
            limit={4}
            headingText="Recommended Parts For You"
            slider={true}
          />
        </div>
      )}

      <div className="block md:hidden font-outfit pt-4 pb-8">
        {/* Breadcrumb + actions */}
        <div className="flex items-center justify-between mb-4 px-4">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Used parts", to: "/product-listing-grid" },
            ]}
          />
          <div className="flex items-center gap-4">
            <PiHeart className="text-heading text-xl" />
            <CiExport className="text-heading text-xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-heading font-outfit font-semibold text-2xl leading-snug mb-2 px-4">
          Front Brake Pad Set — Bosch OEM Original
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3 px-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <IoStarOutline key={i} size={14} className="text-main" />
            ))}
          </div>
          <span className="text-icon text-xs">(372 Reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-5 flex-wrap px-4">
          <p className="font-outfit text-2xl font-bold text-main">
            {nairaFormatter(14500)}
          </p>
          <p className="font-outfit text-base text-icon line-through">
            {nairaFormatter(18000)}
          </p>
          <span className="text-success text-xs font-medium bg-[#7ED3211A] border border-[#7ED32124] rounded-full px-3 py-1">
            Brand New
          </span>
        </div>

        {/* Image carousel */}
        <div className="w-full h-70 overflow-hidden relative bg-[#eaeaea] mb-4">
          <div
            className="w-full h-full flex transition-transform ease-out duration-1000"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="w-full h-full object-contain shrink-0"
              />
            ))}
          </div>
          <div className="absolute left-0 w-full pointer-events-none top-1/2 -translate-y-1/2">
            <div className="flex justify-between px-3 w-full">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-[#0000004D] backdrop-blur-xs pointer-events-auto flex items-center justify-center"
              >
                <IoChevronBack className="text-white text-lg" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-[#0000004D] backdrop-blur-xs pointer-events-auto flex items-center justify-center"
              >
                <IoChevronForward className="text-white text-lg" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-3 left-0 w-full flex items-center justify-center gap-1.5">
            {images.slice(0, 3).map((_, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    isActive ? "bg-main" : "bg-white/70"
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="px-4">
          <div className="mb-4 inline-flex items-center gap-5 rounded-2xl bg-[#EDF2F4] px-4 py-2 text-heading">
            <button
              type="button"
              onClick={decreaseSelectedQuantity}
              className="cursor-pointer"
            >
              <PiMinusLight size={14} color="#121212" />
            </button>
            <span className="font-semibold text-base">{selectedQuantity}</span>
            <button
              type="button"
              onClick={increaseSelectedQuantity}
              className="cursor-pointer"
            >
              <PiPlusLight size={14} color="#121212" />
            </button>
          </div>

          {/* Save / Add to cart */}
          <div className="flex items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleAddToCart({ redirectToCart: true })}
              disabled={isOutOfStock || cartLoading}
              className="flex-1 rounded-2xl border border-main text-main font-medium text-sm py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => handleAddToCart()}
              disabled={isAlreadyInCart || isOutOfStock || cartLoading}
              className={`flex-1 rounded-2xl text-white font-medium text-sm py-3.5 disabled:cursor-not-allowed ${mobileAddToCartClasses}`}
            >
              {addToCartButtonLabel}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-line mb-4">
            <button className="text-main font-medium text-sm pb-3 border-b-2 border-main">
              Description
            </button>
            <button className="text-icon font-medium text-sm pb-3">
              Reviews
            </button>
            <button className="text-icon font-medium text-sm pb-3">
              Shipping
            </button>
          </div>

          {/* Description */}
          <p className="text-text text-sm leading-[1.4] mb-6">
            This is a genuine Bosch OEM front brake pad set, sourced directly
            from an authorised distributor and supplied in original sealed
            packaging. Suitable for Toyota Corolla models from 2018 through to
            2022.
          </p>

          {/* Seller card */}
          <div className="border border-line rounded-2xl p-4 flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={mechanicManImg}
                alt="seller image"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h4 className="text-heading text-base font-semibold mb-1">
                  Ekeyson & Co. Ltd.
                </h4>
                <p className="inline-flex items-center gap-1 text-xs text-success">
                  <IoShieldCheckmarkOutline />
                  Verified Seller
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex-1 rounded-xl bg-[#F9FAFB] text-heading font-medium text-sm py-2.5">
                Ask Seller
              </button>
              <button className="flex-1 rounded-xl bg-[#F9FAFB] text-heading font-medium text-sm py-2.5">
                View Shop
              </button>
            </div>
          </div>

          {/* Part Overview */}
          <div className="mb-6">
            <h2 className="text-heading text-xl font-semibold font-outfit mb-3">
              Part Overview
            </h2>
            <div className="border border-line rounded-2xl overflow-hidden">
              {partOverviewMobile.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-4 py-3.5 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                  }`}
                >
                  <span className="text-text text-sm">{item.label}</span>
                  <span className="text-heading text-sm font-semibold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Reviews */}
          <div>
            <h2 className="text-heading text-xl font-semibold font-outfit mb-3">
              User Reviews
            </h2>
            <div className="flex flex-col gap-3">
              {reviews.slice(0, 2).map((review, index) => (
                <div key={index} className="bg-[#F9F9F9] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2.5">
                    <img
                      src={review.profileImg}
                      alt="reviewer's profile image"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <h5 className="font-outfit font-medium text-sm text-heading">
                      {review.name}
                    </h5>
                  </div>
                  <p className="text-text text-sm leading-[1.4]">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
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

export default ProductDetails;
