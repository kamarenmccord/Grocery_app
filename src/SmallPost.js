import React from 'react'
import "./SmallPosts.css";
import "./HiddenMenu.css";
import MenuIcon from '@material-ui/icons/Menu';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';

const SmallPost = ({data, reversed, userControl}) => {
    return (
        <div className={!reversed? 'smallpost standard' : 'smallpost reversed'}>
            {reversed && <p className='privateLogo'>p</p> }
            { userControl && 
                <div className='userControls'>
                    <MenuIcon />
                    <div className='hidden_menu'>
                        <h4>Controls</h4> 
                        <div className='controls_wrapper'>
                            <span>Make {reversed? "Public" : "Private"} <button type='button'>Change</button></span>
                            <Link to={`/update/${data._id}`}><span>Edit item <button type='button'>Edit</button></span></Link>
                            <span>Share with friends <ShareIcon /></span>
                        </div>
                    </div>
                </div>}
            <div className='smallpost__wrapper'>
                <img
                    className='smallpost__image'
                    src={data.image? data.image : ''}
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
