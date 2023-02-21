import React from 'react';

function Proud({ item }) {
    return (
        <div className="proud__item">
            <img src={item.icon} alt="" />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
        </div>
    );
}

export default Proud;
