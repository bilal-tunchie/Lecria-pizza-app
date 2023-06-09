"use client"

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faXmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import {  faCircleQuestion  } from '@fortawesome/free-regular-svg-icons'
import Image from "next/image"
import { Box, Modal} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import samika  from "@public/images/samika.png";
import rakika  from "@public/images/rakika.png";
import edgesـcheese  from "@public/images/edgesـcheese.png";
import { toast } from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';

export default function CustomizePizza() {

    const {
        cart, 
        setCart, 
        favorite, 
        setFavorite, 
        customOrder, 
        setCustomOrder, 
        customOrderContainer 
    } = useStateContext();
        
    const checkSaucesChange = JSON.stringify(customOrder.sauces)
    
    const totalSaucePrice = customOrder.sauces?.reduce( (accu, curntVal)  => {
        return accu + (curntVal.quantity * curntVal.price)
    }, 0)

    const addToFavorite = (order) => {
        console.log('addToFavorite')
        const foundItem = favorite.find((item) => {
            const copiedObject = { ...item };
            delete copiedObject.favorite;
            delete copiedObject.totalPrice;
            delete copiedObject.id;
            const anotherCopiedObject = structuredClone(order);
            delete anotherCopiedObject.favorite;
            delete anotherCopiedObject.totalPrice;
            delete anotherCopiedObject.id;
            return JSON.stringify(copiedObject) === JSON.stringify(anotherCopiedObject)
        });

        if ( foundItem) {
            setFavorite(prev =>  prev.filter(item => JSON.stringify(item) !== JSON.stringify(foundItem)))
            setCustomOrder(prev => ({...prev, favorite: false}))
            toast.error(` تم الحذف من المفضلة`)
        } else {
            setFavorite(prev =>  [
                ...prev,
                {...order, id: uuidv4()}
            ])
            setCustomOrder(prev => ({...prev, favorite: true}))
            toast.success(` تم الاضافة الى المفضلة`)
        }
    }

    const sizePrice = () => {
        let pizzaPrice;
        if (customOrder) {
            if (customOrder.size === 'وسط') {
                pizzaPrice = 29
            }else if (customOrder.size === 'صغيرة') {
                pizzaPrice = 19
            }else if (customOrder.size === 'كبيرة') {
                pizzaPrice = 39
            }
        }
        return pizzaPrice 
    }
    
    const doughSaucesPrice = (totalSaucePrice) => {
        if (customOrder) {
            const doughPrice = customOrder.dough?.price ? customOrder.dough.price : 0
            const totalPrice = (totalSaucePrice + doughPrice ) || 0
            
            return totalPrice
        }
    }

    const checkIfFavorite = () => {
        const foundItem = favorite.find((item) => {
            const copiedObject = { ...item };
            delete copiedObject.favorite;
            delete copiedObject.id;
            const anotherCopiedObject = { ...customOrder };
            delete anotherCopiedObject.favorite;
            delete anotherCopiedObject.id;
            return JSON.stringify(copiedObject) === JSON.stringify(anotherCopiedObject)
        });

        setCustomOrder(prev => ({...prev, favorite: foundItem}))
    }
    
    useEffect(() => {
        checkIfFavorite()
        doughSaucesPrice(totalSaucePrice)
        sizePrice()
        setCustomOrder(prev => ({...prev, 
            totalPrice: sizePrice() ? sizePrice() + doughSaucesPrice(totalSaucePrice) 
            : prev.price + doughSaucesPrice(totalSaucePrice)
        }))

    }, [customOrder.size, customOrder.dough, checkSaucesChange, customOrder.totalPrice])

    const addItemToCart = (order) => {
        const foundItem = cart.find((item) => {
            const copiedObject = { ...item };
            delete copiedObject.id;
            delete copiedObject.favorite;
            delete copiedObject.quantity;
            const anotherCopiedObject = { ...order };
            delete anotherCopiedObject.id;
            delete anotherCopiedObject.favorite;
            delete anotherCopiedObject.quantity;
            return JSON.stringify(copiedObject) === JSON.stringify(anotherCopiedObject)
        });
    
        if (foundItem) {
            const updatedItems = cart.map((item) => {
                if (JSON.stringify(item) === JSON.stringify(foundItem)) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCart(updatedItems)
        } else {
            setCart(prev => [...prev, order])
        } 

        toast.success(`تم اضافة  "${order.name}"  الى السلة`)
        customOrderContainer.current.classList.remove('pop-up')
    }

    return (
        <div className='custom-pizza-container' ref={customOrderContainer} >
            <div className='custom-pizza-head'>
                <span 
                    className='close-custom-pizza' 
                    onClick={ () => {
                            customOrderContainer.current?.classList.remove('pop-up')
                        }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
                <h3>تعديل الطلب</h3>
            </div>
            <div className='customize'>
                {customOrder.length && <PizzaCard customOrder={customOrder}  />}
                {customOrder.size && 
                <SizeOptions 
                    customOrder={customOrder} 
                    setCustomOrder={setCustomOrder} 
                />}
                {customOrder.dough && 
                <DoughOptions 
                    customOrder={customOrder}
                    setCustomOrder={setCustomOrder} 
                />}
                {customOrder.sauces && 
                <SauceOptions 
                    customOrder={customOrder}
                    setCustomOrder={setCustomOrder}
                    totalSaucePrice={totalSaucePrice}
                />}
                <div className="add-to-favorite" >
                    <span 
                        className={customOrder.favorite ? 'active' : ''}
                        onClick={() => addToFavorite(customOrder)}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <p>إضافة للمفضلة</p>
                </div>
                {<TotalPrice customOrder={customOrder} setCustomOrder={setCustomOrder} />}
            </div>
            <div className="confirm-order">
                <span onClick={() => addItemToCart(customOrder)}>
                    اضف للسلة
                </span> 
            </div>
        </div>
    )
}

function PizzaCard({ customOrder }) {

    const { backgroundColor, name, description, img, type} = customOrder
    return (
        <div className="customize-pizza">
            <div className='card' style={{ backgroundColor: backgroundColor }}>
                <div className='info'>
                    <h4>{name}</h4>
                    <p>{description}</p>
                </div>
                <Image 
                    src={img} 
                    alt='item' 
                    width={300} 
                    height={300}
                    className={type && 'offer-custome'} 
                />
            </div>
        </div>
    );
}

function SizeOptions({ customOrder, setCustomOrder }) {

    const pizzaSize = ['كبيرة', 'وسط', 'صغيرة']

    return (
        <>
            <h4>الحجم</h4>
            <div className='size'>
            {pizzaSize.map((size, i) => (
                <span
                key={i}
                onClick={(e) => setCustomOrder(prev => ({ ...prev, size: e.target.textContent }))}
                className={customOrder.size === size ? 'active' : ''}
                >
                {size}
                </span>
            ))}
            </div>
        </>
    );
}

function DoughOptions({customOrder, setCustomOrder }) {

    const [doughImage, setDoughImage] = useState(undefined);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const pizzaDough = [
        {name: 'سميكة', image: samika, price: 0},
        {name: 'رقيقة', image: rakika, price: 0},
        {name: 'اطراف الجبنة ( +6 ريال)', image: edgesـcheese, price: 6},
    ]

    function handleClick(e, price) {
        setCustomOrder(prev => ({ ...prev, 
                dough: {
                    name: e.target.textContent, 
                    price : price
                } 
            }
        ));
    }

    return (
        <div className='pizza-dough'>
            <h5>نوع العجينة</h5>
            {pizzaDough.map(({ name, image, price }, i) => (
                <div className='dough' key={i}>
                <span 
                    onClick={(e) => handleClick(e, price)} 
                    className={name === customOrder.dough?.name ? 'active' : ''}
                >
                    {name}
                </span>
                <FontAwesomeIcon icon={faCircleQuestion} onClick={() => {
                    setDoughImage(name)
                    handleOpen()
                    }} />
                {displayDoughPic(name, image, doughImage, setDoughImage, open, setOpen, handleOpen)}
                </div>
            ))}
        </div>
    );
}

function SauceOptions({ customOrder, setCustomOrder, totalSaucePrice }) {
    
    function updateData(id, value) {
        const newState = { ...customOrder };
        const index = newState.sauces?.findIndex(item => item.id === id);
        newState.sauces[index] = { ...newState.sauces[index], quantity: value };
        setCustomOrder(newState);
    }

    return (
        <>
            <h4>{`صلصات (اختر حتى 8)`}</h4>
            <div className='sauces'>
                {customOrder.sauces?.map(({ id, name, quantity, img }) => (
                    <div className='sauce' key={id}>
                        <div>
                            <span 
                                className='substract'
                                onClick={ () => {
                                    if(quantity > 0){
                                        updateData(id, quantity - 1)
                                    }
                                }}
                            >
                                -
                            </span>
                            <span className='quantity'>{quantity}</span>
                            <span 
                                className='add'
                                onClick={ () => {
                                    if(quantity < 3 && totalSaucePrice < 32){
                                        updateData(id, quantity + 1)
                                    }
                                }}
                            >
                                +
                            </span>
                        </div>
                        <span className='name'>{name}</span>
                        <Image src={img} alt="" />
                    </div>
                ))}
            </div>
        </>
)}

function TotalPrice({ customOrder }) {
    return <div className="total-price-for-item">
        <p>السعر : 
            <span>
                {customOrder.totalPrice ? 
                (customOrder.totalPrice * customOrder.quantity) : 
                (customOrder.price * customOrder.quantity)} ريال
            </span>
        </p>
    </div>
}

function displayDoughPic(name, image, doughImage, setDoughImage, open, setOpen) {

    const handleClose = () => setOpen(false);
    
    if (name !== doughImage) return null

    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box className='dough-image'>
            <div className="dough-image-head">
                <span 
                    className='close-custom-pizza' 
                    onClick={ (e) => {
                        setDoughImage(undefined)
                        } }
                >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>{name}</span>
            </div>
            <Image src={image} alt="" />
        </Box>
    </Modal>
}