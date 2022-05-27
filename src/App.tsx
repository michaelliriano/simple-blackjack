import React from 'react';
import ActionBar from './components/ActionBar';
import Player from './components/common/Player';
import useGame from './hooks/useGame';
import ScoreBoard from './components/ScoreBoard';

export default function App(): JSX.Element {
  const {
    score,
    userCards,
    dealerCards,
    play,
    finished,
    resetGame,
    dealerScore,
    stay,
    handleDeal,
    scoreBoard,
    decks,
    setDecks,
  } = useGame();

  return (
    <div className="App">
      <Player
        player="Dealer"
        score={dealerScore}
        cards={dealerCards}
        isFinished={finished}
        isDealer
      />
      <Player player="You" score={score} cards={userCards} />

      <ActionBar
        player={userCards}
        dealer={dealerCards}
        finished={finished}
        handleDeal={handleDeal}
        stay={stay}
        resetGame={resetGame}
        play={play}
        decks={decks}
        setDecks={setDecks}
      />
      <ScoreBoard
        show={!!dealerCards.length}
        dealer={scoreBoard.dealer}
        player={scoreBoard.player}
      />
    </div>
  );
}
