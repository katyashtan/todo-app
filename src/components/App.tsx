import '../styles/App.css';
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

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoText));
  }, [toDoText]);

  const onInputSubmit = (inputText: string) => {
    setToDoText((prev) => [...prev, inputText]);
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <div className="container">
        <h1 className="header">todos</h1>
        <Input onInputSubmit={onInputSubmit} />
        <Todo texts={toDoText} setCount={setCount} count={count} />
      </div>
      <p>Items left: {count}</p>
    </>
  );
};
