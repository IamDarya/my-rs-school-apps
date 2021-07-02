import { BaseComponent } from '../base-component';
import './overlay.scss';

export class Overlay extends BaseComponent {
  // overlayForEndGame: HTMLElement;

  constructor() {
    super('div', ['overlay', 'hidden']);

    // this.overlayForEndGame = overlayForEndGame;
  }

  overlayON(): void {
    this.element.classList.add('is-on');
    this.element.classList.remove('hidden');
  }

  overlayOFF(): void {
    this.element.classList.remove('is-on');
    this.element.classList.add('hidden');
  }
}
