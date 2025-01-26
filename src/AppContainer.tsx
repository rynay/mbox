import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Filter, Todo } from './types';
import { Controls } from './components/Controls';
import { TodoList } from './components/TodoList';
import { NewValueField } from './components/NewValueField';
import { Container } from './components/Container';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    if (filter === 'all') setDisplayedTodos(todos)
    else if (filter === 'active') setDisplayedTodos(todos.filter(el => !el.done))
    else if (filter === 'completed') setDisplayedTodos(todos.filter(el => el.done))
  }, [todos, filter]);

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

    const handleClearCompleted = useCallback(() => {
        setTodos(todos => todos.filter(todo => !todo.done));
        if (filter === 'completed') setFilter('all');
    }, [filter])

  return (
    <Container>
      <h1>Список дел</h1>

      <NewValueField handleSubmit={addTodo} />

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
    </Container>
  );
}

export default App;
