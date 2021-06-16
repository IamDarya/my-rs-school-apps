import './pop-up.scss';
import { API } from '../api';
import { BaseComponent } from '../base-component';

export class PopUp extends BaseComponent {
  api: API;

  constructor(api: API) {
    super('div', ['pop-up']);
    this.api = api;
  }

  async showPopUp(id: number, time: number): Promise<void> {
    this.element.innerHTML = '';
    const text = document.createElement('h2');
    const winnerName = (await API.getCar(id)).name;
    text.innerText = `${winnerName} went first (${Number.parseFloat(
      time.toString()
    ).toFixed(2)}s)!`;
    this.element.appendChild(text);
    document.getElementsByClassName('wrapper')[0].appendChild(this.element);
    this.element.classList.remove('hidden');
    setTimeout(() =>{
      this.element.classList.add('hidden')
  }, 3000);
  }
}
