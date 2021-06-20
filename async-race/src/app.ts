import { Router } from './components/router/router';
import { BestResult } from './components/best-result/best-result';
import { Garage } from './components/garage/garage';
import { API } from './components/api';
import { CarsRace } from './components/cars-race/cars-race';
import { Header } from './components/header/header';
import { CarManipulation } from './components/car-manipulations/car-manipulations';
import { PopUp } from './components/pop-up/pop-up';

export class App {
  private readonly router = new Router();

  private readonly header = new Header(this.router);

  private readonly api = new API();

  private readonly popUp = new PopUp(this.api);

  private readonly garage = new Garage(this.router, this.api);

  private readonly carsRace = new CarsRace(this.api, this.garage, this.popUp);

  private readonly carManipulation = new CarManipulation(
    this.api,
    this.router,
    this.carsRace,
    this.garage
  );

  private readonly bestResult = new BestResult(this.router, this.popUp);

  constructor(private readonly rootElement: HTMLElement) {}

  async start(): Promise<void> {
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.carManipulation.element);
    this.rootElement.appendChild(this.garage.element);
    this.rootElement.appendChild(this.bestResult.element);
    this.rootElement.appendChild(this.popUp.element);

    this.router.add('garage', async () => {
      this.bestResult.hide();
      this.garage.show();
      await this.garage.getAllCArs();
    });

    this.router.add('', async () => {
      this.bestResult.hide();
      this.garage.show();
      await this.garage.getAllCArs();
    });

    this.router.add('best-result', () => {
      this.bestResult.show();
      this.garage.hide();
      this.bestResult.drawWinners();
    });
  }
}
