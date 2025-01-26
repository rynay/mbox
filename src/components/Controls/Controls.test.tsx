import * as React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Controls from './Controls';

describe('Controls', () => {
    test('all controls should be disabled on empty todo list and left count should be zero', async () => {        
        render(
            <Controls
                todos={[]}
                filter='all'
                onClearCompleted={() => {}}
                onFilterChange={() => {}}
            />
        );
        expect(screen.getByTestId('all')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('active')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('completed')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('remove-completed')).toHaveProperty('disabled', true)
    
        expect(screen.getByText('0 осталось')).toBeDefined();
    })

    test('active controls should be disabled on todo list with only completed task', async () => {
        render(
            <Controls
                todos={[
                    { id: '1', text: '1',  done: true },
                ]}
                filter='all'
                onClearCompleted={() => {}}
                onFilterChange={() => {}}
            />
        );
        expect(screen.getByTestId('all')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('active')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('completed')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('remove-completed')).toHaveProperty('disabled', false)
    
        expect(screen.getByText('0 осталось')).toBeDefined();
    })

    test('completed controls and clear button should be disabled on todo list with only active tasks', async () => {
        render(
            <Controls
                todos={[
                    { id: '1', text: '1',  done: false },
                    { id: '2', text: '2',  done: false },
                    { id: '3', text: '3',  done: false },
                ]}
                filter='all'
                onClearCompleted={() => {}}
                onFilterChange={() => {}}
            />
        );
        expect(screen.getByTestId('all')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('active')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('completed')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('remove-completed')).toHaveProperty('disabled', true)
    
        expect(screen.getByText('3 осталось')).toBeDefined();
    })
})