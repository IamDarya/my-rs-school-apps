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

  arrOfCarsInRace: Array<Promise<void>>;

  popUp: PopUp;

  constructor(api: API, garage: Garage, popUp: PopUp) {
    super();
    this.api = api;
    this.garage = garage;
    this.popUp = popUp;
    this.arrOfCarsInRace = [];
    this.hashtableOfCarsIntervalId = new Map();
  }

  async startRace(): Promise<CarSpeed[]> {
    this.arrOfCarsInRace = [];
    const allBtns = document.getElementsByTagName(
      'button'
    ) as unknown as HTMLButtonElement[];
    this.disableBtnsARr(allBtns);

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
        time: speedsArray[i].distance / speedsArray[i].velocity / 1000,
      };

      fastesCar.push(this.winner);

      this.hashtableOfCarsIntervalId.set(arrOfCars[i].id, intervalId);

      const drivePromise = API.SwitchCarEngineToDriveMode(getID, 'drive');
      this.arrOfCarsInRace.push(drivePromise);
      drivePromise.catch(async (err) => {  // eslint-disable-line @typescript-eslint/no-loop-func
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
    fastesCar.sort((a, b) => (a.time < b.time ? 1 : -1));
    Promise.any(this.arrOfCarsInRace).then(async () => {
      setTimeout(async () => {
        await this.popUp.showPopUp(
          fastesCar[fastesCar.length - 1].id,
          fastesCar[fastesCar.length - 1].time
        );
        this.inableBtnsARr(allBtns);
        const raceBtn = document.getElementsByClassName('race-btn')[0] as HTMLButtonElement;
        raceBtn.disabled = true;
        const currentWinner = await API.getWinner(
          fastesCar[fastesCar.length - 1].id
        );
        if (
          currentWinner !== null &&
          parseInt(currentWinner.time.toString(), 10) >
            parseInt(fastesCar[fastesCar.length - 1].time.toString(), 10)
        ) {
          API.updateWinner(
            fastesCar[fastesCar.length - 1].id,
            parseInt(currentWinner.wins.toString(), 10) + 1,
            fastesCar[fastesCar.length - 1].time
          );
        }
        if (
          currentWinner !== null &&
          parseInt(currentWinner.time.toString(), 10) <=
            parseInt(fastesCar[fastesCar.length - 1].time.toString(), 10)
        ) {
          API.updateWinner(
            fastesCar[fastesCar.length - 1].id,
            parseInt(currentWinner.wins.toString(), 10) + 1,
            currentWinner.time
          );
        }
        if (currentWinner === null) {
          await API.createWinner(
            fastesCar[fastesCar.length - 1].id,
            fastesCar[fastesCar.length - 1].wins,
            fastesCar[fastesCar.length - 1].time
          );
        }
        const resetBtn = document.getElementsByClassName(
          'reset-btn'
        )[0] as HTMLButtonElement;
        resetBtn.disabled = false;
      }, 250);
    });
    return speedsArray;
  }

  async stopRace(): Promise<void> {

    await Promise.allSettled(this.arrOfCarsInRace);
    const arrOfCars = (await API.getCars(this.garage.numOfPage, 7)).cars;
    for (let i = 0; i < arrOfCars.length; i++) {
      const getID = arrOfCars[i].id;
      clearInterval(this.hashtableOfCarsIntervalId.get(getID)!);
      document
        .getElementsByClassName(`car-${getID}`)[0]
        .setAttribute('style', `left:${11}vw`);
      API.startStopCarEngine(getID, 'stopped');
    }
    const allBtns = document.getElementsByTagName(
      'button'
    ) as unknown as HTMLButtonElement[];
    this.inableBtnsARr(allBtns);
  }

  disableBtnsARr(btns: HTMLButtonElement[]): void {
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }
    this.element.getElementsByTagName('body');
  }

  inableBtnsARr(btns: HTMLButtonElement[]): void {
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
    this.element.getElementsByTagName('body');
  }
}
