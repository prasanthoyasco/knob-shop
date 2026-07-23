import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop";
import Footer from "../Components/Footer/Footer";
import {
  downloadInvoicePdf,
  getInvoiceVerification,
} from "../API/invoiceVerificationApi";
import "./InvoiceVerification.css";

const formatMoney = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(value || 0));

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(value))
    : "N/A";

export default function InvoiceVerification() {
  const { orderId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadInvoice = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getInvoiceVerification(orderId);
        if (!cancelled) setInvoice(data.invoice);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "We could not verify this invoice. Please contact support."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (orderId) loadInvoice();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadInvoicePdf(orderId);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We could not download this invoice. Please contact support."
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <NavbarTop />
      <main className="invoice-verify-page">
        <section className="invoice-verify-card">
          {loading ? (
            <div className="invoice-verify-loading">Verifying invoice...</div>
          ) : error ? (
            <>
              <div className="invoice-verify-status error">Verification failed</div>
              <h1>Invoice Not Found</h1>
              <p>{error}</p>
              <Link to="/" className="invoice-verify-btn secondary">
                Go to Homepage
              </Link>
            </>
          ) : (
            <>
              <div className="invoice-verify-status">Verified Invoice</div>
              <h1>{invoice.invoiceNumber}</h1>
              <p className="invoice-verify-subtitle">
                This invoice was issued by {invoice.company.displayName}.
              </p>

              <div className="invoice-verify-grid">
                <div>
                  <span>Order ID</span>
                  <strong>{invoice.orderId}</strong>
                </div>
                <div>
                  <span>Invoice Date</span>
                  <strong>{formatDate(invoice.invoiceDate)}</strong>
                </div>
                <div>
                  <span>Customer</span>
                  <strong>{invoice.customer?.name || invoice.billingAddress?.name}</strong>
                </div>
                <div>
                  <span>Payment Status</span>
                  <strong>{invoice.payment?.status || "N/A"}</strong>
                </div>
                <div>
                  <span>GST Total</span>
                  <strong>{formatMoney(invoice.totals?.gst)}</strong>
                </div>
                <div>
                  <span>Grand Total</span>
                  <strong>{formatMoney(invoice.totals?.grandTotal)}</strong>
                </div>
              </div>

              <div className="invoice-verify-actions">
                <button
                  type="button"
                  className="invoice-verify-btn"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? "Downloading..." : "Download PDF"}
                </button>
                <Link to="/" className="invoice-verify-btn secondary">
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
