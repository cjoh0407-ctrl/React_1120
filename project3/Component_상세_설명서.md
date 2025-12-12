# Component 폴더 상세 설명서

## 📚 목차
1. [개요](#개요)
2. [Button.js - 버튼 컴포넌트](#buttonjs---버튼-컴포넌트)
3. [Header.js - 헤더 컴포넌트](#headerjs---헤더-컴포넌트)
4. [EmotionItem.js - 감정 아이템 컴포넌트](#emotionitemjs---감정-아이템-컴포넌트)
5. [Editor.js - 일기 작성/수정 폼 컴포넌트](#editorjs---일기-작성수정-폼-컴포넌트)
6. [Viewer.js - 일기 뷰어 컴포넌트](#viewerjs---일기-뷰어-컴포넌트)
7. [DiaryItem.js - 일기 아이템 컴포넌트](#diaryitemjs---일기-아이템-컴포넌트)
8. [DiaryList.js - 일기 목록 컴포넌트](#diarylistjs---일기-목록-컴포넌트)
9. [컴포넌트 계층 구조](#컴포넌트-계층-구조)

---

## 개요

`component` 폴더는 React 일기장 애플리케이션의 **재사용 가능한 UI 컴포넌트**들을 담고 있습니다. 
각 컴포넌트는 특정 기능과 UI를 담당하며, 여러 페이지에서 재사용됩니다.

### 컴포넌트 구조
```
component/
├── Button.js          → 범용 버튼 컴포넌트
├── Header.js          → 페이지 상단 헤더
├── EmotionItem.js     → 감정 선택 아이템
├── Editor.js          → 일기 작성/수정 폼
├── Viewer.js          → 일기 상세보기 뷰어
├── DiaryItem.js       → 개별 일기 카드
└── DiaryList.js       → 일기 목록 + 정렬 기능
```

### 컴포넌트 분류

| 분류 | 컴포넌트 | 설명 |
|------|----------|------|
| **기본 UI** | Button, Header | 공통적으로 사용되는 기본 UI |
| **일기 작성** | Editor, EmotionItem | 일기 작성 및 수정 관련 |
| **일기 보기** | Viewer, DiaryItem, DiaryList | 일기 조회 및 목록 표시 |

---

## Button.js - 버튼 컴포넌트

### 🎯 역할
애플리케이션 전체에서 **일관된 스타일의 버튼**을 제공하는 범용 컴포넌트입니다. 
타입에 따라 다른 스타일(색상)을 적용할 수 있습니다.

### 📋 코드 전체
```javascript
import React from 'react';
import "./Button.css";

const Button = ({text, type, onClick}) => {
    
    const btnType = ["positive", "nagative"].includes(type) ? type: "default";
    return (
        <button className={["Button", `Button_${btnType}`].join(" ")}
                onClick={onClick}>

            {text}

        </button>
    );
    
    
};

Button.defaultProps = {
    type: "default"
}

export default Button;
```

### 🔍 상세 분석

#### 1. Props 정의
```javascript
const Button = ({text, type, onClick}) => {
```

- **`text`**: 버튼에 표시될 텍스트
- **`type`**: 버튼의 스타일 타입 (`"positive"`, `"nagative"`, `"default"`)
- **`onClick`**: 버튼 클릭 시 실행될 함수

#### 2. 버튼 타입 검증
```javascript
const btnType = ["positive", "nagative"].includes(type) ? type: "default";
```

**동작 원리:**
- `type`이 `"positive"` 또는 `"nagative"`이면 그대로 사용
- 그 외의 값이면 `"default"`로 설정
- 잘못된 타입이 전달되어도 안전하게 처리

> **주의**: `"nagative"`는 오타입니다. 정확한 영어는 `"negative"`입니다.

#### 3. 동적 클래스명 생성
```javascript
className={["Button", `Button_${btnType}`].join(" ")}
```

**예시:**
- `type="positive"` → `className="Button Button_positive"`
- `type="nagative"` → `className="Button Button_nagative"`
- `type="custom"` → `className="Button Button_default"` (검증 실패)

CSS에서 각 클래스에 따라 다른 스타일을 적용합니다.

#### 4. defaultProps 설정
```javascript
Button.defaultProps = {
    type: "default"
}
```

- `type` prop이 전달되지 않으면 자동으로 `"default"` 사용
- 컴포넌트 사용 시 `type`을 생략할 수 있게 함

### 💡 사용 예시

```javascript
// 기본 버튼
<Button text="확인" onClick={handleClick} />

// 긍정적인 액션 (파란색/초록색 등)
<Button text="저장하기" type="positive" onClick={handleSave} />

// 부정적인 액션 (빨간색 등)
<Button text="삭제하기" type="nagative" onClick={handleDelete} />
```

### 🎨 사용 위치
- **모든 페이지**: Home, New, Diary, Edit
- **다른 컴포넌트**: DiaryList, Editor, DiaryItem

---

## Header.js - 헤더 컴포넌트

### 🎯 역할
페이지 상단에 **제목과 좌우 버튼을 배치하는 헤더 컴포넌트**입니다. 
3단 구조(왼쪽 영역, 제목, 오른쪽 영역)로 구성되어 있습니다.

### 📋 코드 전체
```javascript
import React from 'react';
import "./Header.css"

const Header = ({title, leftChild, rightChild}) => {
    return (
        <div className='Header'>
            <div className='header_left'>
                {leftChild}
            </div>
            <div className='header_title'>
                {title}
            </div>
            <div className='header_right'>
                {rightChild}
            </div>
        </div>
    );
};

export default Header;
```

### 🔍 상세 분석

#### 1. Props 정의
```javascript
const Header = ({title, leftChild, rightChild}) => {
```

- **`title`**: 헤더 중앙에 표시될 제목 (문자열)
- **`leftChild`**: 왼쪽 영역에 렌더링할 컴포넌트 (주로 뒤로가기 버튼)
- **`rightChild`**: 오른쪽 영역에 렌더링할 컴포넌트 (주로 액션 버튼)

#### 2. 3단 레이아웃 구조
```javascript
<div className='Header'>
    <div className='header_left'>{leftChild}</div>
    <div className='header_title'>{title}</div>
    <div className='header_right'>{rightChild}</div>
</div>
```

**레이아웃:**
```
┌───────────────────────────────────────┐
│  [왼쪽]      [제목]        [오른쪽]   │
└───────────────────────────────────────┘
```

- **왼쪽**: 보통 뒤로가기 버튼 (`<` 또는 "뒤로가기")
- **중앙**: 페이지 제목 ("새 일기 쓰기", "2024년 12월" 등)
- **오른쪽**: 주요 액션 버튼 ("수정하기", "삭제하기", `>` 등)

### 💡 사용 예시

```javascript
// 홈 페이지 - 월 선택 헤더
<Header 
    title="2024년 12월"
    leftChild={<Button text="<" onClick={onPrevMonth} />}
    rightChild={<Button text=">" onClick={onNextMonth} />}
/>

// 새 일기 쓰기 페이지
<Header 
    title="새 일기 쓰기"
    leftChild={<Button text="뒤로 가기" onClick={goBack} />}
/>

// 수정 페이지
<Header 
    title="일기 수정하기"
    leftChild={<Button text="뒤로가기" onClick={goBack} />}
    rightChild={<Button text="삭제하기" type="negative" onClick={onDelete} />}
/>
```

### 🎨 사용 위치
- **Home.js**: 월 네비게이션
- **New.js**: 새 일기 작성
- **Diary.js**: 일기 상세보기
- **Edit.js**: 일기 수정

---

## EmotionItem.js - 감정 아이템 컴포넌트

### 🎯 역할
일기 작성 시 **감정을 선택할 수 있는 개별 감정 아이템**입니다. 
클릭하면 선택 상태가 되며, 선택 여부에 따라 다른 스타일이 적용됩니다.

### 📋 코드 전체
```javascript
import React from 'react';
import "./EmotionItem.css"

const EmotionItem = ({id, img, name, onClick, isSelected}) => {
    
    const handleOnClick = () => {
        onClick(id);
    };

    return (
        <div className={['EmotionItem', isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`].join(" ")} 
            onClick={handleOnClick}>
            <img alt={`emotion${id}`} src={img} />
            <span>{name}</span>
        </div>
    );
};

export default EmotionItem;
```

### 🔍 상세 분석

#### 1. Props 정의
```javascript
const EmotionItem = ({id, img, name, onClick, isSelected}) => {
```

- **`id`**: 감정의 고유 ID (1~5)
- **`img`**: 감정 이미지 경로
- **`name`**: 감정 이름 ("완전 좋음", "좋음", "그럭저럭" 등)
- **`onClick`**: 클릭 시 실행될 함수 (부모 컴포넌트에서 전달)
- **`isSelected`**: 현재 이 감정이 선택되었는지 여부 (boolean)

#### 2. 클릭 핸들러
```javascript
const handleOnClick = () => {
    onClick(id);
};
```

- 클릭 시 부모 컴포넌트에 **자신의 ID를 전달**
- 부모(Editor)에서 이 ID를 받아 상태를 업데이트

#### 3. 동적 클래스명 생성
```javascript
className={['EmotionItem', isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`].join(" ")}
```

**선택되지 않았을 때:**
```html
<div class="EmotionItem EmotionItem_off">
```

**선택되었을 때 (예: id=1):**
```html
<div class="EmotionItem EmotionItem_on_1">
```

- `EmotionItem_on_${id}`: 각 감정마다 다른 선택 스타일 적용 가능
- 예: ID 1(완전 좋음)은 초록색, ID 5(끔찍함)는 빨간색 등

#### 4. UI 구조
```javascript
<img alt={`emotion${id}`} src={img} />
<span>{name}</span>
```

- **이미지**: 감정을 나타내는 이모지/아이콘
- **텍스트**: 감정 이름

### 💡 데이터 예시

```javascript
// util.js의 emotionList
{
    id: 1,
    name: "완전 좋음",
    img: emotion1  // 이미지 경로
}
```

### 🔄 동작 흐름
1. Editor 컴포넌트에서 5개의 EmotionItem을 렌더링
2. 사용자가 특정 감정 아이템 클릭
3. `handleOnClick` 실행 → `onClick(id)` 호출
4. Editor의 `handleChangeEmotion(id)` 실행
5. Editor의 state가 업데이트되어 해당 감정이 선택 상태로 변경
6. `isSelected` prop이 true가 되어 스타일 변경

### 🎨 사용 위치
- **Editor.js**: 일기 작성/수정 폼 내부

---

## Editor.js - 일기 작성/수정 폼 컴포넌트

### 🎯 역할
일기를 **작성하거나 수정하는 폼**을 제공하는 핵심 컴포넌트입니다. 
날짜 선택, 감정 선택, 내용 입력 기능을 모두 포함합니다.

### 📋 코드 전체
```javascript
import React, { useEffect, useState } from 'react';
import "./Editor.css";
import { emotionList, getFormattedDate } from '../util';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';

const Editor = ({initData, onSubmit}) => {

    const navigate = useNavigate();

    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId : 3,
        content : ""
    });

    useEffect( ()=> { 
        if(initData){
            setState({
                ...initData,
                date : getFormattedDate(new Date(parseInt(initData.date)))
            })
        }
    }, [initData]);

    const handleChangeDate = (e) => {
        setState({
            ...state, //스프레드시트?
            date : e.target.value //클릭한 시간을 집어 넣겠다.
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content : e.target.value //입력한 값을 집어 넣겠다
        });
    };

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleOnGoBack = () => {
        navigate(-1);
    };

    const handleChangeEmotion = (emotionId) => {
        setState({
            ...state,
            emotionId: emotionId
        });
    };

    return (
        <div className='Editor'>
            <div className='editor_section'>
                <h4>오늘의 날짜</h4>
                <div className='input_wrapper'>
                    <input type='date' value={state.date} onChange={handleChangeDate} />
                </div>
            </div>

            <div className='editor_section'>
                <h4>오늘의 감정</h4>
                <div className='input_wrapper emotion_list_wrapper'>
                    {emotionList.map(
                        (it) => <EmotionItem 
                            key={it.id}
                            {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    )
                    }
                </div>
                
            </div>

            <div className='editor_section'>
                <h4>오늘의 일기</h4>
                <div className='input_wrapper'>
                    <textarea 
                        placeholder='오늘은 어땠나요?'
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>

            <div className='editor_section bottom_section'>
                <Button text={"취소하기"} onClick={handleOnGoBack}/>
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
                
            </div>
        </div>
    );
};

export default Editor;
```

### 🔍 상세 분석

#### 1. Props 정의
```javascript
const Editor = ({initData, onSubmit}) => {
```

- **`initData`**: 수정 모드일 때 기존 일기 데이터 (선택사항)
- **`onSubmit`**: 작성/수정 완료 버튼 클릭 시 실행될 함수

#### 2. State 초기화
```javascript
const [state, setState] = useState({
    date: getFormattedDate(new Date()),  // "YYYY-MM-DD" 형식의 오늘 날짜
    emotionId : 3,                        // 기본 감정: 3(보통)
    content : ""                          // 빈 내용
});
```

**구조:**
- **새 일기 작성**: 위 초기값으로 시작
- **일기 수정**: `useEffect`에서 `initData`로 덮어씀

#### 3. 초기 데이터 설정 (수정 모드)
```javascript
useEffect( ()=> { 
    if(initData){
        setState({
            ...initData,
            date : getFormattedDate(new Date(parseInt(initData.date)))
        })
    }
}, [initData]);
```

**동작 순서:**
1. `initData`가 존재하는지 확인 (수정 모드인지 확인)
2. `initData`를 state에 복사
3. 단, `date`는 타임스탬프에서 "YYYY-MM-DD" 형식으로 변환
   - `initData.date`: `1702194000000` (타임스탬프)
   - 변환 후: `"2024-12-10"` (input[type="date"]가 사용하는 형식)

**의존성 배열:** `[initData]` - `initData`가 변경되면 재실행

#### 4. 날짜 변경 핸들러
```javascript
const handleChangeDate = (e) => {
    setState({
        ...state,
        date : e.target.value
    });
};
```

- 사용자가 날짜 선택 → `e.target.value`에 "YYYY-MM-DD" 형식으로 저장
- 스프레드 연산자로 기존 state 유지하며 `date`만 업데이트

#### 5. 내용 변경 핸들러
```javascript
const handleChangeContent = (e) => {
    setState({
        ...state,
        content : e.target.value
    });
};
```

- textarea에 입력한 내용을 state에 저장

#### 6. 감정 변경 핸들러
```javascript
const handleChangeEmotion = (emotionId) => {
    setState({
        ...state,
        emotionId: emotionId
    });
};
```

- EmotionItem 클릭 시 호출됨
- 선택된 감정의 ID를 state에 저장

#### 7. 제출 핸들러
```javascript
const handleSubmit = () => {
    onSubmit(state);
};
```

**전달되는 데이터:**
```javascript
{
    date: "2024-12-10",
    emotionId: 1,
    content: "오늘은 정말 좋은 일이 있었다!"
}
```

- 부모 컴포넌트(New.js 또는 Edit.js)에서 이 데이터를 받아 처리

#### 8. 취소 핸들러
```javascript
const handleOnGoBack = () => {
    navigate(-1);
};
```

- "취소하기" 버튼 클릭 시 이전 페이지로 이동

#### 9. UI 구조

**섹션 1: 날짜 선택**
```javascript
<div className='editor_section'>
    <h4>오늘의 날짜</h4>
    <div className='input_wrapper'>
        <input type='date' value={state.date} onChange={handleChangeDate} />
    </div>
</div>
```

- HTML5 날짜 선택기 사용
- 브라우저 기본 달력 UI 제공

**섹션 2: 감정 선택**
```javascript
<div className='editor_section'>
    <h4>오늘의 감정</h4>
    <div className='input_wrapper emotion_list_wrapper'>
        {emotionList.map(
            (it) => <EmotionItem 
                key={it.id}
                {...it}
                onClick={handleChangeEmotion}
                isSelected={state.emotionId === it.id}
            />
        )}
    </div>
</div>
```

- `emotionList` 배열을 순회하며 5개의 EmotionItem 생성
- `{...it}`: `id`, `img`, `name`을 props로 전달 (스프레드 연산자)
- `isSelected={state.emotionId === it.id}`: 현재 선택된 감정만 true

**섹션 3: 내용 입력**
```javascript
<div className='editor_section'>
    <h4>오늘의 일기</h4>
    <div className='input_wrapper'>
        <textarea 
            placeholder='오늘은 어땠나요?'
            value={state.content}
            onChange={handleChangeContent}
        />
    </div>
</div>
```

- 여러 줄 입력이 가능한 textarea 사용
- placeholder로 안내 메시지 표시

**섹션 4: 버튼들**
```javascript
<div className='editor_section bottom_section'>
    <Button text={"취소하기"} onClick={handleOnGoBack}/>
    <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
</div>
```

- 왼쪽: 취소하기 (기본 스타일)
- 오른쪽: 작성 완료 (positive 스타일)

### 🔄 동작 흐름

#### 새 일기 작성 시나리오:
1. New.js에서 `<Editor onSubmit={onSubmit} />` 렌더링
2. 기본값으로 초기화 (오늘 날짜, 감정 3, 빈 내용)
3. 사용자가 날짜/감정/내용 입력
4. "작성 완료" 클릭 → `handleSubmit` → `onSubmit(state)` 호출
5. New.js의 `onSubmit` 함수가 실행되어 일기 생성

#### 일기 수정 시나리오:
1. Edit.js에서 `<Editor initData={data} onSubmit={onClickUpdate} />` 렌더링
2. `useEffect`가 실행되어 기존 데이터로 state 초기화
3. 폼에 기존 데이터가 채워진 상태로 표시됨
4. 사용자가 내용 수정
5. "작성 완료" 클릭 → `handleSubmit` → `onSubmit(state)` 호출
6. Edit.js의 `onClickUpdate` 함수가 실행되어 일기 업데이트

### 💡 설계 포인트

1. **재사용성**: 작성과 수정 모두에서 사용 가능
2. **제어 컴포넌트**: 모든 입력값이 state로 관리됨 (Controlled Component)
3. **Props 기반 초기화**: `initData` 유무로 모드 구분
4. **스프레드 연산자 활용**: state 업데이트 시 불변성 유지

### 🎨 사용 위치
- **New.js**: 새 일기 작성
- **Edit.js**: 기존 일기 수정

---

## Viewer.js - 일기 뷰어 컴포넌트

### 🎯 역할
작성된 일기를 **읽기 전용으로 보여주는 컴포넌트**입니다. 
감정 이미지와 일기 내용을 시각적으로 표시합니다.

### 📋 코드 전체
```javascript
import { emotionList } from "../util";
import "./Viewer.css";

const Viewer = ({content, emotionId}) => {
    const emotionItem = emotionList.find((it)=> it.id === emotionId);
    return (
        <div className='Viewer'>
            <section>
                <h4>오늘의 감정</h4>
                <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotionId}`]
                    .join(" ")}>
                    <img alt={emotionItem.name} src={emotionItem.img} />
                    <div className="emotion_descript">
                        {emotionItem.name}
                    </div>
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
    );
};

export default Viewer;
```

### 🔍 상세 분석

#### 1. Props 정의
```javascript
const Viewer = ({content, emotionId}) => {
```

- **`content`**: 일기 내용 (문자열)
- **`emotionId`**: 감정 ID (1~5)

#### 2. 감정 데이터 조회
```javascript
const emotionItem = emotionList.find((it)=> it.id === emotionId);
```

**동작:**
- `emotionList` 배열에서 해당 ID와 일치하는 감정 객체를 찾음
- 예: `emotionId = 1` → `{id: 1, name: "완전 좋음", img: ...}`

**결과:**
```javascript
emotionItem = {
    id: 1,
    name: "완전 좋음",
    img: emotion1  // 이미지 경로
}
```

#### 3. UI 구조

**섹션 1: 감정 표시**
```javascript
<section>
    <h4>오늘의 감정</h4>
    <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotionId}`]
        .join(" ")}>
        <img alt={emotionItem.name} src={emotionItem.img} />
        <div className="emotion_descript">
            {emotionItem.name}
        </div>
    </div>
</section>
```

**동적 클래스명:**
- 예: `emotionId = 1` → `className="emotion_img_wrapper emotion_img_wrapper_1"`
- CSS에서 감정별로 다른 배경색/테두리 적용 가능

**구성 요소:**
- 감정 이미지
- 감정 이름 ("완전 좋음", "좋음" 등)

**섹션 2: 일기 내용 표시**
```javascript
<section>
    <h4>오늘의 일기</h4>
    <div className="content_wrapper">
        <p>{content}</p>
    </div>
</section>
```

- 일기 본문을 `<p>` 태그로 표시
- 여러 줄 내용도 그대로 표시됨

### 💡 Editor와의 비교

| 구분 | Editor | Viewer |
|------|--------|--------|
| **목적** | 입력/수정 | 읽기 전용 표시 |
| **감정** | 5개 선택 가능 | 선택된 1개만 표시 |
| **내용** | textarea (편집 가능) | p 태그 (읽기만) |
| **버튼** | 취소/완료 버튼 있음 | 버튼 없음 |

### 🔄 동작 흐름
1. Diary.js에서 일기 데이터 조회
2. `<Viewer content={content} emotionId={emotionId} />` 렌더링
3. `emotionList`에서 해당 감정 정보 찾기
4. 감정 이미지와 이름, 일기 내용 표시

### 🎨 사용 위치
- **Diary.js**: 일기 상세보기 페이지

---

## DiaryItem.js - 일기 아이템 컴포넌트

### 🎯 역할
일기 목록에서 **개별 일기를 카드 형태로 표시**하는 컴포넌트입니다. 
감정, 날짜, 내용 미리보기, 수정 버튼을 포함합니다.

### 📋 코드 전체
```javascript
import React from 'react';
import "./DiaryItem.css";
import { useNavigate } from 'react-router-dom';
import { getEmotionImgById } from '../util';
import Button from './Button';

const DiaryItem = ({id, content, emotionId, date}) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`);
    }

    const goEdit = () => {
        navigate(`/edit/${id}`);
    }

    return (
        <div className='DiaryItem'>
            <div
                onClick={goDetail}
                className={["img_section", `img_section_${emotionId}`].join(" ")}
            >
                <img alt={`emotion${emotionId}`} 
                    src={getEmotionImgById(emotionId)} />
            </div>

            <div className='info_section' onClick={goDetail}>
                <div className='date_wrapper'>
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                <div className='content_wrapper'>
                    {content.slice(0,25)}
                </div>
            </div>

            <div className='button_section'>
                <Button onClick={goEdit} text={"수정하기"} />
            </div>
        </div>
    );
};

export default DiaryItem;
```

### 🔍 상세 분석

#### 1. Props 정의
```javascript
const DiaryItem = ({id, content, emotionId, date}) => {
```

- **`id`**: 일기 고유 ID
- **`content`**: 일기 내용 (전체 텍스트)
- **`emotionId`**: 감정 ID
- **`date`**: 작성 날짜 (타임스탬프)

#### 2. 네비게이션 함수들
```javascript
const navigate = useNavigate();

const goDetail = () => {
    navigate(`/diary/${id}`);
}

const goEdit = () => {
    navigate(`/edit/${id}`);
}
```

- **`goDetail`**: 상세보기 페이지로 이동
- **`goEdit`**: 수정 페이지로 이동

#### 3. UI 구조

**전체 레이아웃:**
```
┌─────────────────────────────────────┐
│  [감정]  [날짜+내용미리보기]  [수정] │
│  이미지      (클릭가능)       버튼   │
└─────────────────────────────────────┘
```

**섹션 1: 감정 이미지 영역**
```javascript
<div
    onClick={goDetail}
    className={["img_section", `img_section_${emotionId}`].join(" ")}
>
    <img alt={`emotion${emotionId}`} 
        src={getEmotionImgById(emotionId)} />
</div>
```

- **클릭 시**: 상세보기 페이지로 이동
- **동적 클래스**: 감정별로 다른 배경색 적용 가능
- **이미지 로딩**: `getEmotionImgById(emotionId)` 유틸 함수 사용

**섹션 2: 정보 영역 (날짜 + 내용)**
```javascript
<div className='info_section' onClick={goDetail}>
    <div className='date_wrapper'>
        {new Date(parseInt(date)).toLocaleDateString()}
    </div>
    <div className='content_wrapper'>
        {content.slice(0,25)}
    </div>
</div>
```

**날짜 포맷팅:**
- `parseInt(date)`: 문자열을 숫자로 변환
- `new Date(...)`: Date 객체 생성
- `.toLocaleDateString()`: 로컬 날짜 형식으로 변환
  - 예: "2024. 12. 10." (한국)

**내용 미리보기:**
- `content.slice(0, 25)`: 처음 25자만 표시
- 긴 내용도 간략하게 표시됨
- 예: "오늘은 정말 좋은 일이 있었다. 아침부터..."

**섹션 3: 버튼 영역**
```javascript
<div className='button_section'>
    <Button onClick={goEdit} text={"수정하기"} />
</div>
```

- "수정하기" 버튼 클릭 시 Edit 페이지로 이동
- 상세보기를 거치지 않고 바로 수정 가능

### 🔄 클릭 이벤트 흐름

#### 감정/정보 영역 클릭 시:
```
클릭 → goDetail() → navigate(`/diary/${id}`) → Diary.js 페이지로 이동
```

#### 수정 버튼 클릭 시:
```
클릭 → goEdit() → navigate(`/edit/${id}`) → Edit.js 페이지로 이동
```

### 💡 설계 포인트

1. **클릭 영역 분리**: 
   - 메인 영역: 상세보기
   - 버튼: 수정
2. **내용 미리보기**: 25자 제한으로 간결함 유지
3. **감정별 스타일링**: 동적 클래스명으로 시각적 구별
4. **날짜 형식**: 브라우저 로컬 설정에 따른 날짜 표시

### 🎨 사용 위치
- **DiaryList.js**: 일기 목록에서 각 일기를 표시

---

## DiaryList.js - 일기 목록 컴포넌트

### 🎯 역할
**일기 목록을 정렬하고 표시**하는 컴포넌트입니다. 
정렬 옵션 선택, 새 일기 쓰기 버튼, 일기 아이템 목록을 포함합니다.

### 📋 코드 전체
```javascript
import React, { useEffect, useState } from 'react';
import Button from './Button';
import "./DiaryList.css";
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';


const sortOptionList = [
    {value: "latest", name:"최신순"},
    {value: "oldest", name:"오래된 순"},
];

const DiaryList = ({data}) => {

    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);
    
    useEffect( () => {

        // 정렬 조건
        const compare = (a,b) => {
            if(sortType === "latest"){
                return Number(b.date) - Number(a.date);
            }else{
                return Number(a.date) - Number(b.date);
            }
        };

        /* 
            { name : "홍길동", age : 20 } -> js 객체
            { "name" : "홍길동", "age" : 20 } ->sjon
            JSON.stringify(data) : js 객체 -> json 변환
            JSON.parse() : json -> js객체변경

            이유 : 원본 데이터 보존하기 위해서 (깊은 복사)
        */

        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);

    }, [data, sortType]);



    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }

    const navigate = useNavigate();

    const onClickNew = () => {
        navigate("/new");
    }
    console.log("data : " + data);
    console.log( sortedData);
    return (
        <div className='DiaryList'>
            <div className='menu_wrapper'>
                <div className='left_col'>
                    <select value={sortType} onChange={onChangeSortType}>
                        {
                            /* map은 key가 필요하다 */
                            sortOptionList.map( (it, i) => (
                                <option key={i} value={it.value}>
                                    {it.name}
                                </option>
                            ))
                        }

                    </select>
                </div>
                <div className='right_col'>
                    <Button 
                        type={"positive"} 
                        text={"새 일기 쓰기"}
                        onClick={onClickNew}
                        />
                </div>
            </div>

            <div className='list_wrapper'>
                { sortedData.map( (it) => (
                    <DiaryItem key={it.id} {...it}/>
                    ))
                }
            </div> 
        </div>
    );
};

