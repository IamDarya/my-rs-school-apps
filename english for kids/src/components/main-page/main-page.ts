import './main-page.scss';
import { BaseComponent } from '../base-component';

import { Card } from '../image-category-models/card';
import { ImageCategoryModel } from '../image-category-models/image-category-models';

export class MainPage extends BaseComponent {

  train: boolean;
  activeTheme: string| null;

  constructor() {
    super('div', ['wrapper']);

    this.train = true;
    this.activeTheme = '';

    const navMenu = document.createElement('nav');
    navMenu.classList.add('nav-burger');
    this.element.appendChild(navMenu);

    const playTrainSwitch = document.createElement('input');
    playTrainSwitch.classList.add('toggle');
    playTrainSwitch.type = 'checkbox';
    this.element.appendChild(playTrainSwitch);

    playTrainSwitch.addEventListener('click', () => {
      if(this.train === true) {
        this.train = false;
      }
      else {
        this.train = true;
      }
      document.getElementsByClassName('themes-block')[0].classList.toggle('play-mode');
    })

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
         <a href='#'><li>Smth else A</li></a>
         <a href='#'><li>Smth else B</li></a>
     </ul>
    </div>
    `;

    navMenu.addEventListener('click', (e: Event)=>{
     let selectedThemeHTML = e.target as HTMLElement;
     this.activeTheme = selectedThemeHTML.textContent;
    })
  }
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
