import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Header = () => {
    return (
        <div className="header">
            <Link to='/'><div className='header__logo'>L</div></Link>
            <div className='header__title'>Groceries List Maker</div>
            <div className='header__nav'>
                <div className='header__basket'><ShoppingBasketIcon /></div>
                <div className='header__login'><Link to='/login'><AccountCircleIcon /></Link></div>
            </div>
        </div>
    )
}

export default Header