export default DiaryList;
```

### 🔍 상세 분석

#### 1. 정렬 옵션 상수
```javascript
const sortOptionList = [
    {value: "latest", name:"최신순"},
    {value: "oldest", name:"오래된 순"},
];
```

- **value**: 내부적으로 사용하는 값
- **name**: 사용자에게 표시되는 텍스트

#### 2. Props와 State
```javascript
const DiaryList = ({data}) => {
    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);
```

- **`data`** (prop): Home.js에서 전달받은 필터링된 일기 배열
- **`sortType`** (state): 현재 선택된 정렬 방식 ("latest" 또는 "oldest")
- **`sortedData`** (state): 정렬된 일기 배열

#### 3. 정렬 로직 (useEffect)
```javascript
useEffect( () => {
    const compare = (a,b) => {
        if(sortType === "latest"){
            return Number(b.date) - Number(a.date);
        }else{
            return Number(a.date) - Number(b.date);
        }
    };

    const copyList = JSON.parse(JSON.stringify(data));
    copyList.sort(compare);
    setSortedData(copyList);

}, [data, sortType]);
```

**동작 순서:**

**1) 비교 함수 정의**
```javascript
const compare = (a,b) => {
    if(sortType === "latest"){
        return Number(b.date) - Number(a.date);  // 내림차순 (최신순)
    }else{
        return Number(a.date) - Number(b.date);  // 오름차순 (오래된 순)
    }
};
```

- **최신순 (latest)**: `b.date - a.date` → 큰 날짜가 앞으로
- **오래된 순 (oldest)**: `a.date - b.date` → 작은 날짜가 앞으로

**2) 깊은 복사 (Deep Copy)**
```javascript
const copyList = JSON.parse(JSON.stringify(data));
```

**왜 필요한가?**
- `sort()` 메서드는 **원본 배열을 직접 변경**함 (mutate)
- React에서는 **불변성(immutability)**을 유지해야 함
- 원본 `data`를 보존하기 위해 복사본을 생성

**동작 원리:**
1. `JSON.stringify(data)`: JavaScript 객체 → JSON 문자열 변환
2. `JSON.parse(...)`: JSON 문자열 → 새로운 JavaScript 객체 생성
3. 완전히 독립적인 복사본 생성 (깊은 복사)

**3) 정렬 및 상태 업데이트**
```javascript
copyList.sort(compare);
setSortedData(copyList);
```

**의존성 배열:** `[data, sortType]`
- `data` 변경 시: 새로운 월로 이동하거나 일기 추가/삭제/수정 시
- `sortType` 변경 시: 사용자가 정렬 옵션 변경 시

#### 4. 정렬 옵션 변경 핸들러
```javascript
const onChangeSortType = (e) => {
    setSortType(e.target.value);
}
```

- `<select>` 요소에서 옵션 선택 시 실행
- `e.target.value`: "latest" 또는 "oldest"

#### 5. 새 일기 쓰기 버튼 핸들러
```javascript
const navigate = useNavigate();

