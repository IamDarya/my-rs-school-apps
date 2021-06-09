export class API {
  async getCars() {
    const responce = await fetch('http://127.0.0.1:3000/garage', {
      method: 'get',
    });
    const arrOfCars = await responce.json();
    return arrOfCars;
  }

  async getCar(id: number) {
    const responce = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'get',
    });
    const car = await responce.json();
    return car;
  }

  async createCar(name: string| null, color: string | null) {
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
}
