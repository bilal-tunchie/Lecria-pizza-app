"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlus } from '@fortawesome/free-solid-svg-icons'
import { offerData } from "@utils/menuData";
import Image from "next/image"
import { useStateContext } from '../context/StateContext';

export default function Offers() {

    const { customizeSelectedOrder } = useStateContext();

    return (
        <div className='offers'>
            {offerData.map( ({ id, name, description, img}, i ) => {
                return <div 
                    className='offer' 
                    key={id}
                    onClick={ () => customizeSelectedOrder(i, offerData)}
                >
                    <div className='image'>
                        <Image src={img} alt="offer_1" />
                    </div>
                    <div className='info'>
                        <h3>{name}</h3>
                        <p>{description}</p>
                    </div>
                    <span className='plus'>{<FontAwesomeIcon icon={faPlus} />}</span> 
                </div>
            })}
        </div>
    )
}
