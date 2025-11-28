import React from 'react';
import "./TodoItem.css"

const TodoItem = ({id, content, isDone, createDate, onUpdate, onDelete}) => {

    

    return (

        <div className='TodoItem'>
            <div className='checkbox_col'>
                <input type="checkbox" 
                onClick={() => onUpdate(id)}
                checked={isDone} />
            </div>
        

            <div className='title_col'>
                {content}
            </div>

            <div className='date_col'>
                {new Date(createDate).toLocaleDateString()}
            </div>

            <div className='btn_col'>
                <button onClick={() => onDelete(id)}>🗑️</button>
            </div>
        </div>
    
    );
};

export default TodoItem;