const onClickNew = () => {
    navigate("/new");
}
```

- "새 일기 쓰기" 버튼 클릭 시 New.js 페이지로 이동

#### 6. UI 구조

**메뉴 영역 (정렬 + 버튼)**
```javascript
<div className='menu_wrapper'>
    <div className='left_col'>
        <select value={sortType} onChange={onChangeSortType}>
            {
                sortOptionList.map( (it, i) => (
                    <option key={i} value={it.value}>
                        {it.name}
                    </option>
                ))
            }
        </select>
    </div>
    <div className='right_col'>
        <Button 
            type={"positive"} 
            text={"새 일기 쓰기"}
            onClick={onClickNew}
        />
    </div>
</div>
```

**레이아웃:**
```
┌─────────────────────────────────────┐
│  [최신순 ▼]          [새 일기 쓰기]  │
└─────────────────────────────────────┘
```

**왼쪽:**
- `<select>` 드롭다운으로 정렬 옵션 선택
- 제어 컴포넌트: `value={sortType}`으로 현재 값 표시

**오른쪽:**
- "새 일기 쓰기" 버튼
- `type="positive"`로 강조 표시

**일기 목록 영역**
```javascript
<div className='list_wrapper'>
    { sortedData.map( (it) => (
        <DiaryItem key={it.id} {...it}/>
    ))}
