import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Create.css';
import Ingrediant from './Ingrediant';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from './stateProvider';

const API_URL = "http://localhost:9000";

const Create = () => {

    const history = useHistory();
    const [{user}, ] = useStateValue();
    // where true is privacy for public
    const [privacySetting, setPrivacySetting] = useState(true);

    const submitNewMeal = () =>{

        // grab alert banner
        let alertBanner = document.getElementsByClassName('alert__banner')[0];

        //mealTitle is already set
        const ingrediants = [];
        // const sendData = new FormData();
        const ingrediantArray = document.getElementsByClassName('ingrediant__new')
        for (let elem of ingrediantArray){
            let amountInput = elem.nextSibling.nextSibling.childNodes[0].value;
            if (!amountInput){
                amountInput = 0;
            }

            const sendData = {};
            sendData["name"] = elem.value;
            sendData["amount"] = amountInput;
            ingrediants.push(sendData);
        }

        // verify fields

        if (!mealTitle){
            // raise alertbanner, no title given
            alertBanner.innerText = 'A Title is Required';
            alertBanner.style.display = 'flex';
            alertBanner.style.backgroundColor = 'red';
        }

        if (!ingrediants || ingrediants[0].length===0){
            // raise alertbanner, no ingredians given
            alertBanner.innerText = 'You must give at least one ingrediant';
            alertBanner.style.display = 'flex';
            alertBanner.style.backgroundColor = 'red';
        }

        if (mealTitle){
            if (ingrediants){
                // all exist
                alertBanner.innerText = 'Success! Now adding to your creations.';
                alertBanner.style.display = 'flex';
                alertBanner.style.backgroundColor = 'green';

                // author, ingrediants, privacy, instructions
                let sendData = {
                    "title": mealTitle,
                    "ingrediants": ingrediants,
                    "instructions" : directions,
                    "privacy": privacySetting,
                    "image" : '',
                }
                if (user){
                    sendData["author"] = user.email.split('@')[0];
                } else {
                    sendData['author'] = "Anonymous";
                }
                // sendData.append("privacy", true);

                    // send to server
                    fetch(API_URL+'/create', {
                        method:'POST',
                        body: JSON.stringify(sendData),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                         },
                    }).then((response)=>{
                        return response.json();
                    }).then((data)=>{
                        history.push('/view');
                    })
            }
        }
    }

    let [count, setCount] = useState(1); // index for ing componet
    let [mealTitle, setTitle] = useState('');
    let [directions, setDirections] = useState('');

    return (
        <div className='create'>
            <Link className="create__social" to='/view'>V</Link>

            <div className='alert__banner'></div>

            <div className='create__wrapper'>

                <div className='create__conversions'>
                    Conversions chart
                </div>

                <div className='create__new'>
                    <form className='create__form'>
                        <div className='create__titleWrapper'>
                            <h3>Name your Creation</h3>
                            <input 
                                className='create__title' 
                                placeholder='Title'
                                value={mealTitle}
                                onChange={event=>setTitle(event.target.value)}
                            />
                        </div>

                        <div className='create__ingrediants'>
                            { Array(count).fill().map((num, index)=>(
                                <Ingrediant ingrediantNumber={index} />
                                ))
                            }

                            {count>1 && 
                                <button className='create__button' type="button" onClick={()=>setCount(count-1)}>
                                    <RemoveIcon /> Remove Last Ingrediant
                                </button>
                            }
                            <button className='create__button' type="button" onClick={()=>setCount(count+1)}><AddIcon /> Add Ingrediant</button>
                            
                            <div className='create__instructions'>
                                <p>How to prepare (this should be a different element)</p>
                                <input 
                                    placeholder='instructions'
                                    value={directions}
                                    onChange={event=>setDirections(event.target.value)}    
                                />
                            </div>
                        </div>


                    </form>

                    <div className='create__controls'>
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
                        </span>
                        <button 
                            className='create__buttonSubmit'
                            onClick={submitNewMeal.bind()}
                        >
                                Submit Creation
                            </button>
                    </div>
                    
                </div>

                <div className='create__view'>
                    Top 10 last choosen menu items here
                </div>

            </div>
        </div>
    )
}

export default Create
