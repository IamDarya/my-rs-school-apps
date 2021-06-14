import { BaseComponent } from '../base-component';
import { API } from '../api';
import { Garage } from '../garage/garage';
import { CarSpeed } from '../car/car-speed';
import { Winner } from './winner';
import { PopUp } from '../pop-up/pop-up';

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

    let arrOfCarsInRace: Array<Promise<void>> = [];

    for (let i = 0; i < arrOfCars.length; i++) {
      const getID = arrOfCars[i].id;

      const intervalId = this.garage.moveCar(getID, speedsArray[i]);

      this.winner = {
        id: parseInt(`${getID}`, 10),
        wins: 1,
        time:
          speedsArray[i].distance / speedsArray[i].velocity/1000,

      };

      fastesCar.push(this.winner);

      this.hashtableOfCarsIntervalId.set(arrOfCars[i].id, intervalId);

      arrOfCarsInRace.push(API.SwitchCarEngineToDriveMode(getID, 'drive').catch(async (err) => {
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
      }));
    }
    fastesCar.sort((a, b) => (a.time < b.time ? 1 : -1));

    Promise.race(arrOfCarsInRace).then(async()=>{
      let currentWinner = await API.getWinner(fastesCar[fastesCar.length - 1].id);
      if(currentWinner !== null && currentWinner.time > fastesCar[fastesCar.length - 1].time) {
        API.updateWinner(
          fastesCar[fastesCar.length - 1].id,
          parseInt(currentWinner.wins.toString(), 10) + 1,
          fastesCar[fastesCar.length - 1].time
        );
      }
        else {
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
    })
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
         API.startStopCarEngine(getID, 'stopped');
    }
  }
}
