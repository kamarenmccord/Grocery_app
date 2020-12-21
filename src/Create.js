import React, { useState } from 'react';
import './Create.css';
import Ingrediant from './Ingrediant';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Create = () => {

    let [count, setCount] = useState(1);

    return (
        <div className='create'>
            <div className='create__wrapper'>

                <div className='create__conversions'>
                    Conversions chart
                </div>

                <div className='create__new'>
                    <form className='create__form'>
                        <div className='create__titleWrapper'>
                            <h3>Name your Creation</h3>
                            <input className='create__title' placeholder='Title' />
                        </div>

                        <div className='create__ingrediants'>
                            { Array(count).fill().map((_)=>(
                                <Ingrediant />
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
                                <input placeholder='instructions'></input>
                            </div>
                        </div>


                    </form>

                    <div className='create__controls'>
                    <span>
                        <input name='privacy' type='radio' id='public' checked />
                        <label for='public'>Public</label>
                    </span>
                    <span>
                        <input className='checkbox' name='privacy' type='radio' id='private' />
                        <label className='checkbox' for='private'>Private</label>
                    </span>
                    <button className='create__buttonSubmit'>Submit Creation</button>
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
