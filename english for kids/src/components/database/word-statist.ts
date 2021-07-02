export class WordStatistic {
  category: string;

  word: string;

  translation: string;

  click: number;

  id: string;

  correct: number;

  wrong: number;

  persOfErrors: number;

  constructor(
    category: string,
    word: string,
    translation: string,
    click: number,
    id: string,
    correct: number,
    wrong: number,
    persOfErrors: number,
  ) {
    this.category = category;
    this.word = word;
    this.translation = translation;
    this.click = click;
    this.id = category + word + translation;
    this.correct = correct;
    this.wrong = wrong;
    this.persOfErrors = persOfErrors;
  }
}
