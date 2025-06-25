import '../styles/App.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState, useEffect } from 'react';
import { Input } from './Input';
import { Todo } from './Todo';

const LOCAL_STORAGE_KEY = 'my-todo';

export const App = () => {
  const [toDoText, setToDoText] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('count');
    return saved ? JSON.parse(saved) : toDoText.length;
  });

  const [menuItem, setMenuItem] = useState('All');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoText));
  }, [toDoText]);

  const onInputSubmit = (inputText: string) => {
    setToDoText((prev) => [...prev, inputText]);
    setCount((prev) => prev + 1);
  };

  const deletedMap: string[] = Array.from(document.querySelectorAll('.checked')).map(
    (el) => el.textContent || ''
  );

  const onDelete = (deletedMap: string[]) => {
    const notDeleted = toDoText.filter((item) => !deletedMap.includes(item));
    setToDoText(notDeleted);
  };

  return (
    <div className="content">
      <div className="top-container">
        <h1 className="header">todos</h1>
        <Input onInputSubmit={onInputSubmit} />
        <Todo texts={toDoText} setCount={setCount} count={count} menuItem={menuItem} />
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
            onClick={() => setMenuItem('All')}
            label="All"
          />
          <BottomNavigationAction
            sx={{
              borderRadius: '2vw',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
            onClick={() => setMenuItem('Active')}
            label="Active"
          />
          <BottomNavigationAction
            sx={{
              borderRadius: '2vw',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
            onClick={() => setMenuItem('Completed')}
            label="Completed"
          />
        </BottomNavigation>
        <button onClick={() => onDelete(deletedMap)} className="delete">
          Clear completed
        </button>
      </div>
    </div>
  );
};
