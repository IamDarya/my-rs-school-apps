import '../header/main-page.scss';
import { BaseComponent } from '../base-component';
import { CardView } from "../card-view/card-view";
import { ImageCategoryModel } from '../image-category-models/image-category-models';
import { Game } from '../game/game';
import { Card } from '../image-category-models/card';
import correctPic from "../../assets/star-win.svg"
import failPic from "../../assets/star.svg"
import repeatPic from "../../assets/repeat.svg";
import endGameNoErrors from "../../assets/success.jpg";
import endGameWithErrors from "../../assets/failure.jpg";
import endGameNoErrorsAudio from "../../assets/success.mp3";
import endGameWithErrorsAudio from "../../assets/failure.mp3";
import { DatabaseIamDarya } from '../database/database';

export class GridBtn extends BaseComponent {

  dataBaseIamDarya: DatabaseIamDarya;

  train: String;

  categories: ImageCategoryModel[];

  themesBlock: HTMLElement;

  activeCategory: String|undefined;

  activeCategoryObj: ImageCategoryModel | undefined;

  divWithBtnToStartPlay: HTMLDivElement;

  btnToStartPlay: HTMLButtonElement;

  divWithFailCorrectSigns: HTMLElement;

  overlayForEndGame: HTMLElement;

  overlayContent: HTMLElement;

  game: Game;

  arrayOfCardDivs: CardView[];

  constructor(game: Game, dataBaseIamDarya: DatabaseIamDarya){
    super('div', ['grid-of-img-and-switch-btn-wrapper']);
    this.train = "Train";
    this.themesBlock = document.createElement('div');
    this.divWithFailCorrectSigns = document.createElement('div');
    this.divWithBtnToStartPlay = document.createElement('div');
    this.btnToStartPlay = document.createElement('button');
    this.overlayForEndGame = document.createElement('div');
    this.overlayContent = document.createElement('div');
    this.categories = [];
    this.activeCategoryObj = undefined;
    this.activeCategory;
    this.game = game;
    this.arrayOfCardDivs = [];
    this.dataBaseIamDarya = dataBaseIamDarya;

    const playTrainSwitch = document.createElement('input');
    playTrainSwitch.classList.add('toggle');
    playTrainSwitch.type = 'checkbox';
    this.element.appendChild(playTrainSwitch);

    this.divWithFailCorrectSigns.classList.add('div-with-fail-correct-signs');
    this.element.appendChild(this.divWithFailCorrectSigns);

    playTrainSwitch.addEventListener('click', () => {
      if(this.train === "Train") {
        this.train = "Play";
        if(this.activeCategory !== undefined) {
          this.drawCategory(this.activeCategory);
        }
      }
      else {
        this.train = "Train";
        if(this.activeCategory !== undefined) {
          this.drawCategory(this.activeCategory);
        }
      }
      this.themesBlock.classList.toggle('play-mode');
    })

    this.themesBlock.classList.add('themes-block');
    this.element.appendChild(this.themesBlock);

    this.divWithBtnToStartPlay.classList.add('div-with-btn-to-start-play');
    this.element.appendChild(this.divWithBtnToStartPlay);
    this.btnToStartPlay.innerText = 'Start Game';
    this.btnToStartPlay.classList.add('btn-to-start-play');
    this.divWithBtnToStartPlay.setAttribute('style', 'display: none;');
    this.divWithBtnToStartPlay.appendChild(this.btnToStartPlay);

    this.btnToStartPlay.addEventListener('click', ()=>{
      if(this.activeCategoryObj !== undefined) {
        let btnToRepeatAudio = document.createElement('button');
        this.btnToStartPlay.classList.add('hidden');
        btnToRepeatAudio.classList.remove('hidden');


        btnToRepeatAudio.classList.add('btn-to-repeat-audio', 'btn-to-start-play');
        btnToRepeatAudio.setAttribute('style', `background-image: url('${repeatPic}');`);
        this.divWithBtnToStartPlay.appendChild(btnToRepeatAudio);
        btnToRepeatAudio.addEventListener('click', ()=>{
          this.game.playAudio(this.game.currentAuodio);
        });

        this.game.startGame(this.activeCategoryObj, this.arrayOfCardDivs);
        this.game.onUserAnswer((str)=>{this.addCorrectFailsign(str)});
        this.game.onEndGame(()=>{
          btnToRepeatAudio.classList.add('hidden');
          this.btnToStartPlay.classList.remove('hidden');
          this.divWithFailCorrectSigns.innerHTML = ``;
          this.ShowPopUpEndGame()});
      };
    })

    this.overlayForEndGame.classList.add('overlay','hidden');
    this.overlayContent.classList.add('content');
    this.overlayForEndGame.appendChild(this.overlayContent);
    this.element.appendChild(this.overlayForEndGame);
  }

