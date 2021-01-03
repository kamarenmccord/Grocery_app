import React from 'react';
import "./Basket.css";
import { useSelector } from 'react-redux';
import { selectDefault } from './features/reactSlice';

const Basket = () => {

    const user = useSelector(selectDefault)

    return (
        <div className='basket'>
            <div className='basket__banner'>ad space</div>

            {!user && (<div className='basket__accountReminder'><strong>Notice:</strong>  &nbsp;You are not currently logged in. Log in or create an account so you could save your basket to your account and even send it to mobile!</div>)}

            <div className='basket__controls'>Filters</div>

            <div className='basket__content'>

                <div className='basket__list'>
                    <h2>List</h2>

                </div>

                <div className='basket__meals'>
                    <h2>Meals</h2>

                </div>
            </div>

        </div>
    )
}

export default Basket
