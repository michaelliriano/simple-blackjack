import React from 'react';
import { render, screen } from '@testing-library/react';
import CardComponent from './index';

describe('Card.tsx', () => {
  test('renders card component', () => {
    render(
      <CardComponent
        card={{
          id: 1,
          type: 'Ace',
          value: 1,
        }}
        hidden={false}
      />,
    );
    expect(screen.findByText('A'));
  });
  test('hidden card component', () => {
    render(
      <CardComponent
        card={{
          id: 1,
          type: 'Ace',
          value: 1,
        }}
        hidden
      />,
    );
    expect(screen.findByText('*'));
  });
  test('shows logo on card', () => {
    render(
      <CardComponent
        card={{
          id: 1,
          type: 'hearts',
          value: 10,
        }}
        hidden={false}
      />,
    );
    expect(screen.findByText('♥'));
  });
});
