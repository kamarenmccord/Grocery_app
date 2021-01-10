import React, { useEffect } from 'react';
import "./Basket.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectDefault } from './features/reactSlice';
import { REMOVE_FROM_BASKET, selectBasket } from './features/basketSlice';

const Basket = () => {

    const user = useSelector(selectDefault);
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();
    let reformatedBasket = [];

    const formatBasket = (basket)=>{
        reformatedBasket = []
        basket.map(item=>{
            console.log('item', item);
            for (let ingrediant of item.ingrediants){
            reformatedBasket.push([`${item.title}`, ingrediant]);
            }
        })
    }
    formatBasket(basket)

    useEffect(()=>{
        formatBasket(basket)
        console.log('useEffect');
    }, [])

    const removeItem = (id) =>{
        dispatch(REMOVE_FROM_BASKET(id));
    }

    return (
        <div className='basket'>
            <div className='basket__banner'>ad space</div>

            {!user && (<div className='basket__accountReminder'><strong>Notice:</strong>  &nbsp;You are not currently logged in. Log in or create an account so you could save your basket to your account and even send it to mobile!</div>)}

            <div className='basket__controls'>Filters</div>

            <div className='basket__content'>

                {reformatedBasket &&
                <div className='basket__list'>
                    <h2>List</h2>

                    {reformatedBasket.map(meal=>(
                    <div className='basket__mealWrapper'>
                        <div className='basket__remove'>
                            <input type='checkbox' />
                            <label>Remove</label>
                        </div>
                        <div className='basket__meal'>
                            <div className='basket__ingrediant'>{meal[1].name}</div>
                            <div className='basket__amount'>{meal[1].amount>0 && meal[1].amount}</div>
                        </div>
                        <div className='basket__mealTitle--sm'>{meal[0]}</div>
                    </div>
                    ))}

                </div>
                }

                <div className='basket__meals'>
                    <h2>Meals Selected</h2>
                    {basket && basket.map(mealData=>(
                        <div className='basket__mealTitleWrapper'>
                            <div className='basket__mealTitle'>
                                {mealData.title} 
                            </div>
                            <button className='basket__remove' onClick={()=>removeItem(mealData._id)}>X</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Basket
