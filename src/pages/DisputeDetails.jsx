import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BuyerPageLayout from "../components/layout/BuyerPageLayout";
import { formatBuyerDate, formatBuyerStatus } from "../utils/buyerDisplay";
import {
  fetchDisputeDetails,
  clearDisputeSubmitError,
  respondToDispute,
  selectDisputeDetails,
  selectDisputeDetailsLoading,
  selectDisputeDetailsError,
  selectDisputeSubmitting,
  selectDisputeSubmitError,
} from "../features/disputes/disputeSlice";

const DisputeDetails = () => {
  const { disputeId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const details = useSelector(selectDisputeDetails);
  const loading = useSelector(selectDisputeDetailsLoading);
  const error = useSelector(selectDisputeDetailsError);
  const submitting = useSelector(selectDisputeSubmitting);
  const submitError = useSelector(selectDisputeSubmitError);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    dispatch(clearDisputeSubmitError());
    if (token) dispatch(fetchDisputeDetails(disputeId));
  }, [dispatch, disputeId, token]);

  const dispute = details?.dispute;
  const canRespond = dispute && !["resolved", "closed", "cancelled"].includes(dispute.status);

  const handleRespond = async (event) => {
    event.preventDefault();
    setNotice(null);
    try {
      await dispatch(respondToDispute({ disputeId, message: message.trim(), attachments })).unwrap();
      setMessage("");
      setAttachments([]);
      setNotice("Your response was submitted.");
    } catch {
      // The slice exposes the request error beside the form.
    }
  };

  return (
    <BuyerPageLayout title={`Dispute #${disputeId}`}>
      <Link to="/disputes" className="mb-5 inline-block text-sm font-semibold text-main">← All disputes</Link>
      {loading ? <p role="status" className="text-text">Loading dispute...</p> : error ? <p role="alert" className="rounded-2xl border border-line p-6 text-text">{error}</p> : dispute && String(dispute.id) === String(disputeId) ? (
        <div className="space-y-6">
          <section className="rounded-3xl border border-line p-6">
            <div className="flex flex-wrap justify-between gap-3">
              <h2 className="text-xl font-semibold text-heading">{formatBuyerStatus(dispute.reason)}</h2>
              <span className="rounded-full bg-[#FFF5E6] px-4 py-2 text-sm font-semibold text-heading">{formatBuyerStatus(dispute.status)}</span>
            </div>
            <p className="mt-2 text-sm text-text">Order <Link to={`/orders/${dispute.orderId}`} className="font-semibold text-main">#{dispute.orderId}</Link> · Opened {formatBuyerDate(dispute.createdAt)}</p>
            <p className="mt-4 leading-7 text-text">{dispute.description}</p>
            {details?.sla?.deadlineAt && <p className="mt-3 text-sm text-text">Review deadline: {formatBuyerDate(details.sla.deadlineAt)}</p>}
          </section>

          <section className="rounded-3xl border border-line p-6">
            <h2 className="mb-4 text-xl font-semibold text-heading">Evidence</h2>
            <p className="mb-3 text-text">{details?.evidence?.buyer?.summary || "No summary available."}</p>
            {(details?.evidence?.buyer?.attachments || []).length ? <ul className="space-y-2">{details.evidence.buyer.attachments.map((attachment) => <li key={attachment.id}><a href={attachment.url} target="_blank" rel="noreferrer" className="font-semibold text-main">{attachment.filename || `Attachment #${attachment.id}`}</a></li>)}</ul> : <p className="text-sm text-text">No attachments.</p>}
          </section>

          <section className="rounded-3xl border border-line p-6">
            <h2 className="mb-4 text-xl font-semibold text-heading">Timeline</h2>
            <ol className="space-y-4">{(details?.timeline || []).map((entry) => <li key={entry.id} className="border-l-2 border-main pl-4"><p className="font-semibold text-heading">{formatBuyerStatus(entry.event)}</p><p className="text-sm text-text">{entry.detail?.message || ""} {formatBuyerDate(entry.timestamp)}</p></li>)}</ol>
          </section>

          {canRespond && <form onSubmit={handleRespond} className="max-w-2xl space-y-5 rounded-3xl border border-line p-6">
            <h2 className="text-xl font-semibold text-heading">Respond to this dispute</h2>
            <div><label htmlFor="dispute-message" className="mb-2 block font-semibold text-heading">Message</label><textarea id="dispute-message" required rows={4} value={message} onChange={(event) => setMessage(event.target.value)} className="w-full rounded-xl border border-line p-3 text-heading" /></div>
            <div><label htmlFor="dispute-attachments" className="mb-2 block font-semibold text-heading">Attachments (optional)</label><input id="dispute-attachments" type="file" accept="image/*,.pdf" multiple onChange={(event) => setAttachments(Array.from(event.target.files || []))} className="w-full rounded-xl border border-line p-3 text-sm text-heading" /></div>
            {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
            {notice && <p role="status" className="text-sm text-success">{notice}</p>}
            <button type="submit" disabled={submitting} className="rounded-xl bg-main px-6 py-3 font-semibold text-white disabled:opacity-50">{submitting ? "Submitting..." : "Send response"}</button>
          </form>}
        </div>
      ) : null}
    </BuyerPageLayout>
  );
};

export default DisputeDetails;
