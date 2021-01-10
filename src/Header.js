import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectDefault } from './features/reactSlice';
import { selectBasket } from './features/basketSlice';
import { auth } from './firebase';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Avatar } from '@material-ui/core';
import logo from './static/images/logo_black_white.png';


const Header = () => {
    const user = useSelector(selectDefault);
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();
    const history = useHistory();

    const signOutUser = (e) =>{
        e.preventDefault();
        if (user){
            dispatch(logout());
            auth.signOut();
            history.push('/');
        }
    }

    return (
        <div className="header">
            {/* <Link to='/'><div className='header__logo'>L</div></Link> */}
            <Link to='/'>
                <img className='header__imageLogo'
                    src={logo}
                    alt=''
                ></img></Link>
            <div className='header__title'>Groceries List Maker</div>
            <div className='header__nav'>
                {user? <div onClick={signOutUser} className='header__logout'>Logout</div> : ''}

                <div className='header__basket'>
                    <Link to='/Basket'>
                        <ShoppingBasketIcon />
                        <div className='header__basketCount'>
                            {basket.length > 0 && basket.length}
                        </div>
                    </Link>
                    </div>
                <div className='header__login'><Link className='header__avatar' to={user? '/user' : '/login'}><Avatar src={user? user.imageURL : ''}>{user? user.displayName[0] : ''}</Avatar>{!user? 'Log in' : user.displayName}</Link></div>
            </div>
        </div>
    )
}

export default Header
