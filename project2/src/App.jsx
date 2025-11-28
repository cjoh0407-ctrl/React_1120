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

function App() {

  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(3);

  // 데이터 추가하기!
  const onCreate = (content) => {
    const newItem = {
      id : idRef.current,
      isDone : false,
      content,
      createDate : new Date().getTime()
    }
    setTodo([...todo, newItem]);
    idRef.current += 1;
  }
  
  //데이터 수정하기!
  const onUpdate = (targetId) => {
    setTodo(
      todo.map(
        (it)=> 
          it.id === targetId ? 
          {...it, isDone : !it.isDone} : it
      )
    )
  };

  // 데이터 삭제하기!
  const onDelete = (targetId) => {
    setTodo(
      todo.filter((it) => it.id !== targetId)
    )
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
