import React, { useState } from 'react'
import "./formStyles.css";
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectDefault } from './features/reactSlice';

const Register = () => {

    const user = useSelector(selectDefault);
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const signUp = e =>{
        e.preventDefault();
        let test=false;

        if (password === password2){
            test = true;
        }

        if (test){
            
            // to be added
            const credentials = {};
            credentials['joined_on'] = new Date();
            credentials['profile_image'] = '';
            credentials['fullName'] = '';
            credentials['displayName'] = '';

            auth.createUserWithEmailAndPassword(email, password)
                .then(auth=>{
                    auth.user.updateProfile(credentials)
                    .then(()=>{
                    dispatch(login({
                        email: auth.user.email,
                        uid: auth.user.uid,
                        displayName: auth.user.email.split('@')[0],
                     }))
                    })
                })

        } else {
            alert('Email or Password did not match \n Check fields and try again.');
        }
    }

    return (
        <div className='register'>
            <div className='landing__accountSecion'>
                {!user? (
                <form>
                    <h3>Create an Account:</h3>
                    <div className='landing__formSubsection'>
                    <p>Email:</p>
                    <input 
                        className="userEmail"
                        placeholder="Email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />

                <div className='landing__formSubsection'>
                    <p>Password:</p>
                    <input 
                        className='userPassword' 
                        placeholder="password" 
                        type="password" 
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>

                <div className='landing__formSubsection'>
                    <p>Verify Password:</p>
                    <input 
                    className='verifyPassword' 
                    placeholder="Verify password" 
                    type="password" 
                    value={password2}
                    onChange={e=>setPassword2(e.target.value)}
                    />
                </div>

                <button 
                className="landing__formButton"
                onClick={signUp}
                >Sign Up</button>

<               Link 
                    to='/Main' 
                    className="landing__continueButton"
                >
                    Continue as Guest
                </Link>

            </div>
        </form>
        ):(
            <Link to='/view'>
                <button
                    className='landing__loggedInButton'
                    type='button'
                >
                    Continue to app
                </button>
            </Link>

        )}
        </div>
    </div>
    )
}

export default Register
