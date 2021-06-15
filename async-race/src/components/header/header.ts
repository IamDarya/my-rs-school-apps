import { BaseComponent } from '../base-component';
import { Router } from '../router/router';

export class Header extends BaseComponent {
  constructor(router: Router) {
    super('div', ['to-garage-winners-btns']);

    const btnGarage = document.createElement('button');
    btnGarage.classList.add('to-garage-btn');
    btnGarage.innerText = 'TO GARAGE';
    this.element.appendChild(btnGarage);

    const btnWinners = document.createElement('button');
    btnWinners.classList.add('to-winners-btn');
    btnWinners.innerText = 'TO WINNERS';
    this.element.appendChild(btnWinners);

    btnWinners.addEventListener('click', () => {
      router.navigate('best-result');
    });

    btnGarage.addEventListener('click', () => {
      router.navigate('garage');
    });
  }
}
