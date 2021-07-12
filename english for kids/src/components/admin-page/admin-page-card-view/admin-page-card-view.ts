import '../../header/main-page.scss';
import '../admin.scss';
import './admin-page-card-view.scss';
import { BaseComponent } from '../../base-component';
import { Card } from '../../image-category-models/card';
import { DatabaseDarya } from '../../database/database';
import { ImageCategoryModel } from '../../image-category-models/image-category-models';

export class AdminPageCardView extends BaseComponent {
  dataBaseDarya: DatabaseDarya;

  cardObj: Card;

  cardState: string;

  category: string;

  categories: ImageCategoryModel[];

  callBacks: (() => void)[];

  callBacksForNewWord: (() => void)[];

  categoryAmountOfCards: number;

  audio: HTMLAudioElement;

  constructor(
    categoryAmountOfCards: number,
    cardState: string,
    cardObj: Card,
    category: string,
    dataBaseDarya: DatabaseDarya,
  ) {
    super('div', ['one-theme-block', 'front']);
    this.callBacks = [];
    this.callBacksForNewWord = [];
    this.categories = [];
    this.categoryAmountOfCards = categoryAmountOfCards;
    this.cardState = cardState;
    this.cardObj = cardObj;
    this.category = category;
    this.dataBaseDarya = dataBaseDarya;
    this.audio = new Audio();

    // if (this.cardState === 'OneTheme') {
    //   this.drawOneTheme();
    // }

    // if (this.cardState === 'OneWord') {
    //   // this.drawOneWord();
    // }

    if (this.cardState === 'Themes') {
      this.drawThemesAdmin();
    }
  }

  async drawThemesAdmin(): Promise<void> {
    this.element.innerHTML = '';
    this.element.classList.add('one-theme-block-admin');
    const deleteCard = document.createElement('button');
    deleteCard.classList.add('close-card');
    deleteCard.innerText = 'x';
    const y = document.createElement('span');
    y.innerText = `${this.category}`;
    this.element.appendChild(y);
    this.element.appendChild(deleteCard);
    this.element.setAttribute('data-topic', `${this.category}`);
    const amountOfWords = document.createElement('p');
    amountOfWords.innerText = `WORDS: ${this.categoryAmountOfCards}`;
    this.element.appendChild(amountOfWords);
    const updateBtn = document.createElement('button');
    updateBtn.innerText = 'Update';
    updateBtn.classList.add('update-btn');
    const addWordBtn = document.createElement('button');
    addWordBtn.innerText = 'Add word';
    addWordBtn.classList.add('add-word-btn');
    this.element.appendChild(updateBtn);
    this.element.appendChild(addWordBtn);
    addWordBtn.addEventListener('click', () => {
      this.callBacksForNewWord.forEach((el) => el());
    });
    updateBtn.addEventListener('click', () => {
      this.drawUpdateTheme();
    });
    deleteCard.addEventListener('click', () => {
      this.deleteCategory();
    });
  }

  async drawUpdateTheme():Promise<void> {
    this.element.innerHTML = '';
    this.element.classList.add('one-theme-block-admin');
    const deleteCategory = document.createElement('button');
    deleteCategory.classList.add('close-card');
    deleteCategory.innerText = 'x';
    const label = document.createElement('label');
    label.innerHTML = 'Category Name:';
    this.element.appendChild(label);
    const inputNewNameCateg = document.createElement('input');
    inputNewNameCateg.placeholder = `${this.category}`;
    this.element.appendChild(inputNewNameCateg);
    this.element.appendChild(deleteCategory);
    const updateCatBtn = document.createElement('button');
    updateCatBtn.innerText = 'Update';
    updateCatBtn.classList.add('update-categ-btn');
    const cancelUpdateCategBtn = document.createElement('button');
    cancelUpdateCategBtn.innerText = 'Cancel';
    cancelUpdateCategBtn.classList.add('cancel-upd-categ-btn');
    this.element.appendChild(updateCatBtn);
    this.element.appendChild(cancelUpdateCategBtn);
    deleteCategory.addEventListener('click', () => {
      this.deleteCategory();
    });
    updateCatBtn.addEventListener('click', async () => {
      this.updateCategoryName(inputNewNameCateg);
    });
    cancelUpdateCategBtn.addEventListener('click', () => {
      this.drawThemesAdmin();
    });
  }

  drawOneTheme(): void {
    this.element.innerHTML = '';
    const closeCard = document.createElement('button');
    this.element.appendChild(closeCard);
    closeCard.classList.add('close-card');
    closeCard.innerText = 'x';
    this.audio = document.createElement('audio');
    const y = document.createElement('div');
    y.classList.add('card-content');
    y.innerHTML = `<p>Word: ${this.cardObj.word}</p>
    <p>Translation: ${this.cardObj.translation}</p>
    <p>Sound: ${this.cardObj.audioSrc}</p>
    <p>Image:</p>
    `;
    this.element.appendChild(y);
    this.audio.setAttribute('src', `${this.cardObj.audioSrc}`);
    this.element.classList.add('one-theme-block-admin', 'one-theme');
    this.element.removeAttribute('data-topic');
    this.element.setAttribute('data-topic', `${this.category}`);
    const picture = document.createElement('div');
    picture.classList.add('picture');
    this.element.appendChild(picture);
    picture.setAttribute(
      'style',
      `background-image:url('${this.cardObj.image}');`,
    );

    this.element.appendChild(this.audio);

    const cnangeBtn = document.createElement('button');
    cnangeBtn.innerText = 'Change';
    cnangeBtn.classList.add('change-btn');
    this.element.appendChild(cnangeBtn);
  }

  async updateCategoryName(inputNewNameCateg: HTMLInputElement): Promise<void> {
    const categoryToUpdate = await (await fetch(`https://mighty-cliffs-95999.herokuapp.com/api/categories/${this.cardObj.categoryId}`)).json() as ImageCategoryModel; // const cards = await (await fetch('https://mighty-cliffs-95999.herokuapp.com/api/cards')).json() as Card[];
    categoryToUpdate.category = inputNewNameCateg.value;
    await fetch('https://mighty-cliffs-95999.herokuapp.com/api/categories/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryToUpdate),
    });
    this.category = categoryToUpdate.category;
    this.drawThemesAdmin();
  }

  async deleteCategory(): Promise<void> {
    //   await (await fetch(`http://localhost:8000/api/categories/${this.cardObj.categoryId}`)).json() as ImageCategoryModel; // const cards = await (await fetch('https://mighty-cliffs-95999.herokuapp.com/api/cards')).json() as Card[];
    await fetch(`https://mighty-cliffs-95999.herokuapp.com/api/categories/${this.cardObj.categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // let allPromises = [];
    // const wordsToDeleteInCategory = this.categories.filter((card) => card.id === this.cardObj.categoryId);
    // for (let i = 0; i < wordsToDeleteInCategory.length; i++) {
    //   //   await (await fetch(`http://localhost:8000/api/word/${this.cardObj.word}`)).json() as ImageCategoryModel; // const cards = await (await fetch('https://mighty-cliffs-95999.herokuapp.com/api/cards')).json() as Card[];
    //   fetch(`http://localhost:8000/api/word/${this.cardObj.word}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // }
    this.callBacks.forEach((el) => el());
  }

  onClickDelete(callBack: { (): void; (): void }): void {
    this.callBacks.push(callBack);
  }

  onClickAddWord(callBack: { (): void; (): void }): void {
    this.callBacksForNewWord.push(callBack);
  }
}
