import { BaseComponent } from '../base-component';
import { API } from '../api';
import { CarsRace } from '../cars-race/cars-race';
import { Router } from '../router/router';
import { Garage } from '../garage/garage';

export class CarManipulation extends BaseComponent {
  api: API;

  carsRace: CarsRace;

  inputName: HTMLInputElement | undefined;

  inputColor: HTMLInputElement | undefined;

  inputNameUpdate: HTMLInputElement | undefined;

  inputColorUpdate: HTMLInputElement | undefined;

  router: Router;

  garage: Garage;

  constructor(api: API, router: Router, carsRace: CarsRace, garage: Garage) {
    super('div');
    this.carsRace = carsRace;
    this.api = api;
    this.garage = garage;
    this.router = router;
    this.element.innerHTML = `
      <div class="to-hide-when-best-res-shows">
      <div class="create-update">
        <div class="create">
          <input type="text" class="input-newcar-name"/>
          <input type="color" class="input-newcar-color"/>
          <button class="create-btn">CREATE</button>
        </div>
        <div class="update">
          <input type="text" class="input-updatecar-name"/>
          <input type="color" class="input-updatecar-color"/>
          <button class="update-btn">UPDATE</button>
        </div>
      </div>
      <div class="race-reset-generate-cars-btns">
        <button class="race-btn">RACE</button>
        <button class="reset-btn">RESET</button>
        <button class="generate-cars-btn">GENERATE CARS</button>
      </div>`;

    this.inputColor = this.element.getElementsByClassName(
      'input-newcar-color'
    )[0] as HTMLInputElement;

    this.inputColorUpdate = this.element.getElementsByClassName(
      'input-updatecar-color'
    )[0] as HTMLInputElement;

    const startCarsRaceBtn = this.element.getElementsByClassName(
      'race-btn'
    )[0] as HTMLButtonElement;
    const resetCarsRaceBtn = this.element.getElementsByClassName(
      'reset-btn'
    )[0] as HTMLButtonElement;

    startCarsRaceBtn.addEventListener('click', async () => {
      startCarsRaceBtn.disabled = true;
      await this.carsRace.startRace();
    });

    resetCarsRaceBtn.addEventListener('click', async () => {
      startCarsRaceBtn.disabled = false;
      document.getElementsByClassName('pop-up')[0].classList.add('hidden');
      await this.carsRace.stopRace();
    });

    this.inputColor.addEventListener('input', () => this.inputColor?.value);
    this.inputColorUpdate.addEventListener(
      'input',
      () => this.inputColorUpdate?.value
    );

    this.element
      .getElementsByClassName('create-btn')[0]
      .addEventListener('click', async () => {
        this.inputName = this.element.getElementsByClassName(
          'input-newcar-name'
        )[0] as HTMLInputElement;

        await API.createCar(this.inputName.value, this.inputColor!.value);
        this.inputName.value = '';
        this.inputColor!.value = '#000000';

        await this.garage.getAllCArs();
      });

    this.element
      .getElementsByClassName('generate-cars-btn')[0]
      .addEventListener('click', async () => {
        const arrOfRandomCarName = [
          'Volvo',
          'Volkswagen',
          'Toyota',
          'Ford',
          'Mercedes',
          'BMW',
          'Audi',
          'Porsche',
          'Cadillac',
          'Maybach',
          'Tesla',
        ];
        const arrOfRandomCarNameModeles = [
          'Compact',
          'Crossover',
          'x7',
          '8 Series',
          'S4',
          '904',
          'RS Spyder',
          'XT6',
          'Escalade',
          'S-class',
        ];
        const letters = '0123456789ABCDEF';
        let randomCarName = '';
        let randomColor = '#';
        for (let i = 0; i < 100; i++) {
          randomCarName = `${
            arrOfRandomCarName[Math.floor(Math.random() * 10)]
          } ${arrOfRandomCarNameModeles[Math.floor(Math.random() * 10)]}`;
          for (let j = 0; j < 6; j++) {
            randomColor += letters[Math.floor(Math.random() * 16)];
          }
          API.createCar(randomCarName, randomColor);
          randomColor = '#';
        }
        await this.garage.getAllCArs();
      });

    this.element
      .getElementsByClassName('update-btn')[0]
      .addEventListener('click', async () => {
        if (this.garage.selectedCar) {
          this.inputNameUpdate = this.element.getElementsByClassName(
            'input-updatecar-name'
          )[0] as HTMLInputElement;

          if (this.inputNameUpdate.value !== '') {
            await API.updateCar(
              this.garage.selectedCar!.id,
              this.inputNameUpdate.value,
              this.inputColorUpdate!.value
            );
          } else {
            await API.updateCar(
              this.garage.selectedCar!.id,
              this.garage.selectedCar!.name,
              this.inputColorUpdate!.value
            );
          }
          this.inputNameUpdate.value = '';
          this.inputColorUpdate!.value = '#000000';
          await this.garage.getAllCArs();
        }
        this.garage.selectedCar = undefined;
      });
  }
}
