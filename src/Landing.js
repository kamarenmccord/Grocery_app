import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import './formStyles.css';
import { facts } from './randoFacts';

const Landing = () => {

    const randoIndex = Math.floor((Math.random()* facts.length) +1);
    const randoQuote = facts[randoIndex];

    return (
        <div className="landing">
            <div className='landing__underlay'>
            <div className='landing__wrapper'>
                <div className='landing__titleWrapper'>
                    <h1>LETS MAKE A LIST!</h1>
                    <div className='landing__quote'>{randoQuote? randoQuote : 'Welcome!'}</div>
                </div>
                <div className='landing__accountSecion'>
                    Create an Account:
                    <form>
                        <div className='landing__formSubsection'>
                            <p>Email:</p>
                            <input className='userEmail' placeholder="Email" />
                        </div>

                        <div className='landing__formSubsection'>
                            <p>Password:</p>
                            <input className='userPassword' placeholder="password" type="password" />
                        </div>

                        <div className='landing__formSubsection'>
                            <p>Verify Password:</p>
                            <input className='verifyPassword' placeholder="Verify password" type="password" />
                        </div>

                        <div className='landing__formSubsection checkbox'>
                            <input type="checkbox" /><p>Subscribe to newsletter</p>
                        </div>

                        <button className="landing__formButton">Submit</button>
                        <Link to='/Main' className="landing__continueButton">Continue as Guest</Link>
                    </form>
                </div>

            </div>
            </div>
            <div className='landing__subsection'>
                <div className='landing__leftSpacer'>
                    ad space
                </div>

                <div className='landing__topFive'>
                    Top five items here
                </div>

                <div className='landing__rightSpacer'>
                    ad space
                </div>
            </div>
        </div>
    )
}

export default Landing
