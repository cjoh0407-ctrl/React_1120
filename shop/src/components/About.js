import React from 'react';
import { Outlet } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <h4>회사정보</h4>
            <Outlet></Outlet>
        </div>
    );
};

export default About;