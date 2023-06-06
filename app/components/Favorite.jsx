"use client"
import { useEffect } from 'react'
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { useStateContext } from '../context/StateContext';

export default function Favorite() {

    const { favorite, setFavorite, authentication } = useStateContext();

    useEffect(() => {
		if (Object.keys(authentication).length) {
			localStorage.setItem('favorite', JSON.stringify(favorite));
		}
	}, [authentication, favorite]);
    

    return (
        <>
            {!favorite.length && <div className="empty-cart-con">
                <span><FontAwesomeIcon icon={faHeart} /></span>
                <p>البيتزا اللي تحبها تلقاها هنا،<br/> اضفها للمفضلة
                الحين</p>
            </div>}
            <div className="total-cart-items">
                {favorite?.map(({id, name, description, size, img, dough, totalPrice, type, sauces}) => {
                    let sum = 0
                    return <div className="cart-item-card" key={uuidv4()}>
                        <div className="item">
                            <div className='info'>
                                <h3>{name}</h3>
                                <p>{description}</p>
                                <div className='favorite-size'>
                                    {size && <div>
                                        <h5>الحجم</h5>
                                        <span>{size}</span>
                                    </div>}
                                    <div className="add-to-favorite" >
                                        <span 
                                            className={'active'}
                                            onClick={() => 
                                                setFavorite(prev => prev.filter( item => item.id !== id))
                                            }
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                        <p>احذفها من المفضلة</p>
                                    </div>
                                </div>
                            </div>
                            <Image 
                                src={img} 
                                alt='item'
                                width={100} 
                                height={100}
                                quality={100}
                                className={type && 'offer-pic'} 
                            />
                        </div>
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
                                                <Image 
                                                    src={img} 
                                                    alt="sauce"
                                                    width={100} 
                                                    height={100}
                                                    quality={100}
                                                />
                                                <h5>{name.slice(0, -9)}</h5>
                                                <span>{quantity}x</span>
                                            </div>
                                        </div> 
                                    }
                                    
                                })}
                                {sum === 0 && <h6>لم تضف صوص</h6>}
                            </div>}
                        </div>
                        <div className="totalprice-quantity">
                            <p>{totalPrice} ريال</p>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