</div>
```

- `sortedData` 배열을 순회하며 DiaryItem 생성
- `{...it}`: `id`, `content`, `emotionId`, `date`를 props로 전달
- `key={it.id}`: React 리스트 렌더링 최적화를 위한 고유 키

#### 7. 디버깅 로그
```javascript
console.log("data : " + data);
console.log(sortedData);
```

- 개발 중 데이터 흐름 확인용
- 프로덕션에서는 제거하는 것이 좋음

### 🔄 동작 흐름

#### 초기 렌더링:
1. Home.js에서 필터링된 `data` 전달
2. `sortType`은 "latest"(기본값)
3. `useEffect` 실행 → 최신순 정렬
4. `sortedData`에 정렬된 배열 저장
5. DiaryItem들이 최신순으로 렌더링

#### 정렬 옵션 변경 시:
1. 사용자가 드롭다운에서 "오래된 순" 선택
2. `onChangeSortType` 실행 → `setSortType("oldest")`
3. `sortType` 변경으로 `useEffect` 재실행
4. 오래된 순으로 정렬 → `sortedData` 업데이트
5. 화면 자동 리렌더링 (오래된 일기가 위로)

#### 새 일기 작성 시:
1. "새 일기 쓰기" 버튼 클릭
2. `/new` 페이지로 이동
3. 일기 작성 후 홈으로 돌아옴
4. Context의 `data` 업데이트
5. Home.js의 `filteredData` 업데이트
6. DiaryList의 `data` prop 변경
7. `useEffect` 재실행 → 새 일기 포함하여 재정렬

### 💡 설계 포인트

1. **원본 보존**: JSON을 이용한 깊은 복사로 불변성 유지
2. **반응형 정렬**: 정렬 옵션 변경 시 자동으로 재정렬
3. **메뉴와 목록 분리**: 상단 메뉴와 하단 목록으로 UI 구성
4. **Props 전달**: 스프레드 연산자로 간결하게 props 전달

### 🎨 사용 위치
- **Home.js**: 메인 페이지에서 월별 일기 목록 표시

---

## 컴포넌트 계층 구조

### 📊 전체 구조도

```
App.js
│
└─ Routes
    ├─ Home.js
    │   ├─ Header
    │   │   ├─ Button (왼쪽: <)
    │   │   └─ Button (오른쪽: >)
    │   └─ DiaryList
    │       ├─ Button (새 일기 쓰기)
    │       └─ DiaryItem (여러 개)
    │           └─ Button (수정하기)
    │
    ├─ New.js
    │   ├─ Header
    │   │   └─ Button (뒤로 가기)
    │   └─ Editor
    │       ├─ EmotionItem (5개)
    │       ├─ Button (취소하기)
    │       └─ Button (작성 완료)
    │
    ├─ Diary.js
    │   ├─ Header
    │   │   ├─ Button (뒤로가기)
    │   │   └─ Button (수정하기)
    │   └─ Viewer
    │
    └─ Edit.js
        ├─ Header
        │   ├─ Button (뒤로가기)
        │   └─ Button (삭제하기)
        └─ Editor
            ├─ EmotionItem (5개)
            ├─ Button (취소하기)
            └─ Button (작성 완료)
