import './best-result.scss';
import { Router } from '../router/router';
import { BaseComponent } from '../base-component';
import { API } from '../api';
import { PopUp } from '../pop-up/pop-up';

export class BestResult extends BaseComponent {
  router: Router;

  numOfPageWinners: number;

  popUp: PopUp;

  constructor(router: Router, popUp: PopUp) {
    super('div', ['best-result-wrapper', 'hidden']);
    this.numOfPageWinners = 1;
    this.popUp = popUp;
    this.router = router;
    this.element.innerHTML = `
        <div>
          <h2>Winners</h2>
          <div class="amount-of-winners-on-page"></div>
          <div>
            <p class="page-winners">Page #</p>
            <div class="num-of-page-winners">${this.numOfPageWinners}</div>
            </div>
          <ul class='winn'>
          </ul>
          <div class="prev-next-btns-winners">
          <button class="prev-winners">PREV</button>
          <button class="next-winners">NEXT</button>
        </div>
        </div>`;

    const nextPageBtn = this.element.getElementsByClassName('next-winners')[0];
    const prevPAgeBtn = this.element.getElementsByClassName('prev-winners')[0];

    const changePageNext = () => {
      this.numOfPageWinners++;
      document.getElementsByClassName(
        'num-of-page'
      )[0].innerHTML = `${this.numOfPageWinners}`;
      this.drawWinners();
    };

    const changePagePrev = () => {
      if (this.numOfPageWinners > 1) {
        this.numOfPageWinners--;
        document.getElementsByClassName(
          'num-of-page'
        )[0].innerHTML = `(${this.numOfPageWinners})`;
        this.drawWinners();
      }
    };
    nextPageBtn.addEventListener('click', changePageNext);
    prevPAgeBtn.addEventListener('click', changePagePrev);
  }

  async drawWinners(): Promise<void> {
    const elem = this.element.getElementsByClassName('winn')[0];
    elem.innerHTML = `
    <li>
    <p>Position</p>
    <p>Car</p>
    <p>Name</p>
    <p>Wins</p>
    <p>Best time(sec)</p>
  </li>`;
    const arrOfWinners = await API.getWinners(
      this.numOfPageWinners,
      10,
      'time',
      'ASC'
    );
    let carPosit = 1 + (this.numOfPageWinners - 1) * 10;
    const arrOfCars = await Promise.all(
      arrOfWinners.map((el) =>  API.getCar(el.id))
    );
    for (let i = 0; i < arrOfWinners.length; i++) {
      const li = document.createElement('li');
      elem.appendChild(li);
      li.innerHTML = `
        <p>${carPosit++}</p>
        <p><svg viewBox="0 0 512 512" style="fill:${arrOfCars[i].color};"><g id="_13-car"
        data-name="13-car"><g id="glyph"><path d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1
        ,1,24-24A24,24,0,0,1,120,312Z"/><path d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,
        1,24-24A24,24,0,0,1,408,312Z"/><path d="M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,100H159
        .38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a6
        4,64,0,1,1,125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,36-36V228.632A35.791,35.791,0,0,0,477.4,19
        3.04ZM180,164a12,12,0,0,1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,121H168a12,12,0,0,1,
        12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,1
        2,0,0,1,12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"/></g></g></svg></p>
        <p>${arrOfCars[i].name}</p>
        <p>${arrOfWinners[i].wins}</p>
        <p>${Number.parseFloat(arrOfWinners[i].time.toString()).toFixed(2)}</p>
        `;
    }
  }
}
