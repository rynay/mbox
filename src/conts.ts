import { Filter, Todo } from "./types";

interface FilterButton {
    label: string;
    name: Filter;
    checkIfDisabled?: (items: Todo[]) => boolean;
}

export const filters: FilterButton[] = [
    { label: 'Все', name: 'all' },
    {
        label: 'Сделать',
        name: 'active',
        checkIfDisabled: (todos: Todo[]) => (
            todos.every(todo => todo.done)
        ),
    },
    {
        label: 'Готово',
        name: 'completed',
        checkIfDisabled: (todos: Todo[]) => (
            todos.every(todo => !todo.done)
        ),
    },
]