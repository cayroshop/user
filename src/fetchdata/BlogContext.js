// BlogContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axiosInstance';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    const [AllProducts, setAllProducts] = useState([]);
    const [AllCategoriess, setAllCategoriess] = useState([]);

    const clearAllItemsInCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const [isLoading, setIsLoading] = useState(true);

    const [Headers, setHeaders] = useState([]);

    const [isHeader, setIsHeader] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    const [promoCodeInfo, setPromoCodeInfo] = useState([]); 

    const [promoCode, setPromoCode] = useState('');  
    const [discount, setDiscount] = useState(0);  

    const [mypromoCode, setmyPromoCode] = useState('');  

    const [totalAmount, setTotalAmount] = useState('');  

    const [PromoLoading, setPromoLoading] = useState(false);  

    const applyPromoCode = async (promoCode) => {
        setPromoLoading(true);
        try {
            
            const response = await axiosInstance.post('/apply-promo', { promoCode });

            const { discount } = response.data;  
            console.log('response.data', response.data);

    
            setPromoCode(promoCode);
            setmyPromoCode(promoCode)
            setDiscount(discount);
            setPromoCodeInfo(prevState => ({
                ...prevState,  
                ...response.data  
            }));
            getTotalAmount(response.data)
            toast.success('Promo code applied successfully');

            console.log('Promo code applied successfully');
            console.log('promoCodeInfo', promoCodeInfo);  

        } catch (error) {
            toast.error('Error applying promo code');

           
            console.error('Error applying promo code:', error);
        } finally {
            setPromoLoading(false);
        }

    };


    const base64Encode = (data) => {
        return btoa(JSON.stringify(data));
    };

    const base64Decode = (encodedData) => {
        return JSON.parse(atob(encodedData));
    };




    const getHeader = async () => {
        try {

            const { data } = await axiosInstance.get(`/home-data`);
            setHeaders(data.homeData);
            console.log('data', data.homeData);

            setIsHeader(false);
        }
        catch (error) {
            console.log(error);
            setIsHeader(false);
        }
    };



    const addItemToCart = async (item,qty) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

       
        if (existingItemIndex !== -1) {
 
 
 const updatedCartItems = [...cartItems];
 
  const proQTY =  await(updatedCartItems[existingItemIndex].quantity += qty);

 const  prostockQTY =  updatedCartItems[existingItemIndex].stock;

if(proQTY >= prostockQTY){
    console.log("proQTY",proQTY);
    console.log("prostockQTY",prostockQTY);
(updatedCartItems[existingItemIndex].quantity -= qty);

    toast.error("Product out of stock.");

}else{
    toast.success("Product Updated To Cart");

    updatedCartItems[existingItemIndex].quantity += qty;
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', base64Encode(updatedCartItems));
}
 
           
        } else {
       
            toast.success("Product Added To Cart");

            const itemWithQuantity = { ...item, quantity: qty };
            const newCartItems = [...cartItems, itemWithQuantity];
            setCartItems(newCartItems);
            localStorage.setItem('cartItems', base64Encode(newCartItems));
        }
    };

    const removeItemFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', base64Encode(updatedCartItems));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };


    const updateItemQuantity = (itemId, quantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
              if(quantity  <=  item.stock){
 
  const newQuantity = Math.max(quantity, 1);
  getTotalAmount(promoCodeInfo)
  return { ...item, quantity: newQuantity };
              }else{
                toast.error("Product out of stock.")
console.log(quantity)
              }
              
            }
            getTotalAmount(promoCodeInfo)
            return item;
        });
        setCartItems(updatedCartItems);

        localStorage.setItem('cartItems', base64Encode(updatedCartItems));

    };


    const getTotalUniqueItems = () => {
        const uniqueItems = new Set(cartItems.map(item => item.id));
        return uniqueItems.size;
    };

    const getTotalAmount = (promoCodeInfo) => {
        const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);


        let discountedAmount = total;

        if (promoCodeInfo) {
            if (String(promoCodeInfo.type) === 'percentage') {
                discountedAmount = Math.round(total * ((promoCodeInfo.discount * 100) / 100));
                discountedAmount = total - discountedAmount;
            } else if (String(promoCodeInfo.type) === 'fixed') {
                discountedAmount = total - promoCodeInfo.discount;
                if (discountedAmount < 0) {
                    discountedAmount = 0;
                }
            }
        }

        setTotalAmount(discountedAmount);
        console.log('total', total)

    };



    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };



    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');

        if (storedCartItems) {
            setCartItems(base64Decode(storedCartItems));
        } else {
            setCartItems([]);
        }

    }, []);

    const removePromoCode = () => {
        setPromoCode('');
        setDiscount(0);
        setPromoCodeInfo(null);
    };




    const getUserAllPro = async () => {
        try {
            const response = await axiosInstance.get(`/all-products/`);

            setAllProducts(response.data.products);
            console.log('setAllProducts', response.data.products)

        } catch (error) {
            console.error('Error fetching user products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getUserAllCat = async () => {
        try {
            const response = await axiosInstance.get(`/all-category/`);

            setAllCategoriess(response.data.categories);
        } catch (error) {
            console.error('Error fetching user category:', error);
        } finally {
            setIsLoading(false);
        }
    };




    const getUserBlogs = async () => {
     
    };


    useEffect(() => {
        getUserAllPro();
        getUserAllCat();
        getUserBlogs();
        getHeader();
        getTotalAmount()

    }, []);



    return (
        <BlogContext.Provider value={{
            isLoading, Headers, isHeader, cartItems, getTotalUniqueItems, addItemToCart, removeItemFromCart, clearCart, updateItemQuantity,
            getTotalAmount, AllCategoriess,
            getTotalItems, applyPromoCode, AllProducts, clearAllItemsInCart, promoCodeInfo, removePromoCode, mypromoCode, totalAmount
        }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlogContext = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlogContext must be used within a BlogProvider');
    }
    return context;
};
