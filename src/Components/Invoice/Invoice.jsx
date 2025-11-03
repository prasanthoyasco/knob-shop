import React, { useEffect, useState } from "react";
import "./Invoice.css";
import logo from "../../Assets/logo.png";
import html2pdf from "html2pdf.js";
import { getProductById } from "../../API/productApi";
import { getAddressByUserId } from "../../API/addressApi";
import { getUserById } from "../../API/authApi";
import sealImage from '../../Assets/invoiceImage/Seal.png'
import signImage from '../../Assets/invoiceImage/Sir Sign.png'
const invoiceData = {
  company: {
    website: "knobsshop.store",
    phone: "+91 70924 66600",
    email: "ecom@knobsshop.store",
  },
  from: {
    name: "Knobsshop",
    address: ["746-747,Mettupalayam Road,X-Cut", "Coimbatore, 641301"],
    phone: "+91 70924 66600",
    fax: "(123) 456-7890",
    gstin: "33ABCDE1234F1Z5",
    state: "Tamil Nadu",
    stateCode: "33",
  },
  to: {
    name: "Company Name",
    address: ["Street Address", "City, Zip Code"],
    phone: "(123) 456-7890",
    fax: "(123) 456-7890",
    gstin: "29XYZDE5678G1Z2",
    state: "Karnataka",
    stateCode: "29",
  },
  transport: {
    mode: "Road",
    vehicleNo: "TN01AB1234",
    supplyDate: "05-Aug-2025",
    placeOfSupply: "Tamil Nadu",
  },
  invoice: {
    date: "August 3, 2025",
    number: "#0000123DSS",
    description: "Product & Service Invoice",
    period: "Invoice / August period",
  },
  items: [
    {
      id: 1,
      title: "Website design & development",
      description: "Full website frontend & backend",
      rate: 1000,
      hours: 2,
      unit: "nos",
      hsc: 998315,
      disc: 5,
      gst: 18,
    },
    {
      id: 2,
      title: "Branding Kit Design",
      description: "Logo, Business Card, Letterhead",
      rate: 800,
      hours: 5,
      unit: "pcs",
      hsc: 998314,
      disc: 0,
      gst: 18,
    },
    {
      id: 3,
      title: "Maintenance & Updates",
      description: "Monthly code & security updates",
      rate: 600,
      hours: 3,
      unit: "hrs",
      hsc: 998314,
      disc: 10,
      gst: 18,
    },
  ],
  notes: [
    "* Make all cheques payable to Knobsshop",
    "* Payment is due within 30 days",
    "* For queries: +91 70924 66600, ecom@knobsshop.store",
  ],
};

