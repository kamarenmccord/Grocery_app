import React from 'react'
import "./SmallPosts.css";

const SmallPost = ({data}) => {
    return (
        <div className='smallpost'>
            <div className='smallpost__wrapper'>
                <img
                    className='smallpost__image'
                    src=''
                    alt=''
                />
                <div className='smallpost__content'>
                    <h2>{data.title}</h2>
                    <span>Published on: {new Date(parseInt(data.published_date)).toDateString()}</span>
                    <ul>
                        {data.ingrediants.map((item)=>{
                            return <li>{item.name}{item.amount? ": "+item.amount:''}</li>
                        })}
                    </ul>
                    <div className='smallpost__instructions'>
                        {data.instructions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallPost
