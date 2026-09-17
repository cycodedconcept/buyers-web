import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BuyerPageLayout from "../components/layout/BuyerPageLayout";
import PageControls from "../components/ui/PageControls";
import { nairaFormatter } from "../utils/utilityFunc";
import { formatBuyerDate, formatBuyerStatus } from "../utils/buyerDisplay";
import {
  fetchBuyerOrderDetails,
  fetchBuyerOrderStatus,
  selectBuyerOrderDetails,
  selectBuyerOrderDetailsLoading,
  selectBuyerOrderDetailsError,
  selectBuyerOrderStatus,
  selectBuyerOrderStatusLoading,
  selectBuyerOrderStatusError,
} from "../features/order/orderSlice";
import {
  fetchOrderDisputes,
  selectOrderDisputes,
  selectOrderDisputesPagination,
  selectOrderDisputesLoading,
  selectOrderDisputesError,
} from "../features/disputes/disputeSlice";

const BuyerOrderDetails = () => {
  const { orderId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const disputesPage = Math.max(1, Number(searchParams.get("disputesPage")) || 1);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const order = useSelector(selectBuyerOrderDetails);
  const loading = useSelector(selectBuyerOrderDetailsLoading);
  const error = useSelector(selectBuyerOrderDetailsError);
  const status = useSelector(selectBuyerOrderStatus);
  const statusLoading = useSelector(selectBuyerOrderStatusLoading);
  const statusError = useSelector(selectBuyerOrderStatusError);
  const disputes = useSelector(selectOrderDisputes);
  const disputesPagination = useSelector(selectOrderDisputesPagination);
  const disputesLoading = useSelector(selectOrderDisputesLoading);
  const disputesError = useSelector(selectOrderDisputesError);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchBuyerOrderDetails(orderId));
    dispatch(fetchBuyerOrderStatus(orderId));
  }, [dispatch, orderId, token]);

  useEffect(() => {
    if (token) dispatch(fetchOrderDisputes({ orderId, page: disputesPage }));
  }, [dispatch, disputesPage, orderId, token]);

  const address = order?.deliveryAddress;

  return (
    <BuyerPageLayout title={`Order #${orderId}`}>
      <Link to="/orders" className="mb-5 inline-block text-sm font-semibold text-main">← All orders</Link>
      {loading ? <p role="status" className="text-text">Loading order details...</p> : error ? (
        <div role="alert" className="rounded-2xl border border-line p-6 text-text">{error}</div>
      ) : order && String(order.id) === String(orderId) ? (
        <div className="space-y-6">
          <section className="rounded-3xl border border-line p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-heading">Order summary</h2>
                <p className="mt-1 text-sm text-text">Placed {formatBuyerDate(order.createdAt)}</p>
              </div>
              <Link to={`/orders/${orderId}/receipt`} className="rounded-xl border border-main px-4 py-2 font-semibold text-main">View receipt</Link>
            </div>
            <p className="mt-4 text-sm text-text">Order: {formatBuyerStatus(order.status)} · Payment: {formatBuyerStatus(order.paymentStatus)}</p>
            <div className="mt-5 grid gap-2 border-t border-line pt-5 text-sm md:max-w-sm">
              <p className="flex justify-between"><span>Subtotal</span><strong>{nairaFormatter(order.subtotalKobo)}</strong></p>
              <p className="flex justify-between"><span>Delivery</span><strong>{nairaFormatter(order.deliveryFeeKobo)}</strong></p>
              <p className="flex justify-between text-base text-heading"><span>Total</span><strong>{nairaFormatter(order.totalKobo)}</strong></p>
            </div>
          </section>

          <section className="rounded-3xl border border-line p-6">
            <h2 className="mb-4 text-xl font-semibold text-heading">Items</h2>
            <div className="space-y-4">
              {(order.items || []).map((item) => (
                <div key={item.id || item.productId} className="flex flex-wrap justify-between gap-4 border-b border-line pb-4 last:border-b-0">
                  <div>
                    <p className="font-semibold text-heading">{item.title}</p>
                    <p className="text-sm text-text">{item.seller?.businessName || "Seller unavailable"} · Qty {item.quantity} · {nairaFormatter(item.unitPriceKobo)} each</p>
                  </div>
                  <strong className="text-heading">{nairaFormatter(item.lineTotalKobo)}</strong>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-line p-6">
              <h2 className="mb-3 text-xl font-semibold text-heading">Delivery address</h2>
              {address ? <p className="leading-7 text-text">{address.label}<br />{address.street}<br />{address.city}, {address.state}<br />{address.phone}</p> : <p className="text-text">Address unavailable.</p>}
            </section>
            <section className="rounded-3xl border border-line p-6">
              <h2 className="mb-3 text-xl font-semibold text-heading">Status history</h2>
              {statusLoading ? <p role="status" className="text-text">Loading status...</p> : statusError ? <p role="alert" className="text-text">{statusError}</p> : (
                <ol className="space-y-3">
                  {(status?.history || order.statusHistory || []).map((entry) => (
                    <li key={entry.id} className="border-l-2 border-main pl-3">
                      <p className="font-semibold text-heading">{formatBuyerStatus(entry.status)}</p>
                      <p className="text-sm text-text">{entry.note} · {formatBuyerDate(entry.createdAt)}</p>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>

          <section className="rounded-3xl border border-line p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-heading">Disputes for this order</h2>
              <Link to={`/orders/${orderId}/disputes/new`} className="rounded-xl bg-main px-4 py-2 font-semibold text-white">Raise a dispute</Link>
            </div>
            {disputesLoading ? <p role="status" className="mt-4 text-text">Loading disputes...</p> : disputesError ? <p role="alert" className="mt-4 text-text">{disputesError}</p> : disputes.length ? (
              <div className="mt-4 space-y-3">{disputes.map((dispute) => <Link key={dispute.id} to={`/disputes/${dispute.id}`} className="block rounded-xl border border-line p-4 text-heading hover:border-main">Dispute #{dispute.id} · {formatBuyerStatus(dispute.status)} · {formatBuyerStatus(dispute.reason)}</Link>)}</div>
            ) : <p className="mt-4 text-text">No disputes for this order.</p>}
            <PageControls pagination={disputesPagination} onPageChange={(nextPage) => setSearchParams({ disputesPage: String(nextPage) })} disabled={disputesLoading} />
          </section>
        </div>
      ) : null}
    </BuyerPageLayout>
  );
};

export default BuyerOrderDetails;
