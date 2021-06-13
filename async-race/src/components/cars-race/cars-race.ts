import { BaseComponent } from '../base-component';
import { API } from '../api';
import { Garage } from '../garage/garage';
import { CarSpeed } from '../car/car-speed';

export class CarsRace extends BaseComponent {
  api: API;

  garage: Garage;

  hashtableOfCarsIntervalId: Map<number, NodeJS.Timeout>;

  constructor(api: API, garage: Garage) {
    super();
    this.api = api;
    this.garage = garage;
    this.hashtableOfCarsIntervalId = new Map();
  }

  async startRace(): Promise<CarSpeed[]> {
    const arrOfCars = (await API.getCars(this.garage.numOfPage, 7)).cars;
    let speedsArray: Array<CarSpeed> = [];

    const arrOfPromices: Array<Promise<CarSpeed>> = [];
    for (let i = 0; i < arrOfCars.length; i++) {
      const getID = arrOfCars[i].id;
      const promiceOfSpeed = API.startStopCarEngine(getID, 'started');
      arrOfPromices.push(promiceOfSpeed);
    }
    speedsArray = await Promise.all(arrOfPromices);

    for (let i = 0; i < arrOfCars.length; i++) {
      const getID = arrOfCars[i].id;

      const intervalId = this.garage.moveCar(getID, speedsArray[i]);

      this.hashtableOfCarsIntervalId.set(arrOfCars[i].id, intervalId);

      API.SwitchCarEngineToDriveMode(getID, 'drive').catch(async (err) => {
        if (err instanceof Error) {
          if (
            err.message
            === "Car has been stopped suddenly. It's engine was broken down."
          ) {
            clearInterval(intervalId);
            await API.startStopCarEngine(getID, 'stopped');
          }
        }
      });
    }
    return speedsArray;
  }

  async stopRace(): Promise<void> {
    const arrOfCars = await (
      await API.getCars(this.garage.numOfPage, 7)
    ).cars;
    for (let i = 0; i < arrOfCars.length; i++) {
      const getID = arrOfCars[i].id;
      clearInterval(this.hashtableOfCarsIntervalId.get(getID)!);
      document
        .getElementsByClassName(`car-${getID}`)[0]
        .setAttribute('style', `left:${5}%`);
    }
  }
}
