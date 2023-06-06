"use client"

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

const Context = createContext();

export const StateContext = ({ children }) => {

  const [screenSize, setScreenSize] = useState(undefined);
  const cartContainer = useRef()
  const [displayCart, setDisplayCart] = useState(true);
  const [loading, setLoading] = useState(false);

  const [customOrder, setCustomOrder] = useState([]);
  const [cart, setCart] = useState(typeof localStorage === 'object' && JSON.parse(localStorage.getItem('cart')) || []);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [favorite, setFavorite] = useState(typeof localStorage === 'object' && JSON.parse(localStorage.getItem('favorite')) || []);
  const [authentication, setAuthentication] = useState(typeof localStorage === 'object' &&  JSON.parse(localStorage.getItem('authentication')) || {});
	const { email, phone, password } = authentication
	const customOrderContainer = useRef()
	const [profileData, setProfileData] = useState(typeof localStorage === 'object' && JSON.parse(localStorage.getItem('profile')) || {
		card : {
				cardType: '',
				card_holderName: '',
				card_number: '',
				CVC: '',
				card_exp_month: '',
				card_exp_year: '',
		},
		details : [ 
				{ id: 1, que: 'الاسم', ans: ''},
				{ id: 2, que: 'رقم الجوال', ans: phone},
				{ id: 3, que: 'البريد الالكتروني', ans: email},
				{ id: 4, que: 'كلمة المرور', ans: password},
		],
		otherDetails : [
				{ id: 5, que: 'اشترك وتجيك آخر العروض', ans: true},
				{ id: 6, que: 'لغة التطبيق', ans: 'العربية'},
				{ id: 7, que: 'لغة التواصل', ans: 'العربية'},
				{ id: 8, que: 'بطاقات الائتمانية', ans: ''},
		]
})


useEffect(() => {
  const handleResize = () => setScreenSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  handleResize();

  return () => window.removeEventListener('resize', handleResize);
}, []);

useEffect(() => {
  if(screenSize > 1200) return cartContainer?.current?.classList.remove('pop-up')
}, [screenSize])

	const theme = createTheme({
		palette: {
			primary: {
				main: '#245c4e', 
			},
			secondary: {
				main: '#769d91', 
			},
		},
	});

  const customizeSelectedOrder = (i, order) => {
    setCustomOrder({
        ...order[i],
        sauces : order[i].sauces?.map( sauce => (
            {
                ...sauce,
                quantity: 0
            }
        )) 
    })
    customOrderContainer.current?.classList.add('pop-up')
  }

  // const onAdd = (product, quantity) => {
  //   const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
  //   setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
  //   setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
  //   if(checkProductInCart) {
  //     const updatedCartItems = cartItems.map((cartProduct) => {
  //       if(cartProduct._id === product._id) return {
  //         ...cartProduct,
  //         quantity: cartProduct.quantity + quantity
  //       }
  //     })

  //     setCartItems(updatedCartItems);
  //   } else {
  //     product.quantity = quantity;
      
  //     setCartItems([...cartItems, { ...product }]);
  //   }

  //   toast.success(`${qty} ${product.name} added to the cart.`);
  // } 

  // const onRemove = (product) => {
  //   foundProduct = cartItems.find((item) => item._id === product._id);
  //   const newCartItems = cartItems.filter((item) => item._id !== product._id);

  //   setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
  //   setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
  //   setCartItems(newCartItems);
  // }

  // const toggleCartItemQuanitity = (id, value) => {
  //   foundProduct = cartItems.find((item) => item._id === id)
  //   index = cartItems.findIndex((product) => product._id === id);
  //   const newCartItems = cartItems.filter((item) => item._id !== id)

  //   if(value === 'inc') {
  //     setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
  //     setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
  //     setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
  //   } else if(value === 'dec') {
  //     if (foundProduct.quantity > 1) {
  //       setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
  //       setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
  //       setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
  //     }
  //   }
  // }

  // const incQty = () => {
  //   setQty((prevQty) => prevQty + 1);
  // }

  // const decQty = () => {
  //   setQty((prevQty) => {
  //     if(prevQty - 1 < 1) return 1;
     
  //     return prevQty - 1;
  //   });
  // }

  return (
    <Context.Provider
      value={{
        screenSize, 
        setScreenSize,
        cartContainer,
        displayCart, 
        setDisplayCart,
        loading, 
        setLoading,
				customOrder,
				setCustomOrder,
        customizeSelectedOrder,
				cart,
				setCart,
				numberOfProducts,
				setNumberOfProducts,
				favorite,
				setFavorite,
				customOrderContainer,
				authentication, 
				setAuthentication,
				profileData, 
				setProfileData,
				theme
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);