import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BuyerPageLayout from "../components/layout/BuyerPageLayout";
import {
  fetchBuyerOrderDetails,
  selectBuyerOrderDetails,
  selectBuyerOrderDetailsLoading,
  selectBuyerOrderDetailsError,
} from "../features/order/orderSlice";
import {
  createDispute,
  clearDisputeSubmitError,
  selectDisputeSubmitting,
  selectDisputeSubmitError,
} from "../features/disputes/disputeSlice";

const NewDispute = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const order = useSelector(selectBuyerOrderDetails);
  const loading = useSelector(selectBuyerOrderDetailsLoading);
  const orderError = useSelector(selectBuyerOrderDetailsError);
  const submitting = useSelector(selectDisputeSubmitting);
  const submitError = useSelector(selectDisputeSubmitError);
  const [sellerId, setSellerId] = useState("");
  const [reason, setReason] = useState("wrong_item_sent");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState([]);
  const sellers = Array.from(new Map((order?.items || []).filter((item) => item.seller?.id).map((item) => [item.seller.id, item.seller])).values());

  useEffect(() => {
    dispatch(clearDisputeSubmitError());
    if (token) dispatch(fetchBuyerOrderDetails(orderId));
  }, [dispatch, orderId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(createDispute({ orderId, sellerId, reason: reason.trim(), description: description.trim(), evidence })).unwrap();
      const disputeId = response?.data?.dispute?.id;
      navigate(disputeId ? `/disputes/${disputeId}` : `/orders/${orderId}`);
    } catch {
      // The slice exposes the request error beside the form.
    }
  };

  return (
    <BuyerPageLayout title={`Raise a dispute for order #${orderId}`}>
      <Link to={`/orders/${orderId}`} className="mb-5 inline-block text-sm font-semibold text-main">← Back to order</Link>
      {loading ? <p role="status" className="text-text">Loading order...</p> : orderError ? <p role="alert" className="rounded-2xl border border-line p-6 text-text">{orderError}</p> : order && String(order.id) === String(orderId) ? (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-3xl border border-line p-6 md:p-8">
          <div>
            <label htmlFor="dispute-seller" className="mb-2 block font-semibold text-heading">Seller</label>
            <select id="dispute-seller" required value={sellerId} onChange={(event) => setSellerId(event.target.value)} className="w-full rounded-xl border border-line p-3 text-heading">
              <option value="">Select the seller for the item</option>
              {sellers.map((seller) => <option key={seller.id} value={seller.id}>{seller.businessName || `Seller #${seller.id}`}</option>)}
            </select>
            {!sellers.length && <p className="mt-2 text-sm text-text">This order has no seller details available.</p>}
          </div>
          <div>
            <label htmlFor="dispute-reason" className="mb-2 block font-semibold text-heading">Reason</label>
            <input id="dispute-reason" required value={reason} onChange={(event) => setReason(event.target.value)} className="w-full rounded-xl border border-line p-3 text-heading" />
            <p className="mt-1 text-xs text-text">The documented reason is wrong_item_sent. Enter another reason code if the seller gave you one.</p>
          </div>
          <div>
            <label htmlFor="dispute-description" className="mb-2 block font-semibold text-heading">What happened?</label>
            <textarea id="dispute-description" required rows={5} value={description} onChange={(event) => setDescription(event.target.value)} className="w-full rounded-xl border border-line p-3 text-heading" />
          </div>
          <div>
            <label htmlFor="dispute-evidence" className="mb-2 block font-semibold text-heading">Evidence (optional)</label>
            <input id="dispute-evidence" type="file" accept="image/*,.pdf" multiple onChange={(event) => setEvidence(Array.from(event.target.files || []))} className="w-full rounded-xl border border-line p-3 text-sm text-heading" />
          </div>
          {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
          <button type="submit" disabled={submitting || !sellers.length} className="rounded-xl bg-main px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Submitting..." : "Submit dispute"}</button>
        </form>
      ) : null}
    </BuyerPageLayout>
  );
};

export default NewDispute;
