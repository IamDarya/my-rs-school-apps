import '../header/main-page.scss';
import picForFlip from '../../assets/share.png';
import { BaseComponent } from '../base-component';
import { Card } from '../image-category-models/card';
import { DatabaseDarya } from '../database/database';
import { WordStatistic } from '../database/word-statist';

function playAudio(aud: HTMLAudioElement): void {
  aud.play();
}

function flippCard(selectedCardFlipPic: HTMLElement): void {
  const wholeCard = selectedCardFlipPic.parentElement;

  if (wholeCard !== null) {
    wholeCard.classList.add('flipp');
    wholeCard.addEventListener('mouseleave', () => {
      if (wholeCard !== null) {
        wholeCard.classList.remove('flipp');
      }
      setTimeout(() => wholeCard.getElementsByClassName('back')[0].classList.add('hidden'), 500);
    });
  }
}

export class CardView extends BaseComponent {
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
    this.audio = document.createElement('audio');
    this.audio.setAttribute('src', `${this.cardObj.audioSrc}`);
    this.element.classList.add('one-theme-block', 'front');
    this.element.removeAttribute('data-topic');
    this.element.setAttribute('data-topic', `${this.category}`);
    this.element.setAttribute(
      'style',
      `background-image:url('${this.cardObj.image}');`,
    );
    this.element.appendChild(this.audio);

    // this.element.addEventListener('click', (e: Event)=>{
    //   let clickOnCard = e.target as HTMLElement;
    // })
  }

  drawTrain(): void {
    this.element.innerHTML = '';
    const divWithPicToFlipCard = document.createElement('img');
    const back = document.createElement('div');
    this.audio = document.createElement('audio');
    back.classList.add('back', 'hidden');
    const y = document.createElement('span');
    back.appendChild(y);
    y.innerText = `${this.cardObj.translation}`;
    this.audio.setAttribute('src', `${this.cardObj.audioSrc}`);
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
    const x = document.createElement('span');
    x.innerText = `${this.cardObj.word}`;
    this.element.appendChild(x);
    // this.element.innerHTML = `${this.cardObj.word}`;
    this.element.appendChild(divWithPicToFlipCard);
    this.element.appendChild(back);
    this.element.appendChild(this.audio);

    divWithPicToFlipCard.addEventListener('click', async (e: Event) => {
      const clickOnCard = e.target as HTMLElement;
      const keyToWordInDB = this.category + this.cardObj.word + this.cardObj.translation;
      const currentCard = await this.dataBaseDarya.getWord(keyToWordInDB);
      if (currentCard.click !== undefined) {
        currentCard.click++;
        this.dataBaseDarya.update(currentCard);
        back.classList.remove('hidden');
        flippCard(clickOnCard);
      }
    });

    this.element.addEventListener('click', async (e: Event) => {
      const keyToWordInDB = this.category + this.cardObj.word + this.cardObj.translation;
      const currentCard = await this.dataBaseDarya.getWord(keyToWordInDB);
      if (currentCard.click !== undefined) {
        currentCard.click++;
        this.dataBaseDarya.update(currentCard);
      }

      const clickOnCard = e.target as HTMLElement;
      if (!clickOnCard.classList.contains('flip-pic')) {
        playAudio(this.audio);
      }
    });
  }

  drawThemes(): void {
    this.element.innerHTML = '';
    this.element.classList.add('one-theme-block', 'front');
    // this.element.innerText = `${this.category}`;
    const y = document.createElement('span');
    y.innerText = `${this.category}`;
    this.element.appendChild(y);
    this.element.setAttribute('data-topic', `${this.category}`);
    this.element.setAttribute(
      'style',
      `background-image:url('${this.cardObj.image}');`,
    );
    this.element.addEventListener('click', () => {
      this.callBacks.forEach((el) => el());
    });
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
