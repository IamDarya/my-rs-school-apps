export class WordStatistic {
  category: string | undefined;

  word: string | undefined;

  translation: string | undefined;

  click: number | undefined;

  id: string | undefined;

  correct: number | undefined;

  wrong: number | undefined;

  persOfErrors: number | undefined;

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
