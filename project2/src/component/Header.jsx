import React from 'react';
import "./Header.css"


const Header = () => {
    return (
        <div className='Header'>
            <h3> 오늘은 내가 짜파게티 요리사🍜👩🏿‍🍳 </h3>
            <h1>{new Date().toDateString()} </h1>
        </div>
    );
};

export default Header;