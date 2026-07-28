import { IoCheckmarkCircle } from "react-icons/io5";

const steps = [
  { id: 1, label: "Shopping Cart" },
  { id: 2, label: "Checkout Details" },
  { id: 3, label: "Order Complete" },
];

const CheckoutStepper = ({currentStep = 1}) => {
  return (
    <>
      <div className="flex items-start justify-center gap-8 px-4">
        {steps.map(step => {
          const status = step.id < currentStep ? "completed" : step.id === currentStep ? "active" : "pending";
          const circleClass = status === "completed" ? "text-success" : status === "active" ? "bg-heading text-white" : "bg-text text-white";
          const labelClass = status === "completed" ? "text-success font-bold" : status === "active" ? "font-bold text-heading" : "text-text font-bold";
          const lineClass = status === "completed" ? "bg-success" : status === "active" ? "bg-heading" : "bg-transparent";
          return (
            <div key={step.id} className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 pr-4 md:pr-16">
                <div
                  className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold font-outfit ${circleClass}`}
                >
                  {status === "completed" ? (
                    <IoCheckmarkCircle className="md:text-lg w-full h-full" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`font-outfit text-xs md:text-base ${labelClass} max-md:truncate max-md:w-19`}>
                  {step.label}
                </span>
              </div>
              <div className={`h-0.5 w-full ${lineClass}`} />
            </div>
          );
        })}
      </div>
    </>
  )
}

export default CheckoutStepper;