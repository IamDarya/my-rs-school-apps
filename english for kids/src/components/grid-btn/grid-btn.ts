import '../header/main-page.scss';
import { BaseComponent } from '../base-component';
import { CardView } from '../card-view/card-view';
import { ImageCategoryModel } from '../image-category-models/image-category-models';
import { Game, playAudio } from '../game/game';
import correctPic from '../../assets/star-win.svg';
import failPic from '../../assets/star.svg';
import repeatPic from '../../assets/repeat.svg';
import endGameNoErrors from '../../assets/success.png';
import endGameWithErrors from '../../assets/failure.png';
import endGameNoErrorsAudio from '../../assets/success.mp3';
import endGameWithErrorsAudio from '../../assets/failure.mp3';
import { DatabaseDarya } from '../database/database';
import { Overlay } from './overlay';

export enum PlayMode {
  Train = 'Train',
  Play = 'Play',
}

export class GridBtn extends BaseComponent {
  dataBaseDarya: DatabaseDarya;

  overlay: Overlay;

  // train: string;

  categories: ImageCategoryModel[];

  themesBlock: HTMLElement;

  activeCategory: string | undefined;

  activeCategoryObj: ImageCategoryModel | undefined;

  divWithBtnToStartPlay: HTMLDivElement;

  btnToRepeatAudio: HTMLElement;

  btnToStartPlay: HTMLButtonElement;

  divWithFailCorrectSigns: HTMLElement;

  overlayContent: HTMLElement;

  game: Game;

  arrayOfCardDivs: CardView[];

  train: PlayMode;

  constructor(
    game: Game,
    dataBaseDarya: DatabaseDarya,
    overlay: Overlay,
  ) {
    super('div', ['grid-of-img-and-switch-btn-wrapper']);
    this.overlay = overlay;
    this.train = PlayMode.Train;
    this.themesBlock = document.createElement('div');
    this.divWithFailCorrectSigns = document.createElement('div');
    this.divWithBtnToStartPlay = document.createElement('div');
    this.btnToStartPlay = document.createElement('button');
    this.btnToRepeatAudio = document.createElement('button');
    this.overlayContent = document.createElement('div');
    this.categories = [];
    this.activeCategoryObj = undefined;
    this.activeCategory = undefined;
    this.game = game;
    this.arrayOfCardDivs = [];
    this.dataBaseDarya = dataBaseDarya;

    const playTrainSwitch = document.createElement('input');
    playTrainSwitch.classList.add('toggle');
    playTrainSwitch.type = 'checkbox';
    this.element.appendChild(playTrainSwitch);

    this.divWithFailCorrectSigns.classList.add('div-with-fail-correct-signs');
    this.element.appendChild(this.divWithFailCorrectSigns);

    playTrainSwitch.addEventListener('click', () => {
      if (this.train === PlayMode.Train) {
        this.train = PlayMode.Play;
        if (this.activeCategory !== undefined) {
          this.drawCategory(this.activeCategory);
        }
      } else {
        this.train = PlayMode.Train;
        if (this.activeCategory !== undefined) {
          this.drawCategory(this.activeCategory);
        }
        this.btnToRepeatAudio.classList.add('hidden');
        this.btnToStartPlay.classList.remove('hidden');
        this.divWithFailCorrectSigns.innerHTML = '';
      }
      this.themesBlock.classList.toggle('play-mode');
    });

    this.themesBlock.classList.add('themes-block');
    this.element.appendChild(this.themesBlock);

    this.divWithBtnToStartPlay.classList.add('div-with-btn-to-start-play');
    this.element.appendChild(this.divWithBtnToStartPlay);
    this.btnToStartPlay.innerText = 'Start Game';
    this.btnToStartPlay.classList.add('btn-to-start-play');
    this.divWithBtnToStartPlay.setAttribute('style', 'display: none;');
    this.divWithBtnToStartPlay.appendChild(this.btnToStartPlay);

    this.btnToStartPlay.addEventListener('click', () => {
      if (this.activeCategoryObj !== undefined) {
        this.btnToRepeatAudio = document.createElement('button');
        this.btnToStartPlay.classList.add('hidden');
        this.btnToRepeatAudio.classList.remove('hidden');

        this.btnToRepeatAudio.classList.add(
          'btn-to-repeat-audio',
          'btn-to-start-play',
        );
        this.btnToRepeatAudio.setAttribute(
          'style',
          `background-image: url('${repeatPic}');`,
        );
        this.divWithBtnToStartPlay.appendChild(this.btnToRepeatAudio);
        this.btnToRepeatAudio.addEventListener('click', () => {
          playAudio(this.game.currentAudio);
        });

        this.game.startGame(this.activeCategoryObj, this.arrayOfCardDivs);
        this.game.onUserAnswer((str) => {
          this.addCorrectFailSign(str);
        });
        this.game.onEndGame(() => {
          this.btnToRepeatAudio.classList.add('hidden');
          this.btnToStartPlay.classList.remove('hidden');
          this.divWithFailCorrectSigns.innerHTML = '';
          this.ShowPopUpEndGame();
        });
      }
    });

    this.overlayContent.classList.add('content');
    this.element.appendChild(this.overlayContent);
  }

