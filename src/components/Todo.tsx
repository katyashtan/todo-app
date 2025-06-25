import '../styles/Todo.css';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';

type Props = {
  texts: string[];
  setCount: (value: number | ((prev: number) => number)) => void;
  count: number;
  menuItem: string;
};

export const Todo = ({ texts, setCount, count, menuItem }: Props) => {
  const [checkedMap, setCheckedMap] = useState(() => {
    const saved = localStorage.getItem('checked-state');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('checked-state', JSON.stringify(checkedMap));
    localStorage.setItem('count', JSON.stringify(count));
  }, [checkedMap, count]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const id = e.target.closest('li.todo')?.getAttribute('data-id');
    if (!id) return;
    setCheckedMap((prev: object) => ({ ...prev, [id]: checked }));
    if (checked) {
      e.target.closest('li.todo')?.classList.add('checked');
      setCount((prev) => prev - 1);
    } else {
      e.target.closest('li.todo')?.classList.remove('checked');
      setCount((prev) => prev + 1);
    }
  };

  return (
    <>
      {texts.map((text: string) => {
        if (menuItem === 'Active') {
          return checkedMap[text] ? (
            <></>
          ) : (
            <li key={text} className="todo" data-id={text}>
              <Checkbox
                color="default"
                icon={<RadioButtonUnchecked />}
                checkedIcon={<CheckCircle />}
                checked={checkedMap[text]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                  onChange(e, checked);
                }}
              />
              <p className="text">{text}</p>
            </li>
          );
        } else if (menuItem === 'Completed') {
          return checkedMap[text] ? (
            <li key={text} className="todo checked" data-id={text}>
              <Checkbox
                color="default"
                icon={<RadioButtonUnchecked />}
                checkedIcon={<CheckCircle />}
                checked={checkedMap[text]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                  onChange(e, checked);
                }}
              />
              <p className="text">{text}</p>
            </li>
          ) : (
            <></>
          );
        }
        return (
          <li key={text} className={`todo ${checkedMap[text] ? 'checked' : ''}`} data-id={text}>
            <Checkbox
              color="default"
              icon={<RadioButtonUnchecked />}
              checkedIcon={<CheckCircle />}
              checked={checkedMap[text]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                onChange(e, checked);
              }}
            />
            <p className="text">{text}</p>
          </li>
        );
      })}
    </>
  );
};
