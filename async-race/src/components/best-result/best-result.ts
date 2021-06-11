import './best-result.scss';
import { Router } from '../router/router';
import { BaseComponent } from '../base-component';

export class BestResult extends BaseComponent {
  router: Router;
  numOfPageWinners: number;

  constructor(router: Router) {
    super('div', ['best-result-wrapper', 'hidden']);
    this.numOfPageWinners = 1;
    this.router = router;
    this.element.innerHTML = `
        <div>
          <h2>Winners</h2>
          <div class="amount-of-winners-on-page"></div>
          <div>
            <p class="page-winners">Page #</p>
            <div class="num-of-page-winners">${this.numOfPageWinners}</div>
            </div>
          <ul>
            <li>
              <p>Position</p>
              <p>Car</p>
              <p>Name</p>
              <p>Wins</p>
              <p>Best time(sec)</p>
            </li>
          </ul>
        </div>`;
  }
}
