import '../../header/main-page.scss';
import '../admin.scss';
import { BaseComponent } from '../../base-component';
import { Card } from '../../image-category-models/card';
import { DatabaseDarya } from '../../database/database';

export class AdminPageCardView extends BaseComponent {
  dataBaseDarya: DatabaseDarya;

  cardObj: Card;

  cardState: string;

  category: string;

  callBacks: (() => void)[];

  audio: HTMLAudioElement;

  constructor(
    cardState: string,
    cardObj: Card,
    category: string,
    dataBaseDarya: DatabaseDarya,
  ) {
    super('div', ['one-theme-block', 'front']);
    this.callBacks = [];
    this.cardState = cardState;
    this.cardObj = cardObj;
    this.category = category;
    this.dataBaseDarya = dataBaseDarya;
    this.audio = new Audio();

    if (this.cardState === 'OneTheme') {
      this.drawOneTheme();
    }

    if (this.cardState === 'OneWord') {
      // this.drawOneWord();
    }

    if (this.cardState === 'Themes') {
      this.drawThemesAdmin();
    }
  }

  drawThemesAdmin(): void {
    this.element.innerHTML = '';
    this.element.classList.add('one-theme-block-admin');
    const closeCard = document.createElement('button');
    closeCard.classList.add('close-card');
    closeCard.innerText = 'x';
    const y = document.createElement('span');
    y.innerText = `${this.category}`;
    this.element.appendChild(y);
    this.element.appendChild(closeCard);
    this.element.setAttribute('data-topic', `${this.category}`);
    const amountOfWords = document.createElement('p');
    amountOfWords.innerText = `WORDS: ${this.category.length}`;
    this.element.appendChild(amountOfWords);
    const updateBtn = document.createElement('button');
    updateBtn.innerText = 'Update';
    updateBtn.classList.add('update-btn');
    const addWordBtn = document.createElement('button');
    addWordBtn.innerText = 'Add word';
    addWordBtn.classList.add('add-word-btn');
    this.element.appendChild(updateBtn);
    this.element.appendChild(addWordBtn);
    addWordBtn.addEventListener('click', () => {
      this.callBacks.forEach((el) => el());
    });
    updateBtn.addEventListener('click', () => {
      this.callBacks.forEach((el) => el());
    });
  }

  drawOneTheme(): void {
    this.element.innerHTML = '';
    const closeCard = document.createElement('button');
    this.element.appendChild(closeCard);
    closeCard.classList.add('close-card');
    closeCard.innerText = 'x';
    this.audio = document.createElement('audio');
    const y = document.createElement('div');
    y.classList.add('card-content');
    y.innerHTML = `<p>Word: ${this.cardObj.word}</p>
    <p>Translation: ${this.cardObj.translation}</p>
    <p>Sound: ${this.cardObj.audioSrc}</p>
    <p>Image:</p>
    `;
    this.element.appendChild(y);
    this.audio.setAttribute('src', `${this.cardObj.audioSrc}`);
    this.element.classList.add('one-theme-block-admin', 'one-theme');
    this.element.removeAttribute('data-topic');
    this.element.setAttribute('data-topic', `${this.category}`);
    const picture = document.createElement('div');
    picture.classList.add('picture');
    this.element.appendChild(picture);
    picture.setAttribute(
      'style',
      `background-image:url('${this.cardObj.image}');`,
    );

    this.element.appendChild(this.audio);

    const cnangeBtn = document.createElement('button');
    cnangeBtn.innerText = 'Change';
    cnangeBtn.classList.add('change-btn');
    this.element.appendChild(cnangeBtn);

    this.element.addEventListener('click', async (e: Event) => {
     // const keyToWordInDB = this.category + this.cardObj.word + this.cardObj.translation;

      const clickOnCard = e.target as HTMLElement;
      if (!clickOnCard.classList.contains('flip-pic')) {
        // playAudio(this.audio);
      }
    });
  }

  onClickTheme(callBack: { (): void; (): void }): void {
    this.callBacks.push(callBack);
  }
}
