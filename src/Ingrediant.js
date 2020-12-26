import React from 'react';
import "./Ingrediant.css";
import HelpIcon from '@material-ui/icons/Help';

const Ingrediant = ({ ingrediantNumber }) => {

    const index = ingrediantNumber+1;

    return (
        <div className='ingrediant'>
            <p>Ingrediant { index? index : ''}:</p>
            <input className='ingrediant__new' id="ingrediant" placeholder='ingrediant' />
            <p>Amount:</p>
            <span>
                <input className='ingrediant__amount' id="amount" placeholder='Amount' />
                <div className='helpIco'><HelpIcon />
                    <div className='hiddenHelp'>
                        Leave this blank or 0 if you are unsure.
                        You can put any messurement after the number ex: "1/2 cup", "200 ml", "7 oz"
                    </div>
                </div>
            </span>
        </div>
    )
}

export default Ingrediant
