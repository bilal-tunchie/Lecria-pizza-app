"use client"

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faLocationDot, faUser, faPhone, faXmark, faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../context/StateContext';
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-hot-toast';
import { Backdrop } from '@mui/material';
import logo  from "@public/images/logo.png";


export default function Header() {

    const { authentication, setAuthentication, screenSize, setDisplayCart, cartContainer, setLoading } = useStateContext();
    const [displayNav, setDisplayNav] = useState(false);
    const pathname = usePathname();
    const [isActive, setIsActive] = useState(pathname); 
    const [open, setOpen] = useState(false);
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem('authentication', JSON.stringify(authentication));
    }, [authentication]);

    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(Object.keys(authentication).length ? 'تسجيل خروج' : 'تسجيل الدخول');
    }, [authentication]);

    useEffect( () => {
        setDisplayCart(pathname !== '/login')
        setIsActive(pathname)
    } , [pathname])

    useEffect(() => {
        if (screenSize > 1200) {
            setOpen(false)
            setDisplayNav(false)
        }
    }, [screenSize]);

    const handleLogout = () => {

        setAuthentication({})
        localStorage.clear();
        toast.success('تسجيل خروج')
        setLoading(true)
        setTimeout(()=> {
            window.location.href = "/";
            setLoading(false)
        }, 500)
    }

    const nav = [
        { id: 1, value: "القائمة", passedPath: '/', icon: faListAlt },
        { id: 2, value: "العروض", passedPath: '/offers', icon: faTags },
        { id: 3, value: "السلة", passedPath: pathname, icon: faCartShopping },
        { id: 4, value: "طلباتي", passedPath: '/orders', icon: faLocationDot },
        { id: 5, value: "حسابي", passedPath: '/account', icon: faUser },
        { id: 6, value: "تواصل", passedPath: '/contact', icon: faPhone },
    ];

    if (typeof document !== 'undefined') {

        document.onclick = (e) => {
            if (e.target.id !== 'nav' && e.target.parentElement?.className !== 'open-nav' && e.target.parentElement?.id !== 'open-nav') {
                setDisplayNav(false)
                setOpen(false)
            }
        }

    }

    return (
        <header>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={() => setOpen(false)}
            >
            </Backdrop>
            <div className="logo-container">
                <div className="logo">
                    <Image
                        src={logo}
                        alt="logo"
                        priority={true}
                    />
                </div>
                <h2>ليسريا بيتزا</h2>
            </div>
            <span 
                className='open-nav'
                style={{ display: screenSize > 1200 ? 'none' : 'block'}}
                onClick={(e) => {
                    setDisplayNav(true)
                    setOpen(true)
                }} 
            >
                <FontAwesomeIcon icon={faBars} id='open-nav' />
            </span>
            <nav 
                style={{ left: displayNav ? '0' : '-100%'}} id='nav' 
            >
                <span className='close-nav' >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
                <ul className='menu-control'>
                    { nav.map( ({id, value, passedPath, icon}) => { 
                        return (
                            <li 
                                key={id}
                                className={id === 3 ? 'menu-control-cart-button' : ''}
                                onClick={() => {
                                    id === 3 && cartContainer.current.classList.add('pop-up')
                                }}
                            >
                                { id !== 3 ? 
                                <span 
                                    onClick={() => router.push(passedPath)} 
                                    className={ isActive === passedPath ? 'active' : ''} 
                                >
                                    <FontAwesomeIcon icon={icon} />
                                    <span>{value}</span>
                                </span>
                                :
                                <span>
                                    <FontAwesomeIcon icon={icon} />
                                    <span>{value}</span>
                                </span>}
                            </li> 
                        )
                    })}
                    <li>
                        {Object.keys(authentication).length ? 
                            <Link href='/' className='login' onClick={handleLogout} ><span>{content}</span></Link>
                        :
                            <Link href='/login' className='login' >
                                <span>{content}</span>
                            </Link>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}
