import React,{useEffect} from 'react';
import './Invoice.css';
import logo from '../../Assets/logo.png';
import html2pdf from 'html2pdf.js';

const invoiceData = {
  company: {
    name: 'KNOBSSHOP, Inc',
    website: 'knobsshop.store',
    phone: '+91 70924 66600',
    email: 'ecom@knobsshop.store',
  },
  from: {
    name: 'Knobsshop, Inc.',
    address: ['746-747,Mettupalayam Road,X-Cut', 'Coimbatore, 641301'],
    phone: '+91 70924 66600',
    fax: '(123) 456-7890',
    gstin: '33ABCDE1234F1Z5',
    state: 'Tamil Nadu',
    stateCode: '33',
  },
  to: {
    name: 'Company Name',
    address: ['Street Address', 'City, Zip Code'],
    phone: '(123) 456-7890',
    fax: '(123) 456-7890',
    gstin: '29XYZDE5678G1Z2',
    state: 'Karnataka',
    stateCode: '29',
  },
  transport: {
    mode: 'Road',
    vehicleNo: 'TN01AB1234',
    supplyDate: '05-Aug-2025',
    placeOfSupply: 'Tamil Nadu',
  },
  invoice: {
    date: 'August 3, 2025',
    number: '#0000123DSS',
    description: 'Product & Service Invoice',
    period: 'Invoice / August period',
  },
  items: [
    {
      id: 1,
      title: 'Website design & development',
      description: 'Full website frontend & backend',
      rate: 1000,
      hours: 2,
      unit: 'nos',
      hsc: 998315,
      disc: 5,
      gst: 18,
    },
    {
      id: 2,
      title: 'Branding Kit Design',
      description: 'Logo, Business Card, Letterhead',
      rate: 800,
      hours: 5,
      unit: 'pcs',
      hsc: 998314,
      disc: 0,
      gst: 18,
    },
    {
      id: 3,
      title: 'Maintenance & Updates',
      description: 'Monthly code & security updates',
      rate: 600,
      hours: 3,
      unit: 'hrs',
      hsc: 998314,
      disc: 10,
      gst: 18,
    },
  ],
  notes: [
    '* Make all cheques payable to Knobsshop',
    '* Payment is due within 30 days',
    '* For queries: +91 70924 66600, ecom@knobsshop.store',
  ],
};

