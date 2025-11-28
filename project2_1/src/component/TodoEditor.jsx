import React, { useRef, useState } from 'react';
import "./TodoEditor.css"

const TodoEditor = ({onCreate}) => {

    const [content, setContent] = useState("");

    const inputRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onSubmit = () => {
        if(!content){
            inputRef.current.focus();
            return ;
        }
        onCreate(content);
        setContent("");
    }

    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }

    return (

        <div className='TodoEditor'>
            <h4>다음에 먹을 라면은? 😁</h4>
            <div className='editor_wrapper'>
                <input onChange = {onChangeContent}
                ref = {inputRef}
                value={content}
                onKeyDown={onKeyDown}
                placeholder='새로운 라면은...' />

                <button onClick = {onSubmit}>추가</button>
            </div>
        </div>
        
    );
};

export default TodoEditor;