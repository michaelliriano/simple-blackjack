import React from 'react';

import { render, screen } from '@testing-library/react';
import ActionBar from './';
import { Card } from '../../utils/cards';

describe('ActionBar', () => {
  const cards: Card[] = [
    {
      id: 1,
      type: 'A',
      value: 1,
    },
    {
      id: 2,
      type: '10',
      value: 10,
    },
  ];
  test('shows play button only', () => {
    render(
      <ActionBar
        player={[]}
        dealer={[]}
        finished={false}
        handleDeal={jest.fn()}
        stay={jest.fn()}
        resetGame={jest.fn()}
        play={jest.fn()}
        decks={8}
        setDecks={jest.fn()}
      />,
    );
    expect(screen.getByText('Play'));
  });
  test('shows action buttons', () => {
    render(
      <ActionBar
        player={cards}
        dealer={cards}
        finished={false}
        handleDeal={jest.fn()}
        stay={jest.fn()}
        resetGame={jest.fn()}
        play={jest.fn()}
        decks={8}
        setDecks={jest.fn()}
      />,
    );
    expect(screen.getByText('Hit'));
    expect(screen.getByText('Stay'));
  });
  test('shows play again button', () => {
    render(
      <ActionBar
        player={cards}
        dealer={cards}
        finished={true}
        handleDeal={jest.fn()}
        stay={jest.fn()}
        resetGame={jest.fn()}
        play={jest.fn()}
        decks={8}
        setDecks={jest.fn()}
      />,
    );
    expect(screen.getByText('Play again'));
  });
});
