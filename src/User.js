import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SmallPost from './SmallPost';
import { useStateValue } from './stateProvider';
import './User.css';

const User = () => {

    const API_URL = 'Http://localhost:9000';
    const [{user}, ] = useStateValue();
    const [userPosts, setUserPosts] = useState('');

    useEffect(() => {
        fetch(API_URL+'/userView/'+`${user.email.split('@')[0]}`, {
            method:'GET',
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
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
                            <span>{user.email.split('@')[0]}</span>
                            <span>{user.email}</span>
                            <span>Date joined</span>
                            <span>Posts: count</span>
                        </div>
                    </div>
                    <div className='user__lowerContent'>
                        <h3>Your Posts</h3>
                        <div className='user__postsPrivate'>
                        <h4>Private</h4>
                            {userPosts? userPosts.map((post, index)=>{
                                if (post.privacy === false){
                                    <SmallPost data={post} />
                                }
                            }): 'No Private Posts Found'}
                        </div>

                        <div className='user__postsPublic'>
                        <h4>Public</h4>
                        {userPosts? userPosts.map((post, index)=>{
                            if (post.privacy === true){
                                return <SmallPost data={post} />
                            }
                        }): 'No Public Posts Found'}
                        </div>
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
