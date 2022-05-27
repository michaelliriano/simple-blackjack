import React from 'react';
import { Card } from '../../../utils/cards';
import CardComponet from '../Card';

type PlayerProps = {
  player: string;
  score: number;
  cards: Card[];
  isDealer?: boolean;
  isFinished?: boolean;
};

export default function Player({
  player,
  score,
  cards,
  isDealer,
  isFinished,
}: PlayerProps) {
  const hasAce = (): string | JSX.Element => {
    if (score < 11 && cards.find((c) => c.value === 1)) {
      return `or ${score + 10}`;
    }
    return <span data-testid="has-ace-span"></span>;
  };
  return (
    <div
      style={{
        alignItems: 'flex-start',
      }}
    >
      {(!isDealer || isFinished) && !!score && (
        <h3 style={{ padding: '.5rem' }}>
          {player} {player.includes('You') ? 'have' : 'has'} {score}{' '}
          {!isFinished && hasAce()}
        </h3>
      )}
      <div
        style={{
          flex: '1',
          display: 'flex',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            overflowX: 'scroll',
          }}
        >
          {cards.map((card, index) => (
            <CardComponet
              key={card.id + card.type}
              size="sm"
              card={card}
              hidden={index === 0 && !!isDealer && !isFinished}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
