import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';

const FLIP_DELAY = 3000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private actiiveCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.element.classList.add('app');
    this.element.classList.add('main');
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.actiiveCard) {
      this.actiiveCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.actiiveCard.image !== card.image) {
      await delay(FLIP_DELAY);
      await Promise.all([this.actiiveCard.flipToBack(), card.flipToBack()]);
      // make card red
    }

    this.actiiveCard = undefined;
    this.isAnimation = false;
  }
}
