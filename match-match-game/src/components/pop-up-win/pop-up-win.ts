import './pop-up-win.scss';
import { BaseComponent } from '../base-component';
import { BestScore } from '../best-score/best-score';
import { NewRout } from '../routing/newRouting';

export class PopUpWin extends BaseComponent {
  private bestScore: BestScore;

  newRout: NewRout;

  constructor(bestScore: BestScore, newRout: NewRout) {
    super('div', ['pop-up-win', 'hidden']);
    this.newRout = newRout;
    this.bestScore = bestScore;
    this.element.innerHTML = `
    <h2 class="pop-up-win-h2"></h2>
    <div class="forms">
        <button class="btn btn-ok" type="button">OK!</button>
    </div>
    `;

    const btnOk = this.element.getElementsByClassName('btn-ok')[0];

    function closeWinPopUp() {
      newRout.navigate('best-score');
      bestScore.bestScoreShow();

      document.getElementsByClassName('cover')[0].classList.add('hidden');
      document.getElementsByClassName('pop-up-win')[0].classList.add('hidden');
      document
        .getElementsByClassName('start-game-btn')[0]
        .classList.remove('hidden');
      document
        .getElementsByClassName('stop-game-btn')[0]
        .classList.add('hidden');
    }

    btnOk.addEventListener('click', closeWinPopUp);
  }
}
