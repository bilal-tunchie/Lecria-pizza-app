"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '../context/StateContext';
import Image from "next/image"

export default function MenuItems({ pizzas, refs, menuData }) {
    
    const { screenSize, customizeSelectedOrder } = useStateContext();

    const newStyle = {
        fontSize: '12px',
        width: '35px',
        height: '35px',
        padding: '5px',
        fontWeight: '600',
        backgroundColor: 'var(--color-light-contrast)',
    }

    return (
        <div className='menu-items' >
            { pizzas.length === menuData.length && screenSize > 1054 &&
                <div className="pizza-intro" >
                    <h3 className="animate-charcter"> بيتزا، تصنع يومك !</h3>
                </div>
            }
            {pizzas.map( ( { id, name, description, img, backgroundColor, flavours}, i) => {
                let moveDown;

                if (screenSize > 1054 && pizzas.length === menuData.length) {
                    if (i % 3 === 1 || i === pizzas.length - 1 ) {
                        moveDown = 'translateY(100px)'
                    }
                }
                
                return <div 
                    className='card' 
                    key={id} 
                    style={{ backgroundColor: backgroundColor, transform: moveDown}}  
                    ref={refs[i]} 
                    onClick={ () => customizeSelectedOrder(i, pizzas)}
                >
                    <span className='plus'>{<FontAwesomeIcon icon={faPlus} />}</span> 
                    <div className='info'>
                        <h4>{name}</h4>
                        <p>{description}</p>
                        <div className='flavours'>
                            {flavours.map( (fav, i) => {
                                return <span 
                                    key={i}
                                    style={fav.flavour === 'NEW' ? newStyle : { backgroundColor: fav.color }}
                                >
                                    {fav.flavour === 'NEW' ? fav.flavour : <FontAwesomeIcon icon={fav.flavour} />}
                                </span>
                            })}
                        </div>
                    </div>
                    <Image src={img} alt="" width={100} height={100} />
                </div>
            })}
        </div>
    )
}
