import './statistics.scss';
import { BaseComponent } from '../base-component';
import { DatabaseIamDarya } from '../database/database';

export class Statistics extends BaseComponent {
  private databaseIamDarya: DatabaseIamDarya;

  statisticGridWrapper: HTMLElement;

  ulWithWordsInfo: HTMLElement;

  topPart: HTMLElement;

  constructor(databaseIamDarya: DatabaseIamDarya) {
    super('div', ['statistics-wrapper']);
    this.databaseIamDarya = databaseIamDarya;

    const htwo = document.createElement('h2');
    htwo.innerText = 'Statistic';
    this.element.appendChild(htwo);

    this.statisticGridWrapper = document.createElement('div');
    this.ulWithWordsInfo = document.createElement('ul');
    this.statisticGridWrapper.appendChild(this.ulWithWordsInfo);
    this.statisticGridWrapper.classList.add('statistic-grid-wrapper');
    this.element.appendChild(this.statisticGridWrapper);

    this.topPart = document.createElement('li');
    this.topPart.classList.add('topPart-li');
    this.ulWithWordsInfo.appendChild(this.topPart);

    const category = document.createElement('p');
    category.innerText = 'category';
    const word = document.createElement('p');
    word.innerText = 'word';
    const translation = document.createElement('p');
    translation.innerText = 'translation';
    const clicks = document.createElement('p');
    clicks.innerText = 'clicks';
    const correct = document.createElement('p');
    correct.innerText = 'correct';
    const wrong = document.createElement('p');
    wrong.innerText = 'wrong';
    const errorsPers = document.createElement('p');
    errorsPers.innerText = 'errors(%)';

    this.topPart.appendChild(category);
    this.topPart.appendChild(word);
    this.topPart.appendChild(translation);
    this.topPart.appendChild(clicks);
    this.topPart.appendChild(correct);
    this.topPart.appendChild(wrong);
    this.topPart.appendChild(errorsPers);
  }

  async statisticShow(): Promise<void> {
    const allWords = await this.databaseIamDarya.getAllWords();

    for (let i = 0; i < allWords.length; i++) {
      const wordLi = document.createElement('li');
      wordLi.classList.add('word-li');
      this.ulWithWordsInfo.appendChild(wordLi);

      const category = document.createElement('p');
      category.innerText = `${allWords[i].category}`;
      const word = document.createElement('p');
      word.innerText = `${allWords[i].word}`;
      const translation = document.createElement('p');
      translation.innerText = `${allWords[i].translation}`;
      const clicks = document.createElement('p');
      clicks.innerText = `${allWords[i].click}`;
      const correct = document.createElement('p');
      correct.innerText = `${allWords[i].correct}`;
      const wrong = document.createElement('p');
      wrong.innerText = `${allWords[i].wrong}`;
      const errorsPers = document.createElement('p');
      if (allWords[i].correct! > 0 || allWords[i].wrong! > 0) {
        errorsPers.innerText = `${(
          (allWords[i].correct! / (allWords[i].correct! + allWords[i].wrong!))
          * 100
        ).toFixed(1)}%`;
      } else {
        errorsPers.innerText = `${allWords[i].persOfErrors}%`;
      }

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
