import '../styles/App.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState, useEffect } from 'react';
import { Input } from './Input';
import { Todo } from './Todo';

const LOCAL_STORAGE_KEY = 'my-todo';

export type TodoItem = {
  id: string;
  description: string;
  isCompleted: boolean;
};

type SupportedFilterModes = 'All' | 'Completed' | 'Active';

export const App = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('count1');
    return saved ? JSON.parse(saved) : todoItems.length;
  });

  const [filterMode, setFilterMode] = useState<SupportedFilterModes>('All');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoItems));
    localStorage.setItem('count1', JSON.stringify(count));
  }, [todoItems, count]);

  const AddTodo = (inputText: string) => {
    setTodoItems((prev: TodoItem[]) => [
      ...prev,
      { id: new Date().toISOString(), description: inputText, isCompleted: false },
    ]);
    setCount((prev) => prev + 1);
  };

  const DeleteCompleted = () => {
    const notDeleted = todoItems.filter((todo) => !todo.isCompleted);
    setTodoItems(notDeleted);
  };

  return (
    <div className="content">
      <div className="top-container">
        <h1 className="header">todos</h1>
        <Input onInputSubmit={AddTodo} />
        {todoItems
          .filter((todoItem) => {
            if (filterMode === 'Active') return !todoItem.isCompleted;
            if (filterMode === 'Completed') return todoItem.isCompleted;
            return true;
          })
          .map((todoItem) => (
            <Todo todoItem={todoItem} setCount={setCount} />
          ))}
      </div>
      <div className="bottom-container">
        <p className="count">Items left: {count}</p>
        <BottomNavigation
          showLabels
          sx={{
            backgroundColor: 'bisque',
            marginRight: '1.5vw',
          }}
        >
          <BottomNavigationAction
            sx={{
              borderRadius: '2vw',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
            onClick={() => setFilterMode('All')}
            label="All"
          />
          <BottomNavigationAction
            sx={{
              borderRadius: '2vw',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
            onClick={() => setFilterMode('Active')}
            label="Active"
          />
          <BottomNavigationAction
            sx={{
              borderRadius: '2vw',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
            onClick={() => setFilterMode('Completed')}
            label="Completed"
          />
        </BottomNavigation>
        <button onClick={DeleteCompleted} className="delete">
          Clear completed
        </button>
      </div>
    </div>
  );
};
