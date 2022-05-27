import React from 'react';
import { Card } from '../../utils/cards';

type ActionBarProps = {
  player: Card[];
  decks: number;
  setDecks: (n: number) => void;
  dealer: Card[];
  finished: boolean;
  handleDeal: () => void;
  stay: () => void;
  resetGame: () => void;
  play: () => void;
};
export default function ActionBar({
  player,
  dealer,
  finished,
  handleDeal,
  stay,
  resetGame,
  play,
  decks,
  setDecks,
}: ActionBarProps) {
  return (
    <>
      {!dealer.length && !player.length ? (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'space-between',
            justifyContent: 'center',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            flexDirection: 'column',
            height: 300,
            width: 300,
          }}
        >
          <h1 style={{ padding: '1rem', textAlign: 'center' }}>
            Welcome to simple Blackjack.
          </h1>
          <label htmlFor="">
            Choose how many decks would you like to play with?
            <select value={decks} onChange={(e) => setDecks(+e.target.value)}>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
          </label>
          <button onClick={play}>Play</button>
        </div>
      ) : !finished ? (
        <div>
          <button onClick={handleDeal}>Hit</button>
          <button onClick={stay}>Stay</button>
        </div>
      ) : (
        <>
          <div>
            <button onClick={resetGame}>Play again</button>
          </div>
        </>
      )}
    </>
  );
}
