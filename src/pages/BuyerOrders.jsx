import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BuyerPageLayout from "../components/layout/BuyerPageLayout";
import PageControls from "../components/ui/PageControls";
import { nairaFormatter } from "../utils/utilityFunc";
import { formatBuyerDate, formatBuyerStatus } from "../utils/buyerDisplay";
import {
  fetchBuyerOrders,
  selectBuyerOrders,
  selectBuyerOrdersPagination,
  selectBuyerOrdersLoading,
  selectBuyerOrdersError,
} from "../features/order/orderSlice";

const BuyerOrders = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = useSelector((state) => state.auth.token);
  const orders = useSelector(selectBuyerOrders);
  const pagination = useSelector(selectBuyerOrdersPagination);
  const loading = useSelector(selectBuyerOrdersLoading);
  const error = useSelector(selectBuyerOrdersError);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  useEffect(() => {
    if (token) dispatch(fetchBuyerOrders({ page, limit: 10 }));
  }, [dispatch, page, token]);

  return (
    <BuyerPageLayout title="My Orders">
      {loading ? <p role="status" className="text-text">Loading your orders...</p> : error ? (
        <div role="alert" className="rounded-2xl border border-line p-6 text-text">
          <p>{error}</p>
          <button type="button" onClick={() => dispatch(fetchBuyerOrders({ page, limit: 10 }))} className="mt-3 font-semibold text-main">Try again</button>
        </div>
      ) : orders.length ? (
        <>
          <div className="grid gap-4">
            {orders.map((order) => (
              <article key={order.id} className="rounded-3xl border border-line bg-white p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-heading">Order #{order.id}</h2>
                    <p className="mt-1 text-sm text-text">Placed {formatBuyerDate(order.createdAt)}</p>
                  </div>
                  <p className="text-lg font-semibold text-heading">{nairaFormatter(order.totalKobo)}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-text">
                  <span>Order: {formatBuyerStatus(order.status)}</span>
                  <span>Payment: {formatBuyerStatus(order.paymentStatus)}</span>
                  <span>{order.totalItems ?? 0} items</span>
                </div>
                <Link to={`/orders/${order.id}`} className="mt-5 inline-block rounded-xl bg-main px-5 py-2.5 font-semibold text-white">View order</Link>
              </article>
            ))}
          </div>
          <PageControls pagination={pagination} onPageChange={(nextPage) => setSearchParams({ page: String(nextPage) })} />
        </>
      ) : <p className="rounded-2xl border border-line p-6 text-text">You have not placed an order yet.</p>}
    </BuyerPageLayout>
  );
};

export default BuyerOrders;
