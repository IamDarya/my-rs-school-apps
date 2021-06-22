import './main-page.scss';
import { BaseComponent } from '../base-component';

import { Card } from '../image-category-models/card';
import { ImageCategoryModel } from '../image-category-models/image-category-models';

export class MainPage extends BaseComponent {
  constructor() {
    super('div', ['wrapper']);

    const navMenu = document.createElement('nav');
    navMenu.classList.add('nav-burger');
    this.element.appendChild(navMenu);

    const playTrainSwitch = document.createElement('input');
    playTrainSwitch.classList.add('toggle');
    playTrainSwitch.type = 'checkbox';
    this.element.appendChild(playTrainSwitch);

    navMenu.innerHTML = `
    <div id="menuToggle">
    <input type="checkbox"/>
     <span></span>
     <span></span>
     <span></span>
     <ul id="menu">
         <a href='#'><li>Main Page</li></a>
         <a href='#'><li>Action (set A)</li></a>
         <a href='#'><li>Action (set B)</li></a>
         <a href='#'><li>Animal (set A)</li></a>
         <a href='#'><li>Animal (set B)</li></a>
         <a href='#'><li>Clothes</li></a>
         <a href='#'><li>Emotions</li></a>
         <a href='#'><li>Smth else</li></a>
         <a href='#'><li>Smth else</li></a>
     </ul>
    </div>
    `;

    this.drawThemes();
  }

  async drawThemes() {
    const allThemesJson = await fetch('./cards.json');
    const gridOfthemes = document.createElement('div');
    gridOfthemes.classList.add('themes-block')
    const amountOfThemes = 7;
    const categories: ImageCategoryModel[] = await allThemesJson.json();
    for(let i = 0; i <= amountOfThemes; i++) {
      const divWithTheme = document.createElement('div');
      divWithTheme.classList.add('one-theme-block')
      divWithTheme.innerText = `${categories[i].category}`;
      divWithTheme.setAttribute("style", `background-image:url('${categories[i].cardsContent[0].image}');`);
      gridOfthemes.appendChild(divWithTheme);
    }
    this.element.appendChild(gridOfthemes);
  }

  // page: number;
  // currentCard: number;
  // play: boolean;
  // playActive: boolean;
  // randomArr: [];
  // errors: number;
  // endGame: boolean;
  // constructor() {
  //   super();
  //   this.page = 0;
  //   this.currentCard = 0;
  //   this.play = false;
  //   this.playActive = false;
  //   this.randomArr = [];
  //   this.errors = 0;
  //   this.endGame = false;
  // }
}
