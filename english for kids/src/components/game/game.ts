import { BaseComponent } from '../base-component';
import './game.scss';
import { CardView } from '../card-view/card-view';
import { ImageCategoryModel } from '../image-category-models/image-category-models';
import errorAud from '../../assets/error.mp3';
import correctAudio from '../../assets/correct.mp3';
import { DatabaseIamDarya } from '../database/database';

export class Game extends BaseComponent {
  databaseIamDarya: DatabaseIamDarya;

  cardView: CardView | undefined;

  allAudios: string[];

  currentAuodio: HTMLAudioElement;

  errorAudio: HTMLAudioElement;

  correctAudio: HTMLAudioElement;

  callBacks: ((str: string) => void)[];

  callBacksForEndGame: (() => void)[];

  amountOfErrors: number;

  constructor(databaseIamDarya: DatabaseIamDarya) {
    super();
    this.callBacks = [];
    this.callBacksForEndGame = [];
    this.allAudios = [];
    this.currentAuodio = new Audio();
    this.errorAudio = new Audio(errorAud);
    this.correctAudio = new Audio(correctAudio);
    this.amountOfErrors = 0;
    this.databaseIamDarya = databaseIamDarya;
  }

  async startGame(category: ImageCategoryModel, cardView: CardView[]): Promise<void> {
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
    this.playAudio(randomAudio);
    let currentRandomObj = categoryToFilter.filter(
      (x) => x.audioSrc === randomAudio.getAttribute('src'),
    );

    let keyToWordInDB = category.category
      + currentRandomObj[0].word
      + currentRandomObj[0].translation;
    let currentCard = await this.databaseIamDarya.getWord(keyToWordInDB);

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
            cardView = cardView.filter((card) => card !== el);

            this.callBacks.forEach((el) => el('Correct'));
            this.playAudio(this.correctAudio);

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
              this.playAudio(randomAudio);

              currentRandomObj = categoryToFilter.filter(
                (x) => x.audioSrc === randomAudio.getAttribute('src'),
              );
              keyToWordInDB = category.category
                + currentRandomObj[0].word
                + currentRandomObj[0].translation;
              currentCard = await this.databaseIamDarya.getWord(keyToWordInDB);

              if (currentCard.correct !== undefined) {
                currentCard.correct++;
                                this.databaseIamDarya.update(currentCard);
                currentCard.persOfErrors = currentCard.correct / (currentCard.correct + currentCard.wrong) * 100;
                               this.databaseIamDarya.update(currentCard);
                //this.allWords[i].correct / (this.allWords[i].correct + this.allWords[i].wrong)
              }
            }
          }
        } else if (cardView.indexOf(el) >= 0) {
          this.callBacks.forEach((elm) => elm('Fail'));

          this.playAudio(this.errorAudio);

          this.amountOfErrors++;

          if (currentCard.wrong !== undefined) {
            currentCard.wrong++;
                        this.databaseIamDarya.update(currentCard);
            currentCard.persOfErrors = currentCard.correct / (currentCard.correct + currentCard.wrong) * 100;
                       this.databaseIamDarya.update(currentCard);
            //this.allWords[i].correct / (this.allWords[i].correct + this.allWords[i].wrong)
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

  playAudio(audio: HTMLAudioElement): void {
    setTimeout(() => audio.play(), 1000);
  }

  onUserAnswer(callBack: (str: string) => void): void {
    this.callBacks.push(callBack);
  }

  onEndGame(callBacksForEndGame: () => void): void {
    this.callBacksForEndGame.push(callBacksForEndGame);
  }
}
