import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    return (
        <div className='login'>
            Login
            <Link to='/'>Home</Link>
        </div>
    )
}

export default Login
