import React, { useEffect, useState } from 'react'
import {Link, useHistory, useParams} from 'react-router-dom';
import "./Meal.css";

const API_URL = 'http://localhost:9000';

const Meal = ({update}) => {
    const history = useHistory();
    const defaultImage = 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    const { postId } = useParams();
    // const user = useSelector(defaultSlice);
    const [postData, setPostData ] = useState();
    const [background, setBackground ] = useState(defaultImage);

    //for updates
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [privacySetting, setPrivacySetting] = useState(true);
    const [forceRefresh, setForceRefresh] = useState(false);

    const getForms = ()=>{
        // gets form data on page then returns
        const ingrediantElements = document.getElementsByClassName('meal__ingrediantUpdate');
        const data =    {title: newTitle,
                        instructions: newDescription,
                        privacy: privacySetting}

        let ingrediants = [];
        for (let element of ingrediantElements){
            let name= element.children[0].children[1].value;
            let amount= element.children[1].children[1].value;
            if (!amount){amount=''}
            if (name){
                ingrediants.push({"name":name, "amount": amount})
            }
        }

        if (ingrediants && ingrediants.length>0){
            data.ingrediants = ingrediants;
        }

        if (newImageUrl){
            data.image = newImageUrl
        }

        return data;
    }

    const sendUpdate = (e)=>{
        e.preventDefault();
        // get data from forms then send to api / refresh
        let data = getForms();
        if (data){
            fetch(API_URL+`/update/${postData._id}`,{
                method: 'PUT',
                body:JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                 },
            }).then((res)=>{
                console.log("dataUpdated!")
                updateVars(res, true);
            })
        }
    }

    const updateVars = (mealJson, skipMain)=>{
        if (!skipMain){
        setPostData(mealJson);
        }
        if (mealJson.image){
            setBackground(mealJson.image);
        }
        setNewTitle(mealJson.title);
        setNewDescription(mealJson.instructions);
    }

    useEffect(()=>{
        fetch(API_URL + `/post/${postId}`,{
            method:'GET',
        }).then((response)=>(
            response.json()
        )).then(data=>{
            updateVars(data);
        })
    }, [])

    return (
        <div className='meal'>
            {update &&
            <div className='userBox'>
             <h4>Update</h4>
                <form>
                    <div className='meal__titleWrapper'>
                        <p>Title:</p>
                        <input
                            className='meal__newTitle'
                            value={newTitle}
                            onChange={e=>setNewTitle(e.target.value)}
                        />
                    </div>
                    <div className='meal__descriptionWrapper'>
                        <p>Description:</p>
                        <input
                            className='meal__newDescription'
                            value={newDescription}
                            onChange={e=>setNewDescription(e.target.value)}
                        />
                    </div>
                    <div className='meal__privacy'>
                    <span>
                        <input 
                            name='privacy' 
                            type='radio' 
                            id='public'
                            onClick={()=>setPrivacySetting(true)}
                            checked />
                            <label for='public'>Public</label>
                        </span>
                        <span>
                            <input 
                            className='checkbox' 
                            name='privacy' 
                            type='radio' 
                            onClick={()=>setPrivacySetting(false)} 
                            id='private' 
                            />
                            <label className='checkbox' for='private'>Private</label>
                            {postData && !postData.privacy && <p className='privateLogo'>P</p> }
                        </span>
                    </div>
                    <button type='button' onClick={sendUpdate}>Update</button>
                </form>
            </div>
            }
            <Link to='/view' className='meal__return'>Go Back</Link>
            {postData? 
            <div className='meal__wrapper'>
                <div className='meal_image' style={{backgroundImage: `url("${background}")`}}
                >{!postData.privacy && <div className='hidden__wrapper'>
                <div className='meal__privacy'>p</div><div className='hidden_div'>Private</div></div>
            }
                <div className='meal__addToBasketButton'>Add to shop list</div>
                <div className='meal_imageShadow'>
                    {update && 
                    <div className='meal__imageEditWrapper'>
                        <p>New Image URL: </p>
                        <input placeholder='image url'
                            value={newImageUrl}
                            onChange={e=>setNewImageUrl(e.target.value)}
                        />
                    </div>
                    }
                    <div className='meal__title'>
                        {postData.title}
                    </div>
                </div></div> {/*ends background and shadow*/}
                <div className='meal__information'>
                    <span className='meal__author'>Posted By: {postData.author}</span>
                    <span className='meal__date'>Posted Date: {Date(postData.published_date).split(' ').splice(0, 4).join(' ')}</span>
                    <div className='meal__ingrediants'>
                        {!update && postData.ingrediants? postData.ingrediants.map(ingrediant=>(
                        <div className='meal__ingrediant'>{ingrediant.name} {ingrediant.amount>0 && ":"+ingrediant.amount}</div>
                        )): ( postData.ingrediants.map(ingrediant=>(
                            <div className='meal__ingrediantUpdate'>
                                <div className='meal__updateIngrediantName'>
                                    <p>Ingrediant: </p><input placeholder={ingrediant.name} />
                                </div>
                                <div className='meal__updateIngrediantAmount'>
                                    <p>Amount: </p><input placeholder={ingrediant.amount || 0} />
                                </div>
                            </div>))
                        )}
                    </div>
                    <div className='meal__instructions'>{postData.instructions}</div>
                </div>
            </div>
            :''}
        </div>
    )
}

export default Meal
