import { delay } from '../../shared/delay';
import { User } from '../antities/user';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { DatabaseIamDarya } from '../database/database';

const FLIP_DELAY = 3000;
let flipped = 0;
let flippedWrong = 0;
let userScore = 0;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private actiiveCard?: Card;

  private isAnimation = false;

  public activeUser!: User;

  private dataBaseIamDarya: DatabaseIamDarya;

  constructor(dataBaseIamDarya: DatabaseIamDarya) {
    super();
    this.cardsField = new CardsField();
    this.dataBaseIamDarya = dataBaseIamDarya;
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
    document
      .getElementsByClassName('start-game-btn')[0]
      .classList.add('hidden');
    document
      .getElementsByClassName('stop-game-btn')[0]
      .classList.remove('hidden');
    this.cardsField.clear();

    const difficultySelect = document.getElementById(
      'difficulty'
    ) as HTMLSelectElement;
    const result =
      difficultySelect.options[difficultySelect.selectedIndex].value;
    if (result === 'select' || result === 'piece-of-cake') {
      images.splice(0, 5);
      document
        .getElementsByClassName('cards-field')[0]
        .setAttribute('style', 'width:57%;');
    }
    if (result === 'normal') {
      images.splice(0, 3);
      document
        .getElementsByClassName('cards-field')[0]
        .setAttribute('style', 'width:57%;');
    }
    if (result === 'nightmare') {
      document
        .getElementsByClassName('cards-field')[0]
        .setAttribute('style', 'width:84%;');
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
      flipped++;
      this.actiiveCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.actiiveCard.image !== card.image) {
      flippedWrong++;
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
      // END OF THE GAME
      const userTime =
        document.getElementsByClassName('stopwatch')[0].textContent;
      const userTimeForFormula = userTime!.split(':');
      const sec = 60;
      const reducer = (accumulator: number, currentValue: number) =>
        accumulator + currentValue;
      const arrWithTime = userTimeForFormula.map((el) => parseInt(el, 10));
      arrWithTime[1] *= sec;
      arrWithTime[0] = arrWithTime[0] * sec * sec;

      const userTimeinSec = arrWithTime.reduce(reducer);
      userScore = (flipped - flippedWrong) * 100 - userTimeinSec * 10;

      this.activeUser.score = userScore;
      await this.dataBaseIamDarya.update(this.activeUser);

      document.getElementsByClassName('cover')[0].classList.remove('hidden');
      document
        .getElementsByClassName('pop-up-win')[0]
        .classList.remove('hidden');
      document.getElementsByClassName('pop-up-win-h2')[0].innerHTML = `
      Congratulations! You successfully found all matches in ${userTime} minutes. Your score is ${userScore}! Great result.`;
    }
  }
}
