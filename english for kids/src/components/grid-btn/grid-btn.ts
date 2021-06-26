import '../header/main-page.scss';
import { BaseComponent } from '../base-component';
import { CardView } from "../card-view/card-view";
import { ImageCategoryModel } from '../image-category-models/image-category-models';

export class GridBtn extends BaseComponent {

  train: String;

  categories: ImageCategoryModel[];

  themesBlock: HTMLElement;

  activeCategory: String|undefined;

  constructor(){
    super('div', ['grid-of-img-and-switch-btn-wrapper']);
    this.train = "Train";
    this.themesBlock = document.createElement('div');
    this.categories = [];
    this.activeCategory;

    const playTrainSwitch = document.createElement('input');
    playTrainSwitch.classList.add('toggle');
    playTrainSwitch.type = 'checkbox';
    this.element.appendChild(playTrainSwitch);

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
  }

  drawAllCategories(){
    this.themesBlock.innerHTML = ``;
    this.activeCategory = undefined;
    for(let i = 0; i < this.categories.length; i++) {
      const divWithTheme = new CardView('Themes', this.categories[i].cardsContent[1], this.categories[i].category);
      this.themesBlock.appendChild(divWithTheme.element);
      divWithTheme.onClickTheme(()=>{
        this.drawCategory(this.categories[i].category);
      });
    }
  }

  drawCategory(category: String){
    this.themesBlock.innerHTML = ``;
    let activeCategory = this.categories.find(el => el.category === category);
    this.activeCategory = activeCategory?.category;
    if(activeCategory !== undefined) {
      for(let i = 0; i < activeCategory?.cardsContent.length; i++) {
        const divWithWord = new CardView(this.train, activeCategory.cardsContent[i], activeCategory.category);
        this.themesBlock.appendChild(divWithWord.element);
      }
    }
  }
}
