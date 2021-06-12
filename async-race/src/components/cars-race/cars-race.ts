import { BaseComponent } from '../base-component';
import { API } from '../api';
import { Garage } from '../garage/garage';
import { CarSpeed } from '../car/car-speed';

export class CarsRace extends BaseComponent {
  api: API;

  garage: Garage;

  hashtableOfCarsIntervalId: Map<number, number>;

  constructor(api: API, garage: Garage) {
    super();
    this.api = api;
    this.garage = garage;
    this.hashtableOfCarsIntervalId = new Map();
  }

  async startRace() {
    let arrOfCars = (await this.api.getCars(this.garage.numOfPage, 7)).cars;
    let speedsArray: Array<CarSpeed> = [];

    let arrOfPromices: Array<Promise<CarSpeed>> = [];
    for (let i = 0; i < arrOfCars.length; i++) {
      let getID = arrOfCars[i].id;
      let promiceOfSpeed = this.api.startStopCarEngine(getID, 'started');
      arrOfPromices.push(promiceOfSpeed);
    }
    speedsArray = await Promise.all(arrOfPromices);

    for (let i = 0; i < arrOfCars.length; i++) {
      let getID = arrOfCars[i].id;

      let intervalId = await this.garage.moveCar(getID, speedsArray[i]);

      this.hashtableOfCarsIntervalId.set(arrOfCars[i].id, intervalId);

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
    }
  }
  async stopRace() {
    let arrOfCars = await (
      await this.api.getCars(this.garage.numOfPage, 7)
    ).cars;
    for (let i = 0; i < arrOfCars.length; i++) {
      let getID = arrOfCars[i].id;
      clearInterval(this.hashtableOfCarsIntervalId.get(getID));
      document
        .getElementsByClassName(`car-${getID}`)[0]
        .setAttribute('style', `left:${5}%`);
    }
  }
}
