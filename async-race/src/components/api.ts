export class API {
  async getCars() {
    const responce = await fetch('http://127.0.0.1:3000/garage', {
      method: 'get',
    });
    const arrOfCars = await responce.json();
    return arrOfCars;
  }
}
