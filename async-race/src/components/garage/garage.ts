import './garage.scss';
import { Router } from '../router/router';
import { BaseComponent } from '../base-component';
import { BestResult } from '../best-result/best-result';
import { API } from '../api';
import { CarManipulation } from '../car-manipulations/car-manipulations';
import { CarSpeed } from '../car/car-speed';

export class Garage extends BaseComponent {
  router: Router;

  api: API;

  carManipulation: CarManipulation;

  numOfPage: number;

  constructor(router: Router, bestResult: BestResult, api: API) {
    super('div', ['wrapper']);
    this.api = api;
    this.router = router;
    this.numOfPage = 1;
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
          <div class="num-of-page">${this.numOfPage}</div>
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
      this.element.getElementsByTagName('main')[0]
    );

    const bestResultBtn =
      this.element.getElementsByClassName('to-winners-btn')[0];
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

    const nextPageBtn = this.element.getElementsByClassName('next')[0];
    const prevPAgeBtn = this.element.getElementsByClassName('prev')[0];

    const changePageNext = () => {
      this.numOfPage++;
      document.getElementsByClassName(
        'num-of-page'
      )[0].innerHTML = `(${this.numOfPage})`;
      this.getAllCArs();
    };

    const changePagePrev = () => {
      if (this.numOfPage > 1) {
        this.numOfPage--;
        document.getElementsByClassName(
          'num-of-page'
        )[0].innerHTML = `(${this.numOfPage})`;
        this.getAllCArs();
      }
    };
    nextPageBtn.addEventListener('click', changePageNext);
    prevPAgeBtn.addEventListener('click', changePagePrev);
  }

  async getAllCArs() {
    this.element.getElementsByClassName(
      'car-section-wrapper'
    )[0].innerHTML = ``;

    const arrcars = await this.api.getCars(this.numOfPage, 7);

    document.getElementsByClassName(
      'amount-of-cars-in-garage'
    )[0].innerHTML = `(${arrcars.amount})`;
    document.getElementsByClassName(
      'num-of-page'
    )[0].innerHTML = `(${this.numOfPage})`;

    const limitCarsDisplOnPage = 7;
    let numOfCarsect = 0;
    for (let i = 0; i < limitCarsDisplOnPage && i < arrcars.cars.length; i++) {
      const div = document.createElement('div');
      this.element
        .getElementsByClassName('car-section-wrapper')[0]
        .appendChild(div)
        .classList.add(`car-section-${numOfCarsect}`, 'car-section');

      this.element
        .getElementsByClassName(`car-section-${numOfCarsect}`)[0]
        .setAttribute('style', `fill:${arrcars.cars[i].color}`);

      this.element.getElementsByClassName(
        `car-section-${numOfCarsect}`
      )[0].innerHTML = `<div class="select-remove-btns-name">
      <button class="select-${arrcars.cars[i].id}" data-id="${arrcars.cars[i].id}">SELECT</button>
      <button class="remove-${arrcars.cars[i].id}" data-id="${arrcars.cars[i].id}">REMOVE</button>
      <div class="car-name">${arrcars.cars[i].name}</div>
    </div>
    <div class="car-block">
    <div class="start-back-btns">
      <button class="back-${arrcars.cars[i].id}" data-id="${arrcars.cars[i].id}">back</button>
      <button class="start-${arrcars.cars[i].id}" data-id="${arrcars.cars[i].id}">start</button>
    </div>
    <div class="car car-${arrcars.cars[i].id}">
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

      this.element
        .getElementsByClassName(`remove-${arrcars.cars[i].id}`)[0]
        .addEventListener('click', async (e: Event) => {
          let getID = e.target as HTMLElement;
          await this.api.deleteCar(
            parseInt(getID.getAttribute('data-id')!, 10)
          );
          this.getAllCArs();
        });

      this.element
        .getElementsByClassName(`select-${arrcars.cars[i].id}`)[0]
        .addEventListener('click', async (e: Event) => {
          let getID = e.target as HTMLElement;
          let selectedCar = await this.api.getCar(
            parseInt(getID.getAttribute('data-id')!, 10)
          );
          this.carManipulation.getCarForUpdate(selectedCar);
        });

      let btnToStartCar = this.element.getElementsByClassName(
        `start-${arrcars.cars[i].id}`
      )[0] as HTMLButtonElement;
      let btnToReturntCar = this.element.getElementsByClassName(
        `back-${arrcars.cars[i].id}`
      )[0] as HTMLButtonElement;

      let hashtableOfCarsIntervalId: Map<number, number> = new Map();

      btnToReturntCar.addEventListener('click', async (e: Event) => {
        let getID = e.target as HTMLElement;
        clearInterval(hashtableOfCarsIntervalId.get(arrcars.cars[i].id));
        document
          .getElementsByClassName(`car-${getID.getAttribute('data-id')}`)[0]
          .setAttribute('style', `left:${5}%`);
        btnToStartCar.disabled = false;
      });

      btnToStartCar.addEventListener('click', async (e: Event) => {
        btnToStartCar.disabled = true;

        let getID = e.target as HTMLElement;

        let speed = await this.api.startStopCarEngine(arrcars.cars[i].id, 'started');

        let intervalId = await this.moveCar(arrcars.cars[i].id, speed);

        hashtableOfCarsIntervalId.set(arrcars.cars[i].id, intervalId);

        try {
          await this.api.SwitchCarEngineToDriveMode(
            parseInt(getID.getAttribute('data-id')!, 10),
            'drive'
          );
        } catch (err) {
          if (err instanceof Error) {
            if (
              err.message ===
              `Car has been stopped suddenly. It's engine was broken down.`
            ) {
              clearInterval(intervalId);
              await this.api.startStopCarEngine(
                parseInt(getID.getAttribute('data-id')!, 10),
                'stopped'
              );
            }
          }
        }
      });
      numOfCarsect++;
    }
  }

  async moveCar(carID: number, speed: CarSpeed) {
    let id: any = null;
    const elem = document.getElementsByClassName(`car-${carID}`)[0];
    let pos = 5;
    clearInterval(id);
    // let speed = await this.api.startStopCarEngine(carID, 'started');
    let timeOfCarToFinish = speed.distance / speed.velocity;
    let updateInterval = 10;
    id = setInterval(frame, updateInterval);
    function frame() {
      let finishPosition = 85;
      if (pos >= finishPosition) {
        clearInterval(id);
      } else {
        let distanceToRideInPercetages = 78;
        pos =
          pos +
          (distanceToRideInPercetages / timeOfCarToFinish) * updateInterval;
        elem.setAttribute('style', `left:${pos}%`);
      }
    }
    return id;
  }
}
