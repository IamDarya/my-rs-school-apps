import './statistics.scss';
import sortIcon from '../../assets/sort-descending.png';
import { BaseComponent } from '../base-component';
import { DatabaseIamDarya } from '../database/database';
import { WordStatistic } from '../database/word-statist';

export class Statistics extends BaseComponent {
  private databaseIamDarya: DatabaseIamDarya;

  statisticGridWrapper: HTMLElement;

  ulWithWordsInfoTop: HTMLElement;

  ulWithWordsInfo: HTMLElement;

  sortIconCategory: HTMLElement | undefined;

  divWithBtnToResetStatistic: HTMLDivElement;

  btnToReset: HTMLButtonElement;

  btnToPlayHard: HTMLButtonElement;

  topPart: HTMLElement;

  allWords: WordStatistic[];

  sortStateCategory: boolean;

  sortStateWord: boolean;

  sortStateTranslation: boolean;

  sortStateClick: boolean;

  sortStateCorrect: boolean;

  sortStateWrong: boolean;

  sortStateErrors: boolean;

  constructor(databaseIamDarya: DatabaseIamDarya) {
    super('div', ['statistics-wrapper']);
    this.databaseIamDarya = databaseIamDarya;
    this.allWords = [];
    this.divWithBtnToResetStatistic = document.createElement('div');
    this.btnToReset = document.createElement('button');
    this.btnToPlayHard = document.createElement('button');
    this.sortStateCategory = false;
    this.sortStateWord = false;
    this.sortStateTranslation = false;
    this.sortStateClick = false;
    this.sortStateCorrect = false;
    this.sortStateWrong = false;
    this.sortStateErrors = false;

    const htwo = document.createElement('h2');
    htwo.innerText = 'Statistic';
    this.element.appendChild(htwo);

    this.divWithBtnToResetStatistic.classList.add('div-with-btn-to-reset');
    this.btnToReset.classList.add('btn-to-reset');
    this.btnToReset.innerText = 'Reset';
    this.btnToPlayHard.classList.add('btn-to-reset');
    this.btnToPlayHard.innerText = 'Repeat difficult words';

    this.element.appendChild(this.divWithBtnToResetStatistic);
    this.divWithBtnToResetStatistic.appendChild(this.btnToReset);
    this.divWithBtnToResetStatistic.appendChild(this.btnToPlayHard);

    this.statisticGridWrapper = document.createElement('div');
    this.ulWithWordsInfoTop = document.createElement('ul');
    this.statisticGridWrapper.appendChild(this.ulWithWordsInfoTop);
    this.ulWithWordsInfo = document.createElement('ul');
    this.statisticGridWrapper.appendChild(this.ulWithWordsInfo);
    this.statisticGridWrapper.classList.add('statistic-grid-wrapper');
    this.element.appendChild(this.statisticGridWrapper);

    this.topPart = document.createElement('li');
    this.topPart.classList.add('topPart-li');
    this.ulWithWordsInfoTop.appendChild(this.topPart);

    const arrOfStatisticsValues = [
      'category',
      'word',
      'translation',
      'clicks',
      'correct',
      'wrong',
      'correct(%)',
    ];
    for (let i = 0; i < arrOfStatisticsValues.length; i++) {
      const oneDivOfStatisticsValue = document.createElement('div');
      oneDivOfStatisticsValue.classList.add(
        'one-category',
        `${arrOfStatisticsValues[i]}-category`,
      );

      const category = document.createElement('p');
      category.innerText = `${arrOfStatisticsValues[i]}`;

      this.sortIconCategory = document.createElement('img');
      this.sortIconCategory.setAttribute('src', `${sortIcon}`);
      this.sortIconCategory.classList.add('icon-for-sort');
      this.sortIconCategory.setAttribute(
        'data-category',
        `${arrOfStatisticsValues[i]}`,
      );
      this.sortIconCategory.addEventListener('click', async (e) => {
        const el = e.target as HTMLElement;
        const sortBy = el.dataset.category;
        el.classList.toggle('transform');
        this.sortBy(sortBy);
      });

      oneDivOfStatisticsValue.appendChild(category);
      oneDivOfStatisticsValue.appendChild(this.sortIconCategory);
      this.topPart.appendChild(oneDivOfStatisticsValue);
    }

    this.btnToReset.addEventListener('click', () => {
      this.resetStatistic();
    });
  }

