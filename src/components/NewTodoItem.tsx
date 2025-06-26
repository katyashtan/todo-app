import TextField from '@mui/material/TextField';
import { useState } from 'react';

type Props = {
  onInputSubmit: (inputText: string) => void;
};

export const NewTodoItem = ({ onInputSubmit }: Props) => {
  const [inputText, setInputText] = useState('');
  return (
    <TextField
      id="outlined-basic"
      label="What's your plan for today?"
      variant="outlined"
      inputProps={{ maxLength: 30 }}
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && inputText.length > 0) {
          e.preventDefault();
          onInputSubmit(inputText);
          setInputText('');
        }
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '10vw',
          width: '30vw',
          height: '50px',
          '& fieldset': {
            border: '2px solid grey',
          },
          '&:hover fieldset': {
            border: '2px solid black',
          },
          '&.Mui-focused fieldset': {
            border: '2px solid black',
          },
          '& input': {
            color: 'black',
          },
          '@media (max-width:480px)': {
            width: '80vw',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'black',
        },
      }}
    />
  );
};
