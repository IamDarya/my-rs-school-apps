import '../header/main-page.scss';
import { BaseComponent } from '../base-component';
import { CardView } from "../card-view/card-view";
import { ImageCategoryModel } from '../image-category-models/image-category-models';
import { Game } from '../game/game';
import { Card } from '../image-category-models/card';
import correctPic from "../../assets/star-win.svg"
import failPic from "../../assets/star.svg"

export class GridBtn extends BaseComponent {

  train: String;

  categories: ImageCategoryModel[];

  themesBlock: HTMLElement;

  activeCategory: String|undefined;

  activeCategoryObj: ImageCategoryModel | undefined;

  divWithBtnToStartPlay: HTMLDivElement;

  btnToStartPlay: HTMLButtonElement;

  divWithFailCorrectSigns: HTMLElement;

  game: Game;

  arrayOfCardDivs: CardView[];

  constructor(game: Game){
    super('div', ['grid-of-img-and-switch-btn-wrapper']);
    this.train = "Train";
    this.themesBlock = document.createElement('div');
    this.divWithFailCorrectSigns = document.createElement('div');
    this.divWithBtnToStartPlay = document.createElement('div');
    this.btnToStartPlay = document.createElement('button');
    this.categories = [];
    this.activeCategoryObj = undefined;
    this.activeCategory;
    this.game = game;
    this.arrayOfCardDivs = [];

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
        this.game.startGame(this.activeCategoryObj, this.arrayOfCardDivs);
        this.game.onUserAnswer((str)=>{this.addCorrectFailsign(str)});
      };
    })
  }

  drawAllCategories(){
    this.themesBlock.innerHTML = ``;
    this.activeCategory = undefined;
    this.activeCategoryObj = undefined;
    for(let i = 0; i < this.categories.length; i++) {
      const divWithTheme = new CardView('Themes', this.categories[i].cardsContent[1], this.categories[i].category);
      this.themesBlock.appendChild(divWithTheme.element);
      divWithTheme.onClickTheme(()=>{
        this.drawCategory(this.categories[i].category);
      });
    }
    this.divWithBtnToStartPlay.setAttribute('style', 'display: none;');
  }

  drawCategory(category: String){
    this.themesBlock.innerHTML = ``;
    this.activeCategoryObj = this.categories.find(el => el.category === category);
    this.activeCategory = this.activeCategoryObj?.category;
    if(this.activeCategoryObj !== undefined) {
      for(let i = 0; i < this.activeCategoryObj?.cardsContent.length; i++) {
        const divWithWord = new CardView(this.train, this.activeCategoryObj.cardsContent[i], this.activeCategoryObj.category);
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
    if(sign === 'Correct'){
      let picCorrect = document.createElement('div');
      picCorrect.classList.add('picFailCorrect', 'correct');
      picCorrect.setAttribute('style', `background-image:url('${correctPic}');`);
      this.divWithFailCorrectSigns.appendChild(picCorrect);

      console.log('corr')
    }
    if(sign === 'Fail'){
      let picFail = document.createElement('div');
      picFail.classList.add('picFailCorrect', 'fail');
      picFail.setAttribute('style', `background-image:url('${failPic}');`);
      this.divWithFailCorrectSigns.appendChild(picFail);

      console.log('fail')
    }
}
}
