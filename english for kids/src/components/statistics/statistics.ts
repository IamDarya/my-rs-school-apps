import "./statistics.scss";
import { BaseComponent } from "../base-component";
import { DatabaseIamDarya } from '../database/database';

export class Statistics extends BaseComponent {

  private databaseIamDarya: DatabaseIamDarya;

  statisticGridWrapper: HTMLElement;

  ulWithWordsInfo: HTMLElement;

  topPart: HTMLElement;

  constructor(databaseIamDarya: DatabaseIamDarya){
    super('div', ['statistics-wrapper']);
    this.databaseIamDarya = databaseIamDarya;

    let htwo = document.createElement('h2');
    htwo.innerText = 'Statistic';
    this.element.appendChild(htwo);

    this.statisticGridWrapper = document.createElement('div');
    this.ulWithWordsInfo = document.createElement('ul');
    this.statisticGridWrapper.appendChild(this.ulWithWordsInfo);
    this.statisticGridWrapper.classList.add('statistic-grid-wrapper')
    this.element.appendChild(this.statisticGridWrapper);

    this.topPart = document.createElement('li');
    this.topPart.classList.add('topPart-li');
    this.ulWithWordsInfo.appendChild(this.topPart);

    let category = document.createElement('p');
    category.innerText = 'category';
    let word = document.createElement('p');
    word.innerText = 'word';
    let translation = document.createElement('p');
    translation.innerText = 'translation';
    let clicks = document.createElement('p');
    clicks.innerText = 'clicks';
    let correct = document.createElement('p');
    correct.innerText = 'correct';
    let wrong = document.createElement('p');
    wrong.innerText = 'wrong';
    let errorsPers  = document.createElement('p');
    errorsPers.innerText = 'errors(%)';

    this.topPart.appendChild(category);
    this.topPart.appendChild(word);
    this.topPart.appendChild(translation);
    this.topPart.appendChild(clicks);
    this.topPart.appendChild(correct);
    this.topPart.appendChild(wrong);
    this.topPart.appendChild(errorsPers);

  }

  async statisticShow() {
    const allWords = await this.databaseIamDarya.getAllWords();

    for(let i=0;i<allWords.length;i++){

      let wordLi = document.createElement('li');
      wordLi.classList.add('word-li');
      this.ulWithWordsInfo.appendChild(wordLi);

      let category = document.createElement('p');
      category.innerText = `${allWords[i].category}`;
      let word = document.createElement('p');
      word.innerText = `${allWords[i].word}`;
      let translation = document.createElement('p');
      translation.innerText = `${allWords[i].translation}`;
      let clicks = document.createElement('p');
      clicks.innerText = `${allWords[i].click}`;
      let correct = document.createElement('p');
      correct.innerText = `${allWords[i].correct}`;
      let wrong = document.createElement('p');
      wrong.innerText = `${allWords[i].wrong}`;
      let errorsPers  = document.createElement('p');
      errorsPers.innerText = `${allWords[i].persOfErrors}`;

      wordLi.appendChild(category);
      wordLi.appendChild(word);
      wordLi.appendChild(translation);
      wordLi.appendChild(clicks);
      wordLi.appendChild(correct);
      wordLi.appendChild(wrong);
      wordLi.appendChild(errorsPers);
    }
  }
}
