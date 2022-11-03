/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import KanbanColumn from './KanbanColumn';
import { css } from '@emotion/react';

const kanbanBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;

export const COLUMN_KEY_TODO = 'todo';
export const COLUMN_KEY_ONGOING = 'ongoing';
export const COLUMN_KEY_DONE = 'done';

const KanbanBoard = ({
  isLoading = true,
  todoList,
  ongoingList,
  doneList,
  onAdd,
  onRemove
}) => {
  const [dragedItem, setDragedItem] = useState(null) // 拖动的卡片
  const [dragSource, setDragSource] = useState(null) // 拖动的来源地
  const [dragTarget, setDragTarget] = useState(null) // 拖动的目标地
  
  const handleDrop = () => {
    if(!dragedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return;
    }

    dragSource && onRemove(dragSource, dragedItem)
    dragTarget && onAdd(dragTarget, dragedItem)
  }

  return (
    <main css={kanbanBoardStyles}>
      {
        isLoading ? (<KanbanColumn className='column-loding' title="读取中" />)
          : (
            <>
              <KanbanColumn 
                className='column-todo' 
                setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
                setIsDragTarget={(isSrc) => setDragTarget(isSrc ? COLUMN_KEY_TODO : null)}
                setDragedItem={setDragedItem}
                onRemove={onRemove.bind(null, COLUMN_KEY_TODO)}
                cardList={todoList}
                onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
                onDrop={handleDrop}
                title='待处理'
                canAddNew  
              />
              <KanbanColumn 
                className='column-ongoing'
                setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
                setIsDragTarget={(isSrc) => setDragTarget(isSrc ? COLUMN_KEY_ONGOING : null)}
                setDragedItem={setDragedItem}
                cardList={ongoingList}
                onRemove={onRemove.bind(null ,COLUMN_KEY_ONGOING)}
                onDrop={handleDrop} 
                title="进行中" 
              />
              <KanbanColumn 
                className='column-done'
                setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
                setIsDragTarget={(isSrc) => setDragTarget(isSrc ? COLUMN_KEY_DONE : null)}
                cardList={doneList}
                onRemove={onRemove.bind(null ,COLUMN_KEY_DONE)}
                onDrop={handleDrop} 
                title="已完成"
              />
            </>            
          )
        }
    </main>
  )
}

export default KanbanBoard;
