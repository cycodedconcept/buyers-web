import { Link } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";

const Breadcrumbs = ({ items, className = "" }) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.to && !isCurrent ? (
                <Link
                  to={item.to}
                  className={`text-xs transition-colors hover:text-main ${
                    index === 0 ? "font-semibold text-main" : "text-text"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`text-xs ${
                    index === 0 ? "font-semibold text-main" : "text-text"
                  }`}
                >
                  {item.label}
                </span>
              )}
              {!isCurrent && <LuChevronRight className="text-icon" size={8} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
