import { BaseComponent } from '../base-component';
import { API } from '../api';
import { Garage } from '../garage/garage';
import { CarSpeed } from '../car/car-speed';
import { Winner } from './winner';
import { PopUp } from '../pop-up/pop-up';
import { App } from '../../app';

export class CarsRace extends BaseComponent {
  api: API;

  garage: Garage;

  hashtableOfCarsIntervalId: Map<number, NodeJS.Timeout>;

  winner: Winner | undefined;

  popUp: PopUp;

  constructor(api: API, garage: Garage, popUp: PopUp) {
    super();
    this.api = api;
    this.garage = garage;
    this.popUp = popUp;
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

    let fastesCar: Array<Winner> = [];

    for (let i = 0; i < arrOfCars.length; i++) {
      const getID = arrOfCars[i].id;

      const intervalId = this.garage.moveCar(getID, speedsArray[i]);

      this.winner = {
        id: parseInt(`${getID}`, 10),
        wins: 1,
        time: parseInt(
          `${speedsArray[i].distance / speedsArray[i].velocity}`,
          10
        ),
      };

      fastesCar.push(this.winner);
      fastesCar.sort((a, b) => (a.time < b.time ? 1 : -1));

      this.hashtableOfCarsIntervalId.set(arrOfCars[i].id, intervalId);

      API.SwitchCarEngineToDriveMode(getID, 'drive').catch(async (err) => {
        if (err instanceof Error) {
          if (
            err.message ===
            "Car has been stopped suddenly. It's engine was broken down."
          ) {
            clearInterval(intervalId);
            await API.startStopCarEngine(getID, 'stopped');
            fastesCar = fastesCar.filter((el) => el.id !== getID);
          }
        }
      });
    }

    setTimeout(async () => {
      if (API.getCar(fastesCar[fastesCar.length - 1].id)) {
        API.updateWinner(
          fastesCar[fastesCar.length - 1].id,
          (await API.getWinner(fastesCar[fastesCar.length - 1].id)).wins + 1,
          fastesCar[fastesCar.length - 1].time
        );
      } else {
        await API.createWinner(
          fastesCar[fastesCar.length - 1].id,
          fastesCar[fastesCar.length - 1].wins,
          fastesCar[fastesCar.length - 1].time
        );
      }
      await this.popUp.getWinnerForPopUp(
        fastesCar[fastesCar.length - 1].id,
        fastesCar[fastesCar.length - 1].time
      );
    }, fastesCar[fastesCar.length - 1].time);

    return speedsArray;
  }

  async stopRace(): Promise<void> {
    const arrOfCars = await (await API.getCars(this.garage.numOfPage, 7)).cars;
    for (let i = 0; i < arrOfCars.length; i++) {
      const getID = arrOfCars[i].id;
      clearInterval(this.hashtableOfCarsIntervalId.get(getID)!);
      document
        .getElementsByClassName(`car-${getID}`)[0]
        .setAttribute('style', `left:${5}%`);
    }
  }
}
