import React from 'react';

import { render, screen } from '@testing-library/react';
import ScoreBoard from './';

describe('ScoreBoard', () => {
  test('renders scoreboard', () => {
    render(<ScoreBoard show={true} dealer={0} player={0} />);
    expect(screen.getByText('Scoreboard'));
    expect(screen.getByText('Dealer: 0'));
    expect(screen.getByText('Player: 0'));
  });
});
