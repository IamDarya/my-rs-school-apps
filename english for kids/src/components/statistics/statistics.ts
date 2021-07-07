import './statistics.scss';
import sortIcon from '../../assets/sort-descending.png';
import { BaseComponent } from '../base-component';
import { DatabaseDarya } from '../database/database';
import { WordStatistic } from '../database/word-statist';
import { CardView } from '../card-view/card-view';

export enum SortBy {
  Category = 'category',
  Word = 'word',
  Translation = 'translation',
  Clicks = 'click',
  Correct = 'correct',
  Wrong = 'wrong',
  CorrectPerc = 'correct(%)',
}

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class Statistics extends BaseComponent {
  private dataBaseDarya: DatabaseDarya;

  statisticGridWrapper: HTMLElement;

  ulWithWordsInfoTop: HTMLElement;

  ulWithWordsInfo: HTMLElement;

  sortIconCategory: HTMLElement | undefined;

  divWithBtnToResetStatistic: HTMLDivElement;

  btnToReset: HTMLButtonElement;

  btnToPlayHard: HTMLButtonElement;

  topPart: HTMLElement;

  allWords: WordStatistic[];

  hardWords: WordStatistic[];

  sortByEnum: SortBy;

  constructor(dataBaseDarya: DatabaseDarya) {
    super('div', ['statistics-wrapper']);
    this.dataBaseDarya = dataBaseDarya;
    this.allWords = [];
    this.divWithBtnToResetStatistic = document.createElement('div');
    this.btnToReset = document.createElement('button');
    this.btnToPlayHard = document.createElement('button');
    this.hardWords = [];

    this.sortByEnum = SortBy.Category;

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

    const arrOfKeys = Object.keys(SortBy);
    for (let i = 0; i < arrOfKeys.length; i++) {
      const oneDivOfStatisticsValue = document.createElement('div');
      oneDivOfStatisticsValue.classList.add(
        'one-category',
        `${SortBy[arrOfKeys[i] as keyof typeof SortBy]}-category`,
      );

      const category = document.createElement('p');
      category.innerText = `${SortBy[arrOfKeys[i] as keyof typeof SortBy]}`;

      this.sortIconCategory = document.createElement('img');
      this.sortIconCategory.setAttribute('data-sort', `${SortDirection.ASC}`);
      this.sortIconCategory.setAttribute('src', `${sortIcon}`);
      this.sortIconCategory.classList.add('icon-for-sort');
      this.sortIconCategory.setAttribute(
        'data-category',
        `${SortBy[arrOfKeys[i] as keyof typeof SortBy]}`,
      );
      this.sortIconCategory.addEventListener('click', async (e) => {
        const el = e.target as HTMLElement;
        const sortDirection = el.dataset.sort as SortDirection;
        const sortBy = el.dataset.category;
        el.classList.toggle('transform');
        const sortByConvEnum = sortBy as SortBy;
        this.sortBy(sortDirection, sortByConvEnum);

        if (sortDirection === SortDirection.ASC) {
          el.dataset.sort = SortDirection.DESC;
        } else {
          el.dataset.sort = SortDirection.ASC;
        }
      });

      oneDivOfStatisticsValue.appendChild(category);
      oneDivOfStatisticsValue.appendChild(this.sortIconCategory);
      this.topPart.appendChild(oneDivOfStatisticsValue);
    }

    this.btnToReset.addEventListener('click', () => {
      this.resetStatistic();
    });
    this.btnToPlayHard.addEventListener('click', () => {
      // this.createArrayOfHardWords();
    });
  }

  sortBy(sortState: SortDirection, sortBy: keyof WordStatistic | 'correct(%)'): void {
    this.allWords = this.allWords.sort((a, b) => {
      const nameA = (sortBy !== 'correct(%)') ? a[sortBy] : a.persOfErrors;
      const nameB = (sortBy !== 'correct(%)') ? b[sortBy] : b.persOfErrors;

      if (sortState === SortDirection.DESC) {
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
    this.statisticShowSorted();
  }

  async statisticShow(): Promise<void> {
    this.allWords = await this.dataBaseDarya.getAllWords();
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
      errorsPers.innerText = `${this.allWords[i].persOfErrors.toFixed(0)}%`;
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
      this.dataBaseDarya.update(this.allWords[i]);
    }
    this.statisticShow();
  }

// createArrayOfHardWords(){
//     this.hardWords = this.allWords.filter((x) => x.persOfErrors !== 0 && x.persOfErrors !== 100);
//     this.hardWords = this.hardWords.sort().splice(this.hardWords.length - 8, this.hardWords.length);
//     for(let i = 0; i < this.hardWords.length; i++){
//     }
//   }
}
