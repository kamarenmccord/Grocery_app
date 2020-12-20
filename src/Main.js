import React from 'react';
import { Link } from 'react-router-dom';
import "./Main.css";

const Main = () => {
    return (
        <div className='main'>
            <div className='main__wrapper'>
                <Link to='/create'>
                    <div className='main__create card'>
                        <p>Create New</p>
                        <span>Create a New item to add to your account</span>
                    </div>
                </Link>

                <Link to='/view'>
                    <div className='main__view card'>
                        <p>View Others</p>
                        <span>View items that others or yourself have created</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Main
