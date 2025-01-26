import React, { FC } from 'react';
import { Controls } from './components/Controls';
import { TodoList } from './components/TodoList';
import { NewValueField } from './components/NewValueField';
import { Container } from './components/Container';
import { Filter, Todo } from './types';

interface Props {
  todos: Todo[],
  displayedTodos: Todo[],
  addTodo: (text: string) => void, 
  changeDoneValue: (id: string, done: boolean) => void,
  filter: Filter,
  setFilter: (v: Filter) => void,
  handleClearCompleted: VoidFunction,
}

const App: FC<Props> = ({
  todos,
  displayedTodos,
  addTodo,
  changeDoneValue,
  filter,
  setFilter,
  handleClearCompleted,
}) => {
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
