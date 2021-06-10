import './garage.scss';
import { Router } from '../router/router';
import { BaseComponent } from '../base-component';
import { BestResult } from '../best-result/best-result';
import { API } from '../api';
import { CarManipulation } from '../car-manipulations/car-manipulations';

export class Garage extends BaseComponent {
  router: Router;

  api: API;

  carManipulation: CarManipulation;

  constructor(router: Router, bestResult: BestResult, api: API) {
    super('div', ['wrapper']);
    this.api = api;
    this.router = router;
    this.carManipulation = new CarManipulation(this.api, this);
    this.element.innerHTML = `
    <div class="to-garage-winners-btns">
    <button class="to-garage-btn">TO GARAGE</button>
    <button class="to-winners-btn">TO WINNERS</button>
    </div>
      <main class="whole-garage-part">
        <div>
          <h2>Garage</h2>
          <div class="amount-of-cars-in-garage"></div>
        </div>
        <div>
          <p class="page">Page #</p>
          <div class="num-of-page"></div>
        </div>
        <div class="car-section-wrapper">
      </main>
      </div>
      <div class="prev-next-btns">
      <button class="prev">PREV</button>
      <button class="next">NEXT</button>
    </div>`;

    this.element.insertBefore(
      this.carManipulation.element,
      this.element.getElementsByTagName('main')[0],
    );

    const bestResultBtn = this.element.getElementsByClassName('to-winners-btn')[0];
    const garageBtn = this.element.getElementsByClassName('to-garage-btn')[0];

    bestResultBtn.addEventListener('click', () => {
      router.navigate('best-result');

      bestResult.show();

      document
        .getElementsByClassName('whole-garage-part')[0]
        .classList.add('hidden');
    });

    garageBtn.addEventListener('click', () => {
      router.navigate('garage');

      bestResult.hide();
      document
        .getElementsByClassName('whole-garage-part')[0]
        .classList.remove('hidden');
    });

    this.getAllCArs();
  }

  async getAllCArs() {
    this.element
        .getElementsByClassName('car-section-wrapper')[0].innerHTML = ``;
    const arrcars = await this.api.getCars();

    document.getElementsByClassName(
      'amount-of-cars-in-garage',
    )[0].innerHTML = `(${arrcars.length})`;
    document.getElementsByClassName(
      'num-of-page',
    )[0].innerHTML = `(1 of ${Math.ceil(arrcars.length / 7)})`;

    const limitCarsDisplOnPage = 7;
    let numOfCarsect = 0;
    for (let i = 0; i < limitCarsDisplOnPage && i < arrcars.length; i++) {
      const div = document.createElement('div');
      this.element
        .getElementsByClassName('car-section-wrapper')[0]
        .appendChild(div)
        .classList.add(`car-section-${numOfCarsect}`, 'car-section');

      this.element
        .getElementsByClassName(`car-section-${numOfCarsect}`)[0]
        .setAttribute('style', `fill:${arrcars[i].color}`);

      this.element.getElementsByClassName(
        `car-section-${numOfCarsect}`,
      )[0].innerHTML = `<div class="select-remove-btns-name">
      <button class="select-${arrcars[i].id} data-id="${arrcars[i].id}">SELECT</button>
      <button class="remove-${arrcars[i].id}" data-id="${arrcars[i].id}">REMOVE</button>
      <div class="car-name">${arrcars[i].name}</div>
    </div>
    <div class="car-block">
    <div class="start-back-btns">
      <button class="start">A</button>
      <button class="back">B</button>
    </div>
    <div class="car">
    <svg viewBox="0 0 512 512"><g id="_13-car" data-name="13-car">
    <g id="glyph"><path d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z"/>
    <path d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z"/><path d="M477.4,
    193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,
    36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,
    36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,
    121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12
    ,0,0,1,12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"/></g></g></svg>
    </div>
    <div class="finish"></div>
    </div>
  </div>`;

  this.element.getElementsByClassName(`remove-${arrcars[i].id}`)[0].addEventListener('click', async (e: Event) => {
    let getID = e.target as HTMLElement;
    await this.api.deleteCar(parseInt(getID.getAttribute('data-id')!, 10));
    this.getAllCArs();
  })

      numOfCarsect++;
    }
  }
}
