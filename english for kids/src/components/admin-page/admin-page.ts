import '../header/main-page.scss';
import './admin.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../image-category-models/card';
import { DatabaseDarya } from '../database/database';

export class AdminPageCardView extends BaseComponent {
  dataBaseDarya: DatabaseDarya;

  cardState: string;

  cardObj: Card;

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

    this.drawThemesAdmin();
    this.createNewCategoryCard();
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
    this.element.addEventListener('click', () => {
      this.callBacks.forEach((el) => el());
    });
  }

  createNewCategoryCard():void {
    this.element.classList.add('one-theme-block-admin', 'add-card');
    const closeCard = document.createElement('button');
    closeCard.classList.add('close-card');
    closeCard.innerText = 'x';
    const y = document.createElement('span');
    y.innerText = `${this.category}`;
    this.element.appendChild(y);
    this.element.appendChild(closeCard);
    this.element.setAttribute('data-topic', `${this.category}`);
  }

  // drawTrainHardWords(hardWord: WordStatistic) {
  //   console.log(hardWord);
  // this.element.innerHTML = '';
  // const divWithPicToFlipCard = document.createElement('img');
  // const back = document.createElement('div');
  // this.audio = document.createElement('audio');
  // back.classList.add('back', 'hidden');
  // const y = document.createElement('span');
  // back.appendChild(y);
  // y.innerText = `${hardWord.translation}`;
  // const hardWordFromDB = this.dataBaseDarya.getWord(hardWord.id);
  // console.log(hardWordFromDB);
  // this.audio.setAttribute('src', `${this.cardObj.audioSrc}`);
  // back.setAttribute(
  //   'style',
  //   `background-image:url('${this.cardObj.image}');`,
  // );
  // back.removeAttribute('data-topic');
  // back.setAttribute('data-topic', `${this.category}`);
  // divWithPicToFlipCard.setAttribute('src', picForFlip);
  // divWithPicToFlipCard.removeAttribute('data-topic');
  // divWithPicToFlipCard.setAttribute('data-topic', `${this.category}`);
  // divWithPicToFlipCard.classList.add('flip-pic');
  // this.element.classList.add('one-theme-block', 'front');
  // this.element.removeAttribute('data-topic');
  // this.element.setAttribute('data-topic', `${this.category}`);
  // this.element.setAttribute(
  //   'style',
  //   `background-image:url('${this.cardObj.image}');`,
  // );
  // const x = document.createElement('span');
  // x.innerText = `${hardWord.word}`;
  // this.element.appendChild(x);
  // this.element.appendChild(divWithPicToFlipCard);
  // this.element.appendChild(back);
  // this.element.appendChild(this.audio);

  // divWithPicToFlipCard.addEventListener('click', async (e: Event) => {
  //   const clickOnCard = e.target as HTMLElement;
  //   const keyToWordInDB = this.category + this.cardObj.word + this.cardObj.translation;
  //   const currentCard = await this.dataBaseDarya.getWord(keyToWordInDB);
  //   if (currentCard.click !== undefined) {
  //     currentCard.click++;
  //     this.dataBaseDarya.update(currentCard);
  //     back.classList.remove('hidden');
  //     flippCard(clickOnCard);
  //   }
  // });

  // this.element.addEventListener('click', async (e: Event) => {
  //   const keyToWordInDB = this.category + this.cardObj.word + this.cardObj.translation;
  //   const currentCard = await this.dataBaseDarya.getWord(keyToWordInDB);
  //   if (currentCard.click !== undefined) {
  //     currentCard.click++;
  //     this.dataBaseDarya.update(currentCard);
  //   }

  //   const clickOnCard = e.target as HTMLElement;
  //   if (!clickOnCard.classList.contains('flip-pic')) {
  //     playAudio(this.audio);
  //   }
  // });
  // }

  // drawPlayHardWords() {

  // }

  onClickTheme(callBack: { (): void; (): void }): void {
    this.callBacks.push(callBack);
  }
}
