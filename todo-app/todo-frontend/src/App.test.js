import { render, screen } from '@testing-library/react';
import Todo from './Todos/Todo';


test('renders todo properly', () => {
  render(
    <Todo todo={{
        text: 'Test todotodo',
        done: false
      }}
      deleteTodo={() => {}}
      completeTodo={() => {}}
    />);
  const textElement = screen.getByText(/Test todotodo/i);
  const doneElement = screen.getByText(/This todo is not done/i);
  expect(textElement).toBeInTheDocument();
  expect(doneElement).toBeInTheDocument();
});


