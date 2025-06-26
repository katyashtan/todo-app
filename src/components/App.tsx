import '../styles/App.css';
import { useState, useEffect } from 'react';
import { NewTodoItem } from './NewTodoItem';
import { Todo } from './Todo';
import { FilterList } from './FilterList';

const LOCAL_STORAGE_KEY = 'my-todo';

export type TodoItem = {
  id: string;
  description: string;
  isCompleted: boolean;
};

export type SupportedFilterModes = 'All' | 'Completed' | 'Active';

export const App = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('count');
    return saved ? JSON.parse(saved) : todoItems.length;
  });

  const [filterMode, setFilterMode] = useState<SupportedFilterModes>('All');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoItems));
    localStorage.setItem('count', JSON.stringify(count));
  }, [todoItems, count]);

  const addTodo = (inputText: string) => {
    setTodoItems((prev: TodoItem[]) => [
      ...prev,
      { id: new Date().toISOString(), description: inputText, isCompleted: false },
    ]);
    setCount((prev) => prev + 1);
  };

  const deleteCompleted = () => {
    const notDeleted = todoItems.filter((todo) => !todo.isCompleted);
    setTodoItems(notDeleted);
  };

  return (
    <div className="content">
      <div className="top-container">
        <h1 className="header">todos</h1>
        <NewTodoItem onInputSubmit={addTodo} />
        {todoItems
          .filter((todoItem) => {
            if (filterMode === 'Active') return !todoItem.isCompleted;
            if (filterMode === 'Completed') return todoItem.isCompleted;
            return true;
          })
          .map((todoItem) => (
            <Todo key={todoItem.id} todoItem={todoItem} setCount={setCount} />
          ))}
      </div>
      <div className="bottom-container">
        <p className="count">Items left: {count}</p>
        <FilterList onFilterChanged={setFilterMode} />
        <button onClick={deleteCompleted} className="delete">
          Clear completed
        </button>
      </div>
    </div>
  );
};
