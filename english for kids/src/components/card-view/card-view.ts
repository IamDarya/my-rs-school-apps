import '../header/main-page.scss';
import picForFlip from '../../assets/share.png';
import { BaseComponent } from '../base-component';
import { Card } from '../image-category-models/card';
import { DatabaseIamDarya } from '../database/database';

export class CardView extends BaseComponent {
  databaseIamDarya: DatabaseIamDarya;

  cardState: string;

  cardObj: Card;

  category: string;

  callBacks: Function[];

  constructor(
    cardState: string,
    cardObj: Card,
    category: string,
    databaseIamDarya: DatabaseIamDarya,
  ) {
    super('div', ['one-theme-block', 'front']);
    this.callBacks = [];
    this.cardState = cardState;
    this.cardObj = cardObj;
    this.category = category;
    this.databaseIamDarya = databaseIamDarya;

    if (this.cardState === 'Train') {
      this.drawTrain();
    }

    if (this.cardState === 'Play') {
      this.drawPlay();
    }

    if (this.cardState === 'Themes') {
      this.drawThemes();
    }
  }

  drawPlay(): void {
    this.element.innerHTML = '';
    const audio = document.createElement('audio');
    audio.setAttribute('src', `${this.cardObj.audioSrc}`);
    this.element.classList.add('one-theme-block', 'front');
    this.element.removeAttribute('data-topic');
    this.element.setAttribute('data-topic', `${this.category}`);
    this.element.setAttribute(
      'style',
      `background-image:url('${this.cardObj.image}');`,
    );
    this.element.appendChild(audio);

    // this.element.addEventListener('click', (e: Event)=>{
    //   let clickOnCard = e.target as HTMLElement;
    // })
  }

  drawTrain(): void {
    this.element.innerHTML = '';
    const divWithPicToFlipCard = document.createElement('img');
    const back = document.createElement('div');
    const audio = document.createElement('audio');
    back.classList.add('back');
    back.innerText = `${this.cardObj.translation}`;
    audio.setAttribute('src', `${this.cardObj.audioSrc}`);
    back.setAttribute(
      'style',
      `background-image:url('${this.cardObj.image}');`,
    );
    back.removeAttribute('data-topic');
    back.setAttribute('data-topic', `${this.category}`);
    divWithPicToFlipCard.setAttribute('src', picForFlip);
    divWithPicToFlipCard.removeAttribute('data-topic');
    divWithPicToFlipCard.setAttribute('data-topic', `${this.category}`);
    divWithPicToFlipCard.classList.add('flip-pic');
    this.element.classList.add('one-theme-block', 'front');
    this.element.removeAttribute('data-topic');
    this.element.setAttribute('data-topic', `${this.category}`);
    this.element.setAttribute(
      'style',
      `background-image:url('${this.cardObj.image}');`,
    );
    this.element.innerHTML = `${this.cardObj.word}`;
    this.element.appendChild(divWithPicToFlipCard);
    this.element.appendChild(back);
    this.element.appendChild(audio);

    this.element.addEventListener('click', async (e: Event) => {
      const keyToWordInDB = this.category + this.cardObj.word + this.cardObj.translation;
      const currentCard = await this.databaseIamDarya.getWord(keyToWordInDB);
      if (currentCard.click !== undefined) {
        currentCard.click++;
        this.databaseIamDarya.update(currentCard);
      }

      const clickOnCard = e.target as HTMLElement;
      if (clickOnCard.classList.contains('back')) {
        this.playAudio(clickOnCard);
      } else {
        this.flippCard(clickOnCard);
      }
    });
  }

  drawThemes(): void {
    this.element.innerHTML = '';
    this.element.classList.add('one-theme-block', 'front');
    this.element.innerText = `${this.category}`;
    this.element.setAttribute('data-topic', `${this.category}`);
    this.element.setAttribute(
      'style',
      `background-image:url('${this.cardObj.image}');`,
    );
    this.element.addEventListener('click', () => {
      this.callBacks.forEach((el) => el());
    });
  }

  onClickTheme(callBack: Function): void {
    this.callBacks.push(callBack);
  }

  playAudio(clickOnCard: HTMLElement): void {
    const audio = clickOnCard.nextElementSibling as HTMLAudioElement;
    audio.play();
  }

  flippCard(selectedCardFlipPic: HTMLElement): void {
    const wholeCard = selectedCardFlipPic.parentElement;
    if (wholeCard !== null) {
      wholeCard.classList.add('flipp');
      wholeCard.addEventListener('mouseleave', () => {
        if (wholeCard !== null) {
          wholeCard.classList.remove('flipp');
        }
      });
    }
  }
}
