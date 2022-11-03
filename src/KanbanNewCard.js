/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import { kanbanCardStyles, kanbanCardTitleStyles } from './KanbanCard';
import { css } from '@emotion/react';

const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const inputElem = useRef(null);
  // 保证组件只会在挂载提交是执行一次，组件更新时不在执行
  useEffect(() => {
    inputElem.current.focus();
  }, []);
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      const newCard = {
        title, status: Date().toString()
      }
      onSubmit(newCard);
    }
  };
  return (
    <li css={kanbanCardStyles}>
      <h3>添加新卡片</h3>
      <div css={kanbanCardTitleStyles}>
        <input type='text' ref={inputElem} value={title} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  );
};

export default KanbanNewCard;
