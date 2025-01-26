import React, { FC } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Todo } from '../../types';

interface Props {
    todos: Todo[],
    onDoneValueChange: (id: string, done: boolean) => void,
}

const TodoList: FC<Props> = ({
    todos,
    onDoneValueChange,
}) => {
    return (
        <Box
            sx={{
            width: '100%',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            margin: '10px 0 0 -15px',
            padding: '0 0 0 15px',
            '& > * + *': {
                marginTop: '5px',
            }
            }}
        >
            {todos.map(({ id, text, done }) => (
            <Box key={id}>
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
                        color="secondary"
                        onChange={event => onDoneValueChange(id, event.target.checked)}
                    />
                }
                />
            </Box>
            ))}
        </Box>
    );
}

export default TodoList;
