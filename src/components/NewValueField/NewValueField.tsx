import React, { FC, FormEvent, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
    handleSubmit: (s: string) => void,
}

const NewValueField: FC<Props> = ({
    handleSubmit: onSubmit,
}) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        if (!inputValue.trim()) return;
        onSubmit(inputValue.trim());
        setInputValue('');
    }, [onSubmit, inputValue]);

    return (
        <Box
            component="form"
            sx={{ width: '100%' }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
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
    )
};

export default NewValueField;
