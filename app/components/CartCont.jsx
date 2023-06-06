"use client"

import { useStateContext } from '../context/StateContext';
import { Cart } from './index'
import { CustomizePizza } from './index'

export default function CartCont() {

    const { screenSize, cartContainer, displayCart } = useStateContext();

    return (
        <>
            <div 
                className="cart-container" 
                style={{ left:  screenSize > 1200 && displayCart ? '0' : '-100%'}}
                ref={cartContainer}
                >
                <Cart /> 
            </div>
            <CustomizePizza />
        </>
    )
}