function Invoice() {
  const [invoiceDatas, setInvoiceData] = useState([]);
  const [invoiceAllDetails, setInvoiceAllDetails] = useState([]);
  const handlePrint = () => {
    window.print();
  };
const handleDownloadPDF = async () => {
  const element = document.getElementById("invoice-to-download");

  if (!invoiceAllDetails?.cartItems?.length) {
    alert("Invoice data is still loading. Please wait a few seconds and try again.");
    return;
  }

  const buttons = document.querySelectorAll(".no-export");
  buttons.forEach((btn) => (btn.style.display = "none"));

  // Wait for images and content to fully load
  await new Promise((resolve) => setTimeout(resolve, 800));

  const opt = {
    margin: 0,
    filename: `Invoice_${invoiceAllDetails?.orderId || "Invoice"}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 1,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: "#ffffff",
    },
    jsPDF: {
      unit: "pt",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      buttons.forEach((btn) => (btn.style.display = "block"));
    })
    .catch((err) => {
      console.error("PDF export failed:", err);
      buttons.forEach((btn) => (btn.style.display = "block"));
    });
};

  useEffect(() => {
    const storedInvoice = localStorage.getItem("latestInvoiceData");
    if (storedInvoice) {
      try {
        const parsedInvoice = JSON.parse(storedInvoice);
        console.log("📦 Retrieved Invoice Data:", parsedInvoice);
        setInvoiceData(parsedInvoice);
      } catch (error) {
        console.error("❌ Error parsing invoice data:", error);
      }
    } else {
      console.warn("⚠️ No invoice data found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (invoiceDatas?.cartItems?.length) {
      Promise.all(
        invoiceDatas.cartItems.map((item) => getProductById(item.productId))
      )
        .then((products) => {
          const mergedData = {
            ...invoiceDatas,
            productDetails: products,
          };
          console.log("📝 Full Invoice with Product Details:", mergedData); // ✅ merged log
          setInvoiceAllDetails(mergedData);
        })
        .catch((err) =>
          console.error("❌ Error fetching product details:", err)
        );
    }
  }, [invoiceDatas]);

  useEffect(() => {
    const fetchRecentAddress = async () => {
      try {
        if (invoiceAllDetails?.userId && !invoiceAllDetails?.shippingAddress) {
          console.log("📬 Fetching address for user:", invoiceAllDetails.userId);
          const res = await getAddressByUserId(invoiceAllDetails.userId);

          // Extract the array of addresses
          const addressArray = res?.addresses || [];

          if (addressArray.length > 0) {
            // Sort by updatedAt (most recent first)
            const sorted = [...addressArray].sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );

            const recentAddress = sorted[0]; // take the most recent one

            // Merge with invoice data
            setInvoiceAllDetails((prev) => ({
              ...prev,
              shippingAddress: recentAddress,
            }));

            console.log("✅ Merged recent address:", recentAddress);
          } else {
            console.warn("⚠️ No addresses found for this user.");
          }
        }
      } catch (error) {
        console.error("❌ Error fetching recent address:", error);
      }
    };

    fetchRecentAddress();
  }, [invoiceAllDetails?.userId]);



  console.log(invoiceAllDetails);
  useEffect(() => {
    console.log("📄 Current invoiceDatas state:", invoiceAllDetails);
  }, [invoiceAllDetails]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (invoiceAllDetails?.userId && !invoiceAllDetails?.userDetails) {
          console.log("👤 Fetching user data for:", invoiceAllDetails.userId);
          const res = await getUserById(invoiceAllDetails.userId);

          if (res?.user) {
            setInvoiceAllDetails((prev) => ({
              ...prev,
              userDetails: res.user,
            }));

            console.log("✅ Merged user details:", res.user);
          } else {
            console.warn("⚠️ No user data found for this ID");
          }
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [invoiceAllDetails?.userId]);

  const { company, from, to, invoice, items, notes, transport } = invoiceData;

  let subtotal = 0;
  let totalGST = 0;
  const gstSummary = {};

  if (invoiceAllDetails?.cartItems?.length) {
    invoiceAllDetails.cartItems.forEach((item) => {
      const qty = item.quantity || 1;
      const mrpTotal = (item.mrpPrice || item.price) * qty;
      const sellingTotal = item.price * qty;

      const discount = mrpTotal - sellingTotal;
      const taxable = sellingTotal;
      const gstRate = item.gst || 18; // default 18%
      const gstAmt = (taxable * gstRate) / 100;

      subtotal += taxable;
      totalGST += gstAmt;

      // GST Summary
      if (!gstSummary[gstRate]) {
        gstSummary[gstRate] = { taxable: 0, cgst: 0, sgst: 0 };
      }
      gstSummary[gstRate].taxable += taxable;
      gstSummary[gstRate].cgst += gstAmt / 2;
      gstSummary[gstRate].sgst += gstAmt / 2;
    });
  }

  const grandTotal = subtotal + totalGST;
  const roundedTotal = Math.round(grandTotal);
  const roundOff = (roundedTotal - grandTotal).toFixed(2);

  const toWords = (n) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const numberToWords = (num) => {
      if (num < 20) return a[num];
      if (num < 100)
        return (
          b[Math.floor(num / 10)] + (num % 10 !== 0 ? "-" + a[num % 10] : "")
        );
      if (num < 1000)
        return (
          a[Math.floor(num / 100)] +
          " Hundred" +
          (num % 100 !== 0 ? " and " + numberToWords(num % 100) : "")
        );
      if (num < 100000)
        return (
          numberToWords(Math.floor(num / 1000)) +
          " Thousand" +
          (num % 1000 !== 0 ? " " + numberToWords(num % 1000) : "")
        );
      return "";
    };

    return numberToWords(n) + " Rupees Only";
  };

  return (

    <div className="invoice-container">
      <div className="col-md-12" id="invoice-to-download">
        <div className="logo-and-address">
          <img src={logo} />
          <div className="head-address">
            <div className="office-location">
              <h5>Head Office</h5>
              <p>746-747,Mettupalayam Road,X-Cut</p>
              <p>Coimbatore,Tamilnadu</p>
            </div>
            <div className="office-location">
              <h5>Branch</h5>
              <p>45-SF 595/2A-1,Rk Complex,Palkarar thottam,</p>
              <p>Goldwins,Coimbatore,Tamilnadu</p>
            </div>
                      </div>
            <div className="office-location contact-info-invoice">
              <p>
                <strong>Ph : </strong> +91 70924 66600
              </p>
              <p>
                <strong>E : </strong> ecom@knobsshop.store
              </p>
                            <p>
                <strong>W : </strong> knobsshop.store
              </p>
            </div>
        </div>
        <div className="invoice">
          <div className="invoice-company text-inverse f-w-600">
            <span className="pull-right hidden-print no-export">
              <button
                onClick={handleDownloadPDF}
                className="btn btn-sm btn-white m-b-10 p-l-5"
              >
                <i className="fa fa-file t-plus-1 text-danger fa-fw fa-lg"></i>{" "}
                Export as PDF
              </button>

              <a
                href="javascript:;"
                onClick={handlePrint}
                className="btn btn-sm btn-white m-b-10 ms-2 p-l-5"
              >
                <i className="fa fa-print t-plus-1 fa-fw fa-lg"></i> Print
              </a>
            </span>
            {company.name}
          </div>
          <div className="invoice-header">
            <div className="invoice-from">
              <small>from</small>
              <address className="m-0">
                <strong className="text-inverse">{from.name}</strong>
                <br />
                {from.address.map((line, i) => (
                  <>
                    {line}
                    <br key={i} />
                  </>
                ))}
                Phone: {from.phone}
                <br />
                Fax: {from.fax}
              </address>
            </div>
            <div className="invoice-to">
              <small>To</small>
              {invoiceAllDetails?.shippingAddress ? (
                <address className="m-0">
                  <strong className="text-inverse">
                    {invoiceAllDetails.userDetails.name}
                  </strong>
                  <strong className="text-inverse">
                    {invoiceAllDetails.shippingAddress.name}
                  </strong>
                  <br />
                  {invoiceAllDetails.shippingAddress.street}
                  <br />
                  {invoiceAllDetails.shippingAddress.city},{" "}
                  {invoiceAllDetails.shippingAddress.district}
                  <br />
                  {invoiceAllDetails.shippingAddress.state} -{" "}
                  {invoiceAllDetails.shippingAddress.pincode}
                  <br />
                </address>
              ) : (
                <address className="m-t-5 m-b-5">
                  <strong className="text-inverse"> PICK UP AT STORE </strong>
                </address>
              )}
            </div>
            {invoiceAllDetails && (
              <div className="invoice-date">
                <small>
                  Payment Method : {invoiceAllDetails.paymentMethod}
                </small>
                <div className="date text-inverse m-t-5">
                  Ordered Data : {invoiceAllDetails.invoiceDate}
                </div>
                <div className="invoice-detail">
                  Ordered Id : {invoiceAllDetails.orderId}
                  <br />
                  {invoice.description}
                </div>
              </div>
            )}
          </div>
          <div className="table-responsive">
            <table className="table table-invoice">
              <thead>
                <tr>
                  <th>SI NO.</th>
                  <th>PRODUCT</th>
                  <th className="table-data">HSN/SAC</th>
                  <th className="table-data">QTY</th>
                  <th className="table-data">RATE</th>
                  <th className="table-data">DISC%</th>
                  {/* <th className="table-data">GST%</th> */}
                  {/* <th className="table-data">GST Amt</th> */}
                  <th className="table-data">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {invoiceAllDetails?.cartItems?.map((item, i) => {
                  const qty = item.quantity || 1;

                  // If you have MRP stored, calculate discount value:
                  const mrpTotal = (item.mrpPrice || item.price) * qty;
                  const sellingTotal = item.price * qty;
                  const title = item.product.name;
                  const hsncode = item.product.hsncode;
                  const discountPercent =
                    ((mrpTotal - sellingTotal) / mrpTotal) * 100;
                  const discountPercentRounded = discountPercent.toFixed(2);
                  const taxable = sellingTotal; // after discount
                  const gstAmt = (taxable * 18) / 100;

                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="table-title">
                        {item.title || item.name || title}
                        <br />
                      </td>
                      <td className="table-data">
                        {item.product.hsncode}
                      </td>
                      <td className="table-data">{qty}</td>
                      <td className="table-data">
                        <i class="bi bi-currency-rupee"></i>
                        {item.price}
                      </td>
                      <td className="table-data">{discountPercentRounded}%</td>

                      {/* <td className="table-data">18%</td>
                      <td className="table-data">
                        <i class="bi bi-currency-rupee"></i>
                        {gstAmt.toFixed(2)}
                      </td> */}
                      <td className="table-data">
                        <i class="bi bi-currency-rupee"></i>
                        {(taxable + gstAmt).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}

                {/* Empty rows to maintain fixed height for 10 rows */}
                {Array.from({ length: 3 - items.length }).map((_, idx) => (
                  <tr key={`empty-${idx}`} className="empty-row">
                    <td>&nbsp;</td>
                    <td>
                      <br />
                      <small>&nbsp;</small>
                    </td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* --- GST Breakdown Section (below table) --- */}
          {/* --- GST Breakdown Section (below table) --- */}
          <div className="gst-breakdown-section">
            {invoiceAllDetails?.shippingAddress?.state === "Tamil Nadu" ? (
              <>
                <div className="gst-line">
                  <span className="gst-label"><em>Output CGST</em></span>
                  <span className="gst-value">
                    <i className="bi bi-currency-rupee"></i>
                    {(totalGST / 2).toFixed(2)}
                  </span>
                </div>
                <div className="gst-line">
                  <span className="gst-label"><em>Output SGST</em></span>
                  <span className="gst-value">
                    <i className="bi bi-currency-rupee"></i>
                    {(totalGST / 2).toFixed(2)}
                  </span>
                </div>
              </>
            ) : (
              <div className="gst-line">
                <span className="gst-label"><em>Output IGST</em></span>
                <span className="gst-value">
                  <i className="bi bi-currency-rupee"></i>
                  {totalGST.toFixed(2)}
                </span>
              </div>
            )}
          </div>


          <div className="invoice-price">
            <img src="/favIcon.png" className="invoice-logo-icon" />
            <div className="sub-total-price-content">
              <div className="sub-price">
                <small>SUBTOTAL</small> <i class="bi bi-currency-rupee"></i>
                {subtotal.toFixed(2)}
              </div>
              <div className="sub-price">
                <small>GST TOTAL</small>
                <i class="bi bi-currency-rupee"></i>
                {totalGST.toFixed(2)}
              </div>
              <div className="sub-price">
                <small>ROUND OFF</small>
                <i class="bi bi-currency-rupee"></i>
                {roundOff}
              </div>
            </div>
            <div className="invoice-price-right">
              <strong>TOTAL:</strong>
              <span className="fs-4 font-bolder">
                <i class="bi bi-currency-rupee"></i>
                {roundedTotal.toLocaleString("en-in")}
              </span>
            </div>
          </div>
          <div className="invoice-price">
            <div className="sub-total-price-content word-price">
              <p>Amount Chargeable ( in words )</p>
              <h5>
                <em>{toWords(roundedTotal)}</em>
              </h5>
            </div>
          </div>
          <div className="invoice-summary">
            <h5>GST Summary</h5>
            <table className="table table-bordered">
              <thead className="table-secondary">
                <tr>
                  <th>GST %</th>
                  <th>Taxable Value</th>
                  <th>CGST Amount</th>
                  <th>SGST Amount</th>
                  <th>Total Tax</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(gstSummary).map(([gstRate, data], i) => {
                  const totalTax = data.cgst + data.sgst;
                  return (
                    <tr key={i}>
                      <td>{gstRate}%</td>
                      <td>
                        <i class="bi bi-currency-rupee"></i>
                        {data.taxable.toFixed(2)}
                      </td>
                      <td>
                        <i class="bi bi-currency-rupee"></i>
                        {data.cgst.toFixed(2)}
                      </td>
                      <td>
                        <i class="bi bi-currency-rupee"></i>
                        {data.sgst.toFixed(2)}
                      </td>
                      <td>
                        <i class="bi bi-currency-rupee"></i>
                        {totalTax.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>
                      <i class="bi bi-currency-rupee"></i>
                      {totalGST.toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <p className="invoice-price p-3">
              <strong>Amount Chargeable (in words):</strong>{" "}
              {toWords(roundedTotal)}
            </p>
            {/* <div className="bank-details-invoice mt-3 invoice-price px-4 py-1">
              <div className="mt-1">
                <p>
                  <strong>Company's Bank Details</strong>
                </p>
                <p>
                  <strong>Bank Name:</strong> Kotak Mahindra Bank - 9043671585
                </p>
                <p>
                  <strong>A/c No.:</strong> 9043671585 / 136530150450491
                </p>
                <p>
                  <strong>Branch & IFS Code:</strong>KKBK0000490 / TMBL0000136
                </p>
              </div>

              <div className="mt-1">
                <p>
                  <strong>Company's PAN:</strong> AHAPG8378C
                </p>
              </div>
            </div> */}
            <div className="mt-4 declare-content-and-sign align-items-center">
              <div className="declartions-content-invoice">
                <p>
                  <strong>Declation</strong>
                </p>
                <p>
                  We declare that this invoice shows the actual price of the
                </p>
                <p>
                  goods described and that all particulars are true and correct
                </p>
              </div>
              <div className="text-end d-flex flex-column align-items-center">
                <p>
                  <strong>for KNOBS SHOP</strong>
                </p>
                <div className="position-relative">
                <img src={signImage} className="seal-image-invoice" />
                <img src={sealImage} className="sign-image-invoice" />
                </div>
                <p className="">Authorised Signatory</p>
              </div>
            </div>
            <hr className="invoice-hr" />
            <div className="computer-invoice-text">
              <h6 style={{ margin: "0" }}>
                SUBJECT TO COIMBATORE JURISDICTION
              </h6>
              <p>
                <em>This is a Computer Generated Invoice</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
