import React from 'react';
import './tooltip.css'
const Tooltip = ({content}) => {
    return (
        <div className='tooltip-containar w-32'>
            <button className='main'>{content}</button>
        </div>
    );
};

export default Tooltip;