import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './stateProvider';
import './Landing.css';
import './formStyles.css';
import { facts } from './randoFacts';
import TopFive from './TopFive';
import { auth } from './firebase';
const API_URL = "http://localhost:9000";

const Landing = () => {

    const history = useHistory();
    const [{user}, ] = useStateValue();
    const randoIndex = Math.floor((Math.random()* facts.length) +1);
    const randoQuote = facts[randoIndex];
    const [topFive, setTopFive] = useState('');
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
            auth.createUserWithEmailAndPassword(email, password)
                .then((auth)=>{
                    if(auth){
                        history.push('/view');
                    }
                }).catch(e=>alert(e.message));
        } else {
            alert('Email or Password did not match\n Check fields and try again.')
        }
    }


    useEffect(()=>{
        fetch(API_URL+"/view", {
            method: 'GET',
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            setTopFive(data.slice(0,5));
        })
    }, [])

    return (

        <div className="landing">
            <div className='landing__underlay'>
            <div className='landing__wrapper'>
                <div className='landing__titleWrapper'>
                    <h1>LETS MAKE A LIST!</h1>
                    <div className='landing__quote'>{randoQuote? randoQuote : 'Welcome!'}</div>
                </div>
                {!user? (
                <div className='landing__accountSecion'>

                    Create an Account:
                    <form>
                        <div className='landing__formSubsection'>
                            <p>Email:</p>
                            <input 
                                className='userEmail' 
                                placeholder="Email"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>

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

                        {/* <div className='landing__formSubsection checkbox'>
                            <input type="checkbox" /><p>Subscribe to newsletter</p>
                        </div> */}

                        <button 
                            className="landing__formButton"
                            onClick={signUp}
                        >
                            Sign Up
                        </button>
                        <Link 
                            to='/Main' 
                            className="landing__continueButton"
                        >
                            Continue as Guest
                        </Link>
                    </form>
                </div>) : (
                    <div className='landing__accountSecion'>
                        <h3>Welcome Back!</h3>
                        <Link
                            to='/view'
                            className='landing__loggedInButton'
                        > Enter the App</Link>
                    </div>
                )}

            </div>
            </div>
            <div className='landing__subsection'>
                <div className='landing__leftSpacer'>
                    ad space
                </div>

                <div className='landing__topFive'>
                    <h2>Top Five Right Now!</h2>
                    {topFive? topFive.map((obj, index)=>(
                        <TopFive 
                            data={obj}
                            index={index+1}
                        />
                    )) : 'top five'}
                </div>

                <div className='landing__rightSpacer'>
                    ad space
                </div>
            </div>
        </div>
    )
}

export default Landing
