import './header.scss';
import { BaseComponent } from '../base-component';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.element.innerHTML = `
  <header id="header">
    <div class="logo"><div class="logo-pic"></div><p>Match<br>Match<br>Game</p>
    </div>
    <div>
      <ul>
        <li><button type="button" class="btn">About Game</button></li>
        <li><button type="button" class="btn">Best Score</button></li>
        <li><button type="button" class="btn">Game Setting</button></li>
      </ul>
    </div>
    <div>
      <button type="button" class="regictration-btn btn">Register New Player</button>
    </div>
  </header>`;
  }
}
