import '../../header/main-page.scss';
import '../admin.scss';
import './admin-page-card-view.scss';
import { BaseComponent } from '../../base-component';
import { Card } from '../../image-category-models/card';
import { DatabaseDarya } from '../../database/database';
import { ImageCategoryModel } from '../../image-category-models/image-category-models';
import playIcon from '../../../assets/play.png';

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

  id: number | undefined;

  readerImgResult: string;

  readerAudResult: string;

  constructor(
    categoryAmountOfCards: number,
    cardState: string,
    cardObj: Card,
    category: string,
    dataBaseDarya: DatabaseDarya,
    id: number | undefined,
  ) {
    super('div', ['one-theme-block', 'front']);
    this.readerImgResult = '';
    this.readerAudResult = '';
    this.callBacks = [];
    this.callBacksForNewWord = [];
    this.categories = [];
    this.categoryAmountOfCards = categoryAmountOfCards;
    this.cardState = cardState;
    this.cardObj = cardObj;
    this.id = id;
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
    const updateCardBtn = document.createElement('button');
    updateCardBtn.innerText = 'Update';
    updateCardBtn.classList.add('update-categ-btn');
    const cancelUpdateCategBtn = document.createElement('button');
    cancelUpdateCategBtn.innerText = 'Cancel';
    cancelUpdateCategBtn.classList.add('cancel-upd-categ-btn');
    this.element.appendChild(updateCardBtn);
    this.element.appendChild(cancelUpdateCategBtn);
    deleteCategory.addEventListener('click', () => {
      this.deleteCategory();
    });
    updateCardBtn.addEventListener('click', async () => {
      this.updateCategoryName(inputNewNameCateg);
    });
    cancelUpdateCategBtn.addEventListener('click', () => {
      this.drawThemesAdmin();
    });
  }

  async drawUpdateWord():Promise<void> {
    this.element.innerHTML = '';
    this.element.classList.add('one-theme-block-admin');
    const label = document.createElement('label');
    label.classList.add('label-change-word');
    label.innerHTML = `Category Name: ${this.category}`;
    this.element.appendChild(label);

    const labelWord = document.createElement('label');
    labelWord.innerHTML = 'Word:';
    labelWord.classList.add('label-change-word');
    this.element.appendChild(labelWord);
    const inputNewWord = document.createElement('input');
    inputNewWord.value = `${this.cardObj.word}`;
    inputNewWord.placeholder = `${this.cardObj.word}`;
    this.element.appendChild(inputNewWord);

    const labelTranslation = document.createElement('label');
    labelTranslation.innerHTML = 'Translation:';
    labelTranslation.classList.add('label-change-word');
    this.element.appendChild(labelTranslation);
    const inputNewTranslation = document.createElement('input');
    inputNewTranslation.value = `${this.cardObj.translation}`;
    inputNewTranslation.placeholder = `${this.cardObj.translation}`;
    this.element.appendChild(inputNewTranslation);

    const canvas = document.createElement('div');
    canvas.id = 'canvas';
    const inputImg = document.createElement('input');
    inputImg.type = 'file';
    const labelForImg = document.createElement('label');
    labelForImg.innerText = 'Image:';
    labelForImg.classList.add('label-For-AudImg');
    inputImg.classList.add('fileInputImg');
    inputImg.multiple = false;
    inputImg.accept = 'image/*';
    this.element.appendChild(canvas);
    this.element.appendChild(labelForImg);
    this.element.appendChild(inputImg);

    inputImg.addEventListener('change', () => {
      const file = inputImg.files![0];
      const readerImg = new FileReader();
      readerImg.onloadend = () => {
        if (typeof readerImg.result === 'string') {
          this.readerImgResult = readerImg.result;
        }
        canvas.style.backgroundImage = `url(${readerImg.result})`;
      };
      if (file) {
        readerImg.readAsDataURL(file);
      }
    }, true);

    const inputAud = document.createElement('input');
    inputAud.type = 'file';
    const labelForAud = document.createElement('label');
    labelForAud.innerText = 'Audio:';
    labelForAud.classList.add('label-For-AudImg');
    inputAud.classList.add('fileInputAud');
    inputAud.multiple = false;
    inputAud.accept = 'audio/*';
    this.element.appendChild(labelForAud);
    this.element.appendChild(inputAud);

    inputAud.addEventListener('change', () => {
      const file = inputAud.files![0];
      const readerAud = new FileReader();
      readerAud.onloadend = () => {
        if (typeof readerAud.result === 'string') {
          this.readerAudResult = readerAud.result;
        }
      };
      if (file) {
        readerAud.readAsDataURL(file);
      }
    }, true);

    const updateCardBtn = document.createElement('button');
    updateCardBtn.innerText = 'Update';
    updateCardBtn.classList.add('update-categ-btn');
    const cancelUpdateCategBtn = document.createElement('button');
    cancelUpdateCategBtn.innerText = 'Cancel';
    cancelUpdateCategBtn.classList.add('cancel-upd-categ-btn');
    this.element.appendChild(updateCardBtn);
    this.element.appendChild(cancelUpdateCategBtn);
    updateCardBtn.addEventListener('click', async () => {
      this.updateWord(inputNewWord, inputNewTranslation, this.readerImgResult, this.readerAudResult);
    });
    cancelUpdateCategBtn.addEventListener('click', () => {
      this.drawOneTheme();
    });
  }

  async updateWord(inputNewWord: HTMLInputElement, inputNewTranslation: HTMLInputElement, inputImg: string, inputAud: string): Promise<void> {
  // const cards = await (await fetch('https://mighty-cliffs-95999.herokuapp.com/api/cards')).json() as Card[];
    this.cardObj.word = inputNewWord.value;
    this.cardObj.translation = inputNewTranslation.value;
    this.cardObj.image = inputImg;
    this.cardObj.audioSrc = inputAud;
    await fetch('https://mighty-cliffs-95999.herokuapp.com/api/cards/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.cardObj),
    });
    this.drawOneTheme();
  }

  drawOneTheme(): void {
    this.element.innerHTML = '';
    const deleteCard = document.createElement('button');
    this.element.appendChild(deleteCard);
    deleteCard.classList.add('close-card');
    deleteCard.innerText = 'x';
    this.audio = document.createElement('audio');
    const y = document.createElement('div');
    y.classList.add('card-content');
    y.innerHTML = `<p>Word: ${this.cardObj.word}</p>
    <p>Translation: ${this.cardObj.translation}</p>
    <div class='play-icon-wrapper'><p>Sound: ${this.cardObj.audioSrc}</p><div class='play-icon' style="background-image:url('${playIcon}');"></div></div>
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

    const changeBtn = document.createElement('button');
    changeBtn.innerText = 'Change';
    changeBtn.classList.add('change-btn');
    this.element.appendChild(changeBtn);
    changeBtn.addEventListener('click', () => {
      this.drawUpdateWord();
    });

    this.element.getElementsByClassName('play-icon')[0].addEventListener('click', () => {
      const aud = document.createElement('audio') as HTMLAudioElement;
      aud.setAttribute('src', `${this.cardObj.audioSrc}`);
      aud.play();
    });

    deleteCard.addEventListener('click', () => {
      this.deleteWord();
    });
  }

  async updateCategoryName(inputNewNameCateg: HTMLInputElement): Promise<void> {
    const categoryToUpdate = await (await fetch(`https://mighty-cliffs-95999.herokuapp.com/api/categories/${this.id}`)).json() as ImageCategoryModel;
    // const cards = await (await fetch('https://mighty-cliffs-95999.herokuapp.com/api/cards')).json() as Card[];
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
    await fetch(`https://mighty-cliffs-95999.herokuapp.com/api/categories/${this.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // let allPromises = [];
    // const wordsToDeleteInCategory = this.categories.filter((card) => card.id === this.cardObj.categoryId);
    // for (let i = 0; i < wordsToDeleteInCategory.length; i++) {
    // await (await fetch(`https://mighty-cliffs-95999.herokuapp.com/api/word/${this.cardObj.word}`)).json()
    // as ImageCategoryModel;
    // const cards = await (await fetch('https://mighty-cliffs-95999.herokuapp.com/api/cards')).json() as Card[];
    //   fetch(`https://mighty-cliffs-95999.herokuapp.com/api/word/${this.cardObj.word}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // }
    this.callBacks.forEach((el) => el());
  }

  async deleteWord(): Promise<void> {
    await fetch(`https://mighty-cliffs-95999.herokuapp.com/api/cards/word/${this.cardObj.word}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.callBacksForNewWord.forEach((el) => el());
  }

  onClickDelete(callBack: { (): void; (): void }): void {
    this.callBacks.push(callBack);
  }

  onClickAddWord(callBack: { (): void; (): void }): void {
    this.callBacksForNewWord.push(callBack);
  }
}
