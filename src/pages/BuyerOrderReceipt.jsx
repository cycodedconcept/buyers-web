import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BuyerPageLayout from "../components/layout/BuyerPageLayout";
import { nairaFormatter } from "../utils/utilityFunc";
import { formatBuyerDate, formatBuyerStatus } from "../utils/buyerDisplay";
import {
  fetchBuyerOrderReceipt,
  fetchBuyerOrderReceiptHtml,
  selectBuyerOrderReceipt,
  selectBuyerOrderReceiptLoading,
  selectBuyerOrderReceiptError,
} from "../features/order/orderSlice";

const BuyerOrderReceipt = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const receipt = useSelector(selectBuyerOrderReceipt);
  const loading = useSelector(selectBuyerOrderReceiptLoading);
  const error = useSelector(selectBuyerOrderReceiptError);
  const [downloadError, setDownloadError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (token) dispatch(fetchBuyerOrderReceipt(orderId));
  }, [dispatch, orderId, token]);

  const handleDownload = async () => {
    setDownloadError(null);
    setDownloading(true);
    try {
      const html = await dispatch(fetchBuyerOrderReceiptHtml(orderId)).unwrap();
      const objectUrl = URL.createObjectURL(new Blob([html], { type: "text/html" }));
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `receipt-${orderId}.html`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (requestError) {
      setDownloadError(typeof requestError === "string" ? requestError : requestError?.message || "Could not download receipt.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <BuyerPageLayout title={`Receipt for order #${orderId}`}>
      <Link to={`/orders/${orderId}`} className="mb-5 inline-block text-sm font-semibold text-main">← Back to order</Link>
      {loading ? <p role="status" className="text-text">Loading receipt...</p> : error ? <p role="alert" className="rounded-2xl border border-line p-6 text-text">{error}</p> : receipt && String(receipt.orderId) === String(orderId) ? (
        <article className="space-y-6 rounded-3xl border border-line bg-white p-6 md:p-8">
          <div className="flex flex-wrap justify-between gap-4">
            <div><h2 className="text-2xl font-semibold text-heading">{receipt.receiptNumber}</h2><p className="text-sm text-text">Issued {formatBuyerDate(receipt.issuedAt)}</p></div>
            <button type="button" onClick={handleDownload} disabled={downloading} className="rounded-xl bg-main px-5 py-2 font-semibold text-white disabled:opacity-60">{downloading ? "Preparing..." : "Download HTML receipt"}</button>
          </div>
          {downloadError && <p role="alert" className="text-sm text-red-700">{downloadError}</p>}
          <p className="text-text">Order: {formatBuyerStatus(receipt.status)} · Payment: {formatBuyerStatus(receipt.paymentStatus)}</p>
          <div className="space-y-3 border-y border-line py-5">
            {(receipt.items || []).map((item) => <div key={item.id || item.productId} className="flex justify-between gap-4"><span>{item.title} × {item.quantity}</span><strong>{nairaFormatter(item.lineTotalKobo)}</strong></div>)}
          </div>
          <div className="space-y-2 md:max-w-sm">
            <p className="flex justify-between"><span>Subtotal</span><strong>{nairaFormatter(receipt.subtotalKobo)}</strong></p>
            <p className="flex justify-between"><span>Delivery</span><strong>{nairaFormatter(receipt.deliveryFeeKobo)}</strong></p>
            <p className="flex justify-between text-lg text-heading"><span>Total</span><strong>{nairaFormatter(receipt.totalKobo)}</strong></p>
          </div>
        </article>
      ) : null}
    </BuyerPageLayout>
  );
};

export default BuyerOrderReceipt;
