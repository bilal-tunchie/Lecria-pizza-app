"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '@utils/confetti';

const Success = () => {
    const { setCart } = useStateContext();
    
    useEffect(() => {
        setCart([])
        runFireworks();
    }, []);

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <FontAwesomeIcon icon={faCircleCheck} beat />
                </p>
                <h2>شكرا لاختيارك ليسريا بيتزا !</h2>
                <p className="email-msg">تحقق من صندوق البريد الإلكتروني الخاص بك للحصول على الإيصال.</p>
                <p className="description">
                    اذا كان لديك أى أسئلة من فضلك راسلنى على البريد الإلكترونى :  
                    <a className="email" href="mailto:Example@outlook.com">
                        Example@outlook.com
                    </a>
                </p>
                <Link href="/">
                    <button>
                        <p>مواصلة التسوق</p>
                        <svg 
                            stroke-width="4" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            class="h-6 w-6" 
                            xmlns="http://www.w3.org/2000/svg" 
                        >
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linejoin="round" stroke-linecap="round"></path>
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success