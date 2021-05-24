import './pop-up-win.scss';
import { BaseComponent } from '../base-component';

export class PopUpWin extends BaseComponent {
  constructor() {
    super('div', ['pop-up-win', 'hidden']);
    this.element.innerHTML = `
    <h2>Congratulations! You successfully found all matches in ${'time'} minutes.</h2>
    <div class="forms">
        <button class="btn btn-ok" type="button">OK!</button>
    </div>
    `;

    const btnOk = this.element.getElementsByClassName('btn-ok')[0];

    function closeWinPopUp() {
      document.getElementsByClassName('cover')[0].classList.add('hidden');
      document.getElementsByClassName('pop-up-win')[0].classList.add('hidden');

      document.getElementsByClassName('main')[0].classList.add('hidden');
      document.getElementById('best-score')?.classList.add('active');
      document.getElementsByClassName('best-score')[0].classList.remove('hidden');
      document.getElementById('about')?.classList.remove('active');
      document.getElementsByClassName('about')[0].classList.add('hidden');
      document.getElementById('game-setting')?.classList.remove('active');
      document.getElementsByClassName('game-setting')[0].classList.add('hiden');
      document.getElementsByClassName('start-game-btn')[0].classList.remove('hidden');
      document.getElementsByClassName('stop-game-btn')[0].classList.add('hidden');
    }

    btnOk.addEventListener('click', closeWinPopUp);
  }
}
