import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from './stateProvider';
import './User.css';

const User = () => {

    const API_URL = 'Http://localhost:9000';
    const [{user}, ] = useStateValue();
    const [userPosts, setUserPosts] = useState('');

    useEffect(() => {
        fetch(API_URL+'/userView', {
            method:'GET',
        }).then((data)=>{
            console.log(data);
            setUserPosts(data);
        })
    }, [])

    return (
        <div className='user'>
            {user? 
            (
                <div className='user__wrapper'>
                    <div className='user__upperContent'>
                        <img
                            className='user__image'
                            src=''
                            alt=''
                        />
                        <div className='user__titleContent'>
                            <span>name</span>
                            <span>{user.email}</span>
                            <span>Date joined</span>
                            <span>Posts: count</span>
                        </div>
                    </div>
                    <div className='user__lowerContent'>
                        recent posts by user
                    </div>
                </div>
            ):(
                <div className='user__warning'>
                    There has been an issue finding your credenitals, please re-sign in and try again. if this does not help then contact support. <Link to='/'>Get me out of here</Link>
                </div>
            )}
        </div>
    )
}

export default User