```

### 🔗 컴포넌트 재사용 관계

#### Button 컴포넌트
- **사용처**: 모든 페이지, DiaryList, Editor, DiaryItem
- **재사용 횟수**: 앱 전체에서 가장 많이 사용
- **타입**: default, positive, nagative

#### Header 컴포넌트
- **사용처**: Home, New, Diary, Edit (모든 페이지)
- **구조**: 일관된 3단 레이아웃
- **유연성**: leftChild, rightChild로 다양한 버튼 조합 가능

#### Editor 컴포넌트
- **사용처**: New (작성), Edit (수정)
- **모드**: initData 유무로 구분
- **하위 컴포넌트**: EmotionItem (5개), Button (2개)

### 📈 컴포넌트 복잡도

| 컴포넌트 | 코드 라인 | 복잡도 | 역할 |
|----------|-----------|--------|------|
| Button | 23 | ⭐ | 단순 UI |
| Header | 20 | ⭐ | 단순 레이아웃 |
| EmotionItem | 19 | ⭐ | 단순 선택 아이템 |
| Viewer | 28 | ⭐⭐ | 데이터 조회 + 표시 |
| DiaryItem | 43 | ⭐⭐ | 네비게이션 + 표시 |
| DiaryList | 92 | ⭐⭐⭐ | 정렬 로직 + 목록 관리 |
| Editor | 101 | ⭐⭐⭐⭐ | 복잡한 폼 관리 |

### 🔄 데이터 흐름

#### 읽기 (Read):
```
Context → Home.js → DiaryList → DiaryItem
                              ↓
