import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('Renders main menu', () => {
  render(<App />);
  const title = screen.getByText('Welcome to simple Blackjack.');
  const button = screen.getByText('Play');
  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
test('Renders game', () => {
  render(<App />);
  const button = screen.getByText('Play');
  fireEvent(button, new MouseEvent('click'));
  waitFor(() => {
    expect(screen.getByText('You have'));
    expect(screen.getByText('Hit'));
    expect(screen.getByText('Stay'));
  });
});
test('Hit on a card', () => {
  render(<App />);
  const button = screen.getByText('Play');
  fireEvent(button, new MouseEvent('click'));
  waitFor(() => {
    const hit = screen.getByText('Hit');
    fireEvent(hit, new MouseEvent('click'));
  });
});
test('Stay on a card', () => {
  render(<App />);
  const button = screen.getByText('Play');
  fireEvent(button, new MouseEvent('click'));
  waitFor(() => {
    const stay = screen.getByText('Stay');
    fireEvent(stay, new MouseEvent('click'));
  });
});
