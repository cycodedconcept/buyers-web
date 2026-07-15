import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import TopInfo from "../components/layout/TopInfo";
import CheckoutStepper from "../components/cart/CheckoutStepper";
import ShoppingCartStep from "../components/cart/ShoppingCartStep";
import CheckoutDetailsStep from "../components/cart/CheckoutDetailsStep";
import OrderCompleteStep from "../components/cart/OrderCompleteStep";
import Footer from "../components/layout/Footer";
import { parts } from "../data/parts";

const initialCartItems = [
  {
    id: 1,
    name: "Alternator Unit",
    quality: "Excellent",
    price: 19,
    quantity: 2,
    image: parts[0]?.image,
  },
  {
    id: 2,
    name: "Shock Absorbers",
    quality: "Excellent",
    price: 19,
    quantity: 2,
    image: parts[1]?.image,
  },
  {
    id: 3,
    name: "Wheel Bearings",
    quality: "Excellent",
    price: 39,
    quantity: 1,
    image: parts[2]?.image,
  },
];

const stepTitles = {
  1: "Shopping Cart",
  2: "Checkout Details",
  3: "Order Complete",
};

const CartCheckout = () => {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState(initialCartItems);

  const increaseQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item))
  }

  const decreaseQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? {...item, quantity: Math.max(1, item.quantity - 1)} : item))
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <>
      <div className="hidden md:block">
        <TopInfo />
      </div>
      <Navbar isListingPage isHomepage={false} />

      <div className="container px-4 py-10 md:py-16">
        <h1 className="text-center text-heading font-fraunces font-semibold text-[40px] mb-7">
          {stepTitles[step]}
        </h1>

        <CheckoutStepper currentStep={step} />

        {step === 1 && (
          <ShoppingCartStep
            cartItems={cartItems}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
            onCheckout={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <CheckoutDetailsStep
            cartItems={cartItems}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onCheckout={() => setStep(3)}
          />
        )}

        {step === 3 && <OrderCompleteStep cartItems={cartItems} />}
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <Footer listingGridMobile={true} />
      </div>
    </>
  );
}

export default CartCheckout;