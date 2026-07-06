import {partnersImg} from "../../assets/Assets"

const Partners = () => {
  return (
    <>
      <div className="container py-7 lg:py-15">
        <h2 className="text-heading text-[30px] font-fraunces text-center mb-5">Our Partners</h2>
        <img src={partnersImg} alt="partner brands" className="w-full" />
      </div>
    </>
  )
}

export default Partners;