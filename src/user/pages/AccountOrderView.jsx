import React, { useState, useEffect, useContext, Component } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'

import AccountSidebar from '../components/AccountSidebar';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/store';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import Header from '../components/Header';
import Footer from '../components/Footer';

import shoppingImage from '../assets_user/img/shopping-cart.png';
import orderImage from '../assets_user/img/order-image.png';
import heartImage from '../assets_user/img/love-image.png'
import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
import { Helmet } from 'react-helmet';
import { useBlogContext } from '../../fetchdata/BlogContext';
import getCookie from '../components/extra/getCookie';


const CryptoJS = window.CryptoJS;


const AccountOrderView = () => {

  const { Headers, isHeader, cartItems, AllProducts, AllCategoriess } = useBlogContext();

  const [reason, setReason] = useState('');

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  function decrypt(encryptedText, key) {
    const keyHex = CryptoJS.enc.Hex.parse(md5(key));
    const initVector = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
    const encryptedHex = CryptoJS.enc.Hex.parse(encryptedText);
    const decryptedText = CryptoJS.AES.decrypt(
        { ciphertext: encryptedHex },
        keyHex,
        { iv: initVector, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }
    );
    return decryptedText.toString(CryptoJS.enc.Utf8);
}

function md5(input) {
    return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}


  async function makeRequest() {
console.log('stats')
    try {
      const response = await axiosInstance.get(`/update-stuck-order/${Order.orderId}`);
      console.log(response.data)


    } catch (error) {
      console.error('Error:', error);
    }
  }



  const [formData, setFormData] = useState({
    reason: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };


  const { orderId } = useParams();
 
  const userId = getCookie('userId');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoginFromLocalStorage =  getCookie('token') ? true : false;

  const [isLogin, setIsLogin] = useState(isLoginFromLocalStorage);

  const [isLoginForm, setIsLoginForm] = useState(true);  

  const [IfLogin, setIfLogin] = useState(true);  



  const toggleForm = () => {
    setIsLoginForm(prevState => !prevState);
  };


  useEffect(() => {
    console.log(isLoginFromLocalStorage, 'isLoginFromLocalStorage')

    const checkUserToken = async () => {
      console.log('Effect is running');

      const usertoken =  getCookie('token');
      if (!usertoken) {
        toast.error("Please Login First");
        navigate('/');

      }

    }
    checkUserToken();
  }, [dispatch, navigate]);




  const [Order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [OrderPlace, setOrderPlace] = useState('');
  const [MYuser, setMYuser] = useState(false);



  const saveAsPDF = async () => {
    const printContent = document.getElementById('print');
 
    const scale = 5;

    const imageQuality = 1;  

 
    html2canvas(printContent, {
      scale: scale,
      useCORS: true, 
      logging: true  
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg', imageQuality); 
 
      const pdfWidth = 297;  
      const pdfHeight = 210;  
      const ratio = canvas.width / canvas.height;

      let pdfHeightAdjusted = pdfHeight;
      let pdfWidthAdjusted = pdfWidth;

      if (ratio < pdfWidth / pdfHeight) {
        pdfWidthAdjusted = pdfHeight * ratio;
      } else {
        pdfHeightAdjusted = pdfWidth / ratio;
      }

       const xPos = (pdfWidth - pdfWidthAdjusted) / 2;
      const yPos = (pdfHeight - pdfHeightAdjusted) / 2;

       const pdf = new jsPDF({
        orientation: 'landscape',  
        unit: 'mm',  
        format: [pdfWidth, pdfHeight]  
      });

   
      pdf.addImage(imgData, 'JPEG', xPos, yPos, pdfWidthAdjusted, pdfHeightAdjusted);

      pdf.save("invoice.pdf");
    });
  }

  const getUserOrders = async () => {

    try {
  
      const { data } = await axiosInstance.get(`/user-orders-view/${userId}/${orderId}`);

      if (data?.success) {
   
        setOrder(data?.userOrder);

      }


      
      if(data.userOrder.mode === "CCAvenue" && data.userOrder.payment === 2 ){
        setTimeout(function() {  
             window.location.reload();
         }, 1000);

        try {
          const response = await axiosInstance.get(`/update-stuck-order/${data.userOrder.orderId}`);
  
        } catch (error) {
          console.error('Error:', error);
        }
        
      }
      if( data.userOrder.mode === "CCAvenue" && data.userOrder.payment === 0 && data.userOrder.status === "1"){

        setTimeout(function() {  
          window.location.reload();
      }, 1000);

                try {
                  const response = await axiosInstance.get(`/update-stuck-order/${data.userOrder.orderId}`);
    
            
                } catch (error) {
                  console.error('Error:', error);
                }
                
              }

      setIsLoading(false);  
      setIfLogin(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false);  
      toast.error("order Not found");
      navigate('/account');
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }


  useEffect(() => {

    if (!IfLogin) {
      const getUsernameAndEmailFromLocalStorage = () => {
 
        const userString = getCookie('user');

        if (userString) {
          const { username, email } = JSON.parse(userString);
          return { username, email };
        }
        return null;
      };

 
      const { username, email } = getUsernameAndEmailFromLocalStorage();
      setMYuser(username);

    }
    getUserOrders();
  }, []);  

  const [loading, setLoading] = useState(true);

  const CancelStatusChange = async (event) => {
    const newStatus = event.target.value;
    setLoading(true);

    try {
      await axiosInstance.put(`/cancel-order/${orderId}`, formData);
      setLoading(false);
      getUserOrders();
      toast.success("Order Cancel success!");
      window.location.reload();

    } catch (error) {
      console.error('Error Order Cancel:', error);
      setLoading(false);
    }

  };



  return (
    <>

      <Header />

      <Helmet>
        <title> Account Order View | {window.location.hostname}</title>

      </Helmet>


      {isLogin && <>
        <div className="user-dasboard whitesmoke" >

          <div className="container pt-4">
            <div className="row pb-4">

              <AccountSidebar />

              <div className="col-lg-9 my-lg-0 my-1">
                <div id="main-content" className="bg-white border">
                  <div className="d-flex justify-content-between align-items-center py-3">
                    <div className="h5">Hello  {MYuser && MYuser}
                      ,</div>

                    <div className="d-flex gap-2">


                      <button onClick={makeRequest} className="btn btn-primary py-1">
                        <i className="bi bi-download" />{" "}
                        <span className="text">Check Status</span>
                      </button>
                      <button onClick={saveAsPDF} className="btn btn-primary py-1">
                        <i className="bi bi-download" />{" "}
                        <span className="text">Invoice</span>
                      </button>

                    </div>
                  </div>

                  {isLoading ? (
                    // Display loading skeletons while data is being fetched
                    Array.from({ length: 2 }).map((_, index) => (
                      <div className="col-md-12" key={index}>

                        <div className="skeleton mb-3" style={{ height: 154, borderRadius: 2 }} />

                      </div>
                    ))
                  ) :
                    (<>


                      <div className="w-100" id="print">
                        <br />
                        <div class="p-5" style={{
                          backgroundColor: "#fff8ee",
                          border: "5px solid #00406e",
                          marginBottom: 10
                        }} >

                          <div className="d-block d-lg-flex justify-content-between align-items-center py-3">

                            <img width="300" src="data:image/png;base64,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" />


                            <h1 class="text-end"> INVOICE</h1>



                          </div>


                          <div className="d-block d-lg-flex justify-content-between align-items-center py-3">

                            <div class=" text-center">
                              <b> INVOICE DATE </b>
                              <p> {formatDate(Order.createdAt)} </p>
                            </div>

                            <div class="text-center">
                              <b> Order No. </b>
                              <p> #{Order.orderId} </p>
                            </div>

                            <div class="text-center">
                              <b> Place Of Supply </b>
                              <p> {Order.details[0].state} </p>
                            </div>

                          </div>


                          {/* Title */}
                          <div className="d-block d-lg-flex justify-content-between align-items-center py-3">




                          </div>
                          {/* Main content */}
                          <div className="row" >

                            <div className='col-lg-6'>

                              {/* Shipping information */}
                              <div className="card-body">
                                <h3 className="h6"><b> BILL TO</b></h3>

                                <address>
                                  <p className="m-0">{Order.details[0].username}</p>
                                 
                                  <b title="Phone" className="mb-2" >Address:</b>  {Order.details[0].address}
                                  <br />
                                  <b title="Phone" className="mb-2" >State:</b>  {Order.details[0].state}
                                  <br />
                                  <b title="Phone" className="mb-2" >Pincode:</b>  {Order.details[0].pincode}
                                  <br />
                                  <b title="Phone" className="mb-2" >Phone:</b>  {Order.details[0].phone}
                                  <br />
                                  <b title="Phone" className="mb-2" >Email:</b>  {Order.details[0].email}  <br />


                                </address>
                              </div>

                            </div>

                            <div className="col-lg-6">

                              <div className="card-body text-end">

                                <h3 className="h6"> <b> BILL FROM </b></h3>

                                <address>
                                  <p className="mb-0" > CAYRO ENTERPRISES </p>

                                  <b title="Phone" className="mb-2">GST:</b>  06AAPFC7640H1Z9
                                  <br />
                                  <b title="Phone" className="mb-2">Address:</b> Unit no. DCG-0104, DLF Corporate<br /> Greens, Sector 74A, Gurugram,<br /> Haryana - 122001
                                  <br />

                                  <b title="Phone" className="mb-2">Email:</b> {!isHeader && (Headers.email)} <br />
                                  <b title="Phone" className="mb-2">Web:</b>www.{window.location.hostname} <br />
                                </address>
                              </div>


                            </div>




                            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                              <tbody>
                                <tr style={{ background: '#00406e', color: "white" }} >
                                  <td style={{ padding: 10, fontWeight: "bold" }}>Items</td>
                                  <td style={{ padding: 10, fontWeight: "bold" }}>QTY</td>
                                  <td style={{ padding: 10, fontWeight: "bold" }}>Sale Price </td>

                                  <td style={{ padding: 10, fontWeight: "bold" }}>Gross Amount </td>
                                  <td style={{ padding: 10, fontWeight: "bold" }}>Discount </td>

                                  {Order.primary === 'true' ? (<>
                                    <td style={{ padding: 10, fontWeight: "bold" }}>CGST</td>
                                  <td style={{ padding: 10, fontWeight: "bold" }}>SGST</td>
                                  </>):(<>
                                    <td style={{ padding: 10, fontWeight: "bold" }}>IGST	</td>
                                    </>) }
                                  

                                  <td style={{ padding: 10, fontWeight: "bold" }}>Total </td>

                                  
                                </tr>


                                {Order.items.map((Pro) => (
                                  <tr >
                                    <td style={{ padding: 10, maxWidth: '200px', borderWidth: '1px', borderColor: '#a2a2a2' }}>
                                      <div className="d-flex mb-2">
                                        <div className="flex-shrink-0">
                                          <img
                                            src={Pro.image}
                                            alt=""
                                            width={35}
                                            className="img-fluid"
                                          />
                                        </div>
                                        <div className="flex-lg-grow-1 ms-3">
                                          <h6 className="small mb-0">
                                            <Link href={`/product/${Pro.id}`} className="text-reset">
                                              {Pro.title}
                                            </Link>
                                          </h6>

                                        </div>
                                      </div>
                                    </td>
                                 
                                    <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }} > {Pro.quantity} </td>

                                    <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }}  >₹{Math.round(Pro.price - (((Pro.price * Pro.gst) / 100))).toFixed(0)} </td>

                                    <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }}  >₹{Pro.price}</td>
                                    <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }}  > ₹{ Pro.regularPrice - Pro.price } </td>

                                    {Order.primary === 'true' ? (<>
                                      <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }} > ₹{((Pro.price * Pro.gst) / 100)/2}	 </td>
                                      <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }} > ₹{((Pro.price * Pro.gst) / 100)/2} </td>
                                 
                                  </>):(<>
                                    <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }}>₹{(Pro.price * Pro.gst) / 100}	</td>
                                    </>) }

                                  
                                    <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }} > ₹{Pro.quantity * Pro.price} </td>

 </tr>
                                ))}


                              </tbody>
                              <tfoot>
                                <tr>
                                  <td  style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} >
