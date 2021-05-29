import './best-score.scss';
import { BaseComponent } from '../base-component';
import { DatabaseIamDarya } from '../database/database';
import ninja from '../../assets/ninja.png';

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
      this.element.getElementsByClassName('list-of-users')[0].appendChild(li);

      const scoreImgTag = document.createElement('img');
      if(sortedUsers[i].image !== undefined){
        scoreImgTag.setAttribute('src', `${sortedUsers[i].image}`);
        li.appendChild(scoreImgTag);
      }
      else{
        scoreImgTag.setAttribute('src', `${ninja}`);
        li.appendChild(scoreImgTag);
      }

      const firstAndSecondNamePtag = document.createElement('p');
      firstAndSecondNamePtag.innerHTML = `${sortedUsers[i].fName} ${
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
