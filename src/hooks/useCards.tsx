/*
 * React hook for creating, shuffling and dealing cards
 */
import createDeck, { Card } from '../utils/cards';
import { useCallback, useEffect, useState } from 'react';

export default function useCards() {
  let total_cards: Card[] = [];
  const [decks, setDecks] = useState(8);
  for (let i = 1; i <= decks; i++) {
    total_cards = [...total_cards, ...createDeck()];
  }

  const [cards, setCards] = useState<Card[]>(total_cards);
  const [count, setCount] = useState<number>(cards.length);

  useEffect(() => {
    let new_cards: Card[] = [];
    for (let i = 1; i <= decks; i++) {
      new_cards = [...new_cards, ...createDeck()];
    }
    setCards(new_cards);
    setCount(new_cards.length);
  }, [decks]);

  const reset = useCallback(() => {
    const newDeck = createDeck();
    setCards(newDeck);
    setCount(newDeck.length - 1);
  }, []);

  const start = useCallback(() => {
    setCount(count - 4); // 2 cards for deal, 2 for player
  }, [count]);

  const deal = useCallback(() => {
    if (count <= 10) return reset();

    setCount(count - 1);
  }, [count, reset]);

  return {
    decks,
    setDecks,
    count,
    setCount,
    cards,
    setCards,
    deal,
    start,
  };
}
