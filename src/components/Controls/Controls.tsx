import React, { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FilterButton } from 'components/FilterButton';
import { filters } from '../../constants';
import { Filter, Todo } from '../../types';

interface Props {
    todos: Todo[],
    filter: Filter,
    onClearCompleted: VoidFunction,
    onFilterChange: (filter: Filter) => void,
};

const Controls: FC<Props> = ({
    todos,
    onClearCompleted,
    filter,
    onFilterChange,
}) => {
    const activeTodosCount = useMemo(() => (
        todos.reduce(((acc, curr) => (curr.done ? acc : ++acc)), 0)
    ), [todos]);

    const hasDone = useMemo(() => (
        todos.some(todo => todo.done)
    ), [todos]);

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 1,
          }}>
          
          <Typography
            data-testid="left-count"
            variant='body2'
            color='textDisabled'
          >
            {`${activeTodosCount} осталось`}
          </Typography>
    
          <Box sx={{ width: '230px', display: 'flex', justifyContent: 'space-between' }}>
    
            {filters.map(({ name, label, checkIfDisabled }) => (
                <FilterButton
                  key={name}
                  currentFilter={filter}
                  unavailable={!todos.length}
                  disabled={!todos.length || checkIfDisabled?.(todos)}
                  onChange={onFilterChange}
                  filterName={name}
                >
                  {label}
                </FilterButton>
            ))}
    
          </Box>
    
          <Button
            data-testid="remove-completed"
            size="small"
            color="secondary"
            onClick={onClearCompleted}
            disabled={!hasDone}
          >
            Удалить сделано
          </Button>
    
        </Box>
    )
};

export default Controls;