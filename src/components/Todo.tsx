import '../styles/Todo.css';
import Checkbox from '@mui/material/Checkbox';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';

type Props = {
  texts: string[];
};

export const Todo = ({ texts }: Props) => {
  return (
    <>
      {texts.map((text) => {
        return (
          <li key={text} className="todo">
            <Checkbox
              color="default"
              icon={<RadioButtonUnchecked />}
              checkedIcon={<CheckCircle />}
            />
            <p className="text">{text}</p>
          </li>
        );
      })}
    </>
  );
};
