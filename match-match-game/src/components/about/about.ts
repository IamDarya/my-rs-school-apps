import './about.scss';
import { BaseComponent } from '../base-component';

export class About extends BaseComponent {
  constructor() {
    super('div', ['app', 'about', 'hidden']);
    this.element.innerHTML = `
    <h2>How to play?</h2>
    <ul>
      <li class="how-to-play-li">Register new player in game.</li>
      <li class="how-to-play-li">Configure your game settings.</li>
      <li class="how-to-play-li">Start you new game! Remember card positions and match it before times up.</li>
    </ul>`;
  }
}
