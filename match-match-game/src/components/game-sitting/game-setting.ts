import './game-setting.scss';
import { BaseComponent } from '../base-component';

export class Settings extends BaseComponent {
  constructor() {
    super('div', ['app', 'game-setting', 'hidden']);
    this.element.innerHTML = `
    <ul>
      <li class="game-setting-li">Game cards</li>
      <li class="game-setting-li">Difficulty</li>
    </ul>`;
  }
}
