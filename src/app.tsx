import React, { ReactElement } from 'react';
import { TopNav } from './components/top-nav/top-nav.component';
import { GameOfLife } from './components/game-of-life/game-of-life.component';

export const App = (): ReactElement => {
  return (
    <div>
        <TopNav />
        <GameOfLife />
    </div>
  );
}

