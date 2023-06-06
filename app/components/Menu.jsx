"use client"

import { useState, useEffect, createRef } from 'react';
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass, faXmark,  } from '@fortawesome/free-solid-svg-icons'
import { menuData } from "@utils/menuData";
import  MenuItems  from './MenuItems'
import offer_1  from "@public/images/offer_1.png";
import offer_2  from "@public/images/offer_2.png";
import offer_3  from "@public/images/offer_3.png";
import { useStateContext } from '../context/StateContext';

export default function Menu() {

    const [displaySearch, setDisplaySearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [pizzas, setPizzas] = useState(menuData);
    const [isSticky, setIsSticky] = useState(false);
    const { numberOfProducts, screenSize, cartContainer } = useStateContext();

    const refs = menuData.reduce((acc, value) => {
        acc[value.id - 1] = createRef();
        return acc;
    }, {});

    const handleClick = id =>
    refs[id].current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });

    useEffect(() => {
        setFilterData(menuData?.filter( pizza => pizza?.name.includes(searchTerm) ))
        setPizzas(searchTerm.length > 0 ? filterData : menuData)
    }, [searchTerm])

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    
    const onScroll = () => {
        const el = document.getElementById('menu-nav-fixed');
        const divAnimate = el.getBoundingClientRect().top + 160;
        setIsSticky(divAnimate < window.scrollY);
    };

    const pizzaNav = [
        { id: 0, value: "بيانو" },
        { id: 15, value: "اختيارات الشيف" },
        { id: 8, value: "بيت الرانشي" },
        { id: 13, value: "الأصلية" },
        { id: 24, value: "وجبة طفل" }
    ];

    const style = {
        backgroundColor: displaySearch ? 'var(--color-white)': 'var(--color-primary)', 
        border: displaySearch ? '2px solid var(--color-primary)' : ''
    }
    
    return (
        <>
            <div className='offers-slideshow' >
                <div className='wrapper' >
                    <Image src={offer_1} alt="" />
                    <Image src={offer_2} alt="" />
                    <Image src={offer_3} alt="" />
                </div>
            </div>
            <div className={isSticky ? 'menu-nav-fixed fixed-nav-onscroll' : 'menu-nav-fixed'}  id='menu-nav-fixed'>
                <div 
                    className='menu-nav-search' 
                    style={style}
                >
                    {<MenuSearch 
                        displaySearch={displaySearch}
                        setDisplaySearch={setDisplaySearch}
                        setSearchTerm={setSearchTerm}
                    />}
                    {<MenuNavContainer 
                        screenSize={screenSize}
                        displaySearch={displaySearch}
                        setDisplaySearch={setDisplaySearch}
                        handleClick={handleClick}
                        cartContainer={cartContainer}
                        numberOfProducts={numberOfProducts}
                    />}
                    <div 
                        className='pizza-nav' 
                        style={ {display: displaySearch ? 'none' : 'flex'} }
                    >
                        { pizzaNav.map( ({id, value}) =>  <span key={id} onClick={() => handleClick(id)}>{value}</span> )}
                    </div>
                </div>
            </div>
            <div className='menu'  >
                <MenuItems 
                    pizzas={pizzas} 
                    screenSize={screenSize} 
                    refs={refs} 
                    menuData={menuData}
                />
            </div>
        </>
    )
}

function MenuSearch({ displaySearch, setDisplaySearch, setSearchTerm }) {
    return (
        <div 
            className='menu-search' 
            style={{ display: displaySearch ? 'flex': 'none' }}
        >
            <span 
                className='close-search'
                onClick={ () => {
                    setDisplaySearch(false)
                    setSearchTerm('')
                }}
            >
                <FontAwesomeIcon icon={faXmark} />
            </span>
            <input type="search" placeholder='بحث' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    )
}


function MenuNavContainer({ screenSize, displaySearch, setDisplaySearch, handleClick, cartContainer, numberOfProducts }) {
    
    const [isActive, setIsActive] = useState(1);

    const menuNav = [
        { id: 1, value: "بيتزا" },
        { id: 27, value: "طلبات جانبية" },
        { id: 34, value: "حلويات" }, 
        { id: 39, value: "مشروبات و صلصات" }
    ];

    return (
        <div 
            className='menu-nav-container' 
            style={{ display: displaySearch ? 'none': 'flex' }}
        >
            <span 
                className='search'
                onClick={ () => {
                    setDisplaySearch(true)
                }}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} id='open-nav' />
            </span>
            <div className='menu-nav'>
                <Link href='/offers' onClick={() => setIsActive(2)}><span>العروض</span></Link>
                { menuNav.map( ({id, value}) => { 
                    return (
                        <span 
                            key={id}
                            onClick={() => {
                                setIsActive(id)
                                handleClick(id)
                            }}
                            className={ isActive === id ? 'active' : ''}
                        >
                            {value}
                        </span> 
                    )
                })}
                <div 
                    className='total total-in-menu'
                    style={ {display: screenSize < 1200 ? 'flex' : 'none'}}
                    onClick={ () => {
                        cartContainer.current.classList.add('pop-up')
                    } }
                >
                    <span>{numberOfProducts}</span>
                    <FontAwesomeIcon icon={faCartShopping}/>
                </div>
            </div>
        </div>
    )
}