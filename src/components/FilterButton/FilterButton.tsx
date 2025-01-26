import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import Button from '@mui/material/Button';
import { Filter } from '../../types';

type Props = Omit<DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>, 'onChange'> & {
    currentFilter: string;
    unavailable: boolean;
    filterName: Filter;
    onChange: (s: Filter) => void;
}

const FilterButton: FC<Props> = ({
    unavailable,
    currentFilter,
    filterName,
    onChange,
    children,
    ...props
}) => {
    return (
        <Button
            {...props}
            data-testid={filterName}
            size="small"
            color="secondary"
            variant={(!unavailable && currentFilter === filterName) ? 'outlined' : 'text'}
            onClick={() => onChange(filterName)}
        >
            {children}
        </Button>
    )
}

export default FilterButton;