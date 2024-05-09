import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Home from './user/pages/Home';
import About from './user/pages/About';
import Category from './user/pages/Category';
import Blog from './user/pages/Blog';
import AllBlogs from './user/pages/AllBlogs';
import Contact from './user/pages/Contact';
import UserLogin from './user/pages/UserLogin';
import UserSignup from './user/pages/UserSignup';
import MyBlogs from './user/pages/MyBlogs';
import CreateBlogs from './user/pages/CreateBlogs';
import Product from './user/pages/Product';
import Checkout from './user/pages/Checkout';
import AccountOrder from './user/pages/AccountOrder';
import AccountOrderView from './user/pages/AccountOrderView';
import Accountprofile from './user/pages/Accountprofile';
import AccountPassword from './user/pages/AccountPassword';
import AccountSupport from './user/pages/AccountSupport';
import Account from './user/pages/Account';
import CartPage from './user/pages/Cart';
import CompleteOrder from './user/pages/CompleteOrder';
import WishList from './user/pages/WishList';
import Comparsion from './user/pages/Comparsion';
import Page from './user/pages/Page';
import Cancel from './user/pages/Cancel';

import ErrorPage from './user/pages/ErrorPage';

import { Toaster } from "react-hot-toast";

import { BlogProvider } from './fetchdata/BlogContext';

import usePreventZoom from './helper/usePreventZoom';
import getCookie from './user/components/extra/getCookie';

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};


function App() {
  const location = useLocation(); // Get the current location from React Router
  // const isLoginFromLocalStorage = localStorage.getItem("token") ? true : false;
  const isLoginFromLocalStorage = getCookie('token') ? true : false;
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(isLoginFromLocalStorage);

  useEffect(() => {
    setIsUserAuthenticated(isLoginFromLocalStorage);
  }, [isLoginFromLocalStorage, location.pathname]);


  usePreventZoom();


  return (

    <>
      <BlogProvider>
        <Toaster />

        <Routes>

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<ErrorPage />} />

          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/login" element={<UserLogin updateAuthStatus={setIsUserAuthenticated} />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/page/:slug" element={<Page />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout updateAuthStatus={setIsUserAuthenticated} />} />
          <Route path="/cart" element={<CartPage />} />
          {/* <Route path="/complete-order" element={isUserAuthenticated ? <CompleteOrder /> : <Navigate to="/login" />} /> */}

          <Route path="/complete-order" element={<CompleteOrder />} />


          <Route path="/wishList" element={isUserAuthenticated ? <WishList /> : <Navigate to="/login" />} />

          <Route path="/comparsion" element={isUserAuthenticated ? <Comparsion /> : <Navigate to="/login" />} />

          <Route path="/account" element={isUserAuthenticated ? <Account /> : <Navigate to="/login" />} />
          <Route path="/account/order/:userId/:orderId" element={isUserAuthenticated ? <AccountOrderView /> : <Navigate to="/login" />} />

          <Route path="/account/orders" element={isUserAuthenticated ? <AccountOrder /> : <Navigate to="/login" />} />

          <Route path="/account/profile" element={isUserAuthenticated ? <Accountprofile /> : <Navigate to="/login" />} />
          <Route path="/account/password" element={isUserAuthenticated ? <AccountPassword /> : <Navigate to="/login" />} />
          <Route path="/account/support" element={isUserAuthenticated ? <AccountSupport /> : <Navigate to="/login" />} />

          <Route path="/cancel" element={<Cancel/>} />

          
          <Route path="/" element={<Home />} />

          <Route path="*" element={<ErrorPage />} />


        </Routes>
        <ScrollToTop />
      </BlogProvider>
    </>
  );
}

export default App;
