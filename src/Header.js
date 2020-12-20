import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className='header__logo'></div>
            <div className='header__title'>Title</div>
            <div className='header__nav'>
                <div className='header__login'>login</div>
                <div className='header__basket'>Basket</div>
                <div className='header__userPage'>User</div>
            </div>
        </div>
    )
}

export default Header
