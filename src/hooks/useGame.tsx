/*
 * React hook for handling BlackJack game logic
 */
import { useCallback, useState } from 'react';
import { Card } from '../utils/cards';
import useCards from './useCards';

type ScoreBoard = {
  dealer: number;
  player: number;
};

export default function useGame(): {
  finished: boolean;
  userCards: Card[];
  dealerCards: Card[];
  score: number;
  dealerScore: number;
  decks: number;
  setDecks: (n: number) => void;
  scoreBoard: ScoreBoard;
  handleDeal: () => void;
  stay: () => void;
  play: () => void;
  resetGame: () => void;
} {
  const { cards, count, deal, start, setCount, decks, setDecks } = useCards();
  const [userCards, setUserCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard>({
    dealer: 0,
    player: 0,
  });
  const [score, setScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const play = useCallback(() => {
    // inialize player cards
    const player = [cards[count - 1], cards[count - 3]];
    const pScore = cards[count - 1].value + cards[count - 3].value;
    setScore(pScore);
    // inialize dealer cards
    const dealer = [cards[count - 2], cards[count - 4]];
    let dScore = cards[count - 2].value + cards[count - 4].value;
    if (dealer.find((c) => c.value === 1)) {
      dScore = dScore + 10; // First ace dealer gets is worth 11, next is worth only 1
    }
    setDealerScore(dScore);
    setUserCards(player);
    setDealerCards(dealer);
    start();
    // Player gets Blackjack on first deal
    if (
      player.find((c) => c.value === 10) &&
      player.find((c) => c.value === 1)
    ) {
      setScore(21);
      setTimeout(() => {
        alert('You got blackjack! You win!');
        setScoreBoard({ ...scoreBoard, player: scoreBoard.player + 1 });
        setFinished(true);
      }, 500);
      return;
    }
    // Dealer gets Blackjack on first deal
    if (
      dealer.find((c) => c.value === 10) &&
      dealer.find((c) => c.value === 1)
    ) {
      setDealerScore(21);
      setTimeout(() => {
        alert('Dealer got blackjack! You lose! :(');
        setScoreBoard({ ...scoreBoard, dealer: scoreBoard.dealer + 1 });
        setFinished(true);
      }, 500);
      return;
    }
  }, [cards, count, scoreBoard, start]);

  const resetGame = useCallback(() => {
    setDealerCards([]);
    setUserCards([]);
    setScore(0);
    setDealerScore(0);
    setFinished(false);
    play();
  }, [play]);

  const alertResults = useCallback(
    ($score: number, userScoreCount: number) => {
      if ($score > 21) {
        alert('Dealer went over... You win!');
        setScoreBoard({ ...scoreBoard, player: scoreBoard.player + 1 });
      }
      if ($score >= 17 && $score <= 21) {
        if (userScoreCount < $score) {
          alert('Sorry... Dealer won.');
          setScoreBoard({ ...scoreBoard, dealer: scoreBoard.dealer + 1 });
        }
        if (userScoreCount === $score) {
          alert("Well.. It's a push.");
        }
        if (userScoreCount > $score) {
          alert('Congrats you win!!');
          setScoreBoard({ ...scoreBoard, player: scoreBoard.player + 1 });
        }
      }
    },
    [scoreBoard],
  );

  const autoPlayDealer = (): {
    score: number;
    userScoreCount: number;
    count: number;
    index: number;
    dealerCards: Card[];
  } => {
    let dScore = Number(dealerScore);
    let index = Number(1);
    let c: Card[] = dealerCards;
    // deal cards until dealer cant play anymore
    while (dScore < 17) {
      c = [...c, cards[count - index]];
      const newScore =
        dScore +
        (!!c.find((c) => c.value === 1) && cards[count - index].value === 1
          ? cards[count - index].value
          : cards[count - index].value === 1
          ? 11
          : cards[count - index].value);
      index++;
      dScore = newScore;
      if (dScore >= 17) break;
    }
    const aces = userCards.filter((c) => c.value === 1);
    let userScoreCount: number = score;
    if (aces.length && userCards.length === 2) {
      userScoreCount = userScoreCount + 10;
    }
    return { score: dScore, userScoreCount, count, index, dealerCards: c };
  };

  const stay = () => {
    const { score, userScoreCount, index, dealerCards } = autoPlayDealer();
    setCount(count - index); // update count in correct order of cards drawn
    setDealerScore(score);
    setDealerCards(dealerCards);
    setFinished(true);
    setTimeout(() => {
      alertResults(score, userScoreCount);
    }, 1000);
  };

  const handleDeal = () => {
    setUserCards([...userCards, cards[count - 1]]);
    // handle Ace score logic
    const newScore =
      score +
      (cards[count - 1].value === 1 && score < 11
        ? 11
        : cards[count - 1].value);
    setScore(newScore);
    if (newScore > 21) {
      setTimeout(() => {
        alert('Oops you went over. Dealer wins.');
        setScoreBoard({ ...scoreBoard, dealer: scoreBoard.dealer + 1 });
        setDealerCards([]);
        setUserCards([]);
        setScore(0);
        setDealerScore(0);
        resetGame();
      }, 250);
    } else {
      deal();
    }
  };

  return {
    finished,
    userCards,
    dealerCards,
    score,
    dealerScore,
    decks,
    setDecks,
    handleDeal,
    scoreBoard,
    stay,
    play,
    resetGame,
  };
}
