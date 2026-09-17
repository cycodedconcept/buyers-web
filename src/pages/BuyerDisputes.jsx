import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BuyerPageLayout from "../components/layout/BuyerPageLayout";
import PageControls from "../components/ui/PageControls";
import { formatBuyerDate, formatBuyerStatus } from "../utils/buyerDisplay";
import {
  fetchBuyerDisputes,
  selectBuyerDisputes,
  selectBuyerDisputesPagination,
  selectBuyerDisputesLoading,
  selectBuyerDisputesError,
} from "../features/disputes/disputeSlice";

const BuyerDisputes = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = useSelector((state) => state.auth.token);
  const disputes = useSelector(selectBuyerDisputes);
  const pagination = useSelector(selectBuyerDisputesPagination);
  const loading = useSelector(selectBuyerDisputesLoading);
  const error = useSelector(selectBuyerDisputesError);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = searchParams.get("status") === "open" ? "open" : undefined;

  useEffect(() => {
    if (token) dispatch(fetchBuyerDisputes({ page, limit: 10, status }));
  }, [dispatch, page, status, token]);

  return (
    <BuyerPageLayout title="My Disputes">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setSearchParams({ page: "1" })} className={`rounded-xl px-4 py-2 ${!status ? "bg-main text-white" : "border border-line text-heading"}`}>All</button>
        <button type="button" onClick={() => setSearchParams({ page: "1", status: "open" })} className={`rounded-xl px-4 py-2 ${status ? "bg-main text-white" : "border border-line text-heading"}`}>Open</button>
        <Link to="/orders" className="ml-auto font-semibold text-main">Find an order to raise a dispute</Link>
      </div>
      {loading ? <p role="status" className="text-text">Loading disputes...</p> : error ? (
        <div role="alert" className="rounded-2xl border border-line p-6 text-text">
          <p>{error}</p>
          <button type="button" onClick={() => dispatch(fetchBuyerDisputes({ page, limit: 10, status }))} className="mt-3 font-semibold text-main">Try again</button>
        </div>
      ) : disputes.length ? (
        <>
          <div className="grid gap-4">
            {disputes.map((dispute) => (
              <article key={dispute.id} className="rounded-3xl border border-line p-5 md:p-6">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-heading">Dispute #{dispute.id}</h2>
                    <p className="mt-1 text-sm text-text">Order #{dispute.orderId} · {formatBuyerDate(dispute.createdAt)}</p>
                  </div>
                  <span className="rounded-full bg-[#FFF5E6] px-4 py-2 text-sm font-semibold text-heading">{formatBuyerStatus(dispute.status)}</span>
                </div>
                <p className="mt-4 font-semibold text-heading">{formatBuyerStatus(dispute.reason)}</p>
                <p className="mt-1 text-sm text-text">{dispute.description}</p>
                <Link to={`/disputes/${dispute.id}`} className="mt-4 inline-block font-semibold text-main">View dispute →</Link>
              </article>
            ))}
          </div>
          <PageControls pagination={pagination} onPageChange={(nextPage) => setSearchParams(status ? { page: String(nextPage), status } : { page: String(nextPage) })} />
        </>
      ) : <p className="rounded-2xl border border-line p-6 text-text">No disputes found. You can raise one from an order&apos;s details.</p>}
    </BuyerPageLayout>
  );
};

export default BuyerDisputes;
