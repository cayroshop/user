import React, { useState, useEffect, useContext, Component } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet';
import Header from '../components/Header'
import Footer from '../components/Footer';
import axiosInstance from '../../axiosInstance';

const Page = () => {
  const [loading, setloading] = useState(true);

  const [Page, setPage] = useState({});
  const { slug } = useParams();


  const getBlog = async () => {
    setloading(true);

    try {
      const { data } = await axiosInstance.get(`/admin/get-page/${slug}`);
      setPage(data.Mpage);

      // Delay the execution of buildScript by 1 secon
    }
    catch (error) {
      console.log(error);
      // toast.error("Error fetching Single Blog!");
    }finally{
      setloading(false);
    }
  };




  useEffect(() => {
    getBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <Header />
      <Helmet>
        <title>{Page.metaTitle}</title>
        <meta name="metaDescription" content={Page.meta_description} />

      </Helmet>



      <main className="page whitesmoke">
        {/* Header */}
        {/* Header */}
        {/* Blog Title */}
        <div className="py-4" >
          <div className="container d-lg-flex justify-content-between align-items-center py-2">
            <div className="pe-lg-4 text-center text-lg-start">
              <h1 className="h3 mb-0"> {!loading && Page.title} </h1>
            </div>
            <div className="pt-2 pt-lg-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-start">
                  <li className="breadcrumb-item">
                    <Link
                      className="text-nowrap"
                      to="/"
                      previewlistener="true"
                    >
                      <i className="ri-store-2-line" /> Home{" "}
                    </Link>
                  </li>


                </ol>
              </nav>
            </div>
          </div>
        </div>
        {/* Blog Title */}
        {/* Blog List */}
        <div className="container ">
          <div className="row g-10 pb-5">
            {/* Blog List */}
            <div className="col-lg-12">
              {/* Article */}

              {!loading ? (<> 
              <img src={Page.image} className="d-block w-100" />
              <br>
              </br>

              <div dangerouslySetInnerHTML={{ __html: Page.description }} />
              </>):(<>
           <h1> Loading....</h1>
               </>)}

            </div>
            {/* Blog List */}

          </div>
        </div>
        {/* Blog List*/}
      </main >




      <div
        className="site-cover site-cover-sm same-height overlay single-page d-none"

      > {Page.title}
        <div className="container">
          <div className="row same-height justify-content-center">
            <div className="col-md-6">
              <div className="post-entry text-center">
                <h1 className="mb-4">    {Page.title}</h1>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section d-none">

        <div className="container">

          <div dangerouslySetInnerHTML={{ __html: Page.description }} />


        </div>

      </div>

      <Footer />
    </>

  )
}

export default Page