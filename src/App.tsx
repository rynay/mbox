import React, { FormEvent, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

import './App.css';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = useCallback((text: string) => {
    setTodos(todos => [{
      id: uuidv4(),
      text,
      done: false,
    }, ...todos])
  }, []);

  const changeDoneValue = useCallback((id: string, done: boolean) => {
    setTodos(todos => todos.map((todo) => (todo.id !== id ? todo : { ...todo, done })))
  }, [])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  }, [inputValue, addTodo]);

  return (
    <Box
      component="div"
      sx={{
        maxWidth: 500,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>todos</h1>
      <Box
        component="form"
        sx={{ width: '100%' }}
        noValidate
        autoComplete="off"
        onSubmit={(event) => handleSubmit(event)}
      >
        <TextField
          sx={{ width: '100%' }}
          id="outlined-basic"
          label="What needs to be done?"
          variant="outlined"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </Box>

      <FormGroup sx={{ width: '100%' }}>
        {todos.map(({ id, text, done }) => (
          <FormControlLabel
            key={id}
            label={
              <Typography
                color={done ? 'textDisabled' : 'textPrimary'}
                sx={{ textDecoration: done ? 'line-through' : 'none' }}
              >
                {text}
              </Typography>
            }
            control={
              <Checkbox
                checked={done}
                color="success"
                onChange={event => changeDoneValue(id, event.target.checked)}
              />
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export default App;
