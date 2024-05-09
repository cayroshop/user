import React, { useState, useEffect } from 'react';
import AccountSidebar from '../components/AccountSidebar';
import { toast } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import getCookie from '../components/extra/getCookie';


const Accountprofile = () => {
  const [loading, setLoading] = useState(true); 
  const [SubmitLoading, setSubmitLoading] = useState(true); 
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    pincode: '',
    address: '',
    state: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/get-all-zones");
      console.log(response.data.Zones);
      setData(response.data.Zones);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData()

  }, []);

  const submitData = async () => {
    setSubmitLoading(false);
    const id = localStorage.getItem('userId');
    try {
      if (id) {

     
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
      if (!emailRegex.test(formData.email)) {
     
        toast.error('Invalid email format');
        return; 
      }

        await axiosInstance.put(`/update-profile/${id}`, formData);
        toast.success('Profile Updated!');

      }
    } catch (error) {
      console.error('Error On Profile:', error);
      console.log(formData);
      toast.error(error.response.data.message);
    } finally {
      setSubmitLoading(true);
    }

  };
 
  const fetchUserById = async () => {

 
    const token =  getCookie('token');

    const id = localStorage.getItem('userId');
    const credentials = {
      token: token,
      id: id,
    };

    try {
      const { data } = await axiosInstance.post('/auth-user', credentials);
      const { success, token, existingUser, message } = data;

      if (success) {
        setFormData((prevData) => ({
          ...prevData,
          username: existingUser.username || '',
          phone: existingUser.phone || '',
          email: existingUser.email || '',
          address: existingUser.address || '',
          pincode: existingUser.pincode || '',
          state: existingUser.state || '',
        }));

      }

      console.log('success', existingUser)

    } catch (error) {
      console.error('Error during login:', error);
 
      toast.error(error.response.data.message);

    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  useEffect(() => {
    fetchUserById();
  }, []);


  return (
    <>
      <Header />

      <Helmet>
        <title> Account Profile | {window.location.hostname}</title>
      </Helmet>

      <div className="user-dasboard whitesmoke" >

        <div className="container pt-4">
          <div className="row pb-4">

            <AccountSidebar />

            <div className="col-lg-9 my-lg-0 my-1">
              <div id="main-content" className="bg-white border">


                <h4 className="mb-2">My Profile</h4>


                {formData.phone ? (<>
                  <div className="card-body">
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Personal Details</h6>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          {" "}
                          <label className="mb-2 mt-2 d-block" htmlFor="username">Full Name</label>{" "}
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter full name"
                            value={formData.username}
                            onChange={(e) => {
                              const { name, value } = e.target;
                              if (name === "username") {
                        
                                if (/\d/.test(value)) {
                              
                                  toast.error("Numbers are not allowed in the Full Name");
                                 
                                  return; // Stop further execution
                                }
                              }
                              // Call handleChange with the event object
                              handleChange(e);
                            }}

                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          {" "}
                          <label className="mb-2 mt-2 d-block" htmlFor="eMail">Email</label>{" "}
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email ID"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          {" "}
                          <label className="mb-2 mt-2 d-block" htmlFor="phone">Phone</label>{" "}
                          <input
                            type="number"
                            className="form-control"
                            id="phone"
                            placeholder="Enter phone number"
                            name="phone"
                            value={formData.phone}
                            disabled
                          />
                        </div>
                      </div>

                  

                    </div>
                    <div className="row gutters">

                      
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                        <h6 className="mt-3 mb-2 text-primary">Address</h6>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          {" "}
                          <label className="mb-2 mt-2 d-block" htmlFor="state">state</label>{" "}
                          <select class="form-select" id="state" name="state" value={formData.state}  onChange={handleChange}  >
                              <option selected > {loading ? "Loading..." : "Select State"}</option>
                              {data.map(item => (
                                <option value={item._id} >{item.name}</option>
                              ))};


                            </select>
                        </div>
                      </div>


                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          {" "}
                          <label className="mb-2 mt-2 d-block" htmlFor="pincode">Pincode</label>{" "}
                          <input
                            type="number"
                            className="form-control"
                            id="pincode"
                            placeholder="Enter pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>


                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          {" "}
                          <label className="mb-2 mt-2 d-block" htmlFor="address">Full Address</label>
                          <textarea
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange}
                            maxLength={250}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                        <div className="text-right">
                          {" "}
                          <Link
                            to="/account"
                            id="submit"
                            name="submit"
                            className="btn btn-secondary"
                          >
                            Cancel
                          </Link>

                          {SubmitLoading ? (
                            <button
                              type="button"
                              id="submit"
                              name="submit"
                              className="btn btn-primary ms-2"
                              onClick={submitData} >
                              Update
                            </button>

                          ) : (

                            <button class="btn btn-primary ms-2" type="button" disabled>
                              <span class="ms-1">Loading...</span>
                              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>

                          )}

                        </div>
                      </div>
                    </div>
                  </div>
                </>) : (<>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="skeleton mb-3" style={{ height: 60, borderRadius: 2 }} />
                    </div>
                    <div className="col-md-6">
                      <div className="skeleton mb-3" style={{ height: 60, borderRadius: 2 }} />
                    </div>

                    <div className="col-md-6">
                      <div className="skeleton mb-3" style={{ height: 60, borderRadius: 2 }} />
                    </div>

                    <div className="col-md-6">
                      <div className="skeleton mb-3" style={{ height: 60, borderRadius: 2 }} />
                    </div>
                    <div className="p-3"></div>
                    <div className="col-md-6">
                      <div className="skeleton mb-3" style={{ height: 60, borderRadius: 2 }} />
                    </div>
                    <div className="col-md-6">
                      <div className="skeleton mb-3" style={{ height: 60, borderRadius: 2 }} />
                    </div>
                    <div className="d-flex gap-3">
                      <div className="skeleton mb-3" style={{ width: 80, height: 40, borderRadius: 2 }} />
                      <div className="skeleton mb-3" style={{ width: 80, height: 40, borderRadius: 2 }} />

                    </div>
                  </div>
                </>)}




              </div>
            </div>
          </div>
        </div>

      </div >



      <Footer />
    </>
  )
}

export default Accountprofile