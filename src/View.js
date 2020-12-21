import React from 'react';
import "./View.css";

const View = () => {

    const user = null;

    return (
        <div className='view'>
            {user && <div className='view__user'>user section</div>}
            <div className='view__wrapper'>
                <h2>View Recent Publishes</h2>
                <div className='view__container'>
                    <img className='view__image' 
                        src='https://images.unsplash.com/photo-1608501857571-31a43311e342?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
                        alt=''
                    />
                    <div className='view__content'>
                        <div className='view__title' >Title</div>
                        <div className='view__author' >Published By: author</div>
                        <div className='view__date' >date</div>
                        <div className='view__directions' >
                            Directions
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View
