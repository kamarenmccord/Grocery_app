import { FlashOnTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import {Link, useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_BASKET, selectBasket } from './features/basketSlice';
import "./Meal.css";

const API_URL = 'http://localhost:9000';

const Meal = ({update}) => {
    const defaultImage = 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    const { postId } = useParams();
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();

    const [postData, setPostData ] = useState();
    const [background, setBackground ] = useState(defaultImage);

    //for updates
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [privacySetting, setPrivacySetting] = useState(true);
    const [newIngrediants, setNewIngrediants] = useState([]);

    const addMealToBasket = (singleMealData) =>{
        dispatch(ADD_TO_BASKET(singleMealData));
        let button = document.getElementsByClassName('meal__addToBasketButton')[0]
        button.style.backgroundColor = 'green';
        button.style.color = 'white';

    }

    const getForms = ()=>{
        // gets form data on page then returns
        const data =    {title: newTitle,
                        instructions: newDescription,
                        privacy: privacySetting}

        let ingrediants = [];
        for (let ingrediant of newIngrediants){
            let name= ingrediant.name;
            let amount= ingrediant.amount;
            if (amount === 0){amount=''}
            if (name.length>0){
                // to avoid blank strings
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

    const addNewIngrediant = ()=>{
        let clonedData = newIngrediants.slice();
        clonedData.push({'name':'', 'amount': ''});
        setNewIngrediants(clonedData)
    }

    const removeNewIngrediant = ()=>{
        let clonedData = newIngrediants.slice();
        clonedData.pop()
        setNewIngrediants(clonedData);
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
                return res
            }).then(()=>{
                document.getElementsByClassName('submit__button')[0].style.backgroundColor = 'green';
            }).catch(e=>{
                document.getElementsByClassName('submit__button')[0].style.backgroundColor = 'red';
                console.log(e);
            })
        }
    }

    const updateVars = (mealJson)=>{
        setPostData(mealJson);
        if (mealJson.image){
            setBackground(mealJson.image);
        }
        setNewTitle(mealJson.title);
        setNewDescription(mealJson.instructions);
        setNewIngrediants(mealJson.ingrediants);
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

    const consoleLogData = () =>{
        console.log('debug button located in meal js del before production')
        console.log(newIngrediants);
    }

    const changeIndex = (value, index, type) =>{
        let clonedArray = newIngrediants.slice();
        clonedArray[index][type] = value;
        setNewIngrediants(clonedArray);
    }

    return (
        <div className='meal'>
            <div className='dummy_button' onClick={consoleLogData}>GET DATA</div>

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
                        <textarea
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
                    <button className='submit__button' type='button' onClick={sendUpdate}>Update</button>
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
                <button className='meal__addToBasketButton' onClick={()=>addMealToBasket(postData)}>Add to shop list</button>
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
                </div></div> {/*ends background and shadow layers dont seperate*/}
                <div className='meal__information'>
                    <span className='meal__author'>Posted By: {postData.author}</span>
                    <span className='meal__date'>Posted Date: {Date(postData.published_date).split(' ').splice(0, 4).join(' ')}</span>
                    <div className='meal__ingrediants'>
                        {!update && postData.ingrediants? postData.ingrediants.map(ingrediant=>(
                        <div className='meal__ingrediant'>{ingrediant.name} {ingrediant.amount>0 && ":"+ingrediant.amount}</div>
                        )): (
                            newIngrediants && newIngrediants.map((ingrediant, index)=>(
                            <div className='meal__ingrediantUpdate'>
                                <div className='meal__updateIngrediantName'>
                                    <p>Ingrediant: </p><input value={ingrediant.name} onChange={(e)=>changeIndex(e.target.value, index, "name")}/>
                                </div>
                                <div className='meal__updateIngrediantAmount'>
                                    <p>Amount: </p><input value={ingrediant.amount || 0} onChange={(e)=>changeIndex(e.target.value, index, "amount")} />
                                </div>
                            </div>))
                        )}
                        {update &&<div className="meal__userControls">
                        <div className='addIngrediant' onClick={()=>addNewIngrediant()}>+</div>
                        <div className='addIngrediant' onClick={()=>removeNewIngrediant()}>-</div>
                        </div>
                        }
                    </div>
                    <div className='meal__instructions'>{postData.instructions}</div>
                </div>
            </div>
            :''}
        </div>
    )
}

export default Meal
