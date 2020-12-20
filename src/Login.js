import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import './formStyles.css';

const Login = () => {
    return (
        <div className='login'>
            <div className="login__wrapper">
                <h1>Log-in</h1>
                <form>
                    <div className='login__div'>
                        <p>Email:</p>
                        <input className='login__email' type="Email" placeholder="Email" />
                    </div>
                    <div className='login__div'>
                        <p>Password:</p>
                        <input className='login__password' type="password" placeholder="Password" />
                    </div>

                    <button className='login__button submitButton'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
