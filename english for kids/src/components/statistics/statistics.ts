import { BaseComponent } from "../base-component";
import { DatabaseIamDarya } from '../database/database';

export class Statistics extends BaseComponent {

  private databaseIamDarya: DatabaseIamDarya;

  constructor(databaseIamDarya: DatabaseIamDarya){
    super('div', ['statistics-wrapper']);
    this.databaseIamDarya = databaseIamDarya;
  }

  async statisticShow() {
    const allWords = await this.databaseIamDarya.getAllWords();
    console.log(allWords);
    this.element.innerHTML = `${allWords}`;
  }
}
