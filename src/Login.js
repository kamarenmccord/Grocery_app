import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { login } from './features/reactSlice';
import './Login.css'
import './formStyles.css';

const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth)=>{
                if(auth){
                    dispatch(login({
                        email: auth.user.email,
                        uid: auth.user.uid,
                        displayName: auth.user.email.split('@')[0],
                    }))
                    history.push('/view')
                }
            }).catch(e=>alert(e.message))
    }

    return (
        <div className='login'>
            <div className="login__wrapper">
                <h1>Sign in</h1>
                <form>
                    <div className='login__div'>
                        <p>Email:</p>
                        <input 
                            className='login__email' 
                            type="Email" 
                            placeholder="Email" 
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className='login__div'>
                        <p>Password:</p>
                        <input 
                            className='login__password' 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </div>

                    <button className='login__button submitButton' onClick={signIn}>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
