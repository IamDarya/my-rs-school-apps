import { Car } from './car/car';
import { CarSpeed } from './car/car-speed';
import { Winner } from './cars-race/winner';
import { GetCarsAmountAndCars } from './get-cars-amount-and-cars';

export class API {
  static async getCars(
    page: number,
    limit: number
  ): Promise<GetCarsAmountAndCars> {
    const responce = await fetch(
      `http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`,
      {
        method: 'get',
      }
    );
    const arrOfCars = await responce.json();
    const objWithAmountOfCarsAndArrayOfCars = new GetCarsAmountAndCars(
      parseInt(responce.headers.get('X-Total-Count')!, 10),
      arrOfCars
    );
    return objWithAmountOfCarsAndArrayOfCars;
  }

  static async getCar(id: number): Promise<Car> {
    const responce = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'get',
    });
    const car = responce.json(); // delete await
    return car;
  }

  static async createCar(
    name: string | null,
    color: string | null
  ): Promise<void> {
    await fetch('http://127.0.0.1:3000/garage', {
      method: 'post',
      body: JSON.stringify({
        name: `${name}`,
        color: `${color}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async deleteCar(id: number | null): Promise<void> {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'delete',
    });
  }

  static async updateCar(
    id: number | null,
    name: string | null,
    color: string | null
  ): Promise<void> {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'put',
      body: JSON.stringify({
        name: `${name}`,
        color: `${color}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async startStopCarEngine(
    id: number,
    statusStartedOrStopped: string
  ): Promise<CarSpeed> {
    const responce = await fetch(
      `http://127.0.0.1:3000/engine?id=${id}&status=${statusStartedOrStopped}`,
      {
        method: 'get',
      }
    );
    const speed = await responce.json();
    return speed;
  }

  static async SwitchCarEngineToDriveMode(
    id: number,
    statusDrive: string
  ): Promise<void> {
    const responce = await fetch(
      `http://127.0.0.1:3000/engine?id=${id}&status=${statusDrive}`,
      {
        method: 'get',
      }
    );
    if (responce.status === 400) {
      throw new Error(`Wrong parameters:
       "id" should be any positive number, "status" should be "started", "stopped" or "drive"`);
    }
    if (responce.status === 500) {
      throw new Error(
        "Car has been stopped suddenly. It's engine was broken down."
      );
    }
  }

  static async createWinner(
    id: number | null,
    wins: number | null,
    time: number
  ): Promise<void> {
    await fetch('http://127.0.0.1:3000/winners', {
      method: 'post',
      body: JSON.stringify({
        id: `${id}`,
        wins: `${wins}`,
        time: `${time}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async getWinners(
    page: number,
    limit: number,
    idWinsTime: string,
    ASCorDESC: string
  ): Promise<Array<Winner>> {
    const responce = await fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}&_sort=${idWinsTime}&_order=${ASCorDESC}`, {
      method: 'get',
    });
    const arrOfWinners = await responce.json();
    return arrOfWinners;
  }

  static async getWinner(id: number): Promise<Winner | null> {
    const responce = await fetch(`http://127.0.0.1:3000/winners?id=${id}`, {
      method: 'get',
    });
    const winner = await responce.json();
    if(winner.length === 0){
      return null;
    }
    return winner[0];
  }

  static async updateWinner(
    id: number | null,
    wins: number | null,
    time: number | null
  ): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'put',
      body: JSON.stringify({
        wins: `${wins}`,
        time: `${time}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async deleteWinner(id: number | null): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'delete',
    });
  }
}
