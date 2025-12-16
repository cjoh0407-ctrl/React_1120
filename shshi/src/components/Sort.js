// Sort.js (수정된 최종 코드)
import React from 'react';

const Sort = ({ value="", onChange }) => {
    const style = {
        padding: "10px",
        marginLeft: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "150px"
    };

    return (
        <select 
            value={value} 
            onChange={(e) => { 
                onChange && onChange(e.target.value); 
            }} 
            style={style}
        >
            <option value="">정렬 선택</option>
            <option value="low">낮은 가격순</option>
            <option value="high">높은 가격순</option>
            <option value="name">이름순</option>
        </select>
    );
};

export default Sort;