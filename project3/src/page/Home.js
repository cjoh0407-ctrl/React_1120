/* eslint-disable */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../component/Button';
import Header from '../component/Header';
import Editor from '../component/Editor';

const Home = () => {

    return (
        <div>
            <Editor onSubmit={ (state) => alert(state.content)}/>
        </div>
    );

};

export default Home;
