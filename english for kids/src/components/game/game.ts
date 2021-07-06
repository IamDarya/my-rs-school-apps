import { BaseComponent } from '../base-component';
import './game.scss';
import { CardView } from '../card-view/card-view';
import { ImageCategoryModel } from '../image-category-models/image-category-models';
import errorAud from '../../assets/error.mp3';
import correctAudio from '../../assets/correct.mp3';
import { DatabaseDarya } from '../database/database';

export function playAudio(audio: HTMLAudioElement): void {
  setTimeout(() => audio.play(), 1000);
}

export class Game extends BaseComponent {
  dataBaseDarya: DatabaseDarya;

  cardView: CardView | undefined;

  allAudios: string[];

  currentAuodio: HTMLAudioElement;

  errorAudio: HTMLAudioElement;

  correctAudio: HTMLAudioElement;

  callBacks: ((str: string) => void)[];

  callBacksForEndGame: (() => void)[];

  amountOfErrors: number;

  constructor(dataBaseDarya: DatabaseDarya) {
    super();
    this.callBacks = [];
    this.callBacksForEndGame = [];
    this.allAudios = [];
    this.currentAuodio = new Audio();
    this.errorAudio = new Audio(errorAud);
    this.correctAudio = new Audio(correctAudio);
    this.amountOfErrors = 0;
    this.dataBaseDarya = dataBaseDarya;
  }

  async startGame(
    category: ImageCategoryModel,
    cardView: CardView[],
  ): Promise<void> {
    this.callBacks = [];
    this.callBacksForEndGame = [];
    this.amountOfErrors = 0;
    let categoryToFilter = [...category.cardsContent];

    let randomAudio = new Audio(
      `${
        categoryToFilter[Math.floor(Math.random() * categoryToFilter.length)]
          .audioSrc
      }`,
    );
    playAudio(randomAudio);
    let currentRandomObj = categoryToFilter.filter(
      (x) => x.audioSrc === randomAudio.getAttribute('src'),
    );

    let keyToWordInDB = category.category
      + currentRandomObj[0].word
      + currentRandomObj[0].translation;
    let currentCard = await this.dataBaseDarya.getWord(keyToWordInDB);

    this.currentAuodio = randomAudio;

    cardView.forEach((el) => {
      el.element.addEventListener('click', async () => {
        if (
          el.element.firstElementChild?.getAttribute('src')
          === randomAudio.getAttribute('src')
        ) {
          if (randomAudio.getAttribute('src') !== null) {
            categoryToFilter = categoryToFilter.filter(
              (aud) => aud.audioSrc !== randomAudio.getAttribute('src'),
            );

            el.element.classList.add('inactive-card');
            cardView = cardView.filter((card) => card !== el); // eslint-disable-line no-param-reassign

            this.callBacks.forEach((elm) => elm('Correct'));
            playAudio(this.correctAudio);

            if (
              categoryToFilter[
                Math.floor(Math.random() * categoryToFilter.length)
              ] !== undefined
            ) {
              randomAudio = new Audio(
                `${
                  categoryToFilter[
                    Math.floor(Math.random() * categoryToFilter.length)
                  ].audioSrc
                }`,
              );
              this.currentAuodio = randomAudio;
              playAudio(randomAudio);

              currentRandomObj = categoryToFilter.filter(
                (x) => x.audioSrc === randomAudio.getAttribute('src'),
              );
              keyToWordInDB = category.category
                + currentRandomObj[0].word
                + currentRandomObj[0].translation;
              currentCard = await this.dataBaseDarya.getWord(keyToWordInDB);

              if (currentCard.correct !== undefined) {
                currentCard.correct++;
                this.dataBaseDarya.update(currentCard);
                currentCard.persOfErrors = (currentCard.correct
                    / (currentCard.correct + currentCard.wrong))
                  * 100;
                this.dataBaseDarya.update(currentCard);
              }
            }
          }
        } else if (cardView.indexOf(el) >= 0) {
          this.callBacks.forEach((elm) => elm('Fail'));

          playAudio(this.errorAudio);

          this.amountOfErrors++;

          if (currentCard.wrong !== undefined) {
            currentCard.wrong++;
            this.dataBaseDarya.update(currentCard);
            currentCard.persOfErrors = (currentCard.correct
                / (currentCard.correct + currentCard.wrong))
              * 100;
            this.dataBaseDarya.update(currentCard);
          }
        }
        if (cardView.length === 0) {
          this.endGame();
        }
      });
    });
  }

  endGame(): void {
    this.callBacksForEndGame.forEach((el) => el());
  }

  onUserAnswer(callBack: (str: string) => void): void {
    this.callBacks.push(callBack);
  }

  onEndGame(callBacksForEndGame: () => void): void {
    this.callBacksForEndGame.push(callBacksForEndGame);
  }
}
