import { Car } from './car/car';

export class GetCarsAmountAndCars {
  amount: number | null;

  cars: any;

  constructor(amount: number | null, cars: Car[]) {
    this.amount = amount;
    this.cars = cars;
  }
}