Total
                                  </td>
                                  <td  style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} >
                                  {Order.items.reduce((total, item) => total + item.quantity , 0)} 
                                  </td>

                          

                                  <td  style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} >
₹{Math.round(Order.items.reduce((total, item) => total + item.price - (((item.price * item.gst) / 100)), 0)).toFixed(0)}
                                  </td>
        

                                  <td  style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} >
                                  ₹{Order.items.reduce((total, item) => total + item.price  , 0)}
                                  </td>
        
                                  <td  style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} >
                                  ₹{Order.items.reduce((total, item) => total + item.regularPrice - item.price , 0)}
                                  </td>

                                  
                                  {Order.primary === 'true' ? (<>
                                      <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }} >  ₹{Math.round(Order.items.reduce((total, item) => total + (((item.price * item.gst) / 100)/2), 0)).toFixed(0)}  </td>
                                      <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }} >  
                                      ₹{Math.round(Order.items.reduce((total, item) => total + (((item.price * item.gst) / 100)/2), 0)).toFixed(0)}
                                       </td>

                                  </>):(<>
                                    <td style={{ padding: 10, borderWidth: '1px', borderColor: '#a2a2a2' }} >  ₹{Math.round(Order.items.reduce((total, item) => total + (((item.price * item.gst) / 100)), 0)).toFixed(0)}  </td>
                                    </>) }

                                  
                                  <td  style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} >
                                  ₹{Order.items.reduce((total, item) => total + item.quantity * item.price , 0)}
                                  </td>


                                </tr>
                                <tr>
                                  <td colSpan={10} >
