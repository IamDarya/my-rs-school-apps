import './best-score.scss';
import { BaseComponent } from '../base-component';

export class BestScore extends BaseComponent {
  constructor() {
    super('div', ['app', 'best-score', 'hidden']);
    this.element.innerHTML = `
    <h2>Best players</h2>
    <ul>
      <li class="best-score-li">Nina Ivanova</li>
      <li class="best-score-li">Nina Ivanova</li>
      <li class="best-score-li">Nina Ivanova</li>
    </ul>`;
  }
}
