import React from 'react';
import { useParams } from 'react-router-dom';

const Diary = () => {
    const {id} = useParams();
    console.log(id);
    return (
        <div>
            Diary 페이지 입니다.
            {id}
        </div>
    );
};

export default Diary;