  ShowPopUpEndGame(){
    let endGameNoErrorsAudioConvert = new Audio(endGameNoErrorsAudio);
    let endGameWithErrorsAudioConvert = new Audio(endGameWithErrorsAudio);
    if(this.game.amountOfErrors > 0){
      this.overlayContent.setAttribute('style', `background-image:url('${endGameWithErrors}');`);
      this.overlayContent.innerText = `You made ${this.game.amountOfErrors} mistake(s). Train more.`;
      this.game.playAudio(endGameWithErrorsAudioConvert);
    }
    else{
      this.overlayContent.setAttribute('style', `background-image:url('${endGameNoErrors}');`);
      this.game.playAudio(endGameNoErrorsAudioConvert);
    }
    this.overlayForEndGame.classList.add('is-on');
    this.overlayForEndGame.classList.remove('hidden');
    setTimeout(() => {
      this.overlayForEndGame.classList.remove('is-on');
      this.overlayForEndGame.classList.add('hidden');
    }, 5000);
    this.drawAllCategories();
  }

  drawAllCategories(){
    this.themesBlock.innerHTML = ``;
    this.divWithFailCorrectSigns.innerHTML = ``;
    this.activeCategory = undefined;
    this.activeCategoryObj = undefined;
    for(let i = 0; i < this.categories.length; i++) {
      const divWithTheme = new CardView('Themes', this.categories[i].cardsContent[3], this.categories[i].category, this.dataBaseIamDarya);
      this.themesBlock.appendChild(divWithTheme.element);
      divWithTheme.onClickTheme(()=>{
        this.drawCategory(this.categories[i].category);
      });
    }
    this.divWithBtnToStartPlay.setAttribute('style', 'display: none;');
  }

  drawCategory(category: String){
    this.themesBlock.innerHTML = ``;
    this.arrayOfCardDivs = [];
    this.activeCategoryObj = this.categories.find(el => el.category === category);
    this.activeCategory = this.activeCategoryObj?.category;
    if(this.activeCategoryObj !== undefined) {
      for(let i = 0; i < this.activeCategoryObj?.cardsContent.length; i++) {
        const divWithWord = new CardView(this.train, this.activeCategoryObj.cardsContent[i], this.activeCategoryObj.category, this.dataBaseIamDarya);
        this.arrayOfCardDivs.push(divWithWord);
        this.themesBlock.appendChild(divWithWord.element);
      }
    }
    if(this.train === 'Play') {
      this.divWithBtnToStartPlay.removeAttribute('style');
    }
    else{
      this.divWithBtnToStartPlay.setAttribute('style', 'display: none;');
    }
  }


  addCorrectFailsign(sign: String){
    let picCorrectFail = document.createElement('div');
    if(sign === 'Correct'){
      picCorrectFail.classList.add('picFailCorrect', 'correct');
      picCorrectFail.setAttribute('style', `background-image:url('${correctPic}');`);
      this.divWithFailCorrectSigns.appendChild(picCorrectFail);
    }
    if(sign === 'Fail'){
      picCorrectFail.classList.add('picFailCorrect', 'fail');
      picCorrectFail.setAttribute('style', `background-image:url('${failPic}');`);
      this.divWithFailCorrectSigns.appendChild(picCorrectFail);
    }
}
}
