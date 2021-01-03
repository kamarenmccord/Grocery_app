import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDefault } from './features/reactSlice';
import SmallPost from './SmallPost';
import './User.css';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

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
            {user && 
            <Link className='user__backArrow' to='/view'>Go Back <KeyboardArrowLeftIcon /></Link>
            }
            {user? 
            (
                <div className='conditional_wrapper'>
                    <div className='user__wrapper'>
                        <div className='user__upperContent'>
                            <img
                                className='user__image'
                                src={user.imageURL}
                                alt=''
                            />
                            <div className='user__titleContent'>
                                <span>{user.displayName}</span>
                                <span>{user.email}</span>
                                <span>Date joined</span>
                                <span>Your Total Posts: {userPosts? userPosts.length : 0}</span>
                            </div>
                        </div>

                        <div className='user__subContent'>
                            <div className='user__imageInput'>
                                <input placeholder='image url' type='text' /><SendIcon />
                            </div>
                            <Link to='/editUser' className='user__settingsLink'>Edit your profile <SettingsIcon /></Link>
                        </div>
                    </div>
                    <div className='user__lowerContent'>
                        <h3>Your Posts</h3>
                        <h4>Kept Private</h4>
                        <div className='user__postsPrivate'>
                            {userPosts? userPosts.map((post, index)=>{
                                if (!post.privacy){
                                    return <SmallPost data={post} reversed={true} userControl={true} />
                                }
                            }): <h5>No Private Posts Found</h5>}
                        </div>

                        <h4>Publicly Shared</h4>
                        <div className='user__postsPublic'>
                        {userPosts? userPosts.map((post, index)=>{
                            if (post.privacy){
                                 return <SmallPost data={post} userControl={true} />
                            }
                            }): <h5>No Public Posts Found</h5>}
                        </div>
                    </div>
                </div>
            ):(
                <div className='user__warning'>
                    There has been an issue finding your credenitals, please re-sign in and try again. if this does not help then contact support. <Link to='/'>Get me out of here <KeyboardArrowLeftIcon /></Link>
                </div>
            )}
        </div>
    )
}

export default User
