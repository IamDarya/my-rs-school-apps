import { Car } from './car/car';

export class GetCarsAmountAndCars {
  amount: number | null;

  cars: Car[];

  constructor(amount: number | null, cars: Car[]) {
    this.amount = amount;
    this.cars = cars;
  }
}
