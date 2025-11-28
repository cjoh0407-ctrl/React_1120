import React, { useState } from 'react';
import "./TodoList.css"
import TodoItem from './TodoItem'

const TodoList = ({todo, onUpdate, onDelete}) => {

    const [search, setSearch] = useState("");

    // const onChangeSearch = (e) => {
    //     setSearch(e.target.value);
    // }

    const getSearchResult = () => {
        return search === "" ? 
            todo : 
            todo.filter((it) => 
                it.content.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <div className='TodoList'>

            <h4>지금까지 먹었던 라면📒</h4>
            <input className='searchbar'
                // onChange = {onChangeSearch}
                onClick={(e) => setSearch(e.target.value)}
                placeholder='무슨 라면 찾으세요?' />

            <div className='list_wrapper'>
                {
                    getSearchResult().map(
                        (it) => (
                            <TodoItem key = {it.id} {...it} onUpdate = {onUpdate} onDelete = {onDelete} />
                        )
                    )
                }
            </div>

        </div>
    );
};

export default TodoList;