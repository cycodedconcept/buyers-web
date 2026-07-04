import testimony from "../../data/testimony";

const Testimony = () => {
  return (
		<div className="container my-16">
			<h2 className="font-fraunces text-[30px] text-heading text-center mb-4">
				What Our Customers Say
			</h2>
			<div className="flex items-center gap-3 font-outfit">
				{testimony.map((testi, index) => (
          <div key={index} className="shadow-tiny p-6 rounded-[20px]">
            <div className="flex items-center justify-between">
              <img src={testi.rating} alt="" className="w-[112px]"/>
              <p>{testi.date}</p>
            </div>
            <p>"{testi.comment}"</p>
            <div>
              <img src={testi.customerImg} alt="customer image" className="object-cover w-15 h-15 rounded-full"/>
              <div>
                <h4>{testi.name}</h4>
                <p>{testi.occupation}</p>
              </div>
            </div>
          </div>
				))}
			</div>
		</div>
	);
};

export default Testimony;