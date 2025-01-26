import React  from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import App from './AppContainer';

afterEach(() => {
    cleanup();
})

describe('App', () => {
    test('should be empty list and disabled buttons on empty todo list', () => {
        render(
            <App />
        );
        expect(screen.queryByTestId('todo-item')).toBeNull();    
        
        expect(screen.getByTestId('all')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('active')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('completed')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('remove-completed')).toHaveProperty('disabled', true)

        expect(screen.getByText('0 осталось')).toBeDefined();
    });

    test('should add todo task and change button states', () => {
        render(
            <App />
        );

        const input = screen.getByLabelText("Что будем делать сегодня?");

        fireEvent.change(input, { target: { value: 'Бегать' } });
        fireEvent.submit(screen.getByTestId('todo-form'));

        expect(input).toHaveValue('');

        expect(screen.getByTestId('todo-item')).not.toBeNull();
        expect(screen.getByText('Бегать')).toBeInTheDocument();    
        
        expect(screen.getByTestId('all')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('active')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('completed')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('remove-completed')).toHaveProperty('disabled', true)

        expect(screen.getByText('1 осталось')).toBeDefined();
    });

    test('should change todo\'s done state', () => {
        render(
            <App />
        );

        const input = screen.getByLabelText("Что будем делать сегодня?");

        fireEvent.change(input, { target: { value: 'Программировать' } });
        fireEvent.submit(screen.getByTestId('todo-form'));

        expect(input).toHaveValue('');

        expect(screen.getByTestId('todo-item')).not.toBeNull();
        expect(screen.getByText('Программировать')).toBeInTheDocument();    
        
        expect(screen.getByTestId('all')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('active')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('completed')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('remove-completed')).toHaveProperty('disabled', true)

        expect(screen.getByText('1 осталось')).toBeDefined();

        const checkbox = screen.getByLabelText('Программировать');
        fireEvent.click(checkbox);

        expect(screen.getByTestId('all')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('active')).toHaveProperty('disabled', true)
        expect(screen.getByTestId('completed')).toHaveProperty('disabled', false)
        expect(screen.getByTestId('remove-completed')).toHaveProperty('disabled', false)

        expect(screen.getByText('0 осталось')).toBeDefined();
    });

    test('should remove completed tasks', () => {
        render(
            <App />
        );

        const input = screen.getByLabelText("Что будем делать сегодня?");

        fireEvent.change(input, { target: { value: 'Тестировать' } });
        fireEvent.submit(screen.getByTestId('todo-form'));

        expect(input).toHaveValue('');
        expect(screen.getByText('Тестировать')).toBeInTheDocument();    
    
        const checkbox = screen.getByLabelText('Тестировать');
        fireEvent.click(checkbox);

        expect(screen.getByText('0 осталось')).toBeDefined();

        const removeCompletedButton = screen.getByTestId('remove-completed');
        fireEvent.click(removeCompletedButton);

        expect(screen.queryByTestId('todo-item')).toBeNull();
    });

    test('should change list on filter change', () => {
        render(
            <App />
        );

        const input = screen.getByLabelText("Что будем делать сегодня?");

        fireEvent.change(input, { target: { value: '1st task' } });
        fireEvent.submit(screen.getByTestId('todo-form'));

        fireEvent.change(input, { target: { value: '2nd task' } });
        fireEvent.submit(screen.getByTestId('todo-form'));

        fireEvent.change(input, { target: { value: '3rd task' } });
        fireEvent.submit(screen.getByTestId('todo-form'));

        const checkbox = screen.getByLabelText('1st task');
        fireEvent.click(checkbox);

        fireEvent.click(screen.getByTestId('all'));
        expect(screen.getByText('1st task')).toBeInTheDocument();
        expect(screen.getByText('2nd task')).toBeInTheDocument();
        expect(screen.getByText('3rd task')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('active'));
        expect(screen.queryByTestId('1st task')).not.toBeInTheDocument();    
        expect(screen.getByText('2nd task')).toBeInTheDocument();    
        expect(screen.getByText('3rd task')).toBeInTheDocument(); 

        fireEvent.click(screen.getByTestId('completed'));
        expect(screen.getByText('1st task')).toBeInTheDocument();    
        expect(screen.queryByTestId('2nd task')).not.toBeInTheDocument();    
        expect(screen.queryByTestId('3rd task')).not.toBeInTheDocument(); 
    });
})