# Page 폴더 상세 설명서

## 📚 목차
1. [개요](#개요)
2. [Home.js - 메인 페이지](#homejs---메인-페이지)
3. [New.js - 새 일기 작성 페이지](#newjs---새-일기-작성-페이지)
4. [Diary.js - 일기 상세보기 페이지](#diaryjs---일기-상세보기-페이지)
5. [Edit.js - 일기 수정 페이지](#editjs---일기-수정-페이지)
6. [페이지 간 데이터 흐름](#페이지-간-데이터-흐름)

---

## 개요

`page` 폴더는 React 일기장 애플리케이션의 **각 화면(페이지)을 구성하는 컴포넌트**들을 담고 있습니다. 
React Router를 사용하여 각 페이지로 라우팅되며, 총 4개의 주요 페이지로 구성되어 있습니다.

### 페이지 구조
```
page/
├── Home.js     → 메인 페이지 (월별 일기 목록)
├── New.js      → 새 일기 작성 페이지
├── Diary.js    → 일기 상세보기 페이지
└── Edit.js     → 일기 수정 페이지
```

---

## Home.js - 메인 페이지

### 🎯 역할
메인 화면으로, **특정 월의 일기 목록을 보여주는 페이지**입니다. 사용자는 월을 변경하며 해당 월에 작성된 일기들을 확인할 수 있습니다.

### 📋 코드 전체
```javascript
import { useContext, useEffect, useState } from 'react';
import Button from '../component/Button';
import Editor from '../component/Editor';
import Header from '../component/Header';
import { DiaryStateContext } from '../App';
import { getMonthRangeByDate } from '../util';
import DiaryList from '../component/DiaryList';

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [filteredData, setFilteredData] = useState([]);

    const [pivotDate, setPivotDate] = useState(new Date());

    const headerTitle = `${pivotDate.getFullYear()}년
                            ${pivotDate.getMonth() + 1}월`


    const onIncreaseMonth = ()=> {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    
    const onDecreaseMonth = ()=> {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    useEffect(()=> {
        if(data.length>=1){
            const {beginTimeDate, endTimeStamp} = getMonthRangeByDate(pivotDate);

            setFilteredData(
                data.filter( (it) => beginTimeDate <= it.date && it.date <= endTimeStamp));

        }else{
            setFilteredData([]);
        }
    }, [data, pivotDate])

    return (
        <>
            <Header 
                title = {headerTitle}
                leftChild = {<Button text={"<"} onClick={onDecreaseMonth} />}
                rightChild = {<Button text={">"} onClick={onIncreaseMonth} />}
            />

            <DiaryList data={filteredData}/>
        </>
    );

};

export default Home;
```

### 🔍 상세 분석

#### 1. Import 섹션
```javascript
import { useContext, useEffect, useState } from 'react';
import Button from '../component/Button';
import Editor from '../component/Editor';
import Header from '../component/Header';
import { DiaryStateContext } from '../App';
import { getMonthRangeByDate } from '../util';
import DiaryList from '../component/DiaryList';
```

- **`useContext`**: App.js에서 제공하는 전역 상태(일기 데이터)를 가져오기 위해 사용
- **`useEffect`**: 월이 변경되거나 일기 데이터가 변경될 때마다 필터링을 다시 실행
- **`useState`**: 현재 보고 있는 월(pivotDate)과 필터링된 일기 데이터(filteredData)를 관리
- **`DiaryStateContext`**: 전체 일기 데이터를 담고 있는 Context
- **`getMonthRangeByDate`**: 특정 월의 시작 시간과 끝 시간을 계산하는 유틸리티 함수
- **컴포넌트들**: Header, Button, DiaryList을 사용하여 UI 구성

#### 2. State 관리
```javascript
const data = useContext(DiaryStateContext);
const [filteredData, setFilteredData] = useState([]);
const [pivotDate, setPivotDate] = useState(new Date());
```

- **`data`**: Context에서 가져온 전체 일기 데이터 배열
- **`filteredData`**: 현재 선택된 월에 해당하는 일기만 필터링한 데이터
- **`pivotDate`**: 현재 사용자가 보고 있는 월을 나타내는 날짜 (기본값: 오늘 날짜)

#### 3. 헤더 제목 생성
```javascript
const headerTitle = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth() + 1}월`
```

- `pivotDate`의 연도와 월을 추출하여 "2024년 12월" 형식의 제목 생성
- `getMonth()`는 0부터 시작하므로 +1을 해줌

#### 4. 월 변경 함수들
```javascript
const onIncreaseMonth = ()=> {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
};

const onDecreaseMonth = ()=> {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
};
```

- **`onIncreaseMonth`**: ">" 버튼 클릭 시 다음 달로 이동
- **`onDecreaseMonth`**: "<" 버튼 클릭 시 이전 달로 이동
- 새로운 Date 객체를 생성하여 `pivotDate` 업데이트

#### 5. 일기 필터링 로직 (useEffect)
```javascript
useEffect(()=> {
    if(data.length>=1){
        const {beginTimeDate, endTimeStamp} = getMonthRangeByDate(pivotDate);

        setFilteredData(
            data.filter( (it) => beginTimeDate <= it.date && it.date <= endTimeStamp));

    }else{
        setFilteredData([]);
    }
}, [data, pivotDate])
```

**동작 순서:**
1. **의존성 배열 확인**: `data` 또는 `pivotDate`가 변경되면 실행
2. **일기 데이터 확인**: `data.length >= 1`이면 필터링 진행
3. **월 범위 계산**: `getMonthRangeByDate(pivotDate)`로 해당 월의 시작/끝 시간 획득
   - `beginTimeDate`: 해당 월의 1일 00:00:00
   - `endTimeStamp`: 해당 월의 마지막 날 23:59:59
4. **필터링**: 일기의 날짜가 해당 월 범위 내에 있는 것만 선택
5. **상태 업데이트**: `setFilteredData`로 필터링된 결과 저장

#### 6. UI 렌더링
```javascript
return (
    <>
        <Header 
            title = {headerTitle}
            leftChild = {<Button text={"<"} onClick={onDecreaseMonth} />}
            rightChild = {<Button text={">"} onClick={onIncreaseMonth} />}
        />

        <DiaryList data={filteredData}/>
    </>
);
```

- **Header**: 헤더에 "2024년 12월" 형식의 제목과 좌우 버튼 배치
  - 왼쪽: 이전 달로 이동하는 "<" 버튼
  - 오른쪽: 다음 달로 이동하는 ">" 버튼
- **DiaryList**: 필터링된 일기 목록을 표시하는 컴포넌트

### 🔄 동작 흐름
1. 컴포넌트가 마운트되면 현재 날짜(오늘)를 기준으로 `pivotDate` 설정
2. Context에서 전체 일기 데이터를 가져옴
3. `useEffect`가 실행되어 현재 월에 해당하는 일기만 필터링
4. 사용자가 "<" 또는 ">" 버튼을 클릭하면 `pivotDate`가 변경됨
5. `pivotDate` 변경으로 `useEffect`가 다시 실행되어 새로운 월의 일기를 필터링
6. 필터링된 데이터를 DiaryList에 전달하여 화면에 표시

---

## New.js - 새 일기 작성 페이지

### 🎯 역할
**새로운 일기를 작성하는 페이지**입니다. 사용자가 일기를 작성하고 저장하면 메인 페이지로 돌아갑니다.

### 📋 코드 전체
```javascript
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
```

### 🔍 상세 분석

#### 1. Import 섹션
```javascript
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Button from '../component/Button';
import Editor from '../component/Editor';
import { DiaryDispatchContext } from '../App';
```

- **`useNavigate`**: 페이지 이동을 위한 React Router 훅
- **`DiaryDispatchContext`**: 일기 생성/수정/삭제 함수들을 담고 있는 Context

#### 2. Context와 Navigation 설정
```javascript
const navigate = useNavigate();
const {onCreate} = useContext(DiaryDispatchContext);
```

- **`navigate`**: 다른 페이지로 이동하는 함수
- **`onCreate`**: Context에서 가져온 일기 생성 함수

#### 3. 뒤로 가기 함수
```javascript
const goBack = ()=> {
    navigate(-1);
};
```

- `navigate(-1)`: 브라우저 히스토리에서 이전 페이지로 이동
- 뒤로 가기 버튼 클릭 시 실행됨

#### 4. 일기 저장 함수
```javascript
const onSubmit = (data) => {
    //const {date, content, emotionId} = data;
    //onCreate(date, content, emotionId);
    onCreate({...data});
    navigate("/", {relative : true});
}
```

**동작 순서:**
1. **Editor 컴포넌트로부터 데이터 수신**: `data` 객체는 `{date, content, emotionId}` 형태
2. **일기 생성**: `onCreate({...data})`로 새 일기를 전역 상태에 추가
   - 스프레드 연산자(`...data`)를 사용하여 객체 전체를 전달
3. **메인 페이지로 이동**: `navigate("/")`로 홈 화면으로 리다이렉트
   - `{relative: true}` 옵션은 상대 경로를 사용하겠다는 의미

#### 5. UI 렌더링
```javascript
return (
    <div>
        <Header 
            title={"새 일기 쓰기"}
            leftChild={<Button text={"<뒤로 가기"} onClick={goBack} />}
        />
        <Editor onSubmit={onSubmit} />
    </div>
);
```

- **Header**: "새 일기 쓰기" 제목과 뒤로 가기 버튼
- **Editor**: 일기 작성 폼 컴포넌트
  - 날짜 선택기
  - 감정 선택기
  - 내용 입력란
  - 작성 완료 버튼이 포함되어 있음
  - 사용자가 작성 완료 버튼을 누르면 `onSubmit` 함수가 호출됨

### 🔄 동작 흐름
1. 사용자가 "/new" 경로로 접속
2. "새 일기 쓰기" 헤더와 Editor 컴포넌트가 렌더링됨
3. 사용자가 일기를 작성하고 "작성 완료" 버튼 클릭
4. Editor에서 `onSubmit(data)` 호출
5. `onCreate` 함수로 새 일기가 전역 상태에 추가됨
6. 메인 페이지("/")로 자동 이동하여 새로 작성된 일기를 확인 가능

---

## Diary.js - 일기 상세보기 페이지

### 🎯 역할
**특정 일기의 상세 내용을 보여주는 페이지**입니다. 작성 날짜, 감정 상태, 일기 내용을 표시하며, 수정 페이지로 이동할 수 있습니다.

### 📋 코드 전체
```javascript
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import { getFormattedDate } from '../util';
import Header from '../component/Header';
import Button from '../component/Button';
import Viewer from '../component/Viewer';


const Diary = () => {
    const {id} = useParams();
    const data = useDiary(id);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const goEdit = () => {
        navigate(`/edit/${id}`);
    }
    
    if(!data){
        return <div>일기 데이터를 불러오고 있습니다..</div>
    }else{
        const {date, emotionId, content} = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;

        return (
            <div>
                <Header 
                    title={title}
                    leftChild={<Button text={"뒤로가기"} onClick={goBack}/>}
                    rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
                />
                <Viewer content={content} emotionId = {emotionId} />
            </div>
        );
    }
};

export default Diary;
```

### 🔍 상세 분석

#### 1. Import 섹션
```javascript
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import { getFormattedDate } from '../util';
import Header from '../component/Header';
import Button from '../component/Button';
import Viewer from '../component/Viewer';
```

- **`useParams`**: URL 파라미터(일기 ID)를 가져오는 훅
- **`useDiary`**: 특정 ID의 일기 데이터를 가져오는 커스텀 훅
- **`getFormattedDate`**: 날짜를 "YYYY년 MM월 DD일" 형식으로 포맷팅하는 함수
- **`Viewer`**: 일기 내용을 표시하는 컴포넌트

#### 2. URL 파라미터와 데이터 가져오기
```javascript
const {id} = useParams();
const data = useDiary(id);
```

- **`useParams()`**: URL에서 일기 ID를 추출
  - 예: `/diary/1` → `id = "1"`
- **`useDiary(id)`**: 해당 ID의 일기 데이터를 전역 상태에서 찾아서 반환
  - 커스텀 훅으로 구현되어 있음

#### 3. 네비게이션 함수들
```javascript
const navigate = useNavigate();

const goBack = () => {
    navigate(-1);
}

const goEdit = () => {
    navigate(`/edit/${id}`);
}
```

- **`goBack`**: 이전 페이지로 돌아가기
- **`goEdit`**: 해당 일기의 수정 페이지로 이동
  - 예: ID가 1이면 `/edit/1`로 이동

#### 4. 로딩 상태 처리
```javascript
if(!data){
    return <div>일기 데이터를 불러오고 있습니다..</div>
}
```

- 데이터가 아직 로드되지 않았거나 존재하지 않는 경우 로딩 메시지 표시
- `useDiary` 훅이 일기를 찾지 못하면 `undefined` 또는 `null` 반환

#### 5. 데이터 파싱 및 제목 생성
```javascript
const {date, emotionId, content} = data;
const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
```

- **데이터 구조 분해**: 일기 객체에서 날짜, 감정, 내용 추출
- **제목 생성**: 
  - `Number(date)`: 타임스탬프를 숫자로 변환
  - `new Date(...)`: Date 객체 생성
  - `getFormattedDate(...)`: "2024년 12월 10일" 형식으로 변환
  - 최종 결과: "2024년 12월 10일 기록"

#### 6. UI 렌더링
```javascript
return (
    <div>
        <Header 
            title={title}
            leftChild={<Button text={"뒤로가기"} onClick={goBack}/>}
            rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
        />
        <Viewer content={content} emotionId = {emotionId} />
    </div>
);
```

- **Header**: 날짜를 포함한 제목과 뒤로가기/수정하기 버튼
- **Viewer**: 일기의 감정 상태와 내용을 시각적으로 표시
  - `emotionId`에 따라 감정 이미지/아이콘 표시
  - `content`는 일기 본문 내용

### 🔄 동작 흐름
1. 사용자가 "/diary/1" 같은 경로로 접속
2. URL에서 일기 ID를 추출 (`useParams`)
3. `useDiary` 훅으로 해당 ID의 일기 데이터를 가져옴
4. 데이터가 없으면 로딩 메시지 표시
5. 데이터가 있으면:
   - 날짜를 포맷팅하여 제목 생성
   - Header와 Viewer 컴포넌트로 일기 표시
6. 사용자가 "수정하기" 버튼을 클릭하면 `/edit/{id}` 페이지로 이동

---

## Edit.js - 일기 수정 페이지

### 🎯 역할
**기존 일기를 수정하거나 삭제하는 페이지**입니다. Editor 컴포넌트를 재사용하되, 기존 데이터를 초기값으로 설정하여 수정 모드로 동작합니다.

### 📋 코드 전체
```javascript
import React, { useContext } from 'react';
import { replace, useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import Header from '../component/Header';
import Button from '../component/Button';
import { DiaryDispatchContext } from '../App';
import Editor from '../component/Editor';

const Edit = () => {
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const {OnDelete, OnUpdate} = useContext(DiaryDispatchContext);

    const onClickDelete = () => {
        if(window.confirm("일기를 정말 삭제할까요?")){
            OnDelete(id);
            navigate("/", {replace:true});
        }
    }

    const onClickUpdate = (data) => {
        if(window.confirm("일기를 정말 수정할까요?")){
            OnUpdate(data);
            navigate("/", {replace:true});
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    if(!data){
        return <div>일기를 불러오고 있습니다.</div>;
    }else{
        return (
            <div>
                <Header
                    title={"일기 수정하기"}
                    leftChild={<Button text={"뒤로가기"} 
                                onClick={goBack} />}
                    rightChild={<Button text={"삭제하기"} 
                                type={"negative"} 
                                onClick={onClickDelete}
                        />}
                />

                <Editor initData={data} onSubmit={onClickUpdate} />
            </div>
        );
    }   
};

export default Edit;
```

### 🔍 상세 분석

#### 1. Import 섹션
```javascript
import React, { useContext } from 'react';
import { replace, useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import Header from '../component/Header';
import Button from '../component/Button';
import { DiaryDispatchContext } from '../App';
import Editor from '../component/Editor';
```

- **`replace`**: (사용되지 않음) import만 되어있고 실제로는 `navigate`의 옵션으로 사용
- **`DiaryDispatchContext`**: 일기 삭제/수정 함수들을 담고 있는 Context

#### 2. 데이터 및 함수 준비
```javascript
const {id} = useParams();
const data = useDiary(id);
const navigate = useNavigate();
const {OnDelete, OnUpdate} = useContext(DiaryDispatchContext);
```

- **`id`**: URL에서 추출한 일기 ID
- **`data`**: 해당 일기의 데이터
- **`OnDelete`**: 일기 삭제 함수 (Context에서 가져옴)
- **`OnUpdate`**: 일기 수정 함수 (Context에서 가져옴)

#### 3. 삭제 함수
```javascript
const onClickDelete = () => {
    if(window.confirm("일기를 정말 삭제할까요?")){
        OnDelete(id);
        navigate("/", {replace:true});
    }
}
```

**동작 순서:**
1. **확인 창 표시**: `window.confirm`으로 사용자에게 삭제 확인 요청
2. **확인 시**: 
   - `OnDelete(id)`: 해당 ID의 일기를 전역 상태에서 삭제
   - `navigate("/", {replace:true})`: 홈 페이지로 이동
     - `replace: true`: 뒤로 가기 시 삭제한 일기 페이지로 돌아가지 않도록 히스토리 대체

#### 4. 수정 함수
```javascript
const onClickUpdate = (data) => {
    if(window.confirm("일기를 정말 수정할까요?")){
        OnUpdate(data);
        navigate("/", {replace:true});
    }
}
```

**동작 순서:**
1. **Editor로부터 수정된 데이터 수신**: `data` 객체에는 수정된 날짜, 감정, 내용이 포함
2. **확인 창 표시**: 사용자에게 수정 확인 요청
3. **확인 시**:
   - `OnUpdate(data)`: 전역 상태에서 해당 일기를 수정된 데이터로 업데이트
   - `navigate("/", {replace:true})`: 홈 페이지로 이동

#### 5. 뒤로 가기 함수
```javascript
const goBack = () => {
    navigate(-1);
}
```

- 이전 페이지로 돌아가기 (보통 일기 상세보기 페이지)

#### 6. 로딩 상태 처리
```javascript
if(!data){
    return <div>일기를 불러오고 있습니다.</div>;
}
```

- 일기 데이터를 아직 불러오지 못했거나 존재하지 않는 경우

#### 7. UI 렌더링
```javascript
return (
    <div>
        <Header
            title={"일기 수정하기"}
            leftChild={<Button text={"뒤로가기"} 
                        onClick={goBack} />}
            rightChild={<Button text={"삭제하기"} 
                        type={"negative"} 
                        onClick={onClickDelete}
                />}
        />

        <Editor initData={data} onSubmit={onClickUpdate} />
    </div>
);
```

- **Header**: 
  - 제목: "일기 수정하기"
  - 왼쪽: 뒤로가기 버튼
  - 오른쪽: 삭제하기 버튼 (`type="negative"`로 빨간색 등 경고 스타일)
- **Editor**:
  - `initData={data}`: 기존 일기 데이터를 초기값으로 설정
  - `onSubmit={onClickUpdate}`: 수정 완료 버튼 클릭 시 실행될 함수

### 🔄 동작 흐름

#### 수정 시나리오:
1. 사용자가 "/edit/1" 경로로 접속
2. URL에서 일기 ID 추출
3. `useDiary` 훅으로 해당 일기 데이터를 가져옴
4. Editor에 기존 데이터가 채워진 상태로 표시됨
5. 사용자가 내용을 수정하고 "작성 완료" 버튼 클릭
6. `onClickUpdate` 함수 호출
7. 확인 창에서 "확인" 클릭
8. `OnUpdate`로 전역 상태 업데이트
9. 홈 페이지로 이동

#### 삭제 시나리오:
1. 사용자가 "삭제하기" 버튼 클릭
2. 확인 창 표시
3. "확인" 클릭 시 `OnDelete(id)` 실행
4. 전역 상태에서 해당 일기 삭제
5. 홈 페이지로 이동 (히스토리 대체로 뒤로가기 방지)

---

## 페이지 간 데이터 흐름

### 📊 전체 구조도

```
App.js (전역 상태 관리)
    │
    ├─ DiaryStateContext (일기 데이터 배열)
    └─ DiaryDispatchContext (onCreate, OnUpdate, OnDelete)
          │
          ├─────────────┬─────────────┬─────────────┐
          │             │             │             │
      Home.js       New.js      Diary.js       Edit.js
      (읽기)      (생성)       (읽기)    (수정/삭제)
```

### 🔄 각 페이지의 역할

| 페이지 | 경로 | 주요 기능 | 사용하는 Context |
|--------|------|-----------|------------------|
| **Home.js** | `/` | 월별 일기 목록 조회 | DiaryStateContext (읽기) |
| **New.js** | `/new` | 새 일기 작성 | DiaryDispatchContext (onCreate) |
| **Diary.js** | `/diary/:id` | 일기 상세보기 | DiaryStateContext (읽기, useDiary 훅 사용) |
| **Edit.js** | `/edit/:id` | 일기 수정/삭제 | DiaryDispatchContext (OnUpdate, OnDelete) |

### 🎯 사용자 시나리오별 흐름

#### 시나리오 1: 일기 작성
```
Home.js → New.js → [작성 완료] → onCreate 호출 → 전역 상태 업데이트 → Home.js
```

#### 시나리오 2: 일기 조회
```
Home.js → (일기 클릭) → Diary.js → useDiary로 데이터 조회 → 화면 표시
```

#### 시나리오 3: 일기 수정
```
Diary.js → [수정하기] → Edit.js → [수정 완료] → OnUpdate 호출 → 전역 상태 업데이트 → Home.js
```

#### 시나리오 4: 일기 삭제
```
Edit.js → [삭제하기] → 확인 → OnDelete 호출 → 전역 상태 업데이트 → Home.js
```

### 🔑 주요 개념 정리

#### 1. **Context API 활용**
- **DiaryStateContext**: 읽기 전용 데이터 (일기 배열)
- **DiaryDispatchContext**: 상태 변경 함수들 (생성, 수정, 삭제)
- 두 Context를 분리하여 불필요한 리렌더링 방지

#### 2. **URL 파라미터 활용**
- `useParams()`: URL에서 일기 ID를 추출하여 해당 일기에 접근
- 예: `/diary/3` → ID가 3인 일기 조회

#### 3. **커스텀 훅 (useDiary)**
- 특정 ID의 일기를 찾는 로직을 재사용 가능하게 분리
- Diary.js와 Edit.js 모두에서 사용

#### 4. **Editor 컴포넌트 재사용**
- New.js: `<Editor onSubmit={onSubmit} />` - 빈 상태로 시작
- Edit.js: `<Editor initData={data} onSubmit={onClickUpdate} />` - 기존 데이터로 초기화

#### 5. **네비게이션 전략**
- `navigate(-1)`: 뒤로 가기
- `navigate("/")`: 홈으로 이동
- `{replace: true}`: 히스토리 대체 (삭제/수정 후 뒤로가기 방지)

### 💡 코드 설계의 장점

1. **관심사의 분리**: 각 페이지가 명확한 하나의 책임만 가짐
2. **컴포넌트 재사용**: Editor, Header, Button 등을 여러 페이지에서 재사용
3. **중앙 집중식 상태 관리**: Context API로 일기 데이터를 한 곳에서 관리
4. **확장성**: 새로운 페이지 추가 시 기존 컴포넌트와 Context를 그대로 활용 가능
5. **사용자 경험**: 확인 창, 로딩 메시지 등으로 친절한 UX 제공

---

## 📝 요약

page 폴더의 4개 파일은 일기장 애플리케이션의 **핵심 화면**을 구성합니다:

- **Home.js**: 월별 일기 목록을 보여주는 메인 화면
- **New.js**: 새 일기를 작성하는 화면
- **Diary.js**: 특정 일기의 상세 내용을 보여주는 화면
- **Edit.js**: 기존 일기를 수정하거나 삭제하는 화면

모든 페이지는 **Context API**를 통해 전역 상태에 접근하며, **React Router**로 페이지 간 이동을 처리합니다. 
공통 컴포넌트(Header, Button, Editor, Viewer)를 재사용하여 **일관된 UI**와 **효율적인 코드**를 유지하고 있습니다.
