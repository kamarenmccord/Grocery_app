import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import './formStyles.css';
import { facts } from './randoFacts';
import TopFive from './TopFive';
import Register from './Register';
// import Register from './Register';
const API_URL = "http://localhost:9000";

const Landing = () => {
    const randoIndex = Math.floor((Math.random()* facts.length) +1);
    const randoQuote = facts[randoIndex];


    const [topFive, setTopFive] = useState('');


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

                    <Register />

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
