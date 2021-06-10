import { BaseComponent } from '../base-component';
import { API } from '../api';
import { Garage } from '../garage/garage';
import './car-manipulations.scss';
import { Car } from '../car/car';

export class CarManipulation extends BaseComponent {
  api: API;

  inputName: HTMLInputElement | undefined;

  inputColor: HTMLInputElement | undefined;

  inputNameUpdate: HTMLInputElement | undefined;

  inputColorUpdate: HTMLInputElement | undefined;

  garage: Garage;

  constructor(api: API, garage: Garage) {
    super('div');
    this.api = api;
    this.garage = garage;
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

        await this.api.createCar(this.inputName.value, this.inputColor!.value);
        this.resetInputs(this.inputName, this.inputColor!);

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
          randomCarName =
            arrOfRandomCarName[Math.floor(Math.random() * 10)] +
            ' ' +
            arrOfRandomCarNameModeles[Math.floor(Math.random() * 10)];
          for (var j = 0; j < 6; j++) {
            randomColor += letters[Math.floor(Math.random() * 16)];
          }
          console.log(randomCarName, randomColor);
          await this.api.createCar(randomCarName, randomColor);
          this.garage.getAllCArs();
          randomColor = '#';
        }
      });
  }

  getCarForUpdate(carForUpdate: Car) {
    if (carForUpdate) {
      this.element
        .getElementsByClassName('update-btn')[0]
        .addEventListener('click', async () => {
          this.inputNameUpdate = this.element.getElementsByClassName(
            'input-updatecar-name'
          )[0] as HTMLInputElement;

          if (this.inputNameUpdate.value !== '') {
            await this.api.updateCar(
              carForUpdate.id,
              this.inputNameUpdate.value,
              this.inputColorUpdate!.value
            );
          } else {
            await this.api.updateCar(
              carForUpdate.id,
              carForUpdate.name,
              this.inputColorUpdate!.value
            );
          }
          this.resetInputs(this.inputNameUpdate, this.inputColorUpdate!);

          await this.garage.getAllCArs();
        });
    }
  }

  resetInputs(input: HTMLInputElement, color: HTMLInputElement) {
    input.value = '';
    color.value = '#000000';
  }
}
