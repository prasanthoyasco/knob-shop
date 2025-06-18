import { Download } from "lucide-react";
import "./Tracking.css";
// import { Container, Row, Col, Button } from "react-bootstrap";

export const Tracking = () => {
  return (
    <div className="container-flued order-tracking my-4 my-md-5 p-1 p-md-4 bg-white">
      <div className="row justify-content-between align-items-center mb-3">
        <div className="col-md-8 p-0">
          <h5 className="fw-semibold order-head">ORDER DETAILS</h5>
        </div>
        <div className="col-md-4 text-end">
          <a href="#" className="download-invoice">
           <Download color="#111" size={16}/><span className="mx-2">Download Invoice</span>
          </a>
        </div>
      </div>

      <div className="row my-3 my-md-5 px-0 px-md-3 border-top-bottom py-4 gy-3">
        <div className="col-12 col-md d-flex flex-row flex-md-column align-items-center justify-content-around gap-3">
          <div className="w-50 w-md-100"><p className='text-muted m-0'>Order Number</p></div>
          <div className="w-50 w-md-100 ps-2 ps-md-0"><span className="fs-7 fw-medium mt-0 text-sm-start">RB19011</span></div>
        </div>
        <div className="col-12 col-md d-flex flex-row flex-md-column align-items-center justify-content-around gap-3">
         <div className="w-50 w-md-100"><p className='text-muted m-0'>Order Number</p></div>
           <div className="w-50 w-md-100 ps-2 ps-md-0"><span className="fs-7 fw-medium mt-0 text-sm-start">Jun 17th, 2025</span></div>
        </div>
        <div className="col-12 col-md d-flex flex-row flex-md-column align-items-center justify-content-around gap-3">
          <div className="w-50 w-md-100"><p className='text-muted m-0'>Order Delivered</p></div>
           <div className="w-50 w-md-100 ps-2 ps-md-0"><span className="fs-7 fw-medium mt-0 text-sm-start">Jun 20th, 2025</span></div>
        </div>
        <div className="col-12 col-md d-flex flex-row flex-md-column align-items-center justify-content-around gap-3">
          <div className="w-50 w-md-100"><p className='text-muted m-0'>No of items</p></div>
          <div className="w-50 w-md-100 ps-2 ps-md-0"><span className="fs-7 fw-medium mt-0 text-sm-start">1 Item</span></div>
        </div>
        <div className="col-12 col-md d-flex flex-row flex-md-column align-items-center justify-content-around gap-3">
          <div className="w-50 w-md-100"><p className='text-muted m-0'>Status</p></div>
          <div className="w-50 w-md-100 ps-2 ps-md-0"><span className="text-warning fs-7 fw-bold m-0 text-sm-start">Out for delivery</span></div>
        </div>
      </div>

      {/* <hr /> */}

      <div className="d-flex justify-content-between mt-4 mb-2">
        <div className=" text-muted">
          <h6 className="order-track-head">ORDER TRACKING</h6>
        </div>
        <div className="text-end text-muted order-track-id">Tracking ID #123323</div>
      </div>

      <div className="tracking-steps-wrapper position-relative">
        <div class="order-progress-container">
          <div class="progress-line">
            <div class="progress-fill" style={{ width: "80%" }}></div>
          </div>

          <div class="progress-steps mx-2" >
            <div class="circle completed"></div>
            <div class="circle completed"></div>
            <div class="circle completed"></div>
            <div class="circle completed"></div>
            <div class="circle"></div>
          </div>
        </div>

        <div className="d-flex justify-content-between text-center tracking-steps">
          <div className="step completed">
            <div className="icon order-placed" />
            <div className="label">Order Placed</div>
            <div className="date">Jun 17th, 2025</div>
          </div>
          <div className="step completed">
            <div className="icon order-packed" />
            <div className="label">Order Packed</div>
            <div className="date">Jun 18th, 2025</div>
          </div>
          <div className="step completed">
            <div className="icon in-transport" />
            <div className="label">In Transport</div>
            <div className="date">Jun 19th, 2025</div>
          </div>
          <div className="step current">
            <div className="icon out-delivery" />
            <div className="label">Out of Delivery</div>
            <div className="date">Jun 20th, 2025</div>
          </div>
          <div className="step">
            <div className="icon delivered" />
            <div className="label">Delivered</div>
            <div className="date">Jun 20th, 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};
