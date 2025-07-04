import '../styles/Todo.css';
import Checkbox from '@mui/material/Checkbox';
import CheckCircle from '@mui/icons-material/CheckCircle';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import type { TodoItem } from './App';

type Props = {
  todoItem: TodoItem;
  setCount: (value: number | ((prev: number) => number)) => void;
};

export const Todo = ({ todoItem, setCount }: Props) => {
  return (
    <li className={`todo ${todoItem.isCompleted ? 'checked' : ''}`}>
      <Checkbox
        color="default"
        icon={<RadioButtonUnchecked />}
        checkedIcon={<CheckCircle />}
        checked={todoItem.isCompleted}
        onChange={(_e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
          todoItem.isCompleted = checked;
          if (checked) {
            setCount((prev) => prev - 1);
          } else {
            setCount((prev) => prev + 1);
          }
        }}
      />
      <p className="text">{todoItem.description}</p>
    </li>
  );
};