  async sortBy(sortBy: string | undefined): Promise<number> {
    if (sortBy === 'category') {
      this.allWords = this.allWords.sort((a, b) => {
        const nameA = a.category;
        const nameB = b.category;
        if (this.sortStateCategory) {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) return 1;
          return 0;
        }

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) return -1;
        return 0;
      });
      this.sortStateCategory = !this.sortStateCategory;
    }

    if (sortBy === 'word') {
      this.allWords = this.allWords.sort((a, b) => {
        const nameA = a.word;
        const nameB = b.word;
        if (this.sortStateWord) {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) return 1;
          return 0;
        }

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) return -1;
        return 0;
      });
      this.sortStateWord = !this.sortStateWord;
    }

    if (sortBy === 'translation') {
      this.allWords = this.allWords.sort((a, b) => {
        const nameA = a.translation;
        const nameB = b.translation;
        if (this.sortStateTranslation) {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) return 1;
          return 0;
        }

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) return -1;
        return 0;
      });
      this.sortStateTranslation = !this.sortStateTranslation;
    }
    if (sortBy === 'clicks') {
      this.allWords = this.allWords.sort((a, b) => (this.sortStateClick ? b.click - a.click : a.click - b.click));
      this.sortStateClick = !this.sortStateClick;
    }
    if (sortBy === 'correct') {
      this.allWords = this.allWords.sort((a, b) => (this.sortStateCorrect ? b.correct - a.correct : a.correct - b.correct));
      this.sortStateCorrect = !this.sortStateCorrect;
    }
    if (sortBy === 'wrong') {
      this.allWords = this.allWords.sort((a, b) => (this.sortStateWrong ? b.wrong - a.wrong : a.wrong - b.wrong));
      this.sortStateWrong = !this.sortStateWrong;
    }
    if (sortBy === 'correct(%)') {
      this.allWords = this.allWords.sort((a, b) => (this.sortStateErrors
        ? b.persOfErrors - a.persOfErrors
        : a.persOfErrors - b.persOfErrors));
      this.sortStateErrors = !this.sortStateErrors;
    }
    this.statisticShowSorted();
    return 0;
  }

  async statisticShow(): Promise<void> {
    this.allWords = await this.databaseIamDarya.getAllWords();
    this.allWords = this.allWords.sort((a, b) => b.correct - a.correct);
    this.statisticShowSorted();
  }

  statisticShowSorted(): void {
    this.ulWithWordsInfo.innerHTML = '';
    for (let i = 0; i < this.allWords.length; i++) {
      const wordLi = document.createElement('li');
      wordLi.classList.add('word-li');
      this.ulWithWordsInfo.appendChild(wordLi);

      const category = document.createElement('p');
      category.innerText = `${this.allWords[i].category}`;
      const word = document.createElement('p');
      word.innerText = `${this.allWords[i].word}`;
      const translation = document.createElement('p');
      translation.innerText = `${this.allWords[i].translation}`;
      const clicks = document.createElement('p');
      clicks.innerText = `${this.allWords[i].click}`;
      const correct = document.createElement('p');
      correct.innerText = `${this.allWords[i].correct}`;
      const wrong = document.createElement('p');
      wrong.innerText = `${this.allWords[i].wrong}`;
      const errorsPers = document.createElement('p');
      // if (this.allWords[i].correct > 0 || this.allWords[i].wrong > 0) {
      errorsPers.innerText = `${this.allWords[i].persOfErrors.toFixed(0)}%`;
      // } else {
      //   errorsPers.innerText = `${this.allWords[i].persOfErrors}%`;
      // }
      if (i % 2 === 0) {
        wordLi.classList.add('color-line');
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

  resetStatistic(): void {
    for (let i = 0; i < this.allWords.length; i++) {
      this.allWords[i].click = 0;
      this.allWords[i].correct = 0;
      this.allWords[i].persOfErrors = 0;
      this.allWords[i].wrong = 0;
      this.databaseIamDarya.update(this.allWords[i]);
    }
    this.statisticShow();
  }
}