<br/>
                                  </td>
                                </tr>
                                <tr>
                                <td colSpan={Order.primary === 'true' ? 6 : 5}></td>
                                  <td colSpan={1} style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} > Subtotal </td>
                                  <td className="text-end" style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} >₹{Order.items.reduce((total, item) => total + item.quantity * item.price, 0)}</td>
                                </tr>




                                <tr>
                                <td colSpan={Order.primary === 'true' ? 6 : 5}></td>


                                  <td colSpan={1} style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }}  >  Shipping</td>
                                  <td className="text-end" style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }}  >₹{Order.shipping}</td>
                                </tr>
                                <tr>
                                <td colSpan={Order.primary === 'true' ? 6 : 5}></td>

                                  <td colSpan={1} style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }}  > Coupon Discount </td>

                                  <td className="text-danger text-end" style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }} > {Order.items.reduce((total, item) => total + item.quantity * item.price, 0) - Math.abs(Order.discount) === 0 ? '₹0' : (
                                    <>- ₹{Math.abs(Order.discount)}
                                    </>
                                  )}  </td>
                                </tr>
                                <tr className="fw-bold">
                                <td colSpan={Order.primary === 'true' ? 6 : 5}></td>

                                  <td colSpan={1} style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }}  > TOTAL</td>
                                  <td className="text-end" style={{
                                    padding: ".75rem",
                                    verticalAlign: "top",
                                    borderWidth: '1px', borderColor: '#a2a2a2'
                                  }}>₹{Order.totalAmount}</td>
                                </tr>
                              </tfoot>


                            </table>


                            <div className="text-end my-5">
                              <h3 className="h6">  SIGNATURE </h3>
                            </div>

                            <div className='col-lg-12 mt-5'>


                              <div className="card-body">
                                <div className="row">
                                  <div className="col-lg-6 ">
                                    <h3 className="h6">Payment Method</h3>
                                    <p>
                                      Method : {Order.mode}  {'  '}    <span className={`badge ${Order.payment === 1 ? 'bg-success' : 'bg-warning'} rounded-pill`}>{Order.payment === 1 ? 'PAID' : Order.payment === 0 ? 'UNPAID' : 'AWAITED'}</span>
                                    </p>
                                  </div>

                                  <div className="col-md-6 text-end">
                                    <h3 className="h6">Order Status</h3>


                                    {
                                      Order.status === '0' ? (<> <span className="badge rounded-pill bg-danger">Cancel</span> </>) :
                                        Order.status === '1' ? (<> <span className="badge rounded-pill bg-warning">Placed</span> </>) :
                                          Order.status === '2' ? (<><span className="badge rounded-pill bg-info">Accepted</span> </>) :
                                            Order.status === '3' ? (<><span className="badge rounded-pill bg-info">Packed</span> </>) :
                                              Order.status === '4' ? (<> <span className="badge rounded-pill bg-info">Shipped</span> </>) :
                                                Order.status === '5' ? (<> <span className="badge rounded-pill bg-success">Delivered</span> </>) :
                                                  (<> <span className="badge rounded-pill bg-danger">Unknown</span> </>)
                                    }

                                  </div>
                                </div>
                              </div>
                            </div>



                          </div>


                        </div>
                        <br />

                      </div>


                      {['1', '2', '3'].includes(Order.status) && (
                        <>

                          <div className="d-flex">
                            <button data-bs-toggle="modal" data-bs-target="#cancel" className="btn btn-danger py-1">
                              <i className="bi bi-exclamation-circle me-2"></i>
                              <span className="text">Cancel</span>
                            </button>
                          </div>


                          <div
                            className="modal fade"
                            id="cancel"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">
                                    Cancellation Reason
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  />
                                </div>
                                <div className="modal-body">

                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="outOfStock"
                                      name="reason"
                                      value="Item out of stock"
                                      checked={formData.reason === 'Item out of stock'}
                                      onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="outOfStock">
                                      Item out of stock
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="changedMind"
                                      name="reason"
                                      value="Changed my mind"
                                      checked={formData.reason === 'Changed my mind'}
                                      onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="changedMind">
                                      Changed my mind
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="betterDealElsewhere"
                                      name="reason"
                                      value="Found a better deal elsewhere"
                                      checked={formData.reason === 'Found a better deal elsewhere'}
                                      onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="betterDealElsewhere">
                                      Found a better deal elsewhere
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="deliveryDelay"
                                      name="reason"
                                      value="Delivery delay"
                                      checked={formData.reason === 'Delivery delay'}
                                      onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="deliveryDelay">
                                      Delivery delay
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="productIssue"
                                      name="reason"
                                      value="Product issue"
                                      checked={formData.reason === 'Product issue'}
                                      onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="productIssue">
                                      Product issue
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="incorrectItem"
                                      name="reason"
                                      value="Received incorrect item"
                                      checked={formData.reason === 'Received incorrect item'}
                                      onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="incorrectItem">
                                      Received incorrect item
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="other1"
                                      name="reason"
                                      value="Other"
                                      checked={formData.reason === 'Other'}
                                      onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="other1">
                                      Other
                                    </label>
                                  </div>

                                  <div className="mb-3 mt-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                      Comment <span className='text-danger'> * </span>
                                    </label>
                                    <textarea
                                      className="form-control"
                                      id="comment"
                                      name="comment"
                                      rows={3}
                                      value={formData.comment}
                                      onChange={handleChange}
                                    />
                                  </div>




                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>

                                  <button onClick={CancelStatusChange} type="button" className="btn btn-danger" disabled={formData.comment === '' && formData.reason === ''}>
                                    Cancel Order
                                  </button>

                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}






                    </>)}





                </div>
              </div>
            </div>
          </div>

        </div>
      </>}




      <Footer />


    </>
  )
}

export default AccountOrderView