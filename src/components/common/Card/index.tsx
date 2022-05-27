import React from 'react';
import { Card as CardType } from '../../../utils/cards';

type CardProps = {
  card: CardType;
  size?: 'sm' | 'md' | 'lg';
  hidden: boolean;
};
export default function Card({ card, size, hidden }: CardProps) {
  const ParseLogo = (suit: string): string => {
    type LogoSuit = {
      clubs: string;
      hearts: string;
      diamonds: string;
      spades: string;
    };
    const suits = {
      clubs: '♣',
      hearts: '♥',
      diamonds: '♦',
      spades: '♠',
    };
    return suits[suit as keyof LogoSuit];
  };
  const getSize = () => {
    const sizes = {
      sm: {
        height: 200,
        width: 100,
      },
      md: {
        height: 300,
        width: 15,
      },
      lg: {
        height: 300,
        width: 150,
      },
    };

    return sizes[size || 'sm'];
  };
  const printCard = (card: CardType): string | number => {
    if (card.value === 1) return 'A';
    return card.value;
  };
  return (
    <div
      style={{
        ...getSize(),
        borderRadius: 8,
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '.5rem',
        backgroundColor: '#fff',
        overflow: 'scroll',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        {hidden ? (
          <>
            <div>*</div>
            <div>*</div>
          </>
        ) : (
          <>
            <div>{printCard(card)}</div>
            <div>{printCard(card)}</div>
          </>
        )}
      </header>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '3rem',
          padding: '1rem',
          color:
            card.type === 'hearts' || card.type === 'diamonds'
              ? 'crimson'
              : '#333',
        }}
      >
        {!hidden ? ParseLogo(card.type) : ''}
      </h2>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        {hidden ? (
          <>
            <div>*</div>
            <div>*</div>
          </>
        ) : (
          <>
            <div>{printCard(card)}</div>
            <div>{printCard(card)}</div>
          </>
        )}
      </footer>
    </div>
  );
}
