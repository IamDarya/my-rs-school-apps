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
    this.element.classList.add('hidden');
  }

  newGame(images: string[]): void {
    window.history.pushState(null, '', '/');

    this.element.classList.remove('hidden');
    document.getElementsByClassName('about')[0].classList.add('hidden');
    document.getElementsByClassName('game-setting')[0].classList.add('hidden');
    document.getElementsByClassName('best-score')[0].classList.add('hidden');
    document.getElementById('game-setting')?.classList.remove('active');
    document.getElementById('best-score')?.classList.remove('active');
    document.getElementById('about')?.classList.remove('active');
    document.getElementsByClassName('start-game-btn')[0].classList.add('hidden');
    document.getElementsByClassName('stop-game-btn')[0].classList.remove('hidden');
    this.cardsField.clear();

    const difficultySelect = document.getElementById("difficulty") as HTMLSelectElement;
    const result = difficultySelect.options[difficultySelect.selectedIndex].value;
    if(result === 'select' || result === 'piece-of-cake') {
      images.splice(0,5);
      document.getElementsByClassName('cards-field')[0].setAttribute("style", "width:57%;");
    }
    if(result === 'normal') {
      images.splice(0,3);
      document.getElementsByClassName('cards-field')[0].setAttribute("style", "width:57%;");
    }
    if(result === 'nightmare') {
      document.getElementsByClassName('cards-field')[0].setAttribute("style", "width:84%;");
    }
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
      this.actiiveCard.element.classList.add('wrong_card');
      card.element.classList.add('wrong_card');
    } else {
      this.actiiveCard.element.classList.remove('wrong_card');
      card.element.classList.remove('wrong_card');
      this.actiiveCard.element.classList.add('same_card');
      card.element.classList.add('same_card');
    }
    this.actiiveCard = undefined;
    this.isAnimation = false;

    if (this.cardsField.checkCards()) {
      document.getElementsByClassName('cover')[0].classList.remove('hidden');
      document.getElementsByClassName('pop-up-win')[0].classList.remove('hidden');
      document.getElementsByClassName('pop-up-win-h2')[0].innerHTML = `Congratulations! You successfully found all matches in ${document.getElementsByClassName('stopwatch')[0].textContent} minutes.`;
    }
  }
}
