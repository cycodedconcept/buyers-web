const ReplyForm = ({
  contactPage = false,
  heading = "Leave a reply",
  headingText = "Your email address will not be published",
  buttonText = "Post Comment",
}) => {
  return (
    <>
      <div>
        <form>
          <h2 className="text-heading text-[30px] font-fraunces">{heading}</h2>
          <p className="text-text text-sm font-outfit">{headingText}</p>
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="font-outfit text-heading font-medium text-sm"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full mt-1.5 py-3 px-4 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="email"
                  className="font-outfit text-heading font-medium text-sm"
                >
                  Email address
                </label>
                <input
                  type="text"
                  placeholder="Your email"
                  className="w-full mt-1.5 py-3 px-4 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                />
              </div>
            </div>
            {contactPage ? (
              <div className="flex items-center gap-4">
                <div className="w-1/2">
                  <label
                    htmlFor="name"
                    className="font-outfit text-heading font-medium text-sm"
                  >
                    Phone Numbers
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Numbers"
                    className="w-full mt-1.5 py-3 px-4 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="email"
                    className="font-outfit text-heading font-medium text-sm"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Keyword"
                    className="w-full mt-1.5 py-3 px-4 rounded-xl border border-line font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <p className="font-outfit text-sm text-text">
                  Save your name, email for the next time review
                </p>
              </div>
            )}
            <div className="flex flex-col">
              <label
                htmlFor="review"
                className="font-outfit text-heading text-sm font-medium"
              >
                {contactPage ? "Your Message" : "Review"}
              </label>
              <textarea
                placeholder="Your Message"
                className="border border-line p-3 font-outfit text-text text-sm placeholder:font-outfit placeholder:text-text placeholder:text-sm rounded-xl mt-1.5"
              />
            </div>
            <button className="text-white bg-main py-3 px-10 rounded-xl font-outfit font-medium">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReplyForm;