Context → Diary.js → Viewer
```

#### 쓰기 (Create):
```
New.js → Editor → (사용자 입력) → onCreate → Context
```

#### 수정 (Update):
```
Edit.js → Editor (initData) → (사용자 수정) → OnUpdate → Context
```

#### 삭제 (Delete):
```
Edit.js → OnDelete → Context
```

### 💡 컴포넌트 설계 원칙

1. **단일 책임 원칙 (SRP)**
   - 각 컴포넌트는 하나의 명확한 역할만 수행
   - Button: 버튼 표시, Header: 헤더 레이아웃 등

2. **재사용성**
   - Button, Header 등은 다양한 상황에서 재사용
   - Props를 통해 유연하게 커스터마이징

3. **합성 (Composition)**
   - 작은 컴포넌트를 조합하여 큰 컴포넌트 생성
   - Editor = 날짜 선택 + EmotionItem들 + 내용 입력 + Button들

4. **제어 컴포넌트 (Controlled Components)**
   - Editor의 모든 입력값은 state로 관리
   - 단방향 데이터 흐름 유지

5. **Props 기반 유연성**
   - Editor: `initData` 유무로 작성/수정 모드 구분
   - Header: `leftChild`, `rightChild`로 다양한 레이아웃

---

## 📝 요약

component 폴더의 7개 파일은 일기장 애플리케이션의 **재사용 가능한 UI 블록**입니다:

### 기본 UI 컴포넌트
- **Button**: 일관된 스타일의 버튼
- **Header**: 3단 구조의 헤더 (왼쪽-중앙-오른쪽)

### 일기 작성 관련
- **Editor**: 날짜/감정/내용을 입력하는 폼 (작성/수정 모두 사용)
- **EmotionItem**: 감정을 선택하는 개별 아이템

### 일기 조회 관련
- **Viewer**: 일기를 읽기 전용으로 표시
- **DiaryItem**: 목록에서 개별 일기를 카드 형태로 표시
- **DiaryList**: 일기 목록을 정렬하여 표시 + 새 일기 쓰기 버튼

모든 컴포넌트는 **Props를 통해 데이터를 받고**, **재사용성**을 고려하여 설계되었습니다. 
특히 Editor는 `initData` prop 유무에 따라 작성/수정 모드로 동작하는 등, 유연한 설계가 돋보입니다.
