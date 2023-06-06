"use client"

import { useEffect } from 'react'
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../context/StateContext';
import Login from "./Login";

export default function Orders() {

    const { authentication, setDisplayCart } = useStateContext();

    useEffect( () => {
        setDisplayCart(Object.keys(authentication).length)
    } , [authentication])

    return (
        <>
            {Object.keys(authentication).length ?  

            <div className="orders-page">
                <div className='no-orders'>
                    <span className='icon'><FontAwesomeIcon icon={faPizzaSlice} /></span>
                    <p>ماعندك طلبات هاللحظة . . . </p>
                    <Link href='/' ><span>العودة الى القائمة</span></Link>
                </div>
            </div> 

            : 

            <Login />} 
        </>
    )
}