import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Filter, Todo } from './types';
import { Controls } from './components/Controls';
import { TodoList } from 'components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>(todos);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (filter === 'all') setDisplayedTodos(todos)
    else if (filter === 'active') setDisplayedTodos(todos.filter(el => !el.done))
    else if (filter === 'completed') setDisplayedTodos(todos.filter(el => el.done))
  }, [todos, filter]);

  useEffect(() => {
    const json = localStorage.getItem('todos');
    if (json) setTodos(JSON.parse(json));
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])


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

    const handleClearCompleted = useCallback(() => {
        setTodos(todos => todos.filter(todo => !todo.done));
        if (filter === 'completed') setFilter('all');
    }, [filter])

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'radial-gradient(circle, rgba(19,7,103,1) 4%, rgba(159,19,199,1) 89%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box
        component="div"
        sx={{
          width: 600,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#fefefe',
          padding: '5px 40px 15px',
          borderRadius: '5px',
        }}
      >
        <h1>Список дел</h1>
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
            label="Что будем делать сегодня?"
            variant="outlined"
            color="secondary"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </Box>

        <TodoList
          todos={displayedTodos}
          onDoneValueChange={changeDoneValue}
        />

        <Controls
          todos={todos}
          filter={filter}
          onClearCompleted={handleClearCompleted}
          onFilterChange={setFilter}
        />
      </Box>
    </Box>
  );
}

export default App;
