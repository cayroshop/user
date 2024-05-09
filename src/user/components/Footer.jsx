import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useBlogContext } from '../../fetchdata/BlogContext';
import axios from 'axios';

const Footer = () => {


  const { Headers, isHeader, cartItems, AllProducts, AllCategoriess } = useBlogContext();


  return (

    <>

      {/* Footer */}
      <footer
        className="footer"
        style={{ backgroundColor: "var(--bs-accent)" }}
      >
        <div className="footer-top py-4 py-lg-10 border-top">
          <div className="container">
            <div className="row g-4 g-lg-10">
              <div className="col-lg-8">
                <div className="row g-4">
                  {isHeader
                    ? // Display loading skeletons while data is being fetched
                    Array.from({ length: 8 }).map((_, index) => (
                      <div className="nav-item" key={index}>
                        <div
                          className="skeleton mt-1"
                          style={{
                            height: 22,
                            width: 100,
                            borderRadius: 5,
                          }}
                        ></div>
                      </div>
                    ))
                    :
                    (Headers.footer.map((item, index) => (
                      <div className="col-12 col-md" key={index}>
                        <div className="widget widget-links">
                          <h3 className="widget-title text-white">{item.text}</h3>
                          <ul className="widget-list">
                            {item.children.map((childItem, childIndex) => (
                              <li className="widget-list-item" key={childIndex}>
                                <Link className="widget-list-link text-white" to={childItem.link}>
                                  {childItem.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )))
                  }

                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <h6 className="mb-2 text-white">Contact Us</h6>


                </div>
                <div className="mb-4">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <i
                        className="text-primary ri-customer-service-2-line"
                        style={{ fontSize: "2.5rem" }}
                      />
                    </div>
                    {!isHeader && (
                      <div className="col">
                        <h6 className="mb-0 text-white">24/7 Tech Support</h6>
                        <a href={`tel:+91${Headers.phone}`} className="nav-link-base text-white">
                          +91 {Headers.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="row">
                    <div className="col-auto">
                      <i
                        className="text-primary ri-map-pin-line"
                        style={{ fontSize: "2.5rem" }}
                      />
                    </div>
                    {!isHeader && (<div className="col">
                      <h6 className="mb-1 font-weight-bold text-white">Address Info</h6>
                      <span className="text-white">  {Headers.address}
                      </span>
                    </div>)}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="row">
                    <div className="col-auto">
                      <i
                        className="text-primary ri-mail-line"
                        style={{ fontSize: "2.5rem" }}
                      />
                    </div>
                    {!isHeader && (
                      <div className="col">
                        <h6 className="mb-0 text-white">24/7 Email Support</h6>
                        <a href={`mailto:${Headers.email}`} className="nav-link-base text-white">
                          {Headers.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom border-top py-4">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-lg-3 text-center text-lg-start">
                <ul className="list-inline mb-0 d-none">
                  <li className="list-inline-item">
                    <a className="link-accent fs-xl" href="#">
                      <i className="ri-facebook-line" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="link-danger fs-xl" href="#">
                      <i className="ri-google-line" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="link-info fs-xl" href="#">
                      <i className="ri-twitter-line" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-lg-6 text-center">
                <p href="https://seotowebdesign.com/" className="nav-link-base fs-sm text-white" >
                  {!isHeader && (Headers.footer_credit)} | Design by <a href="https://seotowebdesign.com/" target="blank"> Seo To Webdesign </a>
                </p>
              </div>

              {/* <div className="col-12 col-lg-3 text-center text-lg-end mt-3 mt-lg-0">
            <img
              className="d-inline-block align-middle"
              src="assets/img/shop/cards.png"
              width={246}
              alt="Cerdit Cards"
            />
          </div> */}


            </div>
          </div>
        </div>
      </footer>
    </>



  )
}

export default Footer