import React from 'react';
import {useStateValue} from './stateProvider';
import { auth } from './firebase';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Header = () => {

    const [{user},] = useStateValue();
    const history = useHistory();

    const signOutUser = () =>{
        if (user){
            auth.signOut();
            history.push('/');
        }
    }

    return (
        <div className="header">
            <Link to='/'><div className='header__logo'>L</div></Link>
            <div className='header__title'>Groceries List Maker</div>
            <div className='header__nav'>
                {user? <div onClick={signOutUser} className='header__logout'>Logout</div> : ''}

                <div className='header__basket'><Link to='/Basket'><ShoppingBasketIcon /></Link></div>
                <div className='header__login'><Link to={!user? '/login' : '/user'}><AccountCircleIcon />{!user? 'Log-in' : ''}</Link></div>
            </div>
        </div>
    )
}

export default Header
