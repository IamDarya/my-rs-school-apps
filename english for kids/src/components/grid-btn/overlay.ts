import { BaseComponent } from '../base-component';
import './overlay.scss';

export class Overlay extends BaseComponent {
  // overlayForEndGame: HTMLElement;

  constructor() {
    super('div', ['overlay', 'hidden']);

    // this.overlayForEndGame = overlayForEndGame;
  }

  overlayON() {
    this.element.classList.add('is-on');
    this.element.classList.remove('hidden');
  }

  overlayOFF() {
    this.element.classList.remove('is-on');
    this.element.classList.add('hidden');
  }
}
