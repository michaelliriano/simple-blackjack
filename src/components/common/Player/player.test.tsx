import React from 'react';
import { render, screen } from '@testing-library/react';
import Player from './';
import { Card } from '../../../utils/cards';

describe('Player', () => {
  test('renders player component with or', () => {
    const cards: Card[] = [
      {
        id: 1,
        type: 'heart',
        value: 1,
      },
      {
        id: 2,
        type: 'spades',
        value: 2,
      },
    ];
    render(
      <Player
        player={'Dealer'}
        score={3}
        cards={cards}
        isDealer={false}
        isFinished={false}
      />,
    );

    expect(screen.findByText('A'));
    expect(screen.findByText('2'));
    expect(screen.findByText('Dealer has 3 or 13'));
  });
  test('reenders with or ', () => {
    const cards: Card[] = [
      {
        id: 1,
        type: 'heart',
        value: 9,
      },
      {
        id: 2,
        type: 'spades',
        value: 10,
      },
    ];
    render(<Player player={'You'} score={19} cards={cards} isDealer={false} />);
    expect(screen.findByText('You have 19'));
    expect(screen.findByText('9'));
    expect(screen.findByText('10'));
  });
  test('renders player component with ace', () => {
    const cards: Card[] = [
      {
        id: 1,
        type: 'heart',
        value: 10,
      },
      {
        id: 2,
        type: 'spades',
        value: 1,
      },
    ];
    render(<Player player={'You'} score={10} cards={cards} isDealer={false} />);
    expect(screen.findByText('You have 10'));
    expect(screen.findByText('A'));
    expect(screen.findByText('10'));
  });
  test('first dealer card hidden', () => {
    const cards: Card[] = [
      {
        id: 1,
        type: 'heart',
        value: 1,
      },
      {
        id: 2,
        type: 'spades',
        value: 10,
      },
    ];
    render(
      <Player
        player={'Dealer'}
        score={20}
        cards={cards}
        isDealer={true}
        isFinished={true}
      />,
    );
    expect(screen.findByText('Dealer has 20'));
    expect(screen.findByText('*'));
    expect(screen.findByText('10'));
  });
});
