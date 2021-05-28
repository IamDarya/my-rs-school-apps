import './best-score.scss';
import { BaseComponent } from '../base-component';
import { DatabaseIamDarya } from '../database/database';
import { User } from '../antities/user';

export class BestScore extends BaseComponent {
  private databaseIamDarya: DatabaseIamDarya;

  constructor(databaseIamDarya: DatabaseIamDarya) {
    super('div', ['app', 'best-score', 'hidden']);
    this.databaseIamDarya = databaseIamDarya;
  }

  async bestScoreShow(): Promise<void> {
    const allUsers = await this.databaseIamDarya.getAllUsers();
    const sortedUsers = allUsers.sort((a, b) => b.score! - a.score!);

    this.element.innerHTML = `
    <h2>Best players</h2>
    <ul class="list-of-users">

    </ul>`;
    const limitUSersDisplOnPage = 10;
    for (let i = 0; i < sortedUsers.length && i < limitUSersDisplOnPage; i++) {
      const li = document.createElement('li');
      document.getElementsByClassName('list-of-users')[0].appendChild(li);

      const firstAndSecondNamePtag = document.createElement('p');
      firstAndSecondNamePtag.innerHTML = `${i + 1}. ${sortedUsers[i].fName} ${
        sortedUsers[i].sName
      }`;
      li.appendChild(firstAndSecondNamePtag);

      const scorePtag = document.createElement('p');
      scorePtag.innerHTML = `${sortedUsers[i].score}`;
      li.appendChild(scorePtag).setAttribute('style', 'justify-self: right;');

      const emailPtag = document.createElement('p');
      emailPtag.innerHTML = `${sortedUsers[i].email}`;
      li.appendChild(emailPtag);
    }
  }
}
