import { Car } from './car/car';
import { GetCarsAmountAndCars } from './get-cars-amount-and-cars';

export class API {
  async getCars(page: number, limit: number): Promise<GetCarsAmountAndCars> {
    const responce = await fetch(
      `http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`,
      {
        method: 'get',
      }
    );
    const arrOfCars = await responce.json();
    let objWithAmountOfCarsAndArrayOfCars = new GetCarsAmountAndCars(
      parseInt(responce.headers.get('X-Total-Count')!, 10),
      arrOfCars
    );
    return objWithAmountOfCarsAndArrayOfCars;
  }

  async getCar(id: number): Promise<Car> {
    const responce = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'get',
    });
    const car = await responce.json();
    return car;
  }

  async createCar(name: string | null, color: string | null) {
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

  async deleteCar(id: number | null) {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'delete',
    });
  }

  async updateCar(
    id: number | null,
    name: string | null,
    color: string | null
  ) {
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
}
