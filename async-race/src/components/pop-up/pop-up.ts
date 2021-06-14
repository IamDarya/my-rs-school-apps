import { API } from "../api";
import { BaseComponent } from "../base-component";

export class PopUp extends BaseComponent {
  api: API;
  constructor(api: API) {
    super('div', ['pop-up']);
    this.api = api;
  }

 async getWinnerForPopUp(id: number, time: number){
  const text = document.createElement('h2');
  let winnerName = (await API.getCar(id)).name;
  text.innerText = `${winnerName} went first (${time}s)!`;

  this.element.appendChild(text);
  }
}
