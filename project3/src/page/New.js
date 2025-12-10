import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Button from '../component/Button';
import Editor from '../component/Editor';
import { DiaryDispatchContext } from '../App';

const New = () => {
    const navigate = useNavigate();
    const {onCreate} = useContext(DiaryDispatchContext);
    const goBack = ()=> {
        navigate(-1);
    }

    const onSubmit = (data) => {
        //const {date, content, emotionId} = data;
        //onCreate(date, content, emotionId);
        onCreate({...data});
        navigate("/", {relative : true});
    }

    return (
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button text={"<뒤로 가기"} onClick={goBack} />}
            />
            <Editor onSubmit={onSubmit} />
        </div>
    );
};

export default New;