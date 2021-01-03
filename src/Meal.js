import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';
import "./Meal.css";

const API_URL = 'http://localhost:9000';

const Meal = () => {
    const defaultImage = 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    const { postId } = useParams();
    const [postData, setPostData ] = useState();
    const [background, setBackground ] = useState(defaultImage);

    useEffect(()=>{
        fetch(API_URL + `/post/${postId}`,{
            method:'GET',
        }).then((response)=>(
            response.json()
        )).then(data=>{
            console.log(data)
            setPostData(data)
            if (data.image){
                setBackground(data.image);
            }
        })
    }, [])

    return (
        <div className='meal'>
            <Link to='/view' className='meal__return'>Go Back</Link>
            {postData? 
            <div className='meal__wrapper'>
                <div className='meal_image' style={{backgroundImage: `url("${background}")`}}
                >{!postData.privacy && <div className='hidden__wrapper'>
                <div className='meal__privacy'>p</div><div className='hidden_div'>Private</div></div>
            }
                <div className='meal__addToBasketButton'>Add to shop list</div>
                <div className='meal_imageShadow'>
                    <div className='meal__title'>
                        {postData.title}
                    </div>
                </div></div> {/*ends background and shadow*/}
                <div className='meal__information'>
                    <span className='meal__author'>Posted By: {postData.author}</span>
                    <span className='meal__date'>Posted Date: {Date(postData.published_date).split(' ').splice(0, 4).join(' ')}</span>
                    <div className='meal__ingrediants'>Ingrediants: {postData.ingrediants.map(ingrediant=>(
                        <div className='meal__ingrediant'>{ingrediant.name} {ingrediant.amount>0 && ":"+ingrediant.amount}</div>
                    ))}</div>
                    <div className='meal__instructions'>{postData.instructions}</div>
                </div>
            </div>
            :''}
        </div>
    )
}

export default Meal
