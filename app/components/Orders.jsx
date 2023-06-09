"use client"

import { useEffect } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../context/StateContext';
import { toast } from 'react-hot-toast';

export default function Orders() {

    const { authentication, setDisplayCart } = useStateContext();
    const router = useRouter()

    useEffect(() => {
    
        if (router.pathname !== "/login" && !Object.keys(authentication).length) {
            router.push("/login");
            toast.error("يجب عليك تسجيل دخول اولا")
        } 
    }, [])

    useEffect( () => {
        setDisplayCart(Object.keys(authentication).length)
    } , [authentication])

    return <div className="orders-page">
        <div className='no-orders'>
            <span className='icon'><FontAwesomeIcon icon={faPizzaSlice} /></span>
            <p>ماعندك طلبات هاللحظة . . . </p>
            <Link href='/' ><span>العودة الى القائمة</span></Link>
        </div>
    </div> 
}