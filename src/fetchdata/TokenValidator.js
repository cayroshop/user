// TokenValidator.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import axiosInstance from '../axiosInstance';
import getCookie from '../user/components/extra/getCookie';

const TokenValidator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
           
            const usertoken = getCookie('token');  
            
            if (usertoken) {
                try {
                    const response = await axiosInstance.get(`/validatetoken/${usertoken}`);

                    if (response.data.success) {
                       
                        dispatch(authActions.login());
                        
                    } else {
                       
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        toast.error("Token expired or invalid");
                    }
                } catch (error) {
                     
                    console.error('Error validating token:', error);
                    
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    toast.error("Error validating token");
                }
            }
        };

        validateToken();
    }, [dispatch]);

    return null;  
};

export default TokenValidator;






