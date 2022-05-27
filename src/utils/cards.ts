export type Card = {
  id: number;
  type: string;
  value: number;
};

export type Deck = {
  clubs: Card[];
  hearts: Card[];
  diamonds: Card[];
  spades: Card[];
};

const createEmptyDeck = (): Deck => {
  return {
    clubs: [],
    hearts: [],
    diamonds: [],
    spades: [],
  };
};

const createSuit = (s: string): Card[] => {
  const cards: Card[] = [];
  for (let i = 1; i < 11; i++) {
    cards.push({
      id: i,
      type: s,
      value: i,
    });
  }
  const jack = { id: 11, value: 10, type: s };
  const queen = { id: 12, value: 10, type: s };
  const king = { id: 13, value: 10, type: s };
  cards.push(jack, queen, king);
  return cards;
};
const randomize = (c: Card[]): Card[] => {
  const cards = [...c];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
  return cards;
};

const createDeck = (): Card[] => {
  const deck = createEmptyDeck();
  Object.keys(deck).forEach((suit) => {
    deck[suit as keyof Deck] = createSuit(suit);
  });
  const cards = [
    ...deck.clubs,
    ...deck.diamonds,
    ...deck.hearts,
    ...deck.spades,
  ];
  return randomize(cards);
};

export default createDeck;
