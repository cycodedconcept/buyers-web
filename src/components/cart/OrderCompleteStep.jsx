const orderInfo = [
  { label: "Order Code:", value: "#0123_45678" },
  { label: "Date:", value: "May 18, 2026" },
  { label: "Total:", value: "$1,345.00" },
  { label: "Payment Method:", value: "Credit Card" },
];

const OrderCompleteStep = ({ cartItems }) => {
  return (
    <div className="max-w-172.5 w-full mx-auto bg-white shadow-4xl rounded-2xl px-16 py-16 text-center my-16">
      <p className="font-outfit text-text text-2xl mb-3">Thank You! 🎉</p>
      <h2 className="font-fraunces text-heading text-[32px] font-semibold leading-[1.2] max-w-112.5 mx-auto mb-9">
        Your Order has been Received!
      </h2>

      <div className="flex items-center justify-center gap-4 mb-10">
        {cartItems.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-xl bg-[#F4F4F4] object-contain p-3"
            />
            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-success text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
              {item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-57.5 w-full mx-auto flex flex-col gap-3 mb-10">
        {orderInfo.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4.5">
            <span className="font-outfit text-text text-sm">{row.label}</span>
            <span className="font-outfit text-heading text-start text-sm font-semibold">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="max-w-90 w-full mx-auto rounded-2xl bg-main text-white font-outfit font-semibold text-base py-4 block"
      >
        Purchase History
      </button>
    </div>
  );
};

export default OrderCompleteStep;
