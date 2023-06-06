"use client"

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Image from "next/image"
import { useRouter } from 'next/navigation';
import empty_card from "@public/images/empty_card.png";
import getStripe from "@utils/getStripe";;
import { v4 as uuidv4 } from 'uuid';
import  Favorite  from './Favorite'
import { toast } from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';

export default function Cart(){ 

    const router = useRouter();
    const [currentOrder, setCurrentOrder] = useState(true);
    const [totalCartCost, setTotalCartCost] = useState(0);
	const {
        cart, 
        setCart, 
        numberOfProducts, 
        setNumberOfProducts, 
        favorite, 
        authentication, 
        theme, 
        cartContainer, 
        screenSize 
    } = useStateContext();
	
	useEffect(() => {
		if (Object.keys(authentication).length) {
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	}, [authentication, cart]);
    
    const sumOfTotalCost = cart?.reduce( (accu, curntVal)  => {
        return accu + (curntVal.quantity * curntVal.totalPrice)
    }, 0)

    const sumOfTotalProducts = cart?.reduce( (accu, curntVal)  => {
        return accu + curntVal.quantity
    }, 0)

    useEffect(() => {
        setTotalCartCost(sumOfTotalCost)
        setNumberOfProducts(sumOfTotalProducts)
    }, [cart]);

    useEffect(() => {
        setCart(prev => prev.map( item => ({...item, id: uuidv4()})))
    }, [sumOfTotalCost, sumOfTotalProducts]);

    const addFavoriteItemsToCart = () => {
        let updatedCart = [...cart];

        favorite.forEach( fav => {
            const orderCopiedObject = { ...fav };
                delete orderCopiedObject.id;
                delete orderCopiedObject.favorite;
                delete orderCopiedObject.quantity;

            const itemExistsInCart = updatedCart.some(item => {
                const itemObject = { ...item };
                delete itemObject.id;
                delete itemObject.favorite;
                delete itemObject.quantity;
                return JSON.stringify(itemObject) === JSON.stringify(orderCopiedObject)
            });

            if (itemExistsInCart) {
                updatedCart = updatedCart.map(cartItem => {

                    const itemObject = { ...cartItem };
                    delete itemObject.id;
                    delete itemObject.favorite;
                    delete itemObject.quantity;

                    if (JSON.stringify(itemObject) === JSON.stringify(orderCopiedObject)) {
                        return { ...cartItem, quantity: cartItem.quantity + 1 };
                    }

                    return cartItem;
                });

            }  else {
                updatedCart = [...updatedCart, fav];
            }
        })
        setCart(updatedCart);
        setCurrentOrder(true)
		toast.success(`تم اضافة جميع المنتجات الى السلة`)
    }

	const handleCheckout = async () => {

        if (!Object.keys(authentication).length) {
            toast.error(`قم بتسجيل لاكمال الطلب`)
            router.push('/login')
            return
        }

		const stripe = await getStripe();

        const response = await fetch('/api/checkout_sessions', {
            method: 'POST',
            body: JSON.stringify({cart: cart}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.statusCode === 500) return;
        
        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });
	};

    return (
        <div  className='cart' >
            {screenSize < 1200 &&
            <span 
                className='close-cart' 
                onClick={ () => {
                        cartContainer.current.classList.remove('pop-up')
                    } }
            >
                <FontAwesomeIcon icon={faXmark} />
            </span>}
            <div className="nav-cart-total">
                <div className="cart-nav">
                    <span
                        onClick={ () => setCurrentOrder(true)} 
                        className={ currentOrder  ? 'active' : '' } 
                    >
                        الطلب الحالي</span>
                    <span
                        onClick={ () => setCurrentOrder(false)} 
                        className={ !currentOrder  ? 'active' : '' } 
                    >
                        المفضلة</span>
                </div>
                <div className="cart-total">
                    <div className='products-num'>
                        <span>{` السلة  ( ${numberOfProducts + ' المنتجات '})`}</span>
                        <span>{`${totalCartCost + ' ريال '}`}</span>
                    </div>
                    <div className='total'>
                        <span>{numberOfProducts}</span>
                        <FontAwesomeIcon icon={faCartShopping}/>
                    </div>
                </div>
            </div>
            <div className="cart_items_favorite">
                { currentOrder ? 
                <CartItem 
                    cart={cart}
                    setCart={setCart}
                /> : 
                < Favorite/>}
            </div>
            <div className="confirm-order">
                <ThemeProvider theme={theme}>
                    {currentOrder ?
                        <Button  
                            onClick={handleCheckout} 
                            fullWidth
                            variant="contained"  
                            size="large"
                            disabled={!cart.length}
                        >تاكيد الطلب</Button> 
                    :
                    <Button 
                        onClick={addFavoriteItemsToCart}
                        fullWidth
                        variant="contained"  
                        size="large"
                        disabled={!favorite.length}
                    >
                        أضف جميع المنتجات الى السلة
                    </Button>}
                </ThemeProvider>
            </div>
        </div>
    )
}


function CartItem({ cart, setCart }) {
    
    const modifyItemQuantity = (id, value) => {
        const index = cart.findIndex(item => item.id === id);
        if (value > 0) {
            const updatedQuantity = { ...cart[index], quantity: value };
            const updatedCart = [  ...cart.slice(0, index),  updatedQuantity,  ...cart.slice(index + 1)]; 
            setCart(updatedCart)
        } else {
            setCart(prev => prev.filter( (_, i) => i !== index))
        }
    }

    return (
        <>
            {!cart?.length &&
            <div className="empty-cart-con">
                <Image src={empty_card} alt="" width={50} height={50}/>
                <p>سلتك فاضية. ما اشتقت للبيتزا؟</p>
            </div>}
            <div className="total-cart-items">
                {cart?.map(({id, name, description, size, img, dough, sauces, totalPrice, quantity, type}) => {
                    let sum = 0
                    return <div className="cart-item-card" key={uuidv4()}>
                        <div className="item">
                            <div className='info'>
                                <h3>{name}</h3>
                                <p>{description}</p>
                                {size && <>
                                    <h5>الحجم</h5>
                                    <span>{size}</span>
                                </>}
                            </div>
                            <Image 
                                src={img} 
                                alt='item'
                                className={type && 'offer-pic'}
                                width={100}
                                height={100}
                                quality={100}
                            />
                        </div>
                        {<DoughSauces 
                            dough={dough}
                            sauces={sauces}
                            sum={sum}
                        />}
                        {<TotalpriceQuantity 
                            id={id}
                            totalPrice={totalPrice}
                            quantity={quantity}
                            modifyItemQuantity={modifyItemQuantity}
                        />}
                    </div>
                })}
            </div>
        </>
    )
}


function DoughSauces({dough, sauces, sum }) {
    return(
        <div className="dough-sauces">
            {dough && <div className="dough">
                <h5>نوع العجينة</h5>
                <span>{dough?.name}</span>
            </div>}
            {sauces && <div className="sauces-container">
                <h5>الصوصات</h5>
                {sauces?.map(({id, name, quantity, img}) => {
                    sum = sum + quantity
                    if (quantity > 0) {
                        return <div className="sauces" key={id}>
                            <div className="sauce">
                                <Image src={img} alt="sauce" />
                                <h5>{name.slice(0, -9)}</h5>
                                <span>{quantity}x</span>
                            </div>
                        </div> 
                    }
                })}
                {sum === 0 && <h6>لم تضف صوص</h6>}
            </div>}
        </div>
    )
}

function TotalpriceQuantity({id, totalPrice, quantity, modifyItemQuantity }) {
    return(
        <div className="totalprice-quantity">
            <p>{totalPrice} ريال</p>
            <div>
                <span 
                    className='substract'
                    onClick={ () => {
                        if(quantity > 0){
                            modifyItemQuantity(id, quantity - 1)
                        }
                    }}
                >
                    -
                </span>
                <span className='quantity'>{quantity}</span>
                <span 
                    className='add'
                    onClick={ () => modifyItemQuantity(id, quantity + 1)}
                >
                    +
                </span>
            </div>
        </div>
    )
}