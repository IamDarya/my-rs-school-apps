import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 10;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  private timer!: NodeJS.Timeout;

  private showTime!: NodeJS.Timeout;

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = `
    <div class="stopwatch">00:00:00</div>
    `;
  }

  checkCards(): boolean {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].isFlipped) {
        return false;
      }
    }
    clearInterval(this.timer);
    return true;
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    clearTimeout(this.showTime);
    this.showTime = setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);

    const watch = document.getElementsByClassName('stopwatch')[0];
    let millisecound = 0;

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      millisecound += 10;

      const dateTimer = new Date(millisecound);

      watch.innerHTML = `${`0${dateTimer.getUTCHours()}`.slice(
        -2,
      )}:${`0${dateTimer.getUTCMinutes()}`.slice(
        -2,
      )}:${`0${dateTimer.getUTCSeconds()}`.slice(-2)}`;
    }, 10);
  }
}
