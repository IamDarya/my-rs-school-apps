import { BaseComponent } from '../base-component';
import { API } from '../api';
import './car-manipulations.scss';

export class CarManipulation extends BaseComponent {
  api: API;
  inputName: HTMLInputElement | undefined;
  inputColor: HTMLInputElement | undefined;

  constructor(api: API) {
    super('div');
    this.api = api;
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

    this.inputColor.addEventListener('input', () => {
      return this.inputColor?.value;
    });

    this.element
      .getElementsByClassName('create-btn')[0]
      .addEventListener('click', async () => {
        this.inputName = this.element.getElementsByClassName(
          'input-newcar-name'
        )[0] as HTMLInputElement;

        console.log(this.inputName.value, this.inputColor?.value);
        this.api.createCar(this.inputName.value, this.inputColor!.value);
      });
  }
}
