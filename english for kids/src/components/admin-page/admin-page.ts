import './admin.scss';
import { BaseComponent } from '../base-component';
import { AdminPageCardView } from './admin-page-card-view/admin-page-card-view';
import { ImageCategoryModel } from '../image-category-models/image-category-models';
import { Game, playAudio } from '../game/game';
import repeatPic from '../../assets/repeat.svg';
import { DatabaseDarya } from '../database/database';
import { Overlay } from '../grid-btn/overlay';

export enum StateToDraw {
  OneTheme = 'OneTheme',
  OneWord = 'OneWord',
  Themes = 'Themes',
}

export class AdminPage extends BaseComponent {
  dataBaseDarya: DatabaseDarya;

  overlay: Overlay;

  categories: ImageCategoryModel[];

  themesBlock: HTMLElement;

  activeCategory: string | undefined;

  activeCategoryObj: ImageCategoryModel | undefined;

  overlayContent: HTMLElement;

  arrayOfCardDivs: AdminPageCardView[];

  constructor(
    dataBaseDarya: DatabaseDarya,
    overlay: Overlay,
  ) {
    super('div', ['admin-page-wrapper']);
    this.drawHeaderAdmin();
    this.overlay = overlay;
    this.themesBlock = document.createElement('div');
    this.overlayContent = document.createElement('div');
    this.categories = [];
    this.activeCategoryObj = undefined;
    this.activeCategory = undefined;
    this.arrayOfCardDivs = [];
    this.dataBaseDarya = dataBaseDarya;

    this.themesBlock.classList.add('themes-block');
    this.element.appendChild(this.themesBlock);

    this.overlayContent.classList.add('content');
    this.element.appendChild(this.overlayContent);
  }

  drawAllCategories(): void {
    this.themesBlock.innerHTML = '';
    this.activeCategory = undefined;
    this.activeCategoryObj = undefined;
    for (let i = 0; i < this.categories.length; i++) {
      const divWithTheme = new AdminPageCardView(
        StateToDraw.Themes,
        this.categories[i].cardsContent[3],
        this.categories[i].category,
        this.dataBaseDarya,
      );
      this.themesBlock.appendChild(divWithTheme.element);
      divWithTheme.onClickTheme(() => {
        this.drawCategory(this.categories[i].category);
      });
    }
    this.createNewCategoryCard();
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
        const divWithWord = new AdminPageCardView(
          StateToDraw.OneTheme,
          this.activeCategoryObj.cardsContent[i],
          this.activeCategoryObj.category,
          this.dataBaseDarya,
        );
        this.arrayOfCardDivs.push(divWithWord);
        this.themesBlock.appendChild(divWithWord.element);
      }
    }
    this.createNewWordCard();
  }

  createNewCategoryCard():void {
    const createNewCategoryCard = document.createElement('div');
    createNewCategoryCard.classList.add('one-theme-block', 'create-new-category-card', 'one-theme-block-admin');
    const y = document.createElement('span');
    createNewCategoryCard.appendChild(y);
    const text = document.createElement('p');
    text.innerText = 'Create new Category';
    createNewCategoryCard.appendChild(text);
    const addCategoryBtn = document.createElement('button');
    addCategoryBtn.innerText = '+';
    addCategoryBtn.classList.add('add-category-btn');
    createNewCategoryCard.appendChild(addCategoryBtn);
    this.themesBlock.appendChild(createNewCategoryCard);
    addCategoryBtn.addEventListener('click', () => {

    });
  }

  createNewWordCard():void {
    const createNewWordCard = document.createElement('div');
    createNewWordCard.classList.add('one-theme-block', 'create-new-category-card', 'one-theme-block-admin');
    const y = document.createElement('span');
    createNewWordCard.appendChild(y);
    const text = document.createElement('p');
    text.innerText = 'Add new Word';
    createNewWordCard.appendChild(text);
    const addCategoryBtn = document.createElement('button');
    addCategoryBtn.innerText = '+';
    addCategoryBtn.classList.add('add-category-btn');
    createNewWordCard.appendChild(addCategoryBtn);
    this.themesBlock.appendChild(createNewWordCard);
    addCategoryBtn.addEventListener('click', () => {

    });
  }

  drawHeaderAdmin():void {
    const headerAdmin = document.createElement('header');
    headerAdmin.innerHTML = `
    <ul class="header">
    <li class="text"><a href="#">Categories</a></li>
    <li class="text"><a href="#">Words</a></li>
    <li class="text"><a href="#"><button class="logout-btn">Logout</button></a></li>
  </ul>
    `;
    this.element.appendChild(headerAdmin);
  }
}
