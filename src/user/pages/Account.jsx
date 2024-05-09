import React, { useState, useEffect, useContext, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom'

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

import { useBlogContext } from '../../fetchdata/BlogContext';
import { Helmet } from 'react-helmet';
import getCookie from '../components/extra/getCookie';

const Account = () => {
  const { cartItems } = useBlogContext();

  const userId = localStorage.getItem('userId');

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
 

    const checkUserToken = async () => {
      console.log('Effect is running');

      const usertoken =  getCookie('token')

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
  const [MYuser, setMYuser] = useState('');
  const [Wishlist, setWishlist] = useState(0);


  const getUserOrders = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await axiosInstance.get(`/user-orders/${id}`);
      if (data?.success) {
        setOrder(data?.userOrder.orders);
        setOrderPlace(data?.userOrder.orders.length)
      }
      setIsLoading(false);  
      setIfLogin(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false);  

    }
  };



  const getWishlist = async () => {
    const id = localStorage.getItem('userId');

    try {
      const { data } = await axiosInstance.get(`/view-wishlist/${id}`);
 
      setWishlist(data.wishlist.length);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);


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
        const userString = localStorage.getItem('user');
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


  return (
    <>

      <Header />

      <Helmet>
        <title> Account | {window.location.hostname}</title>

      </Helmet>

      {isLogin && <>
        <div className="user-dasboard whitesmoke" >

          <div className="container pt-4">
            <div className="row pb-4">

              <AccountSidebar />

              <div className="col-lg-9 my-lg-0 my-1">
                <div id="main-content" className="bg-white border">
                  <div className="d-flex flex-column">
                    <div className="h5">Hello User

                    </div>
                   
                  </div>

                  <div className="row">
                    <div className="col-md-3">

                    </div>


                  </div>


                  {isLoading ? (
                    <div className="row mt-3 col-11">

                      {Array.from({ length: 3 }).map((_, index) => (
                        <div className="col-md-3" key={index}>

                          <div className="skeleton mb-3" style={{ height: 90, borderRadius: 10 }} />

                        </div>
                      ))}
                    </div>
                  ) : (<>
                    <div className="d-flex my-4 flex-wrap">
                      <Link className="box me-4 my-1 bg-light-border" to="/account/orders"  >
                        <img
                          src={orderImage}
                          alt=""
                        />
                        <div className="d-flex align-items-center mt-2">
                          <div className="tag">Orders placed</div>
                          <div className="ms-auto number"> {IfLogin ? (<p></p>) : (OrderPlace)} </div>
                        </div>
                      </Link>
                      <Link className="box me-4 my-1 bg-light-border" to="/cart">
                        <img
                          src={shoppingImage}
                          alt=""
                        />
                        <div className="d-flex align-items-center mt-2" >
                          <div className="tag">Items in Cart</div>
                          <div className="ms-auto number">{cartItems.length}   </div>
                        </div>
                      </Link>
                      <Link className="box me-4 my-1 bg-light-border" to="/wishlist">
                        <img
                          src={heartImage}
                          alt=""
                        />
                        <div className="d-flex align-items-center mt-2">
                          <div className="tag">Wishlist</div>
                          <div className="ms-auto number">{Wishlist}</div>
                        </div>
                      </Link>
                    </div>
                  </>)}

                  <div className="text-uppercase">My recent orders</div>

                  {isLoading ? (
                    
                    Array.from({ length: 2 }).map((_, index) => (
                      <div className="col-md-12" key={index}>

                        <div className="skeleton mb-3" style={{ height: 154, borderRadius: 2 }} />

                      </div>
                    ))
                  ) :
                    (Order.reverse().slice(0, 2).map(Order => (
                      <>


                        <div className="order my-3 bg-light-border">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="d-flex flex-column justify-content-between order-summary">
                                <div className="d-flex align-items-center">
                                  <div className="text-uppercase">Order #{Order.orderId}</div>
                                  <div className="blue-label ms-auto text-uppercase">
                                    {Order.mode}
                                  </div>
                                </div>
                                <div className="fs-8"> {formatDate(Order.createdAt)}</div>

                              </div>
                            </div>
                            <div className="col-lg-8">
                              <div className="d-sm-flex align-items-sm-start justify-content-sm-between">
                                <div className="status">Status: {
                                  Order.status === '0' ? (<> Cancel </>) :
                                    Order.status === '1' ? 'Placed' :
                                      Order.status === '2' ? 'Accepted' :
                                        Order.status === '3' ? 'Packed' :
                                          Order.status === '4' ? 'Shipped' :
                                            Order.status === '5' ? 'Delivered' :
                                              'Unknown'
                                }</div>
                                <Link className="btn btn-primary text-uppercase" to={`/account/order/${userId}/${Order._id}`} >
                                  order info
                                </Link>
                              </div>
                              <div className="progressbar-track">
                                <ul className="progressbar">
                                  <li id="step-1" className={`text-muted ${Order.status === '1' && 'green'}`}>
                                    <span class="ri-gift-line" />
                                  </li>
                                  <li id="step-2" className={`text-muted ${Order.status === '2' && 'green'}`}>
                                    <span className="ri-check-line" />
                                  </li>
                                  <li id="step-3" className={`text-muted ${Order.status === '3' && 'green'}`}>
                                    <span className="ri-instance-line" />
                                  </li>
                                  <li id="step-4" className={`text-muted ${Order.status === '4' && 'green'}`}>
                                    <span className="ri-truck-line" />
                                  </li>
                                  <li id="step-5" className={`text-muted ${Order.status === '5' && 'green'}`}>
                                    <span className="ri-box-1-line" />
                                  </li>
                                </ul>
                                <div id="tracker" />
                              </div>
                            </div>
                          </div>
                        </div>


                      </>
                    ))
                    )}


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

export default Account