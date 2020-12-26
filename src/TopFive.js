
import React from 'react';
import "./TopFive.css";

const TopFive = ({data, index}) => {
    return (
        <div className='topFive'>
            <div className='topFive__wrapper'>
                <img className='topFive__background'
                    src={data.image? data.image : 'https://images.unsplash.com/photo-1608501857571-31a43311e342?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'}
                    alt=''
                />
                <h2 className='topFive__number'>{index}</h2>
                <div className='topFive__content'>
                    <h3 className="topFive__title">{data.title}</h3>
                    <div className="topFive__date">{new Date(parseInt(data.published_date)).toDateString()}</div>
                    <div className="topFive__author">Published By: {data.author}</div>
                    <ul>
                        {data.ingrediants? data.ingrediants.map((obj)=>(
                            <li>{obj.name}</li>
                        )) : ''}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopFive
