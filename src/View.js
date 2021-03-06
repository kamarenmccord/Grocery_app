import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./View.css";
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectDefault } from './features/reactSlice';
import { ADD_TO_BASKET, selectBasket } from './features/basketSlice';

const API_URL = "http://localhost:9000";

const View = () => {

    const user = useSelector(selectDefault);
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState('');
    const [forceOnDelete, setForceOnDelete] = useState(0);

    const deletePost = (id)=>{
        fetch(API_URL+`/postId=${id}`, {
            method:"DELETE",
        }).then(()=>{
            setForceOnDelete(forceOnDelete+1);
        })
    }

    const addMealToBasket = (singleMealData) =>{
        // dispatch data to basket
        dispatch(ADD_TO_BASKET(singleMealData));
    }

    useEffect(() => {
        fetch(API_URL+"/view", {
            method: 'GET',
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            setPosts(data);
        })
    }, [forceOnDelete])

    return (
        <div className='view'>
            <Link className='view__create' to='/create'><AddIcon /></Link>
            {user && 
            <div className='view__user'>
                <div className='view__userWrapper'>
                    <img src={user.imageURL} alt='' />
                    <h4>Welcome back, {user.displayName}</h4>
                </div>
            </div>}
            <div className='view__wrapper'>
                <h2>View Recent Publishes</h2>
                {posts? posts.map((obj, index)=>{
                    if (obj.privacy === true){
                    return (<div className='view__container'>
                        <div className='view__add' 
                            onClick={()=>addMealToBasket(obj)}
                        >
                            +
                        </div>
                        {user && user.email.split('@')[0]===obj.author &&
                            <div className='userControls'>
                                <div 
                                    className='view__delete view__control'
                                    onClick={()=> deletePost(obj._id)}
                                >Delete</div>
                                <Link to={`/update/${obj._id}`}><div className='view__update view__control'>Update</div></Link>
                            </div>}
                        <img 
                            className='view__image'
                            src={obj.image? obj.image : 'https://images.unsplash.com/photo-1608501857571-31a43311e342?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'}
                            alt=''
                        />
                        <div className='view__content'>
                        <div className='view__title' ><Link to={`/post/${obj._id}`}>{obj.title}</Link></div>
                        <div className='view__author' >Published By: {obj.author}</div>
                        <div className='view__date' >{new Date(parseInt(obj.published_date)).toDateString()}</div>
                        <div className='view__directions' >
                            <ul>
                                {obj.ingrediants? obj.ingrediants.map((data)=>(
                                    <li>{data.name}{data.amount && data.amount>0? ": "+data.amount:''}</li>
                                )) : ''}
                            </ul>
                            <span>{obj.instructions? obj.instructions : ''}</span>
                        </div>
                    </div>
                    </div>)
                } else {
                    return ('')
                }}) : (
                <div className='view__container'>
                    <img className='view__image' 
                        src='https://images.unsplash.com/photo-1608501857571-31a43311e342?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
                        alt=''
                    />
                    <div className='view__content'>
                        <div className='view__title' >Title</div>
                        <div className='view__author' >Published By: author</div>
                        <div className='view__date' >date</div>
                        <div className='view__directions' >
                            Directions
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default View
