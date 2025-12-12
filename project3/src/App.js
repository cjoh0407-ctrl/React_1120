import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import New from './page/New';
import Diary from './page/Diary';
import Edit from './page/Edit';
import React, { useEffect, useReducer, useRef, useState } from 'react';

function reducer(state, action){
  switch(action.type){
    case "CREATE":{
      return [action.data, ...state]
    }
    case "UPDATE":{
      return state.map( (it)=> 
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE":{
      return state.filter( (it)=> String(it.id) !== String(action.targetId))
      //필터 기능을 이해해야함.
    }
    case "INIT":{
      return action.data;
    }

    default:{
      return state;
    }
  }
}

//임시 데이타
const mockData = [
  {
    id : "mock1",
    date : new Date().getTime(),
    content : "mock1",
    emotionId : 1
  },
  {
    id : "mock2",
    date : new Date().getTime(),
    content : "mock2",
    emotionId : 2
  },
  {
    id : "mock3",
    date : new Date().getTime(),
    content : "mock3",
    emotionId : 3
  }
];

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const idRef = useRef(0);

  useEffect( ()=> {
    dispatch({
      type : "INIT",
      data : mockData
    });
    setIsDataLoaded(true);
  },[]);

  // 새로운 글 하나 만들기
  const onCreate = ({date, content, emotionId}) => {
    dispatch({
      type : "CREATE",
      data : {
        id : idRef.current,
        date : new Date(date).getTime(),
        content : content,
        emotionId : emotionId
      }
    });
    idRef.current += 1;
  };

  // 몇 번 글 수정할건지
  const OnUpdate = ({id, date, content, emotionId}) => {
    dispatch({
      type : "UPDATE",
      data : {
        id : id,
        date : new Date(date).getTime(),
        content,
        emotionId
      }
    });
  };
  
  const OnDelete = (targetId) => {
    dispatch({
      type : "DELETE",
      targetId
    })
  }

  if(!isDataLoaded){
    return <div>데이터를 불러오는 중입니다</div>
  }else{
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, OnUpdate, OnDelete}}>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New/>} />
              <Route path='/diary/:id' element={<Diary/>} />
              <Route path='/edit/:id' element={<Edit/>} />
            </Routes>
            <div>
              <Link to={"/"}>Home</Link> 
              <Link to={"/new"}>New</Link>
              <Link to={"/diary"}>Diary</Link>
              <Link to={"/edit"}>Edit</Link>
            </div>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}
export default App;