function Invoice() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice-to-download');
    const opt = {
      margin: 0.5,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  const { company, from, to, invoice, items, notes, transport } = invoiceData;

  let subtotal = 0;
  let totalGST = 0;
  const hsnSummary = {};

  items.forEach(item => {
    const price = item.rate * item.hours;
    const discount = (price * item.disc) / 100;
    const taxable = price - discount;
    const gstAmt = (taxable * item.gst) / 100;
    subtotal += taxable;
    totalGST += gstAmt;

    // HSN Summary
    if (!hsnSummary[item.hsc]) {
      hsnSummary[item.hsc] = { taxable: 0, cgst: 0, sgst: 0 };
    }
    hsnSummary[item.hsc].taxable += taxable;
    hsnSummary[item.hsc].cgst += gstAmt / 2;
    hsnSummary[item.hsc].sgst += gstAmt / 2;
  });

  const grandTotal = subtotal + totalGST;
  const roundedTotal = Math.round(grandTotal);
  const roundOff = (roundedTotal - grandTotal).toFixed(2);

  const toWords = (n) => {
    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
      'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const numberToWords = (num) => {
      if (num < 20) return a[num];
      if (num < 100) return b[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + a[num % 10] : '');
      if (num < 1000)
        return a[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + numberToWords(num % 100) : '');
      if (num < 100000)
        return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
      return '';
    };

    return numberToWords(n) + ' Rupees Only';
  };

  return (
    <div className="container">
      <div className="col-md-12" id="invoice-to-download">
      <div className='logo-and-address'>
        <img src={logo}/>
        <div className='head-address'>
            <div className='office-location'>
                <h5>Head Office</h5>
                <p>746-747,Mettupalayam Road,X-Cut</p>
                <p>Coimbatore,Tamilnadu</p>
            </div>
            <div className='office-location'>
                <h5>Branch</h5>
                <p>45-SF 595/2A-1,Rk Complex,Palkarar thottam,</p>
                <p>Goldwins,Coimbatore,Tamilnadu</p>
            </div>
            <div className='office-location contact-info-invoice'>
                <p><strong>Ph : </strong> +91 70924 66600</p>
                <p><strong>E : </strong> ecom@knobsshop.store</p>
            </div>
            <div className='office-location'>
                <p><strong>W : </strong> knobsshop.store</p>
            </div>
        </div>
    </div>
        <div className="invoice">
        <div className="invoice-company text-inverse f-w-600">
            <span className="pull-right hidden-print">
            <button onClick={handleDownloadPDF} className="btn btn-sm btn-white m-b-10 p-l-5">
  <i className="fa fa-file t-plus-1 text-danger fa-fw fa-lg"></i> Export as PDF
</button>

              <a href="javascript:;" onClick={handlePrint} className="btn btn-sm btn-white m-b-10 p-l-5">
                <i className="fa fa-print t-plus-1 fa-fw fa-lg"></i> Print
              </a>
            </span>
            {company.name}
          </div>
        <div className="invoice-header">
            <div className="invoice-from">
              <small>from</small>
              <address className="m-t-5 m-b-5">
                <strong className="text-inverse">{from.name}</strong><br />
                {from.address.map((line, i) => <>{line}<br key={i} /></>)}
                Phone: {from.phone}<br />
                Fax: {from.fax}
              </address>
            </div>
            <div className="invoice-to">
              <small>to</small>
              <address className="m-t-5 m-b-5">
                <strong className="text-inverse">{to.name}</strong><br />
                {to.address.map((line, i) => <>{line}<br key={i} /></>)}
                Phone: {to.phone}<br />
                Fax: {to.fax}
              </address>
            </div>
            <div className="invoice-date">
              <small>{invoice.period}</small>
              <div className="date text-inverse m-t-5">{invoice.date}</div>
              <div className="invoice-detail">
                {invoice.number}<br />
                {invoice.description}
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-invoice">
              <thead>
                <tr>
                  <th>SI NO.</th>
                  <th>PRODUCT</th>
                  <th>HSN/SAC</th>
                  <th>RATE</th>
                  <th>QTY</th>
                  <th>DISC%</th>
                  <th>GST%</th>
                  <th>GST Amt</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
  {items.map((item, i) => {
    const amount = item.rate * item.hours;
    const discount = (amount * item.disc) / 100;
    const taxable = amount - discount;
    const gstAmt = (taxable * item.gst) / 100;

    return (
      <tr key={i}>
        <td>{item.id}</td>
        <td>{item.title}<br /><small>{item.description}</small></td>
        <td>{item.hsc}</td>
        <td>₹{item.rate}</td>
        <td>{item.hours} {item.unit}</td>
        <td>{item.disc}%</td>
        <td>{item.gst}%</td>
        <td>₹{gstAmt.toFixed(2)}</td>
        <td>₹{(taxable + gstAmt).toFixed(2)}</td>
      </tr>
    );
  })}

  {/* Empty rows to maintain fixed height for 10 rows */}
{Array.from({ length: 10 - items.length }).map((_, idx) => (
  <tr key={`empty-${idx}`} className="empty-row">
    <td>&nbsp;</td>
    <td><br /><small>&nbsp;</small></td>
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

          <div className="invoice-price">
          <img src='/favIcon.png' className='invoice-logo-icon'/>
            <div className='sub-total-price-content'>
                <div className="sub-price"><small>SUBTOTAL</small> ₹{subtotal.toFixed(2)}</div>
                <div className="sub-price"><small>GST TOTAL</small> ₹{totalGST.toFixed(2)}</div>
                <div className="sub-price"><small>ROUND OFF</small> ₹{roundOff}</div>
            </div>
            <div className="invoice-price-right">
              <strong>TOTAL: ₹{roundedTotal}</strong>
            </div>

          </div>
          <div className="invoice-price">
            <div className='sub-total-price-content word-price'>
                <p>Amount Chargeable ( in words )</p>
                <h5><em>{toWords(roundedTotal)}</em></h5>
            </div>
          </div>
          <div className="invoice-summary mt-4">
  <h5>HSN/SAC Summary</h5>
  <table className="table table-bordered">
    <thead className="table-secondary">
      <tr>
        <th>HSN/SAC</th>
        <th>Taxable Value</th>
        <th>CGST %</th>
        <th>CGST Amount</th>
        <th>SGST %</th>
        <th>SGST Amount</th>
        <th>Total Tax</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(hsnSummary).map(([hsn, data], i) => {
        const cgstRate = 18;
        const sgstRate = 18;
        const totalTax = data.cgst + data.sgst;
        return (
          <tr key={i}>
            <td>{hsn}</td>
            <td>₹{data.taxable.toFixed(2)}</td>
            <td>{cgstRate}%</td>
            <td>₹{data.cgst.toFixed(2)}</td>
            <td>{sgstRate}%</td>
            <td>₹{data.sgst.toFixed(2)}</td>
            <td>₹{totalTax.toFixed(2)}</td>
          </tr>
        );
      })}
      <tr>
        <td colSpan="6" className="text-end"><strong>Total</strong></td>
        <td><strong>₹{totalGST.toFixed(2)}</strong></td>
      </tr>
    </tbody>
  </table>
</div>


<div className="mt-4">
  <p className='invoice-price p-3'><strong>Amount Chargeable (in words):</strong> {toWords(roundedTotal)}</p>
<div className='bank-details-invoice mt-3 invoice-price p-4'>
  <div className="mt-3">
    <p><strong>Company's Bank Details</strong></p>
    <p><strong>Bank Name:</strong> Kotak Mahindra Bank - 9043671585</p>
    <p><strong>A/c No.:</strong> 9043671585 / 136530150450491</p>
    <p><strong>Branch & IFS Code:</strong>KKBK0000490 / TMBL0000136</p>
  </div>


  <div className="mt-3">
    <p><strong>Company's PAN:</strong> AHAPG8378C</p>
  </div>
  </div>
  <div className="mt-4 declare-content-and-sign">
    <div className='declartions-content-invoice'>
        <p><strong>Declation</strong></p>
        <p>We declare that this invoice shows the actual price of the</p>
        <p>goods described and that all particulars are true and correct</p>
    </div>
    <div className="text-end">
      <p><strong>for KNOBS SHOP</strong></p>
      <p className="mt-5">Authorised Signatory</p>
    </div>
  </div>
  <hr className='invoice-hr'/>
  <div className='computer-invoice-text'>
<h5>SUBJECT TO COIMBATORE JURISDICTION</h5>
  <p><em>This is a Computer Generated Invoice</em></p>
</div>
</div>

        </div>
      </div>
    </div>
  );
}

export default Invoice;
