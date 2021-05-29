import './about.scss';
import { BaseComponent } from '../base-component';
import jpg from '../../assets/fd.jpg';
import png from '../../assets/sett.png';
import game from '../../assets/game.jpg';

export class About extends BaseComponent {
  constructor() {
    super('div', ['app', 'about', 'hidden']);
    this.element.innerHTML = `
    <div class="how-to-play">
    <h2>How to play?</h2>
    <ul class="how-to-play-ul">
      <li class="how-to-play-li">1.Register a new player in the game. <img src="${jpg}" alt=""></li>
      <li class="how-to-play-li">2.Select your game settings.<img src="${png}" alt=""></li>
      <li class="how-to-play-li">3.Start your new game! You have 10 seconds to memorize the positions of cards before they turn over and match them as quickly as possible.
      <img src="${game}" alt=""></li>
    </ul>`;
  }
}
