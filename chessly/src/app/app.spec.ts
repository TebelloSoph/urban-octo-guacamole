import { provideZonelessChangeDetection } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { App } from './app';

describe('App', () => {
  let spectator: Spectator<App>;
  const createComponent = createComponentFactory({
    component: App,
    providers: [provideZonelessChangeDetection()]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render title', () => {
    const h1 = spectator.query('h1');
    expect(h1?.textContent).toContain('chessly');
  });

  it('should render the board component', () => {
    const boardComponent = spectator.query('app-board');
    expect(boardComponent).toBeTruthy();
  });
});
