import React from 'react';

export default function ScoreBoard({
  dealer,
  player,
  show,
}: {
  dealer: number;
  player: number;
  show: boolean;
}) {
  return show ? (
    <div
      style={{
        padding: '.5rem',
      }}
    >
      <h2>Scoreboard</h2>
      <div>
        <h3>Dealer: {dealer} </h3>
        <h3>Player: {player} </h3>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
