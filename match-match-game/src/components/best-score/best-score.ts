import './best-score.scss';
import { BaseComponent } from '../base-component';
import { DatabaseIamDarya } from '../database/database';

export class BestScore extends BaseComponent {

  private databaseIamDarya: DatabaseIamDarya;

  constructor(databaseIamDarya: DatabaseIamDarya) {
    super('div', ['app', 'best-score', 'hidden']);
    this.databaseIamDarya = databaseIamDarya;
  }

  async bestScoreShow() {
    let allUsers = await this.databaseIamDarya.getAllUsers();

    this.element.innerHTML = `
    <h2>Best players</h2>
    <ul>
      <li class="best-score-li">${allUsers[0].fName}<br>${allUsers[0].sName}</li>
      <li class="best-score-li">${allUsers[1].fName}<br>${allUsers[1].sName}</li>
      <li class="best-score-li">Nina Ivanova</li>
    </ul>`;
  }
}
