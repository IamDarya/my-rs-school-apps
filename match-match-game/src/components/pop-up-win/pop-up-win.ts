import './pop-up-win.scss';
import { BaseComponent } from '../base-component';
import { Router } from '../routing/routing';
import { BestScore } from '../best-score/best-score';

export class PopUpWin extends BaseComponent {
  private bestScore: BestScore;

  constructor(bestScore:BestScore) {
    super('div', ['pop-up-win', 'hidden']);
    this.bestScore = bestScore;
    this.element.innerHTML = `
    <h2 class="pop-up-win-h2"></h2>
    <div class="forms">
        <button class="btn btn-ok" type="button">OK!</button>
    </div>
    `;

    const btnOk = this.element.getElementsByClassName('btn-ok')[0];

    function closeWinPopUp() {
      window.history.pushState(null, 'best-score', 'best-score');
      Router.newPage('/best-score');
      bestScore.bestScoreShow();

      document.getElementsByClassName('cover')[0].classList.add('hidden');
      document.getElementsByClassName('pop-up-win')[0].classList.add('hidden');
      document.getElementsByClassName('start-game-btn')[0].classList.remove('hidden');
      document.getElementsByClassName('stop-game-btn')[0].classList.add('hidden');
    }

    btnOk.addEventListener('click', closeWinPopUp);
  }
}
