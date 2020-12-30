import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDefault } from './features/reactSlice';
import SmallPost from './SmallPost';
import './User.css';

const User = () => {

    const API_URL = 'Http://localhost:9000';
    const user = useSelector(selectDefault);
    const [userPosts, setUserPosts] = useState('');

    useEffect(() => {
        if (user){
            fetch(API_URL+'/userView/'+`${user.displayName}`, {
                method:'GET',
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                setUserPosts(data);
            })
        } // end if
    }, [user])

    return (
        <div className='user'>
            {user? 
            (
                <div className='conditional_wrapper'>
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
                    </div>
                    <div className='user__lowerContent'>
                        <h3>Your Posts</h3>
                        <h4>Kept Private</h4>
                        <div className='user__postsPrivate'>
                            {userPosts? userPosts.map((post, index)=>{
                                if (!post.privacy){
                                    return <SmallPost data={post} />
                                }
                            }): <h5>No Private Posts Found</h5>}
                        </div>

                        <h4>Publicly Shared</h4>
                        <div className='user__postsPublic'>
                        {userPosts? userPosts.map((post, index)=>{
                            if (post.privacy){
                                 return <SmallPost data={post} />
                            }
                            }): <h5>No Public Posts Found</h5>}
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
