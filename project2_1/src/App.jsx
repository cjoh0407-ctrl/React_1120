import { useReducer, useRef, useState } from 'react'
import './App.css'
import Header from './component/Header'
import TodoEditor from './component/TodoEditor'
import TodoList from './component/TodoList'
import TestComp from './component/TestComp'

const mockTodo = [
  {
    id : 0,
    isDone : false,
    content : "간짬뽕",
    createDate : new Date().getTime()
  },
  {
    id : 1,
    isDone : false,
    content : "짜파게티",
    createDate : new Date().getTime()
  },
  {
    id : 2,
    isDone : false,
    content : "신라면",
    createDate : new Date().getTime()
  },
]

function reducer (state, action){

  switch(action.type){
    case "CREATE" :
      return [action.newItem, ...state];
    case "UPDATE" :
      return state.map((it) => 
        it.id === action.id ?
        {...it, isDone : !it.isDone} :
        it
      )
    case "DELETE" : 
      return state.filter(it => it.id !== action.id)
    default :
      return state;
  }
}

function App() {

  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);

  // 데이터 추가하기!
  const onCreate = (content) => {
    dispatch({
      type : "CREATE",
      newItem : {
        id : idRef.current,
        content,
        isDone : false,
        createDate : new Date().getTime()
      }
    })
    idRef.current += 1;
  }
  
  //데이터 수정하기!
  const onUpdate = (targetId) => {
    dispatch({
      type : "UPDATE",
      id : targetId
    })
  };

  // 데이터 삭제하기!
  const onDelete = (targetId) => {
    dispatch({
      type : "DELETE",
      id : targetId
    })
  }

  return (
    <div className='App'>

    {/* <TestComp /> */}

      <Header />
      <TodoEditor onCreate = {onCreate} />
      <TodoList todo = {todo} onUpdate = {onUpdate} onDelete = {onDelete} />
    </div>
  )
}

export default App
