import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axiosInstance from '../../axiosInstance';

// import required modules
import { Pagination, Navigation,Autoplay } from 'swiper/modules';

import banner1 from '../assets_user/img/fullbanner1.webp';
import banner2 from '../assets_user/img/fullbanner2.webp';
import banner3 from '../assets_user/img/fullbanner3.webp';
import banner4 from '../assets_user/img/fullbanner4.webp';

import grid1 from '../assets_user/img/grid1.webp';
import grid2 from '../assets_user/img/grid2.webp';
import grid3 from '../assets_user/img/grid3.webp';
import grid4 from '../assets_user/img/grid4.webp';
import gridslide1 from '../assets_user/img/gridslide1.webp';
import gridslide2 from '../assets_user/img/gridslide2.webp';
import gridslide3 from '../assets_user/img/gridslide3.webp';
import gridslide4 from '../assets_user/img/gridslide4.webp';
import gridslide5 from '../assets_user/img/gridslide5.webp';

const Home = () => {

  const swiperRefLocal = useRef()

  const handleMouseEnter = () => {
      swiperRefLocal?.current?.swiper?.autoplay?.stop()
  };

  const handleMouseLeave = () => {
      swiperRefLocal?.current?.swiper?.autoplay?.start()
  };


  
  const [ratings, setRatings] = useState([]);

  const [layout, setLayout] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isProducts, setIsProducts] = useState(true);


  const [Products, setProducts] = useState([]);


  const getData = async () => {
    try {
      const { data } = await axiosInstance.get(`/home-layout-data`);
      setLayout(data.homeLayout);
      setIsLoading(false); // Set loading state to false in case of an error
      console.log('data', data);

    }
    catch (error) {
      console.log(error);
      toast.error("Error fetching Home layout!");
      setIsLoading(false); // Set loading state to false in case of an error
    }
  };

  const getRating = async () => {
    try {
      const { data } = await axiosInstance.get(`/all-rating`);
      setRatings(data.ratings);
      console.log('getRating', data)

    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    getData();
    getRating();
  }, []);



  const getProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/all-home-products");
      console.log("products", data);
      setProducts(data.products);
      setIsProducts(false); // Set loading state to false in case of an error
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsProducts(false); // Set loading state to false in case of an error
    }
  };


  useEffect(() => {
    getProducts();

  }, []);



  return (

    <>
      <Header />

      <Helmet>
        {Headers && Headers.meta_favicon && (
          <link rel="apple-touch-icon" href={Headers.meta_favicon} />
        )}
        {Headers && Headers.meta_title && (
          <>
            <title>{Headers.meta_title}</title>
            {Headers.meta_description && (
              <meta name="description" content={Headers.meta_description} />
            )}
          </>
        )}
      </Helmet>

      <main className="page whitesmoke">
        {/* Hero Section */}
        <div className="hero hero-swiper "    style={{ width: 1897, maxWidth: '100% ', height: 'auto', aspectRatio: "1897/591" }} >


          {isLoading ? (<>
            <div
              className="skeleton w-100"
              style={{ width: 1897, maxWidth: '100% ', height: 'auto', aspectRatio: "1897/591" }}

            ></div>
          </>) : (

<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

            <Swiper pagination={true} navigation={true} gap={'30'}  ref={swiperRefLocal}
 autoplay={{
              delay: 1500,
              pauseOnMouseEnter: true,
          }}
          
          loop={true} modules={[Pagination, Navigation,Autoplay]} className="swiper-wrapper" >

              {layout.home_slider && (
                <>
                  {layout.home_slider.map((image, index) => (
                    <SwiperSlide key={index} >

                      <img className="img-fluid w-100"
                        src={image}
                        alt="Product"
                      />
                    </SwiperSlide>

                  ))}
                </>
              )}




            </Swiper>
            </div>

          )}


        </div>
        {/* Hero Section */}
        {/* Benefits */}

        {/* <div className="benefits">
    <div className="container my-10">
      <div className="row g-4 g-lg-0 gx-lg-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="d-flex align-items-start">
            <span
              className="icon-shipping-boat text-accent me-4"
              style={{ fontSize: "3rem" }}
            />

<svg xmlns="http://www.w3.org/2000/svg" width="50" fill="#335599" class="mx-2" enable-background="new 0 0 66 66" viewBox="0 0 66 66"><path d="M56.1,29.8c-0.3-0.7-1.1-1.2-1.9-1.2h-7.4v7.4h12.1L56.1,29.8z M56.1,29.8c-0.3-0.7-1.1-1.2-1.9-1.2h-7.4v7.4h12.1
		L56.1,29.8z M62.2,41.3h1.1v-2.1c0-0.8-0.2-1.5-0.5-2.1l-4-8.6c-0.8-1.8-2.6-2.9-4.6-2.9H43.8v24.4H47c0.3-2.9,2.8-5.1,5.7-5.1
		c2.9,0,5.4,2.2,5.7,5.1h2.6c1.3,0,2.3-1,2.3-2.3v-2.4h-1.1c-1.1,0-2-0.9-2-2C60.2,42.2,61.1,41.3,62.2,41.3z M49.1,40.4h-2.8
		c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8h2.8c0.4,0,0.8,0.3,0.8,0.8C49.8,40.1,49.5,40.4,49.1,40.4z M60.1,37.4h-14
		c-0.4,0-0.8-0.3-0.8-0.8v-8.9c0-0.4,0.3-0.8,0.8-0.8h8.1c1.4,0,2.6,0.8,3.2,2l3.4,7.2c0.1,0.2,0.1,0.5,0,0.7
		C60.6,37.3,60.4,37.4,60.1,37.4z M54.2,28.6h-7.4v7.4h12.1l-2.9-6.2C55.7,29,55,28.6,54.2,28.6z M56.1,29.8
		c-0.3-0.7-1.1-1.2-1.9-1.2h-7.4v7.4h12.1L56.1,29.8z M56.1,29.8c-0.3-0.7-1.1-1.2-1.9-1.2h-7.4v7.4h12.1L56.1,29.8z M53.9,50.4
		c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.7,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1
		c0.4,0.1,0.8-0.1,1.1-0.4c0.2-0.2,0.4-0.6,0.4-0.9C53.9,50.5,53.9,50.5,53.9,50.4z M53.9,50.4c-0.1-0.5-0.5-0.9-1-1
		c-0.1,0-0.1,0-0.2,0c-0.3,0-0.7,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.4
		c0.2-0.2,0.4-0.6,0.4-0.9C53.9,50.5,53.9,50.5,53.9,50.4z M53.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0
		c-0.3,0-0.7,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.4c0.2-0.2,0.4-0.6,0.4-0.9
		C53.9,50.5,53.9,50.5,53.9,50.4z M53.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.7,0.1-0.9,0.4
		c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.4c0.2-0.2,0.4-0.6,0.4-0.9C53.9,50.5,53.9,50.5,53.9,50.4z
		 M52.7,46.3c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2c2.4,0,4.2-1.9,4.2-4.2S55,46.3,52.7,46.3z M54.6,52.5
		c-0.5,0.5-1.2,0.8-1.9,0.8c-0.2,0-0.3,0-0.4,0c-1.2-0.2-2.1-1.1-2.3-2.3c-0.1-0.9,0.1-1.8,0.8-2.4c0.6-0.6,1.5-0.9,2.4-0.8
		c1.2,0.2,2.1,1.1,2.3,2.3C55.5,51,55.2,51.9,54.6,52.5z M52.9,49.4c-0.1,0-0.1,0-0.2,0c-0.3,0-0.7,0.1-0.9,0.4
		c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.4c0.2-0.2,0.4-0.6,0.4-0.9c0-0.1,0-0.1,0-0.2
		C53.8,49.9,53.4,49.4,52.9,49.4z M53.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.7,0.1-0.9,0.4
		c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.4c0.2-0.2,0.4-0.6,0.4-0.9C53.9,50.5,53.9,50.5,53.9,50.4z
		 M53.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.7,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1
		c0.4,0.1,0.8-0.1,1.1-0.4c0.2-0.2,0.4-0.6,0.4-0.9C53.9,50.5,53.9,50.5,53.9,50.4z M14.9,50.4c-0.1-0.5-0.5-0.9-1-1
		c-0.1,0-0.1,0-0.2,0c-0.3,0-0.6,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.3
		c0.2-0.2,0.4-0.6,0.4-0.9C14.9,50.5,14.9,50.5,14.9,50.4z M14.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0
		c-0.3,0-0.6,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.3c0.2-0.2,0.4-0.6,0.4-0.9
		C14.9,50.5,14.9,50.5,14.9,50.4z M14.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.6,0.1-0.9,0.4
		c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.3c0.2-0.2,0.4-0.6,0.4-0.9C14.9,50.5,14.9,50.5,14.9,50.4z
		 M14.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.6,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1
		c0.4,0.1,0.8-0.1,1.1-0.3c0.2-0.2,0.4-0.6,0.4-0.9C14.9,50.5,14.9,50.5,14.9,50.4z M17.8,49.9c-0.3-1.8-1.8-3.2-3.5-3.5
		c-0.2,0-0.4,0-0.7,0c-1.1,0-2.2,0.4-3,1.2c-1,1-1.4,2.3-1.2,3.7c0.3,1.8,1.8,3.2,3.5,3.5c1.4,0.2,2.7-0.2,3.7-1.2
		C17.6,52.6,18,51.3,17.8,49.9z M15.6,52.5c-0.5,0.5-1.2,0.8-1.9,0.8c-0.1,0-0.3,0-0.4,0c-1.2-0.2-2.1-1.1-2.3-2.3
		c-0.1-0.9,0.1-1.8,0.8-2.4c0.6-0.6,1.5-0.9,2.4-0.8c1.2,0.2,2.1,1.1,2.3,2.3C16.5,51,16.2,51.9,15.6,52.5z M13.8,49.4
		c-0.1,0-0.1,0-0.2,0c-0.3,0-0.6,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.3
		c0.2-0.2,0.4-0.6,0.4-0.9c0-0.1,0-0.1,0-0.2C14.8,49.9,14.3,49.4,13.8,49.4z M14.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0
		c-0.3,0-0.6,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.3c0.2-0.2,0.4-0.6,0.4-0.9
		C14.9,50.5,14.9,50.5,14.9,50.4z M14.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.6,0.1-0.9,0.4
		c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.3c0.2-0.2,0.4-0.6,0.4-0.9C14.9,50.5,14.9,50.5,14.9,50.4z
		 M14.9,50.4c-0.1-0.5-0.5-0.9-1-1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.6,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1
		c0.4,0.1,0.8-0.1,1.1-0.3c0.2-0.2,0.4-0.6,0.4-0.9C14.9,50.5,14.9,50.5,14.9,50.4z M14.9,50.4c-0.1-0.5-0.5-0.9-1-1
		c-0.1,0-0.1,0-0.2,0c-0.3,0-0.6,0.1-0.9,0.4c-0.3,0.3-0.4,0.7-0.3,1.1c0.1,0.5,0.5,1,1,1c0.4,0.1,0.8-0.1,1.1-0.3
		c0.2-0.2,0.4-0.6,0.4-0.9C14.9,50.5,14.9,50.5,14.9,50.4z M40,17.5h-7.5c0.1,0.5,0.2,1,0.2,1.6c0,5.2-4.2,9.5-9.5,9.5
		c-5.2,0-9.5-4.2-9.5-9.5c0-0.5,0.1-1.1,0.2-1.6H5.1c-1.3,0-2.3,1-2.3,2.3v27.8c0,1.3,1,2.3,2.3,2.3h2.9c0.1-1.3,0.7-2.5,1.6-3.4
		c1.3-1.3,3.1-1.9,5-1.6c1.2,0.2,2.3,0.8,3.2,1.6c0.8,0.8,1.4,1.9,1.6,3.2c0,0.1,0,0.2,0,0.2h23V19.8C42.3,18.6,41.3,17.5,40,17.5z
		 M23.2,11.2c-3.6,0-6.6,2.4-7.6,5.6v0c0,0.1,0,0.2-0.1,0.3c-0.2,0.6-0.3,1.3-0.3,2c0,4.4,3.6,8,8,8c4.4,0,8-3.6,8-8
		S27.6,11.2,23.2,11.2z M27.1,17.2l-5.2,5.2c-0.1,0.1-0.3,0.2-0.5,0.2s-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1
		c0.3-0.3,0.8-0.3,1.1,0l2.2,2.2l4.6-4.7c0.3-0.3,0.8-0.3,1.1,0C27.4,16.4,27.4,16.9,27.1,17.2z M62.2,42.8c-0.3,0-0.5,0.2-0.5,0.5
		s0.2,0.5,0.5,0.5h1.1v-0.9H62.2z"/></svg>

            <div className="d-flex flex-column">
              <h6 className="mt-1 mb-1 fs-md">Free Shipping</h6>
              <span className="text-body-secondary fs-ms">
                Free shipping on orders over 150₹
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="d-flex align-items-start">
            <span
              className="icon-support-24 text-accent me-4"
              style={{ fontSize: "3rem" }}
            />

            <svg xmlns="http://www.w3.org/2000/svg" fill="#335599" width="50" class="mx-2" viewBox="0 0 69 69"><path d="M64.145 64.988h-5.321v-6.863c0-3.94-2.116-7.63-5.513-9.625l-7.175-4.223c-1.644-2.035-1.599-2.127-1.905-2.298 0 0 0-.01-.01-.01-.647-.473-3.388-1.11-4.102-4.263 1.542-1.098 2.902-2.62 3.99-4.424h1.361a3.54 3.54 0 0 0 3.528-3.538v-1.088c2.056-.766 3.537-2.742 3.537-5.06 0-2.217-1.35-4.132-3.285-4.968-.029-.104-.226-7.748-7.317-11.862a2.754 2.754 0 0 0-1.653-3.094 16.243 16.243 0 0 0-12.114 0 2.742 2.742 0 0 0-1.653 3.104c-7.304 4.275-7.314 11.97-7.357 12.104 0 .05.01.1.02.151-4.769 2.807-2.758 10.058 2.792 10.058l1.058-.08h.01c1.088 3.678 3.205 6.802 5.835 8.687-.69 3.16-3.463 3.82-4.082 4.273-.01 0-.01.01-.02.01-.18.114-.242.194-2.55 3.135-2.663 1.262-3.462 1.565-4.625 2.267-.494.452-7.428 3.04-7.428 10.754v6.853H4.855a.749.749 0 0 0-.756.756c0 .413.332.756.756.756h59.29a.755.755 0 1 0 0-1.512zm-16.66-35.244a2.024 2.024 0 0 1-2.015 2.026h-.544c.403-.857.756-1.754 1.038-2.69.03 0 .06.02.1.02.021 0 .041-.01.051-.01l.998-.081c.131 0 .252-.02.373-.03v.765zm-24.58-11.56-.998.071c-.403 0-.796.06-1.179.141.388-4.077 2.594-7.948 6.48-10.28.824.855 2.018 1.086 3.034.655 6.202-2.52 8.506 1.97 10.985-.655 3.785 2.271 6.02 6.066 6.45 10.129-1.016-.153-.937.03-1.713.03-1.23-3.76-3.8-6.621-7.176-7.901l-.01-.01h-.01c-1.3-.535-2.731-.807-4.263-.807-5.24 0-9.671 3.303-11.46 8.638-.05 0-.09-.02-.14-.01zm.816 5.292c0-.766.07-1.532.182-2.278h.06c3.054 0 6.249-.988 9.07-2.822a18.186 18.186 0 0 0 2.802-2.258c2.016 2.59 5.312 4.092 9.07 4.092.011 0 .021-.01.031-.01.232 1.058.353 2.157.353 3.276 0 3.023-.766 5.895-2.026 8.294h-5.1a2.612 2.612 0 0 0-2.499-1.864h-1.481a2.628 2.628 0 0 0-2.62 2.62c0 1.441 1.178 2.62 2.62 2.62h1.481c1.18 0 2.177-.786 2.5-1.864h4.192c-7.184 10.41-18.635 2.393-18.635-9.806zM29.96 52.46 23.7 45.688l1.602-2.036 7.77 5.08-3.113 3.729zm-3.326-9.746c.11-.087 2.676-1.146 3.588-4.162 1.443.747 3.073 1.078 4.283 1.078.232 0 1.023-.048 1.089-.08.7-.067 2.123-.457 3.184-.988.932 3.046 3.467 4.052 3.568 4.132-.102.063-8.676 5.31-8.133 4.979l-7.58-4.959zm11.812 9.776-3.094-3.729 8.344-5.13 1.603 2.036-6.853 6.823z"/><path d="M31.703 24.796a.964.964 0 0 1-.967.977.964.964 0 0 1-.968-.977c0-.524.434-.958.968-.958s.967.434.967.958zm7.549 0a.974.974 0 0 1-.957.977.968.968 0 1 1 .957-.978z"/></svg>


            <div className="d-flex flex-column">
              <h6 className="mt-1 mb-1 fs-md">Online Support</h6>
              <span className="text-body-secondary fs-ms">
                Online support 24 hours a day
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="d-flex align-items-start">
            <span
              className="icon-coupon text-accent me-4"
              style={{ fontSize: "3rem" }}
            />
            
<svg xmlns="http://www.w3.org/2000/svg" fill="#335599" width="50" class="mx-2" enable-background="new 0 0 512 512" viewBox="0 0 512 512"><path d="M348.631,245.296c-53.323,0-96.705,43.381-96.705,96.704c0,53.321,43.382,96.702,96.705,96.702
		s96.705-43.381,96.705-96.702C445.336,288.677,401.954,245.296,348.631,245.296z M294.82,287.865
		c5.409-5.41,12.602-8.39,20.25-8.39c0.001,0,0.001,0,0.003,0c15.792,0,28.641,12.85,28.641,28.645
		c0,15.789-12.849,28.634-28.642,28.634s-28.642-12.845-28.642-28.634C286.431,300.469,289.411,293.275,294.82,287.865z
		 M296.886,393.743c-3.905-3.905-3.905-10.237,0-14.143l89.347-89.346c3.905-3.904,10.237-3.903,14.142,0
		c3.905,3.905,3.905,10.237,0,14.143l-89.347,89.346C303.051,401.078,296.886,393.743,296.886,393.743z M382.189,404.523
		c-15.792,0-28.641-12.85-28.641-28.644c0-7.647,2.979-14.839,8.389-20.249s12.602-8.391,20.25-8.391c0.001,0,0.001,0,0.003,0
		c15.792,0,28.641,12.848,28.641,28.64C410.831,391.674,397.982,404.523,382.189,404.523z"/><path d="M382.189 367.24C382.188 367.24 382.188 367.24 382.189 367.24c-2.308 0-4.477.899-6.109 2.531-1.633 1.633-2.532 3.803-2.532 6.108 0 4.766 3.876 8.644 8.641 8.644 4.765 0 8.642-3.878 8.642-8.644C390.831 371.116 386.954 367.24 382.189 367.24zM315.073 316.754c4.765 0 8.642-3.873 8.642-8.634 0-4.767-3.876-8.645-8.642-8.645 0 0 0 0-.001 0-2.308 0-4.477.898-6.108 2.531-1.633 1.633-2.532 3.804-2.532 6.113C306.431 312.881 310.308 316.754 315.073 316.754zM200.646 214.086c-3.007-1.557-5.021-4.529-5.354-7.898s1.063-6.678 3.708-8.792c9.411-7.524 14.809-18.588 14.809-30.354 0-21.523-17.503-39.033-39.019-39.033-21.527 0-39.041 17.51-39.041 39.033 0 11.772 5.4 22.834 14.817 30.349 2.649 2.114 4.047 5.426 3.714 8.799-.333 3.372-2.351 6.347-5.362 7.902-12.119 6.26-23.118 22.105-28.083 39.361h107.912C223.806 236.227 212.801 220.381 200.646 214.086z"/><path d="M231.926,342c0-64.351,52.354-116.704,116.705-116.704c50.043,0,92.825,31.663,109.378,76.006V109.452
		c0-27.019-21.981-49-49-49H102.991c-27.019,0-49,21.981-49,49v193.479c0,27.019,21.981,49,49,49h129.362
		C232.075,348.657,231.926,345.346,231.926,342z M271.969,127.008h125c5.523,0,10,4.478,10,10s-4.477,10-10,10h-125
		c-5.523,0-10-4.478-10-10S266.446,127.008,271.969,127.008z M271.969,179.008h125c5.523,0,10,4.478,10,10s-4.477,10-10,10h-125
		c-5.523,0-10-4.478-10-10S266.446,179.008,271.969,179.008z M101.105,270.078c-1.898-2.146-2.785-5.003-2.435-7.847
		c1.552-12.621,6.174-25.98,13.015-37.616c4.922-8.372,10.708-15.416,17.079-20.85c-8.377-10.365-13.016-23.224-13.016-36.725
		c0-32.551,26.486-59.033,59.041-59.033c32.543,0,59.019,26.482,59.019,59.033c0,13.502-4.641,26.365-13.023,36.738
		c16.917,14.498,27.725,38.76,30.111,58.472c0.344,2.84-0.546,5.692-2.444,7.834s-4.623,3.367-7.484,3.367H108.596
		C105.731,273.452,103.004,272.224,101.105,270.078z"/></svg>

            <div className="d-flex flex-column">
              <h6 className="mt-1 mb-1 fs-md">Member Discount</h6>
              <span className="text-body-secondary fs-ms">
                Discount for regular customers
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="d-flex align-items-start">
            <span
              className="icon-money-return text-accent me-4"
              style={{ fontSize: "3rem" }}
            />


<svg xmlns="http://www.w3.org/2000/svg"  width="50" class="mx-2"  fill="#335599" viewBox="0 0 512 512"><path d="M421.78 337.5c-.16-.39-.33-.77-.5-1.15a64.835 64.835 0 0 0-9.53-15.13C399.82 307.03 381.95 298 362 298c-35.84 0-65 29.16-65 65 0 2.88.19 5.72.55 8.5 4.18 31.84 31.49 56.5 64.45 56.5 35.84 0 65-29.16 65-65 0-9.05-1.86-17.67-5.22-25.5zM379 396h-45c-5.52 0-10-4.48-10-10s4.48-10 10-10h45c7.17 0 13-5.83 13-13s-5.83-13-13-13h-35.01v5.45c0 1.61-1.8 2.56-3.13 1.66l-22.18-15.07c-1.17-.8-1.17-2.52 0-3.31l22.18-15.07c1.33-.9 3.13.05 3.13 1.65V330H379c18.2 0 33 14.8 33 33s-14.8 33-33 33z"/><path d="M239.04 238.46c-18.77 0-34.03 15.26-34.03 34.03 0 18.76 15.26 34.02 34.03 34.02 18.76 0 34.02-15.26 34.02-34.02 0-18.77-15.26-34.03-34.02-34.03zm0 0c-18.77 0-34.03 15.26-34.03 34.03 0 18.76 15.26 34.02 34.03 34.02 18.76 0 34.02-15.26 34.02-34.02 0-18.77-15.26-34.03-34.02-34.03zm147.98-64.03H92.01c-13.64 0-24.73 11.09-24.73 24.73v147.61c0 13.64 11.09 24.73 24.73 24.73h185.41c-.28-2.8-.42-5.63-.42-8.5 0-46.87 38.13-85 85-85 18.57 0 35.76 5.98 49.75 16.12v-94.96c0-13.64-11.09-24.73-24.73-24.73zM239.04 326.51c-29.8 0-54.03-24.23-54.03-54.02 0-29.8 24.23-54.03 54.03-54.03 29.79 0 54.02 24.23 54.02 54.03 0 29.79-24.23 54.02-54.02 54.02zm0-88.05c-18.77 0-34.03 15.26-34.03 34.03 0 18.76 15.26 34.02 34.03 34.02 18.76 0 34.02-15.26 34.02-34.02 0-18.77-15.26-34.03-34.02-34.03zm182.24 97.89c.17.38.34.76.5 1.15-.17.02-.34.03-.51.04 0-.1.01-.2.01-.3v-.89z"/><path d="M444.72 165.23v147.61c0 5.72-1.96 11-5.25 15.2-4.41-9.75-10.62-18.52-18.19-25.9V189.63c0-13.64-11.09-24.73-24.73-24.73H101.54c-.43 0-.86.02-1.28.04.16-13.5 11.18-24.44 24.72-24.44h295.01c13.64 0 24.73 11.09 24.73 24.73z"/></svg>

            <div className="d-flex flex-column">
              <h6 className="mt-1 mb-1 fs-md">Money Return</h6>
              <span className="text-body-secondary fs-ms">
                Moneyback guarantee under 14 days
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}

        {/* Benefits */}



        {/* Product Cards */}
        <div className="container pt-0 pt-sm-5">
          {/* Heading */}
          <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
            <h2 className="h3 mb-0 me-2">Trending products</h2>
            <div className="ms-n4">
              {/* <a
                className="btn btn-sm btn-link link-info link-hover-primary d-flex align-items-center bg-btn-new"
                href="#"
              >
                View All
                <i className="ri-arrow-right-line ms-1" />
              </a> */}
            </div>
          </div>
          {/* Heading */}
          {/* Product Cards */}
          <div className="row pt-2 mx-n2 hero-swiper hide-desk-arrow">
            {/* Product Card */}
            <Swiper breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10, // Set the gap between slides for window width <= 400px
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20, // Set the gap between slides for window width <= 768px
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 25, // Set the gap between slides for window width <= 992px
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 20, // Set the gap between slides for window width <= 1200px
              },
            }}
              pagination={true} modules={[Pagination, Navigation]} className="swiper-wrapper" >



              {isProducts ? (Array.from({ length: 7 }).map((_, index) => (
                <SwiperSlide key={index} >
                  <div
                    className="card-1 skeleton"
                    style={{ height: 371, borderRadius: 10 }}
                  ></div>

                </SwiperSlide>
              ))
              ) : (layout.trending_product && (
                <>
                  {Products.map((product, index) => {

                    const productRatings = ratings.filter(rating => rating.productId === product._id);
                    const totalRatings = productRatings.length;
                    const totalRatingValue = productRatings.reduce((acc, curr) => acc + curr.rating, 0);
                    const averageRating = totalRatings > 0 ? totalRatingValue / totalRatings : 0;

                    return (

                      layout.trending_product.includes(product._id) && (<>

                        <SwiperSlide key={index}>

                          <div className="card card-product h-100">
                            {/* Badges */}
                            <div className="product-badges">
                              <span className="badge bg-danger">12%</span>
                              <span className="badge bg-success">Top</span>
                            </div>
                            {/* Badges */}
                            {/* Buttons */}
                            <div className="product-buttons">
                              <button
                                className="btn-product btn-wishlist"
                                type="button"
                                data-bs-toggle="button"
                                title="Add to wishlist"
                              >
                                <i className="ri-heart-line" />
                              </button>
                              <a
                                className="btn-product btn-compare"
                                href="#"
                                title="Compare product"
                              >
                                <i className="ri-repeat-line" />
                              </a>
                              <a
                                className="btn-product btn-view"
                                href="#modal-quick-view"
                                data-bs-toggle="modal"
                                title="Quick preview"
                              >
                                <i className="ri-eye-line" />
                              </a>
                            </div>
                            {/* Buttons */}
                            {/* Preview Image */}
                            <Link
                              className="card-img-top d-block overflow-hidden flex-shrink-0"
                              to={`/product/${product._id}`}
                            >
                              <img
                                className="img-fluid"
                                src={product.pImage}
                                alt={` ${product.title} Product Image`}
                              />
                            </Link>
                            {/* Preview Image */}
                            <div className="card-body d-flex flex-column align-items-start flex-grow-1 rounded-bottom h-100 py-3">
                              {/* Product Category */}

                              {/* Product Category */}
                              {/* Product Title */}
                              <h3 className="product-title flex-grow-1">
                                <Link to={`/product/${product._id}`} > {product.title} </Link>
                              </h3>
                              {/* Product Title */}
                              {/* Star Rating */}
                              <span className={`star-rating star-${Math.round(averageRating) * 2}`} />

                              {/* Star Rating */}
                              {/* Product Price */}
                              <div className="product-price">
                                <span className="text-danger fs-5">
                                  ₹{product.salePrice}
                                  <del className="text-body-secondary ms-1">
                                    <small>₹{product.regularPrice} </small>
                                  </del>
                                </span>
                              </div>
                              {/* Product Price */}
                              {/* Product Meta */}
                              <span className="product-meta text-body-secondary fs-xs">
                                {" "}
                                {product.stock === 0 ? (
                                  <span className="text-danger" >Out of stock</span>
                                ) : product.stock <= 10 ? (
                                  <span>Only {product.stock} left in stock</span>
                                ) : (
                                  <></>
                                )}
                              </span>
                              {/* Product Meta */}
                            </div>
                            {/* Product Addon */}

                            {/* Product Addon */}
                          </div>
                          {/* Product Cards */}

                        </SwiperSlide>

                      </>)


                    )
                  }
                  )}




                </>
              )
              )}




            </Swiper >

          </div>
          {/* Product Cards */}
        </div>
        {/* Product Cards */}

        <div className="container pt-0 pt-sm-5">

          <div className="row g-3 py-0">

            {isLoading ? (<>
              <div
                className="col-md-6 skeleton "
                style={{ height: 380, borderRadius: 10 }}
              ></div>  <div
                className="col-md-6 skeleton "
                style={{ height: 380, borderRadius: 10 }}
              ></div>
            </>) : (layout.trending_product_banner && (
              <>

                {layout.trending_product_banner.map((banner, index) => (

                  <Link class="col-md-6" key={index} to={banner.imageUrlInput} >
                    <img src={banner.imageInput} className="w-100 rounded" />
                  </Link>
                ))}
              </>
            )
            )}

          </div>

          <div className="row mt-4 pt-2 mx-n2 hero-swiper ">
            <Swiper breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10, // Set the gap between slides for window width <= 400px
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20, // Set the gap between slides for window width <= 768px
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 25, // Set the gap between slides for window width <= 992px
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 25, // Set the gap between slides for window width <= 1200px
              },
            }}
              navigation={false} pagination={true} modules={[Pagination, Navigation]} className="swiper-wrapper" >


              {isLoading ? (Array.from({ length: 7 }).map((_, index) => (
                <SwiperSlide key={index} >
                  <div
                    className="card-1 skeleton"
                    style={{ height: 355, borderRadius: 10 }}
                  ></div>

                </SwiperSlide>
              ))
              ) : (layout.trending_product_carousal && (
                <>

                  {layout.trending_product_carousal.map((carousal, index) => (

                    <SwiperSlide key={index}>
                      <Link to={carousal.imageUrlInput}  >
                        <img src={carousal.imageInput} className="w-100 rounded" />
                      </Link>

                    </SwiperSlide>

                  ))}
                </>
              )
              )}



            </Swiper>

          </div>

        </div>

        {/* Product Cards */}
        <div className="container pt-0 pt-sm-5">
          {/* Heading */}
          <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
            <h2 className="h3 mb-0 me-2">Best Selling Products</h2>
            <div className="ms-n4">
              {/* <a
                className="btn btn-sm btn-link link-info link-hover-primary d-flex align-items-center bg-btn-new"
                href="#"
              >
                View All
                <i className="ri-arrow-right-line ms-1" />
              </a> */}
            </div>
          </div>
          {/* Heading */}
          {/* Product Cards */}


          <div className="row pt-2 mx-n2 hero-swiper hide-desk-arrow">
            {/* Product Card */}
            <Swiper breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10, // Set the gap between slides for window width <= 400px
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20, // Set the gap between slides for window width <= 768px
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 25, // Set the gap between slides for window width <= 992px
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 25, // Set the gap between slides for window width <= 1200px
              },
            }}
              pagination={true} modules={[Pagination, Navigation]} className="swiper-wrapper" >



              {isProducts ? (Array.from({ length: 7 }).map((_, index) => (
                <SwiperSlide key={index} >
                  <div
                    className="card-1 skeleton"
                    style={{ height: 371, borderRadius: 10 }}
                  ></div>

                </SwiperSlide>
              ))
              ) : (layout.best_selling_laptop && (
                <>
                  {Products.map((product, index) => {
                    const productRatings = ratings.filter(rating => rating.productId === product._id);
                    const totalRatings = productRatings.length;
                    const totalRatingValue = productRatings.reduce((acc, curr) => acc + curr.rating, 0);
                    const averageRating = totalRatings > 0 ? totalRatingValue / totalRatings : 0;


                    return (
                      layout.best_selling_laptop.includes(product._id) && (<>

                        <SwiperSlide key={index}>

                          <div className="card card-product h-100">
                            {/* Badges */}
                            <div className="product-badges">
                              <span className="badge bg-danger">12%</span>
                              <span className="badge bg-success">Top</span>
                            </div>
                            {/* Badges */}
                            {/* Buttons */}
                            <div className="product-buttons">
                              <button
                                className="btn-product btn-wishlist"
                                type="button"
                                data-bs-toggle="button"
                                title="Add to wishlist"
                              >
                                <i className="ri-heart-line" />
                              </button>
                              <a
                                className="btn-product btn-compare"
                                href="#"
                                title="Compare product"
                              >
                                <i className="ri-repeat-line" />
                              </a>
                              <a
                                className="btn-product btn-view"
                                href="#modal-quick-view"
                                data-bs-toggle="modal"
                                title="Quick preview"
                              >
                                <i className="ri-eye-line" />
                              </a>
                            </div>
                            {/* Buttons */}
                            {/* Preview Image */}
                            <Link
                              className="card-img-top d-block overflow-hidden flex-shrink-0"
                              to={`/product/${product._id}`}
                            >
                              <img
                                className="img-fluid"
                                src={product.pImage}
                                alt={` ${product.title} Product Image`}
                              />
                            </Link>
                            {/* Preview Image */}
                            <div className="card-body d-flex flex-column align-items-start flex-grow-1 rounded-bottom h-100 py-3">
                              {/* Product Category */}

                              {/* Product Category */}
                              {/* Product Title */}
                              <h3 className="product-title flex-grow-1">
                                <Link to={`/product/${product._id}`} > {product.title} </Link>
                              </h3>
                              {/* Product Title */}
                              {/* Star Rating */}
                              <span className={`star-rating star-${Math.round(averageRating) * 2}`} />

                              {/* Star Rating */}
                              {/* Product Price */}
                              <div className="product-price">
                                <span className="text-danger fs-5">
                                  ₹{product.salePrice}
                                  <del className="text-body-secondary ms-1">
                                    <small>₹{product.regularPrice} </small>
                                  </del>
                                </span>
                              </div>
                              {/* Product Price */}
                              {/* Product Meta */}
                              <span className="product-meta text-body-secondary fs-xs">

                                {product.stock === 0 ? (
                                  <span className="text-danger" >Out of stock</span>
                                ) : product.stock <= 10 ? (
                                  <span>Only {product.stock} left in stock</span>
                                ) : (
                                  <></>
                                )}

                              </span>
                              {/* Product Meta */}
                            </div>
                            {/* Product Addon */}

                            {/* Product Addon */}
                          </div>
                          {/* Product Cards */}

                        </SwiperSlide>

                      </>)


                    )
                  })}




                </>
              )
              )}




            </Swiper >

          </div>


          {/* Product Cards */}
        </div>
        {/* Product Cards */}



        {/* Banner */}
        <div className="container py-4 py-lg-10">
          <div className="row">

            {isLoading ? (<>
              <div
                className="col skeleton "
                style={{ height: 380, borderRadius: 10 }}
              ></div>
            </>) : (layout.latest_product_banner && (
              <>

                <div className="col">
                  <div
                    className="row justify-content-between align-items-center overflow-hidden border rounded-1"
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="py-4 my-2 my-md-0 py-md-5 px-4 ms-md-3 text-center text-sm-start col-md-7">
                      <h6 className="fs-xs text-accent text-uppercase mb-2">
                        Weekend Discount
                      </h6>
                      <h3 className="fw-medium mb-2">{layout.collection_heading || ''}</h3>
                      <h6 className="fs-base fw-normal mb-4">
                        {layout.collection_paragraph || ''}
                      </h6>
                      <Link className="btn btn-primary btn-shadow" to={layout.collection_url || ''}>
                        Shop Now
                      </Link>
                    </div>
                    <img
                      className="col-md-4 my-4"
                      src={layout.collection_img || ''}
                      alt="Shop Converse"
                      width={'100%'}
                    />
                  </div>
                </div>
              </>
            )
            )}



          </div>
        </div>
        {/* Banner */}



        {/* Product Cards */}
        <div className="container pt-0 pt-sm-5">
          {/* Heading */}
          <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
            <h2 className="h3 mb-0 me-2">Latest products</h2>
            <div className="ms-n4">
              {/* <a
                className="btn btn-sm btn-link link-info link-hover-primary d-flex align-items-center bg-btn-new"
                href="#"
              >
                View All
                <i className="ri-arrow-right-line ms-1" />
              </a> */}
            </div>
          </div>
          {/* Heading */}
          {/* Product Cards */}


          <div className="row pt-2 mx-n2 hero-swiper hide-desk-arrow">
            {/* Product Card */}
            <Swiper breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10, // Set the gap between slides for window width <= 400px
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20, // Set the gap between slides for window width <= 768px
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 25, // Set the gap between slides for window width <= 992px
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 25, // Set the gap between slides for window width <= 1200px
              },
            }}
              pagination={true} navigation={true} modules={[Pagination, Navigation]} className="swiper-wrapper" >



              {isProducts ? (Array.from({ length: 7 }).map((_, index) => (
                <SwiperSlide key={index} >
                  <div
                    className="card-1 skeleton"
                    style={{ height: 371, borderRadius: 10 }}
                  ></div>

                </SwiperSlide>
              ))
              ) : (layout.latest_product && (
                <>
                  {Products.map((product, index) => {
                    const productRatings = ratings.filter(rating => rating.productId === product._id);
                    const totalRatings = productRatings.length;
                    const totalRatingValue = productRatings.reduce((acc, curr) => acc + curr.rating, 0);
                    const averageRating = totalRatings > 0 ? totalRatingValue / totalRatings : 0;


                    return (
                      layout.latest_product.includes(product._id) && (<>

                        <SwiperSlide key={index}>

                          <div className="card card-product h-100">
                            {/* Badges */}
                            <div className="product-badges">
                              <span className="badge bg-danger">12%</span>
                              <span className="badge bg-success">Top</span>
                            </div>
                            {/* Badges */}
                            {/* Buttons */}
                            <div className="product-buttons">
                              <button
                                className="btn-product btn-wishlist"
                                type="button"
                                data-bs-toggle="button"
                                title="Add to wishlist"
                              >
                                <i className="ri-heart-line" />
                              </button>
                              <a
                                className="btn-product btn-compare"
                                href="#"
                                title="Compare product"
                              >
                                <i className="ri-repeat-line" />
                              </a>
                              <a
                                className="btn-product btn-view"
                                href="#modal-quick-view"
                                data-bs-toggle="modal"
                                title="Quick preview"
                              >
                                <i className="ri-eye-line" />
                              </a>
                            </div>
                            {/* Buttons */}
                            {/* Preview Image */}
                            <Link
                              className="card-img-top d-block overflow-hidden flex-shrink-0"
                              to={`/product/${product._id}`}
                            >
                              <img
                                className="img-fluid"
                                src={product.pImage}
                                alt={` ${product.title} Product Image`}
                              />
                            </Link>
                            {/* Preview Image */}
                            <div className="card-body d-flex flex-column align-items-start flex-grow-1 rounded-bottom h-100 py-3">
                              {/* Product Category */}

                              {/* Product Category */}
                              {/* Product Title */}
                              <h3 className="product-title flex-grow-1">
                                <Link to={`/product/${product._id}`} > {product.title} </Link>
                              </h3>
                              {/* Product Title */}
                              {/* Star Rating */}
                              <span className={`star-rating star-${Math.round(averageRating) * 2}`} />

                              {/* Star Rating */}
                              {/* Product Price */}
                              <div className="product-price">
                                <span className="text-danger fs-5">
                                  ₹{product.salePrice}
                                  <del className="text-body-secondary ms-1">
                                    <small>₹{product.regularPrice} </small>
                                  </del>
                                </span>
                              </div>
                              {/* Product Price */}
                              {/* Product Meta */}
                              <span className="product-meta text-body-secondary fs-xs">
                                {" "}
                                {product.stock === 0 ? (
                                  <span className="text-danger" >Out of stock</span>
                                ) : product.stock <= 10 ? (
                                  <span>Only {product.stock} left in stock</span>
                                ) : (
                                  <></>
                                )}

                              </span>
                              {/* Product Meta */}
                            </div>
                            {/* Product Addon */}

                            {/* Product Addon */}
                          </div>
                          {/* Product Cards */}

                        </SwiperSlide>

                      </>)


                    )
                  })}




                </>
              )
              )}




            </Swiper >

          </div>


          {/* Product Cards */}
        </div>
        {/* Product Cards */}


        <div className="container pt-0 pt-sm-5">

          <div className="row g-3 py-0">

            {isLoading ? (<>
              <div
                className="col-md-6 skeleton "
                style={{ height: 380, borderRadius: 10 }}
              ></div>  <div
                className="col-md-6 skeleton "
                style={{ height: 380, borderRadius: 10 }}
              ></div>
            </>) : (layout.latest_product_banner && (
              <>

                {layout.latest_product_banner.map((banner, index) => (

                  <Link class="col-6" key={index} to={banner.imageUrlInput} >
                    <img src={banner.imageInput} className="w-100 rounded" />
                  </Link>
                ))}
              </>
            )
            )}

          </div>

          <div className="row mt-4 pt-2 mx-n2 hero-swiper ">
            <Swiper breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10, // Set the gap between slides for window width <= 400px
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20, // Set the gap between slides for window width <= 768px
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 25, // Set the gap between slides for window width <= 992px
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 25, // Set the gap between slides for window width <= 1200px
              },
            }}
              navigation={false} pagination={true} modules={[Pagination, Navigation]} className="swiper-wrapper" >


              {isLoading ? (Array.from({ length: 7 }).map((_, index) => (
                <SwiperSlide key={index} >
                  <div
                    className="card-1 skeleton"
                    style={{ height: 355, borderRadius: 10 }}
                  ></div>

                </SwiperSlide>
              ))
              ) : (layout.latest_product_carousal && (
                <>

                  {layout.latest_product_carousal.map((carousal, index) => (

                    <SwiperSlide key={index}>
                      <Link to={carousal.imageUrlInput}  >
                        <img src={carousal.imageInput} className="w-100 rounded" />
                      </Link>

                    </SwiperSlide>

                  ))}
                </>
              )
              )}



            </Swiper>

          </div>

        </div>





        {/* Product Cards */}
        <div className="container pt-0 pt-sm-5">
          {/* Heading */}
          <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
            <h2 className="h3 mb-0 me-2">New Product Arrivals</h2>
            {/* <div className="ms-n4">
              <a
                className="btn btn-sm btn-link link-info link-hover-primary d-flex align-items-center bg-btn-new"
                href="#"
              >
                View All
                <i className="ri-arrow-right-line ms-1" />
              </a>
            </div> */}
          </div>
          {/* Heading */}
          {/* Product Cards */}

          <div className="row pt-2 mx-n2 hero-swiper hide-desk-arrow">
            {/* Product Card */}
            <Swiper breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10, // Set the gap between slides for window width <= 400px
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20, // Set the gap between slides for window width <= 768px
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 25, // Set the gap between slides for window width <= 992px
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 25, // Set the gap between slides for window width <= 1200px
              },
            }}
              pagination={true} modules={[Pagination, Navigation]} className="swiper-wrapper" >



              {isProducts ? (Array.from({ length: 7 }).map((_, index) => (
                <SwiperSlide key={index} >
                  <div
                    className="card-1 skeleton"
                    style={{ height: 371, borderRadius: 10 }}
                  ></div>

                </SwiperSlide>
              ))
              ) : (layout.best_selling_smartphone && (
                <>
                  {Products.map((product, index) => {
                    const productRatings = ratings.filter(rating => rating.productId === product._id);
                    const totalRatings = productRatings.length;
                    const totalRatingValue = productRatings.reduce((acc, curr) => acc + curr.rating, 0);
                    const averageRating = totalRatings > 0 ? totalRatingValue / totalRatings : 0;


                    return (

                      layout.best_selling_smartphone.includes(product._id) && (<>

                        <SwiperSlide key={index}>

                          <div className="card card-product h-100">
                            {/* Badges */}
                            <div className="product-badges">
                              <span className="badge bg-danger">12%</span>
                              <span className="badge bg-success">Top</span>
                            </div>
                            {/* Badges */}
                            {/* Buttons */}
                            <div className="product-buttons">
                              <button
                                className="btn-product btn-wishlist"
                                type="button"
                                data-bs-toggle="button"
                                title="Add to wishlist"
                              >
                                <i className="ri-heart-line" />
                              </button>
                              <a
                                className="btn-product btn-compare"
                                href="#"
                                title="Compare product"
                              >
                                <i className="ri-repeat-line" />
                              </a>
                              <a
                                className="btn-product btn-view"
                                href="#modal-quick-view"
                                data-bs-toggle="modal"
                                title="Quick preview"
                              >
                                <i className="ri-eye-line" />
                              </a>
                            </div>
                            {/* Buttons */}
                            {/* Preview Image */}
                            <Link
                              className="card-img-top d-block overflow-hidden flex-shrink-0"
                              to={`/product/${product._id}`}
                            >
                              <img
                                className="img-fluid"
                                src={product.pImage}
                                alt={` ${product.title} Product Image`}
                              />
                            </Link>
                            {/* Preview Image */}
                            <div className="card-body d-flex flex-column align-items-start flex-grow-1 rounded-bottom h-100 py-3">
                              {/* Product Category */}

                              {/* Product Category */}
                              {/* Product Title */}
                              <h3 className="product-title flex-grow-1">
                                <Link to={`/product/${product._id}`} > {product.title} </Link>
                              </h3>
                              {/* Product Title */}
                              {/* Star Rating */}
                              <span className={`star-rating star-${Math.round(averageRating) * 2}`} />
                              {/* Star Rating */}
                              {/* Product Price */}
                              <div className="product-price">
                                <span className="text-danger fs-5">
                                  ₹{product.salePrice}
                                  <del className="text-body-secondary ms-1">
                                    <small>₹{product.regularPrice} </small>
                                  </del>
                                </span>
                              </div>
                              {/* Product Price */}
                              {/* Product Meta */}
                              <span className="product-meta text-body-secondary fs-xs">
                                {" "}
                                {product.stock === 0 ? (
                                  <span className="text-danger" >Out of stock</span>
                                ) : product.stock <= 10 ? (
                                  <span>Only {product.stock} left in stock</span>
                                ) : (
                                  <></>
                                )}

                              </span>
                              {/* Product Meta */}
                            </div>
                            {/* Product Addon */}

                            {/* Product Addon */}
                          </div>
                          {/* Product Cards */}

                        </SwiperSlide>

                      </>)


                    )
                  })}




                </>
              )
              )}




            </Swiper >

          </div>


          {/* Product Cards */}
        </div>
        {/* Product Cards */}


        {/* Brand Slider */}

        {/* <div className="barnd-logos py-4 py-lg-10">
    <div className="container">
      <div className="row">
        
        <div className="barnd-swiper">

        <Swiper     breakpoints={{
    300: {
      slidesPerView: 2,
      spaceBetween: 10,  
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,  
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 25,  
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 25,  
    },
  }} className="swiper-wrapper" >
           <SwiperSlide>
           <a className="d-block bg-white py-4 py-sm-3 px-2" href="#">
                    <img
                      className="d-block mx-auto"
                      src="/assets/front_img/shop/brands/01.png"
                      style={{ width: 165 }}
                      alt="Brand Logo"
                    />
                  </a>
           </SwiperSlide>

           <SwiperSlide>
           <a className="d-block bg-white py-4 py-sm-3 px-2" href="#">
                    <img
                      className="d-block mx-auto"
                      src="/assets/front_img/shop/brands/02.png"
                      style={{ width: 165 }}
                      alt="Brand Logo"
                    />
                  </a>
           </SwiperSlide>

           <SwiperSlide>
           <a className="d-block bg-white py-4 py-sm-3 px-2" href="#">
                    <img
                      className="d-block mx-auto"
                      src="/assets/front_img/shop/brands/03.png"
                      style={{ width: 165 }}
                      alt="Brand Logo"
                    />
                  </a>
           </SwiperSlide>

           <SwiperSlide>
           <a className="d-block bg-white py-4 py-sm-3 px-2" href="#">
                    <img
                      className="d-block mx-auto"
                      src="/assets/front_img/shop/brands/04.png"
                      style={{ width: 165 }}
                      alt="Brand Logo"
                    />
                  </a>
           </SwiperSlide>


           <SwiperSlide>
           <a className="d-block bg-white py-4 py-sm-3 px-2" href="#">
                    <img
                      className="d-block mx-auto"
                      src="/assets/front_img/shop/brands/05.png"
                      style={{ width: 165 }}
                      alt="Brand Logo"
                    />
                  </a>
           </SwiperSlide>

           <SwiperSlide>
           <a className="d-block bg-white py-4 py-sm-3 px-2" href="#">
                    <img
                      className="d-block mx-auto"
                      src="/assets/front_img/shop/brands/06.png"
                      style={{ width: 165 }}
                      alt="Brand Logo"
                    />
                  </a>
           </SwiperSlide>

           <SwiperSlide>
           <a className="d-block bg-white py-4 py-sm-3 px-2" href="#">
                    <img
                      className="d-block mx-auto"
                      src="/assets/front_img/shop/brands/07.png"
                      style={{ width: 165 }}
                      alt="Brand Logo"
                    />
                  </a>
           </SwiperSlide>


           <SwiperSlide>
           <a className="d-block bg-white py-4 py-sm-3 px-2" href="#">
                    <img
                      className="d-block mx-auto"
                      src="/assets/front_img/shop/brands/08.png"
                      style={{ width: 165 }}
                      alt="Brand Logo"
                    />
                  </a>
           </SwiperSlide>



           </Swiper >



        </div>

      </div>
    </div>
  </div> */}

        {/* Brand Slider */}


        {/* Product Widgets */}

        {/* Product Widgets */}
      </main>


      <Footer />

    </>
  )
}

export default Home