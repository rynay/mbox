import React, { FC, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FilterButton } from 'components/FilterButton';
import { filters } from './../../constants';
import { Filter, Todo } from '../../types';

interface Props {
    todos: Todo[],
    filter: Filter,
    onTodosChange: (cb: Todo[] | ((items: Todo[]) => Todo[])) => void,
    onFilterChange: (filter: Filter) => void,
};

const Controls: FC<Props> = ({
    todos,
    onTodosChange,
    filter,
    onFilterChange,
}) => {
    const handleClearCompleted = useCallback(() => {
        onTodosChange(todos => todos.filter(todo => !todo.done));
        if (filter === 'completed') onFilterChange('all');
    }, [filter, onTodosChange, onFilterChange])
    
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
          
          <Typography variant='body2' color='textDisabled'>{`${activeTodosCount} осталось`}</Typography>
    
          <Box sx={{ width: '230px', display: 'flex', justifyContent: 'space-between' }}>
    
            {filters.map(({ name, label, checkIfDisabled }) => (
                <FilterButton
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
            size="small"
            color="secondary"
            onClick={handleClearCompleted}
            disabled={!hasDone}
          >
            Удалить сделано
          </Button>
    
        </Box>
    )
};

export default Controls;