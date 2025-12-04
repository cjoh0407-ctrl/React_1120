import React, { useReducer, useRef} from 'react'
import './App.css'
import Header from './component/Header'
import TodoEditor from './component/TodoEditor'
import TodoList from './component/TodoList'


// 초기 할 일 설정 3개 해둠.
const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createDate: new Date().getTime(),
  },
]

function reducer(state, action){ // state 현재 상태, action 요청

  switch(action.type){
    case "CREATE": // 액션 타입이 create면 아이템을 하나 만들어서 기존 상태의 맨 앞에 넣어라
      return [action.newItem, ...state];
    case "UPDATE": // 타입이 update면 현재 가지고있는 리스트 배열을 보면서 삼항연산자
      return state.map( (it) => it.id === action.id ? {...it, isDone: !it.isDone}: it )
    case "DELETE": // 하나씩 필터링 할거야 필터 조건은 id가 다르면 살고 같으면 지워짐
      return state.filter(it => it.id !== action.id)
    default:
      return state;
  }
}

export const TodoContext = React.createContext();
// context 만들고 todoContext라는 이름으로 export

function App() {
  
  const [todo, dispatch] = useReducer(reducer, mockTodo)
  const idRef = useRef(3);
  
  /* 데이타 추가 하기*/
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content: content,
        isDone: false,
        createDate: new Date().getTime()
      }
    })
    idRef.current += 1;
  };

  /* 데이타 수정 하기*/
  const OnUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      id: targetId
    });
  };

  /* 데이타 삭제 하기*/
  const onDelete = (targetId) =>{
    dispatch({
      type: "DELETE",
      id: targetId
    });
  };
  
  return (
    <div className="App">

      {/* <TestComp /> */}

      <Header />

      <TodoContext.Provider value ={{todo, onCreate, OnUpdate , onDelete }}>
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>

    </div>
  )
}

export default App
