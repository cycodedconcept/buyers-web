import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Pagination = () => {
  return (
    <>
       <div className="mt-8 hidden items-center justify-center gap-3 md:flex">
                    <button className="flex h-12 w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      <IoChevronBack size={20} />
                    </button>
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      1
                    </button>
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      2
                    </button>
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-main bg-main text-white">
                      3
                    </button>
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      4
                    </button>
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      ...
                    </button>
                    <button className="flex h-12 w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      <IoChevronForward size={20} />
                    </button>
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-main bg-main text-white">
                      1
                    </button>
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      2
                    </button>
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      3
                    </button>
                    <button className="flex h-12 min-w-12 items-center justify-center rounded-xl font-outfit border border-line bg-white text-heading">
                      4
                    </button>
                  </div>
    </>
  )
}

export default Pagination;