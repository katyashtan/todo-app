import '../styles/Todo.css';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';

type Props = {
  texts: string[];
};

export const Todo = ({ texts }: Props) => {
  const [checkedMap, setCheckedMap] = useState(() => {
    const saved = localStorage.getItem('checked-state');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('checked-state', JSON.stringify(checkedMap));
  }, [checkedMap]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const id = e.target.closest('li.todo')?.getAttribute('data-id');
    if (!id) return;
    setCheckedMap((prev: object) => ({ ...prev, [id]: checked }));
    if (checked) {
      e.target.closest('li.todo')?.classList.add('checked');
    } else {
      e.target.closest('li.todo')?.classList.remove('checked');
    }
  };

  return (
    <>
      {texts.map((text: string, id: number) => {
        return (
          <li key={id} className={`todo ${checkedMap[id] ? 'checked' : ''}`} data-id={id}>
            <Checkbox
              color="default"
              icon={<RadioButtonUnchecked />}
              checkedIcon={<CheckCircle />}
              checked={checkedMap[id]}
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