  ShowPopUpEndGame(): void {
    this.overlayContent.innerText = '';
    const endGameNoErrorsAudioConvert = new Audio(endGameNoErrorsAudio);
    const endGameWithErrorsAudioConvert = new Audio(endGameWithErrorsAudio);
    if (this.game.amountOfErrors > 0) {
      this.overlayContent.setAttribute(
        'style',
        `background-image:url('${endGameWithErrors}');`,
      );
      this.overlayContent.innerText = `You made ${this.game.amountOfErrors} mistake(s). Train more.`;
      playAudio(endGameWithErrorsAudioConvert);
    } else {
      this.overlayContent.setAttribute(
        'style',
        `background-image:url('${endGameNoErrors}');`,
      );
      playAudio(endGameNoErrorsAudioConvert);
    }
    this.overlay.overlayON();
    this.overlayContent.classList.add('is-on');
    setTimeout(() => {
      this.overlayContent.classList.remove('is-on');
      this.overlay.overlayOFF();
    }, 5000);
    this.drawAllCategories();
  }

  drawAllCategories(): void {
    this.themesBlock.innerHTML = '';
    this.divWithFailCorrectSigns.innerHTML = '';
    this.activeCategory = undefined;
    this.activeCategoryObj = undefined;
    for (let i = 0; i < this.categories.length; i++) {
      const divWithTheme = new CardView(
        'Themes',
        this.categories[i].cardsContent[3],
        this.categories[i].category,
        this.dataBaseDarya,
      );
      this.themesBlock.appendChild(divWithTheme.element);
      divWithTheme.onClickTheme(() => {
        this.drawCategory(this.categories[i].category);
      });
    }
    this.divWithBtnToStartPlay.setAttribute('style', 'display: none;');
  }

  drawCategory(category: string): void {
    this.themesBlock.innerHTML = '';
    this.arrayOfCardDivs = [];
    this.activeCategoryObj = this.categories.find(
      (el) => el.category === category,
    );
    this.activeCategory = this.activeCategoryObj?.category;
    if (this.activeCategoryObj !== undefined) {
      for (let i = 0; i < this.activeCategoryObj?.cardsContent.length; i++) {
        const divWithWord = new CardView(
          this.train,
          this.activeCategoryObj.cardsContent[i],
          this.activeCategoryObj.category,
          this.dataBaseDarya,
        );
        this.arrayOfCardDivs.push(divWithWord);
        this.themesBlock.appendChild(divWithWord.element);
      }
    }
    if (this.train === 'Play') {
      this.divWithBtnToStartPlay.removeAttribute('style');
    } else {
      this.divWithBtnToStartPlay.setAttribute('style', 'display: none;');
    }
  }

  addCorrectFailSign(sign: string): void {
    const picCorrectFail = document.createElement('div');
    if (sign === 'Correct') {
      picCorrectFail.classList.add('picFailCorrect', 'correct');
      picCorrectFail.setAttribute(
        'style',
        `background-image:url('${correctPic}');`,
      );
      this.divWithFailCorrectSigns.appendChild(picCorrectFail);
    }
    if (sign === 'Fail') {
      picCorrectFail.classList.add('picFailCorrect', 'fail');
      picCorrectFail.setAttribute(
        'style',
        `background-image:url('${failPic}');`,
      );
      this.divWithFailCorrectSigns.appendChild(picCorrectFail);
    }
  }
}
